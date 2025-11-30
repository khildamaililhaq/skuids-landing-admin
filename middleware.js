import { NextResponse } from 'next/server';
import { createServerClient, serialize } from '@supabase/ssr';

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Create a Supabase client with server-side cookie handling
  let supabase;
  
  try {
    supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return req.cookies.getSetCookie();
          },
          setAll(cookiesToSet) {
            const response = NextResponse.next();
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options);
            });
            return response;
          },
        },
      }
    );
  } catch (error) {
    console.error('Error creating Supabase client:', error);
    // Continue to next page if Supabase client fails
    return NextResponse.next();
  }

  // Get the user session
  const { data: { session } } = await supabase.auth.getSession();

  // Admin routes protection
  if (pathname.startsWith('/admin')) {
    if (!session?.user) {
      return NextResponse.redirect(new URL('/admin', req.url));
    }

    // Check if user has admin role
    const userRole = session.user.user_metadata?.role;
    if (userRole !== 'admin') {
      console.warn(`Non-admin user (${userRole}) attempted to access admin route: ${pathname}`);
      // Redirect to home page
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // Agent/Client routes protection
  if (pathname.startsWith('/client')) {
    if (!session?.user) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // Check if user has agent role
    const userRole = session.user.user_metadata?.role;
    if (userRole !== 'agent') {
      console.warn(`Non-agent user (${userRole}) attempted to access agent route: ${pathname}`);
      // Redirect to home page
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/client/:path*'],
};