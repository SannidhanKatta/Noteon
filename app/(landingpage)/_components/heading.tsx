'use client';

import { Button } from '@/components/ui/button';
import { SignInButton } from '@clerk/clerk-react';
import { useConvexAuth } from 'convex/react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Transform Your Ideas into Reality with <span className="underline">Noteon</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Your all-in-one workspace for creativity and collaboration.
        <br /> Write, plan, and organize everything in one place.
      </h3>
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-10 w-28 rounded" />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href="/documents">
            Enter Noteon
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button>
            Get started
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </SignInButton>
      )}
    </div>
  );
};
