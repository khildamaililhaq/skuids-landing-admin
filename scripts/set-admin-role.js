#!/usr/bin/env node

/**
 * Helper script to set admin role for existing Supabase users
 * This fixes the issue where admin users don't have role in metadata
 * 
 * Usage: node set-admin-role.js <admin_email>
 * Or use the API endpoint directly
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Missing SUPABASE environment variables');
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setAdminRole(email) {
  console.log(`Setting admin role for: ${email}`);
  
  try {
    // Find user by email
    const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
    
    if (listError) {
      console.error('Error listing users:', listError.message);
      process.exit(1);
    }

    const user = users.find(u => u.email === email);
    
    if (!user) {
      console.error(`User not found: ${email}`);
      process.exit(1);
    }

    console.log(`Found user: ${user.id}`);
    console.log(`Current metadata:`, user.user_metadata);

    // Update user metadata to add admin role
    const { data: updatedUser, error: updateError } = await supabase.auth.admin.updateUserById(
      user.id,
      {
        user_metadata: {
          ...user.user_metadata,
          role: 'admin'
        }
      }
    );

    if (updateError) {
      console.error('Error updating user:', updateError.message);
      process.exit(1);
    }

    console.log('✅ Successfully set admin role!');
    console.log('Updated metadata:', updatedUser.user_metadata);
    console.log('\nUser can now access the admin panel at /admin/login');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

const email = process.argv[2];
if (!email) {
  console.log('Usage: node set-admin-role.js <admin_email>');
  console.log('\nExample: node set-admin-role.js admin@example.com');
  process.exit(1);
}

setAdminRole(email);
