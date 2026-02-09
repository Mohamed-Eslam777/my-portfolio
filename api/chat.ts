import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';

// ============================================================================
// Gemini Model Selection Utilities (Inlined)
// ============================================================================

interface GeminiModel {
    name: string;
    supportedGenerationMethods?: string[];
}

interface ModelsListResponse {
    models: GeminiModel[];
}

/**
 * Fetches available Gemini models and selects the best one
 * Prefers models with "flash" in the name, then falls back to any model supporting generateContent
 */
async function selectBestModel(apiKey: string): Promise<string> {
    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
        );

        if (!response.ok) {
            console.error('Failed to fetch models list:', response.status, response.statusText);
            throw new Error(`Failed to fetch models: ${response.status}`);
        }

        const data: ModelsListResponse = await response.json();
        const models = data.models || [];

        // Filter models that support generateContent
        const compatibleModels = models.filter((model) => {
            const methods = model.supportedGenerationMethods || [];
            return methods.includes('generateContent');
        });

        if (compatibleModels.length === 0) {
            throw new Error('No compatible models found that support generateContent');
        }

        console.log('📋 Available compatible models:');
        compatibleModels.forEach((model) => {
            console.log(`   - ${model.name}`);
        });

        // Prefer models with "flash" in the name
        const flashModel = compatibleModels.find((model) =>
            model.name.toLowerCase().includes('flash')
        );

        if (flashModel) {
            const modelName = flashModel.name.replace('models/', '');
            console.log(`✅ Selected model (flash preference): ${modelName}`);
            return modelName;
        }

        // Fall back to first compatible model
        const fallbackModel = compatibleModels[0];
        const modelName = fallbackModel.name.replace('models/', '');
        console.log(`✅ Selected model (fallback): ${modelName}`);
        return modelName;
    } catch (error: any) {
        console.error('Error selecting model:', error.message);
        throw error;
    }
}

/**
 * Gets the Gemini model to use, with fallback logic
 * 1. Try environment variable GEMINI_MODEL if set
 * 2. Try default "gemini-1.5-flash"
 */
async function getGeminiModel(apiKey: string): Promise<string> {
    // Use env var if specified
    const envModel = process.env.GEMINI_MODEL;
    if (envModel) {
        console.log(`🔧 Using model from GEMINI_MODEL env var: ${envModel}`);
        return envModel;
    }

    // Default to gemini-1.5-flash
    const defaultModel = 'gemini-1.5-flash';
    console.log(`🔧 Using default model: ${defaultModel}`);
    return defaultModel;
}

/**
 * Handles model not found errors by auto-discovering available models
 */
async function handleModelNotFound(
    apiKey: string,
    originalError: any
): Promise<string> {
    console.warn('⚠️  Model not found, auto-discovering available models...');

    const selectedModel = await selectBestModel(apiKey);
    console.log(`🔄 Retrying with model: ${selectedModel}`);

    return selectedModel;
}

// ============================================================================
// Rate Limiting
// ============================================================================

// Simple in-memory rate limiting (10 req/min per IP)
const requestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10;
const RATE_WINDOW = 60 * 1000; // 1 minute

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const userLimit = requestCounts.get(ip);

    if (!userLimit || now > userLimit.resetTime) {
        requestCounts.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
        return true;
    }

    if (userLimit.count >= RATE_LIMIT) {
        return false;
    }

    userLimit.count++;
    return true;
}

// ============================================================================
// Main Handler
// ============================================================================

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only accept POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Rate limiting by IP
    const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || 'unknown';
    if (!checkRateLimit(clientIp)) {
        return res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });
    }

    try {
        const { message, history, context } = req.body;

        // Validate message
        if (!message || typeof message !== 'string') {
            return res.status(400).json({ error: 'Invalid message' });
        }

        const trimmedMessage = message.trim();
        if (trimmedMessage.length === 0 || trimmedMessage.length > 500) {
            return res.status(400).json({ error: 'Message must be between 1 and 500 characters' });
        }

        // Get API key from environment (server-side only)
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error('GEMINI_API_KEY not configured in environment');
            return res.status(500).json({ error: 'Server configuration error' });
        }

        // Get model with fallback logic
        let modelName = await getGeminiModel(apiKey);

        // Initialize Gemini server-side
        const genAI = new GoogleGenerativeAI(apiKey);

        let response: string = '';
        let retryCount = 0;
        const maxRetries = 1;

        while (retryCount <= maxRetries) {
            try {
                const model = genAI.getGenerativeModel({
                    model: modelName,
                    systemInstruction: context || 'You are a helpful AI assistant.',
                });

                // Start chat with history
                const chat = model.startChat({
                    history: Array.isArray(history) ? history : [],
                });

                // Send message
                const result = await chat.sendMessage(trimmedMessage);
                response = result.response.text();

                // Success - break out of retry loop
                break;
            } catch (modelError: any) {
                // Check if this is a 404/model not found error
                const is404 = modelError.message?.includes('404') ||
                    modelError.message?.toLowerCase().includes('model not found') ||
                    modelError.message?.toLowerCase().includes('not supported');

                if (is404 && retryCount < maxRetries) {
                    console.warn(`Model "${modelName}" returned 404, attempting fallback...`);

                    try {
                        modelName = await handleModelNotFound(apiKey, modelError);
                        retryCount++;
                        continue; // Retry with new model
                    } catch (fallbackError: any) {
                        console.error('Failed to find fallback model:', fallbackError.message);
                        throw fallbackError;
                    }
                } else {
                    // Not a 404 or already retried, throw the error
                    throw modelError;
                }
            }
        }

        return res.status(200).json({ response });
    } catch (error: any) {
        // Log error safely (never log API key)
        console.error('Gemini API Error:', error.message || error);

        // Return safe error to client
        return res.status(500).json({
            error: 'AI service temporarily unavailable. Please try again.',
        });
    }
}
