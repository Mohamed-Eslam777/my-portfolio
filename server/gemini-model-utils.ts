import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Fetches available Gemini models and selects the best one
 * Prefers models with "flash" in the name, then falls back to any model supporting generateContent
 */
export async function selectBestModel(apiKey: string): Promise<string> {
    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
        );

        if (!response.ok) {
            console.error('Failed to fetch models list:', response.status, response.statusText);
            throw new Error(`Failed to fetch models: ${response.status}`);
        }

        const data = await response.json();
        const models = data.models || [];

        // Filter models that support generateContent
        const compatibleModels = models.filter((model: any) => {
            const methods = model.supportedGenerationMethods || [];
            return methods.includes('generateContent');
        });

        if (compatibleModels.length === 0) {
            throw new Error('No compatible models found that support generateContent');
        }

        console.log('📋 Available compatible models:');
        compatibleModels.forEach((model: any) => {
            console.log(`   - ${model.name}`);
        });

        // Prefer models with "flash" in the name
        const flashModel = compatibleModels.find((model: any) =>
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
 * 3. If 404, auto-discover and select best available model
 */
export async function getGeminiModel(
    apiKey: string,
    onModelSelection?: (model: string) => void
): Promise<string> {
    // Use env var if specified
    const envModel = process.env.GEMINI_MODEL;
    if (envModel) {
        console.log(`🔧 Using model from GEMINI_MODEL env var: ${envModel}`);
        if (onModelSelection) onModelSelection(envModel);
        return envModel;
    }

    // Default to gemini-1.5-flash
    const defaultModel = 'gemini-1.5-flash';
    console.log(`🔧 Using default model: ${defaultModel}`);
    if (onModelSelection) onModelSelection(defaultModel);
    return defaultModel;
}

/**
 * Handles model not found errors by auto-discovering available models
 */
export async function handleModelNotFound(
    apiKey: string,
    originalError: any
): Promise<string> {
    console.warn('⚠️  Model not found, auto-discovering available models...');

    const selectedModel = await selectBestModel(apiKey);
    console.log(`🔄 Retrying with model: ${selectedModel}`);

    return selectedModel;
}
