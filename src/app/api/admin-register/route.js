import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const adminData = await request.json();

    // Validate required fields
    if (!adminData.email || !adminData.password) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: email, password' },
        { status: 400 }
      );
    }

    // Validate admin access - this should only be called with proper authorization
    // In production, you should verify an admin secret or authorization token
    const adminSecret = request.headers.get('x-admin-secret');
    if (adminSecret !== process.env.ADMIN_REGISTER_SECRET) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Determine the correct redirect URL based on request origin
    const origin = request.headers.get('origin');
    let redirectUrl = 'http://localhost:3000/auth/callback';
    
    if (origin?.includes('skuids.live')) {
      redirectUrl = 'https://skuids.live/auth/callback';
    }

    // Call Supabase sign up endpoint with admin role
    const signUpResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/signup`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({
          email: adminData.email,
          password: adminData.password,
          options: {
            data: {
              full_name: adminData.name || 'Admin',
              role: 'admin',
              redirect_to: redirectUrl,
            },
          },
        }),
      }
    );

    const authResult = await signUpResponse.json();

    console.log('Supabase admin signup response status:', signUpResponse.status);
    console.log('Supabase admin signup response:', JSON.stringify(authResult, null, 2));

    if (!signUpResponse.ok) {
      const errorMessage = typeof authResult.error === 'string' 
        ? authResult.error 
        : authResult.error?.message || authResult.message || 'Admin signup failed';
      
      console.error('Supabase admin signup error:', errorMessage);
      return NextResponse.json(
        { success: false, error: errorMessage },
        { status: signUpResponse.status || 400 }
      );
    }

    // Check if we have user data in the response
    if (!authResult.user || !authResult.user.id) {
      console.error('No user data in admin signup response:', authResult);
      if (authResult.confirmation_sent_at || authResult.user?.confirmation_sent_at) {
        console.log('Admin email confirmation sent');
        return NextResponse.json({
          success: true,
          user: {
            id: 'pending_verification',
            email: adminData.email,
            email_confirmed_at: null
          },
          message: 'Admin registration successful! Please check your email to verify your account.'
        });
      }
      return NextResponse.json(
        { success: false, error: 'Admin signup returned no user data. Email may already be registered.' },
        { status: 400 }
      );
    }

    // Admin auth user created successfully
    return NextResponse.json({
      success: true,
      user: authResult.user,
      message: 'Admin registration successful! Please check your email to verify your account.'
    });

  } catch (err) {
    console.error('Admin registration error:', err);
    return NextResponse.json(
      { success: false, error: `Server error: ${err.message}` },
      { status: 500 }
    );
  }
}
