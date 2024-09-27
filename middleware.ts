import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/riot-api')) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(
      'X-Riot-Token',
      process.env.NEXT_PUBLIC_API_TOKEN as string
    );
    return NextResponse.next({
      headers: requestHeaders,
    });
  }
  return NextResponse.next();
}
