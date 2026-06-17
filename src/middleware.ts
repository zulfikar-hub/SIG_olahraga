import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session');
  const pathname = request.nextUrl.pathname;

  if (pathname === '/auth' && session) {
    return NextResponse.redirect(
      new URL('/admin/dashboard', request.url)
    );
  }

  if (pathname.startsWith('/admin') && !session) {
    return NextResponse.redirect(
      new URL('/auth', request.url)
    );
  }

  const response = NextResponse.next();

  response.headers.set(
    'Cache-Control',
    'no-store, no-cache, must-revalidate'
  );

  return response;
}

export const config = {
  matcher: ['/admin/:path*', '/auth'],
};