import { authMiddleware } from '@clerk/nextjs';

// Specify public routes that don't require authentication
export default authMiddleware({
    publicRoutes: [
        "/",
        "/sign-in",
        "/sign-up",
        "/api/edgestore/init"
    ]
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};