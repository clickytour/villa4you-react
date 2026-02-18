import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const isPF =
    hostname.includes('pickedfor.com') ||
    hostname.includes('pickedfor.localhost');

  // Set a header so layouts can detect which domain
  const res = NextResponse.next();
  res.headers.set('x-pickedfor', isPF ? '1' : '0');
  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
