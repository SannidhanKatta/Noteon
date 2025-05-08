const HUGGING_FACE_API_URL = "https://api-inference.huggingface.co/models/gpt2";

export async function getAssistantResponse(prompt: string, context: string = '') {
    if (!process.env.HUGGING_FACE_API_KEY) {
        throw new Error('HUGGING_FACE_API_KEY is not set in environment variables');
    }

    try {
        const response = await fetch(HUGGING_FACE_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
            },
            body: JSON.stringify({
                inputs: context ?
                    `${context}\n\nHuman: ${prompt}\nAssistant:` :
                    `Human: ${prompt}\nAssistant:`,
                parameters: {
                    max_length: 100,
                    temperature: 0.7,
                    top_p: 0.9,
                    do_sample: true,
                    return_full_text: false,
                }
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Hugging Face API error response:', {
                status: response.status,
                statusText: response.statusText,
                error: errorText
            });

            if (response.status === 503) {
                return "The model is currently loading. Please wait a moment and try again.";
            }

            if (response.status === 401) {
                return "Authentication failed. Please check if your Hugging Face API key is valid and properly set in .env.local";
            }

            if (response.status === 403) {
                return "Access denied. Please make sure your Hugging Face API key has the correct permissions.";
            }

            if (response.status === 404) {
                // Try to wake up the model
                await fetch(HUGGING_FACE_API_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
                    },
                    body: JSON.stringify({ inputs: "Hello" })
                });
                return "Model is initializing. Please try again in a few seconds.";
            }

            throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();

        if (Array.isArray(result) && result.length > 0) {
            let text = result[0].generated_text || "";
            // Clean up the response
            text = text.split('Human:')[0].trim(); // Remove any follow-up conversation
            text = text.split('Assistant:').pop()?.trim() || text.trim(); // Get the assistant's response
            return text || "I apologize, but I couldn't generate a response.";
        }

        return result.generated_text || "I apologize, but I received an unexpected response format.";
    } catch (error) {
        console.error('Hugging Face API error:', error);
        if (error instanceof Error) {
            return `I encountered an error: ${error.message}. Please try again.`;
        }
        return "I apologize, but I encountered an error. Please try again.";
    }
} 