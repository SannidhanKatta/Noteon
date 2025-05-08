import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
    throw new Error('Missing OPENAI_API_KEY environment variable');
}

export const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function getAssistantResponse(prompt: string, context: string = '') {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a helpful AI assistant embedded in a note-taking application. Your purpose is to help users with their documents by providing insights, suggestions, and answers to their questions. Keep responses concise and relevant."
                },
                {
                    role: "user",
                    content: `Context from the document:\n${context}\n\nUser question: ${prompt}`
                }
            ],
            temperature: 0.7,
            max_tokens: 500,
        });

        return response.choices[0]?.message?.content || "I apologize, but I couldn't generate a response.";
    } catch (error) {
        console.error('OpenAI API error:', error);
        return "I apologize, but I encountered an error. Please try again.";
    }
} 