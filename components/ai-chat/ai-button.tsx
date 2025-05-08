import { Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AiButtonProps {
    onClick: () => void;
}

export const AiButton = ({ onClick }: AiButtonProps) => {
    return (
        <Button
            onClick={onClick}
            className="fixed bottom-4 right-4 h-12 w-12 rounded-full p-0 shadow-md"
            variant="default"
        >
            <Bot className="h-6 w-6" />
        </Button>
    );
}; 