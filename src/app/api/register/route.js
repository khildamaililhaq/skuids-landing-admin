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

    // Log the full response for debugging
    console.log('Supabase signup response status:', signUpResponse.status);
    console.log('Supabase signup response:', JSON.stringify(authResult, null, 2));

    if (!signUpResponse.ok) {
      const errorMessage = typeof authResult.error === 'string' 
        ? authResult.error 
        : authResult.error?.message || authResult.message || 'Auth signup failed';
      
      console.error('Supabase signup error:', errorMessage);
      return NextResponse.json(
        { success: false, error: errorMessage },
        { status: signUpResponse.status || 400 }
      );
    }

    // Check if we have user data in the response
    if (!authResult.user || !authResult.user.id) {
      console.error('No user data in signup response:', authResult);
      // Sometimes Supabase returns success but with confirmation_sent_at instead of full user object
      if (authResult.confirmation_sent_at || authResult.user?.confirmation_sent_at) {
        console.log('Email confirmation sent, returning pending verification');
        return NextResponse.json({
          success: true,
          user: {
            id: 'pending_verification',
            email: agentData.email,
            email_confirmed_at: null
          },
          message: 'Registration successful! Please check your email to verify your account.'
        });
      }
      return NextResponse.json(
        { success: false, error: 'Signup returned no user data. Email may already be registered.' },
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
