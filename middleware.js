import { NextResponse } from 'next/server';

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // For now, let the individual pages handle authentication
  // This middleware serves as a placeholder for future enhancements

  // Admin routes are protected by admin/page.js authentication
  // Client routes are protected by client/page.js authentication

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/client/:path*'],
};