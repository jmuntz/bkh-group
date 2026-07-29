import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/** Keep alternate concepts off the client-facing share. */
const HIDDEN_PREFIXES = ['/v2', '/v3', '/mockups'];

export function middleware(request: NextRequest) {
  // Local work stays available; client-facing deploys hide alternate concepts.
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  const hidden = HIDDEN_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (hidden) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/v2', '/v2/:path*', '/v3', '/v3/:path*', '/mockups/:path*'],
};
