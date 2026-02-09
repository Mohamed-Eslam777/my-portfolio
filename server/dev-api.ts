import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getGeminiModel, handleModelNotFound } from './gemini-model-utils';

// Load environment variables from .env.local (preferred) or .env
dotenv.config({ path: '.env.local' });
dotenv.config(); // Fallback to .env

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

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

// POST /api/chat endpoint
app.post('/api/chat', async (req: Request, res: Response) => {
    // Rate limiting by IP
    const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
        req.ip ||
        req.socket.remoteAddress ||
        'unknown';

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
                    console.warn(`⚠️  Model "${modelName}" returned 404, attempting fallback...`);

                    try {
                        modelName = await handleModelNotFound(apiKey, modelError);
                        retryCount++;
                        continue; // Retry with new model
                    } catch (fallbackError: any) {
                        console.error('Failed to find fallback model:', fallbackError.message);
                        throw fallbackError; // Give up, throw original error
                    }
                } else {
                    // Not a 404 or already retried, throw the error
                    throw modelError;
                }
            }
        }

        return res.status(200).json({ response });
    } catch (error: any) {
        // Enhanced error logging for diagnostics
        console.error('\n❌ Gemini API Error Detected:');
        console.error('  Error Name:', error.name || 'Unknown');
        console.error('  Error Message:', error.message || 'No message');
        console.error('  API Key Present:', !!process.env.GEMINI_API_KEY);

        // Check for specific HTTP errors from Gemini
        let errorCode = 'GEMINI_ERROR';
        let clientMessage = 'AI service temporarily unavailable. Please try again.';
        let statusCode = 500;

        // Detect specific error patterns
        if (error.message) {
            const msg = error.message.toLowerCase();

            // 401/403 - Invalid API key or permissions
            if (msg.includes('401') || msg.includes('unauthorized') || msg.includes('invalid api key')) {
                errorCode = 'INVALID_API_KEY';
                clientMessage = 'AI service configuration error. Please check server logs.';
                statusCode = 500;
                console.error('  Diagnosis: Invalid or missing API key (401/403)');
                console.error('  Action: Verify GEMINI_API_KEY in .env.local');
            }
            // 403 - Forbidden
            else if (msg.includes('403') || msg.includes('forbidden')) {
                errorCode = 'FORBIDDEN';
                clientMessage = 'AI service access denied. Please check server logs.';
                statusCode = 500;
                console.error('  Diagnosis: API key lacks permissions (403)');
                console.error('  Action: Check API key restrictions in Google Cloud Console');
            }
            // 429 - Rate limit or quota exceeded
            else if (msg.includes('429') || msg.includes('quota') || msg.includes('rate limit')) {
                errorCode = 'QUOTA_EXCEEDED';
                clientMessage = 'AI service quota exceeded. Please try again later.';
                statusCode = 429;
                console.error('  Diagnosis: Quota or rate limit exceeded (429)');
                console.error('  Action: Check Google AI Studio quota limits');
            }
            // 400 - Bad request
            else if (msg.includes('400') || msg.includes('bad request')) {
                errorCode = 'BAD_REQUEST';
                clientMessage = 'Invalid request format. Please try again.';
                statusCode = 400;
                console.error('  Diagnosis: Malformed request to Gemini (400)');
            }
            // Network errors
            else if (msg.includes('network') || msg.includes('econnrefused') || msg.includes('timeout')) {
                errorCode = 'NETWORK_ERROR';
                clientMessage = 'Network error connecting to AI service.';
                console.error('  Diagnosis: Network connectivity issue');
                console.error('  Action: Check internet connection');
            }
        }

        // Log error stack (first 3 lines only, no sensitive data)
        if (error.stack) {
            const stackLines = error.stack.split('\n').slice(0, 3).join('\n');
            console.error('  Stack Trace (partial):\n', stackLines);
        }

        // Log response details if available (safe excerpt only)
        if (error.response) {
            console.error('  HTTP Status:', error.response.status || 'N/A');
            console.error('  Status Text:', error.response.statusText || 'N/A');

            // Log safe excerpt of response body (first 200 chars, no keys)
            if (error.response.data) {
                const dataStr = JSON.stringify(error.response.data).substring(0, 200);
                console.error('  Response Excerpt:', dataStr);
            }
        }

        console.error(''); // Empty line for readability

        // Return safe error to client with diagnostic code
        return res.status(statusCode).json({
            error: clientMessage,
            code: errorCode,
            status: statusCode,
        });
    }
});

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', message: 'Dev API server is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`\n🚀 Dev API server running on http://localhost:${PORT}`);
    console.log(`   API endpoint: http://localhost:${PORT}/api/chat`);
    console.log(`   Health check: http://localhost:${PORT}/api/health\n`);

    if (!process.env.GEMINI_API_KEY) {
        console.warn('⚠️  WARNING: GEMINI_API_KEY not found in environment');
        console.warn('   Make sure .env.local exists with GEMINI_API_KEY set\n');
    }
});
