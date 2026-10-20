import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle /en and /bn prefixes gracefully
  if (pathname === '/en' || pathname === '/bn') {
    return NextResponse.rewrite(new URL('/', request.url));
  }

  if (pathname.startsWith('/en/') || pathname.startsWith('/bn/')) {
    const stripped = pathname.replace(/^\/(en|bn)/, '');
    return NextResponse.rewrite(new URL(stripped || '/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
