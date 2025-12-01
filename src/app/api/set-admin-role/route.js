import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request) {
  try {
    const { email } = await request.json();

    // Validate input
    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate authorization - check admin secret
    const adminSecret = request.headers.get('x-admin-secret');
    if (adminSecret !== process.env.ADMIN_REGISTER_SECRET) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Create admin client with service role key
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase environment variables');
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // Get user by email
    const { data: { users }, error: listError } = await supabaseAdmin.auth.admin.listUsers();
    
    if (listError) {
      return NextResponse.json(
        { success: false, error: `Failed to find user: ${listError.message}` },
        { status: 400 }
      );
    }

    const user = users.find(u => u.email === email);
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: `User not found: ${email}` },
        { status: 404 }
      );
    }

    // Update user metadata to add admin role
    const { data: updatedUser, error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
      user.id,
      {
        user_metadata: {
          ...user.user_metadata,
          role: 'admin'
        }
      }
    );

    if (updateError) {
      return NextResponse.json(
        { success: false, error: `Failed to update user: ${updateError.message}` },
        { status: 400 }
      );
    }

    console.log(`✅ Set admin role for user: ${email}`);

    return NextResponse.json({
      success: true,
      message: 'Admin role has been set successfully',
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        role: updatedUser.user_metadata?.role
      }
    });

  } catch (error) {
    console.error('Error setting admin role:', error);
    return NextResponse.json(
      { success: false, error: `Server error: ${error.message}` },
      { status: 500 }
    );
  }
}
