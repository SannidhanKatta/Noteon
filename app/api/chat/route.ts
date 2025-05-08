import { getAssistantResponse } from '@/lib/huggingface';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        // Log environment variable presence (not the actual value)
        console.log('HF API Key present:', !!process.env.HUGGING_FACE_API_KEY);

        if (!process.env.HUGGING_FACE_API_KEY) {
            console.error('Missing Hugging Face API key');
            return NextResponse.json(
                { error: 'Hugging Face API key is not configured' },
                { status: 500 }
            );
        }

        const { prompt, context } = await req.json();
        console.log('Received request with prompt:', prompt?.slice(0, 50) + '...');

        if (!prompt) {
            return NextResponse.json(
                { error: 'Prompt is required' },
                { status: 400 }
            );
        }

        const response = await getAssistantResponse(prompt, context);
        console.log('AI Response received:', typeof response, response?.slice?.(0, 50) + '...');

        if (typeof response === 'string' && response.includes('error')) {
            console.error('Error in AI response:', response);
            return NextResponse.json(
                { error: response },
                { status: 500 }
            );
        }

        return NextResponse.json({ response });
    } catch (error) {
        console.error('[CHAT_ERROR] Detailed error:', {
            name: error instanceof Error ? error.name : 'Unknown',
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined
        });

        const errorMessage = error instanceof Error ? error.message : 'Internal server error';
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
} 