'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useChat } from '@/hooks/use-chat';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

interface ChatWindowProps {
    isOpen: boolean;
    onClose: () => void;
    documentId: Id<'documents'>;
}

export const ChatWindow = ({ isOpen, onClose, documentId }: ChatWindowProps) => {
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { messages, addMessage } = useChat();
    const documentMessages = messages[documentId] || [];

    // Get document content for context
    const document = useQuery(api.documents.getById, { documentId });

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = {
            id: Date.now().toString(),
            content: input,
            role: 'user' as const,
            timestamp: new Date(),
        };

        addMessage(documentId, userMessage);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: input,
                    context: document?.content || '', // Send document content as context
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to get AI response');
            }

            const aiMessage = {
                id: (Date.now() + 1).toString(),
                content: data.response,
                role: 'assistant' as const,
                timestamp: new Date(),
            };

            addMessage(documentId, aiMessage);
        } catch (error) {
            console.error('Error getting AI response:', error);
            const errorMessage = {
                id: (Date.now() + 1).toString(),
                content: error instanceof Error
                    ? `Error: ${error.message}`
                    : "I apologize, but I encountered an error. Please try again.",
                role: 'assistant' as const,
                timestamp: new Date(),
            };
            addMessage(documentId, errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className={cn(
                'fixed bottom-0 right-4 w-96 h-[600px] bg-background border rounded-t-xl shadow-xl transition-transform duration-300 ease-in-out transform z-50',
                isOpen ? 'translate-y-0' : 'translate-y-full'
            )}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
                <h3 className="font-semibold">AI Assistant</h3>
                <Button variant="ghost" size="icon" onClick={onClose}>
                    <X className="h-4 w-4" />
                </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 h-[480px] space-y-4">
                {documentMessages.length === 0 && (
                    <div className="text-center text-muted-foreground text-sm">
                        Start a conversation with your AI assistant
                    </div>
                )}
                {documentMessages.map((message) => (
                    <div
                        key={message.id}
                        className={cn(
                            'flex flex-col space-y-2',
                            message.role === 'user' ? 'items-end' : 'items-start'
                        )}
                    >
                        <div className={cn(
                            'p-3 rounded-lg max-w-[80%]',
                            message.role === 'user'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                        )}>
                            {message.content}
                        </div>
                        <span className="text-xs text-muted-foreground">
                            {message.role === 'user' ? 'You' : 'AI Assistant'}
                        </span>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex items-center space-x-2 text-muted-foreground">
                        <div className="animate-bounce">●</div>
                        <div className="animate-bounce delay-100">●</div>
                        <div className="animate-bounce delay-200">●</div>
                    </div>
                )}
            </div>

            {/* Input */}
            <div className="p-4 border-t">
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                        placeholder="Ask anything about your document..."
                        className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        disabled={isLoading}
                    />
                    <Button onClick={handleSend} disabled={isLoading}>
                        Send
                    </Button>
                </div>
            </div>
        </div>
    );
}; 