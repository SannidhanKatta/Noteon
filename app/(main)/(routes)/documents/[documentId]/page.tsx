'use client';

import { useMutation, useQuery } from 'convex/react';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { Toolbar } from '@/components/toolbar';
import { Cover } from '@/components/cover';
import { Skeleton } from '@/components/ui/skeleton';
import { AiButton } from '@/components/ai-chat/ai-button';
import { ChatWindow } from '@/components/ai-chat/chat-window';
import { useChat } from '@/hooks/use-chat';

interface DocumentIdPageProps {
  params: {
    documentId: Id<'documents'>;
  };
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
  const Editor = useMemo(() => dynamic(() => import('@/components/editor'), { ssr: false }), []);

  const document = useQuery(api.documents.getById, { documentId: params.documentId });

  const update = useMutation(api.documents.update);

  const { isOpen, openChat, closeChat } = useChat();

  const onChange = (content: string) => {
    update({ id: params.documentId, content });
  };

  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }

  if (document === null) {
    return <div>Document not found</div>;
  }

  return (
    <div className="pb-40">
      <Cover url={document?.coverImage} />
      <div className="md:max-w-3xl lg:md-max-w-4xl mx-auto">
        <Toolbar initialData={document} />
        <Editor
          onChange={onChange}
          initialContent={document.content}
        />
      </div>

      {/* AI Chat components */}
      <AiButton onClick={openChat} />
      <ChatWindow
        isOpen={isOpen}
        onClose={closeChat}
        documentId={params.documentId}
      />
    </div>
  );
};

export default DocumentIdPage;
