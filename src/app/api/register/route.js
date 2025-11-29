import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const agentData = await request.json();

    // Validate required fields
    if (!agentData.email || !agentData.password || !agentData.name) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: email, password, name' },
        { status: 400 }
      );
    }

    // Determine the correct redirect URL based on request origin
    const origin = request.headers.get('origin');
    let redirectUrl = 'http://localhost:3000/auth/callback';
    
    if (origin?.includes('skuids.live')) {
      redirectUrl = 'https://skuids.live/auth/callback';
    }

    // Call Supabase sign up endpoint directly via REST API
    const signUpResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/signup`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({
          email: agentData.email,
          password: agentData.password,
          options: {
            data: {
              full_name: agentData.name,
              redirect_to: redirectUrl,
            },
          },
        }),
      }
    );

    const authResult = await signUpResponse.json();

    if (!signUpResponse.ok || authResult.error) {
      return NextResponse.json(
        { success: false, error: authResult.error?.message || 'Auth signup failed' },
        { status: 400 }
      );
    }

    // Auth user created successfully
    return NextResponse.json({
      success: true,
      user: authResult.user,
      message: 'Registration successful! Please check your email to verify your account.'
    });

  } catch (err) {
    console.error('Registration error:', err);
    return NextResponse.json(
      { success: false, error: `Server error: ${err.message}` },
      { status: 500 }
    );
  }
}
