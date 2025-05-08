import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        hasApiKey: !!process.env.HUGGING_FACE_API_KEY,
        keyPrefix: process.env.HUGGING_FACE_API_KEY?.slice(0, 4) || 'none'
    });
} 