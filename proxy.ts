import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  const { pathname } = req.nextUrl;

  const protectedRoutes = [
    '/dashboard',
    '/profile',
    '/projects',
    '/settings',
    '/ai',
    '/leaderboard',
    '/learn',
    '/problems',
    '/code',
  ];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  if (pathname.startsWith('/auth') && token) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/projects/:path*',
    '/settings/:path*',
    '/ai/:path*',
    '/leaderboard/:path*',
    '/learn/:path*',
    '/problems/:path*',
    '/code/:path*',
    '/auth/:path*',
  ],
};
