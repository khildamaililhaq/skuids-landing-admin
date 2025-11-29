import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const agentData = await request.json();

    // Create client with service role (bypasses RLS)
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Create auth user
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: agentData.email,
      password: agentData.password,
      email_confirm: false,
    });

    if (authError) {
      return NextResponse.json(
        { success: false, error: authError.message },
        { status: 400 }
      );
    }

    // Create agent record using service role (bypasses RLS)
    const agentRecord = {
      id: authData.user.id,
      name: agentData.name,
      username: agentData.username,
      phone_number: agentData.phone_number,
      email: agentData.email,
    };

    const { data: agentResult, error: agentError } = await supabaseAdmin
      .from('agents')
      .insert(agentRecord)
      .select()
      .single();

    if (agentError) {
      // If agent creation fails, delete the user
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      
      return NextResponse.json(
        { success: false, error: agentError.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: agentResult,
      message: 'Registration successful! Please check your email to verify your account.'
    });

  } catch (err) {
    console.error('Registration error:', err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
