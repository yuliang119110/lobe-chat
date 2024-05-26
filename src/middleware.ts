import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

import { authEnv } from '@/config/auth';
import { auth } from '@/libs/next-auth';

import { OAUTH_AUTHORIZED } from './const/auth';

const isOnboardingRoute = createRouteMatcher(['/onboarding']);
const isPublicRoute = createRouteMatcher(['/public-route-example']);

const clerkAuthMiddleware = clerkMiddleware((auth, req: NextRequest) => {
  const { userId, sessionClaims } = auth();

  // For users visiting /onboarding, don't try to redirect
  if (userId && isOnboardingRoute(req)) {
    return NextResponse.next();
  }

  // // If the user isn't signed in and the route is private, redirect to sign-in
  // if (!userId && !isPublicRoute(req))
  //   return redirectToSignIn({ returnBackUrl: req.url });

  // Catch users who do not have `onboardingComplete: true` in their publicMetadata
  // Redirect them to the /onboading route to complete onboarding
  if (userId && !sessionClaims?.metadata?.onboardingComplete) {
    const onboardingUrl = new URL('/onboarding', req.url);
    return NextResponse.redirect(onboardingUrl);
  }

  // If the user is logged in and the route is protected, let them view.
  if (userId && !isPublicRoute(req)) return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!.+\\.[\\w]+$|_next).*)',
    '/',
    '/(api|trpc)(.*)',
    // include any files in the api or trpc folders that might have an extension
    '/(api|trpc)(.*)',
    // include the /
    '/',
  ],
};

const defaultMiddleware = () => NextResponse.next();

const nextAuthMiddleware = auth((req) => {
  // skip the '/' route
  if (req.nextUrl.pathname === '/') return NextResponse.next();

  // Just check if session exists
  const session = req.auth;

  // Check if next-auth throws errors
  // refs: https://github.com/lobehub/lobe-chat/pull/1323
  const isLoggedIn = !!session?.expires;

  // Remove & amend OAuth authorized header
  const requestHeaders = new Headers(req.headers);
  requestHeaders.delete(OAUTH_AUTHORIZED);
  if (isLoggedIn) requestHeaders.set(OAUTH_AUTHORIZED, 'true');

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
});

export default authEnv.NEXT_PUBLIC_ENABLE_CLERK_AUTH
  ? clerkAuthMiddleware
  : authEnv.NEXT_PUBLIC_ENABLE_NEXT_AUTH
    ? nextAuthMiddleware
    : defaultMiddleware;
