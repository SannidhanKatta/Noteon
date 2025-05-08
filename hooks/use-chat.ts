import { create } from 'zustand';

interface Message {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
}

interface ChatStore {
    isOpen: boolean;
    messages: Record<string, Message[]>; // documentId -> messages
    openChat: () => void;
    closeChat: () => void;
    addMessage: (documentId: string, message: Message) => void;
    clearMessages: (documentId: string) => void;
}

export const useChat = create<ChatStore>((set) => ({
    isOpen: false,
    messages: {},
    openChat: () => set({ isOpen: true }),
    closeChat: () => set({ isOpen: false }),
    addMessage: (documentId, message) =>
        set((state) => ({
            messages: {
                ...state.messages,
                [documentId]: [...(state.messages[documentId] || []), message],
            },
        })),
    clearMessages: (documentId) =>
        set((state) => ({
            messages: {
                ...state.messages,
                [documentId]: [],
            },
        })),
})); 