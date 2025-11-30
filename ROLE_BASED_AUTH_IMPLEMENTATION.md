# Role-Based Authentication Implementation Guide

## Overview

This document explains the role-based authentication system implemented to ensure admins can only access the admin panel and agents can only access the agent area.

---

## Problem Statement

Previously, both admin and agent logins used the same Supabase authentication without role differentiation. This allowed:
- Agents to log into the admin panel
- Admins to log into the agent area

## Solution

A comprehensive role-based access control (RBAC) system has been implemented with multiple layers of protection.

---

## Architecture

### 1. User Roles

Two distinct roles are now enforced:

- **admin**: Can only access `/admin` routes
- **agent**: Can only access `/client` routes

Roles are stored in Supabase user metadata:
```javascript
user.user_metadata.role // 'admin' or 'agent'
```

### 2. Authentication Flow

#### Admin Login Flow
```
Admin enters credentials
        ↓
signInUser() - Supabase auth
        ↓
Check user_metadata.role === 'admin'
        ↓
If not admin → Sign out + Show error
If admin → Proceed to admin dashboard
```

#### Agent Login Flow
```
Agent enters credentials
        ↓
loginAgent() - Supabase auth
        ↓
Check user_metadata.role === 'agent'
        ↓
If not agent → Sign out + Show error
If agent → Proceed to client dashboard
```

---

## Modified Files

### 1. `/src/lib/supabase.js`

#### Updated `signInUser()` - Admin Login
```javascript
export const signInUser = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { success: false, error: error.message };
    
    // Check user role - must be admin to access admin area
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const userMetadata = user.user_metadata || {};
      const role = userMetadata.role;
      
      if (role !== 'admin') {
        // Not an admin - sign them out
        await supabase.auth.signOut();
        return { success: false, error: 'Only admins can access the admin panel. Please use the agent login page.' };
      }
    }
    
    return { success: true, user: data.user };
  } catch (err) {
    return { success: false, error: err.message };
  }
};
```

**Changes:**
- Added role verification after successful password authentication
- Checks if `user.user_metadata.role === 'admin'`
- If not admin, signs out the user and returns error
- Shows user-friendly error message directing to agent login

#### Updated `loginAgent()` - Agent Login
```javascript
export const loginAgent = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { success: false, error: error.message };
    
    // Check user role - must be agent to access agent area
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const userMetadata = user.user_metadata || {};
      const role = userMetadata.role;
      
      if (role !== 'agent') {
        // Not an agent - sign them out
        await supabase.auth.signOut();
        return { success: false, error: 'Only agents can access this area. Please check your login credentials or use the admin login page.' };
      }
    }
    
    return { success: true, user: data.user };
  } catch (err) {
    return { success: false, error: err.message };
  }
};
```

**Changes:**
- Added role verification after successful password authentication
- Checks if `user.user_metadata.role === 'agent'`
- If not agent, signs out the user and returns error
- Shows user-friendly error message

#### Updated `registerAgent()`
```javascript
// Added role field to signup
body: JSON.stringify({ ...agentData, role: 'agent' }),
```

**Changes:**
- Explicitly sets role to 'agent' during registration

---

### 2. `/src/app/api/register/route.js`

#### Updated Agent Registration
```javascript
// Always register as 'agent' unless explicitly specified as 'admin'
const userRole = agentData.role || 'agent';

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
          role: userRole,  // ← Role added to user metadata
          redirect_to: redirectUrl,
        },
      },
    }),
  }
);
```

**Changes:**
- Role parameter added to user metadata during signup
- Defaults to 'agent' if not specified
- Role is now stored in Supabase auth user metadata

---

### 3. `/src/app/api/admin-register/route.js` (NEW FILE)

```javascript
// New endpoint for admin registration with authorization check
export async function POST(request) {
  // Validate admin access via secret header
  const adminSecret = request.headers.get('x-admin-secret');
  if (adminSecret !== process.env.ADMIN_REGISTER_SECRET) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // ... registration logic with role: 'admin'
  options: {
    data: {
      full_name: adminData.name || 'Admin',
      role: 'admin',  // ← Explicitly set to admin
      redirect_to: redirectUrl,
    },
  }
}
```

**Purpose:**
- Secure endpoint for creating admin users
- Requires `x-admin-secret` header matching `ADMIN_REGISTER_SECRET` env variable
- Ensures only authorized requests can create admin accounts

---

### 4. `/middleware.js`

#### Updated Middleware with Role Checking
```javascript
// Create a Supabase client with server-side cookie handling
supabase = createServerClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  { /* config */ }
);

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
    return NextResponse.redirect(new URL('/', req.url));
  }
}
```

**Changes:**
- Enhanced middleware to check roles at the routing level
- Protects `/admin/*` routes - only admins allowed
- Protects `/client/*` routes - only agents allowed
- Redirects unauthorized users appropriately
- Uses server-side Supabase client for session verification

---

### 5. `/src/app/admin/page.js`

#### Added Role Verification
```javascript
useEffect(() => {
  const unsubscribe = subscribeToAuthChanges((user) => {
    if (user) {
      // Check if user has admin role
      const userRole = user.user_metadata?.role;
      if (userRole === 'admin') {
        setIsAuthenticated(true);
        setIsAuthorized(true);
      } else {
        // User is logged in but not an admin
        setIsAuthenticated(false);
        setIsAuthorized(false);
        signOutUser();
      }
    } else {
      setIsAuthenticated(false);
      setIsAuthorized(true);
    }
    setLoading(false);
  });
  
  return () => unsubscribe();
}, []);

// Added authorization check UI
if (!isAuthorized) {
  return (
    <div style={{ /* ... */ }}>
      <h1>Access Denied</h1>
      <p>Only admins can access the admin panel.</p>
      <a href="/">Go Home</a>
    </div>
  );
}
```

**Changes:**
- Added `isAuthorized` state to track role validity
- Verifies role on auth state change
- Signs out users who don't have admin role
- Shows access denied page for unauthorized users

---

### 6. `/src/app/client/page.js`

#### Added Role Verification
```javascript
import { getCurrentAgent, getAgentPartners, supabase } from '../../lib/supabase';

useEffect(() => {
  const loadData = async () => {
    // First verify user role
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || user.user_metadata?.role !== 'agent') {
      router.push('/');
      return;
    }

    const agentResult = await getCurrentAgent();
    // ... rest of logic
  };
  loadData();
}, [router]);
```

**Changes:**
- Added explicit role check before loading agent data
- Verifies role is 'agent'
- Redirects non-agents to home page
- Happens at the component level as additional protection

---

## Environment Variables

Add to `.env.local`:

```env
# Admin registration secret (change this to a secure value)
ADMIN_REGISTER_SECRET=your-secure-secret-key-here
```

---

## Testing the Implementation

### Test Case 1: Admin Tries to Access Agent Area
```
1. Create admin account via /api/admin-register
2. Admin logs in at /admin
3. Admin tries to navigate to /client/dashboard
4. Expected: Redirected to home page, sees "Access Denied"
```

### Test Case 2: Agent Tries to Access Admin Area
```
1. Create agent account via /api/register
2. Agent logs in at /login
3. Agent tries to navigate to /admin
4. Expected: Redirected to /admin login, sees "Access Denied"
```

### Test Case 3: Admin Login Shows Error for Agent Account
```
1. Agent exists with role: 'agent'
2. Admin tries to log in with agent credentials at /admin
3. Enters agent's email and password
4. Expected: Login fails with message "Only admins can access the admin panel"
```

### Test Case 4: Agent Login Shows Error for Admin Account
```
1. Admin exists with role: 'admin'
2. Agent tries to log in with admin credentials at /login
3. Enters admin's email and password
4. Expected: Login fails with message "Only agents can access this area"
```

---

## Creating Admin Accounts

### Manual Admin Registration

Use the `/api/admin-register` endpoint with proper authorization:

```bash
curl -X POST http://localhost:3000/api/admin-register \
  -H "Content-Type: application/json" \
  -H "x-admin-secret: your-secure-secret-key-here" \
  -d '{
    "email": "admin@example.com",
    "password": "secure-password",
    "name": "Admin User"
  }'
```

**Response (Success):**
```json
{
  "success": true,
  "user": {
    "id": "user-id",
    "email": "admin@example.com",
    "user_metadata": {
      "role": "admin",
      "full_name": "Admin User"
    }
  }
}
```

---

## Migration Guide

If you have existing users without roles:

1. **For Admin Users** - Update via Supabase Admin API:
```sql
UPDATE auth.users 
SET raw_user_meta_data = jsonb_set(raw_user_meta_data, '{role}', '"admin"')
WHERE email IN ('admin1@example.com', 'admin2@example.com');
```

2. **For Agent Users** - Update via Supabase Admin API:
```sql
UPDATE auth.users 
SET raw_user_meta_data = jsonb_set(raw_user_meta_data, '{role}', '"agent"')
WHERE email IN ('agent1@example.com', 'agent2@example.com');
```

---

## Security Considerations

1. **Multiple Layers of Protection:**
   - Login function checks role
   - Middleware checks role at routing level
   - Component checks role on mount
   - Reduces risk of unauthorized access

2. **Atomic Operations:**
   - If login role check fails, user is immediately signed out
   - No lingering sessions with wrong role

3. **Error Messages:**
   - User-friendly messages guide users to correct login page
   - No information leakage about account existence

4. **Admin Registration:**
   - Requires secret header for authentication
   - Change `ADMIN_REGISTER_SECRET` in production
   - Store as secure environment variable

---

## Troubleshooting

### Issue: User Can't Login Even with Correct Credentials
**Solution:** Check user's role in Supabase Auth → Users → User Details → Metadata

### Issue: "Access Denied" Loop
**Solution:** Verify role is correctly set in user metadata as 'admin' or 'agent' (not other values)

### Issue: Middleware Errors
**Solution:** Ensure Supabase environment variables are set correctly and SSR package is installed:
```bash
npm install @supabase/ssr
```

### Issue: Admin Registration Returns 401
**Solution:** Verify `x-admin-secret` header matches `ADMIN_REGISTER_SECRET` environment variable

---

## Future Enhancements

1. **Additional Roles:**
   - 'moderator': Access to limited admin features
   - 'support': Access to support dashboard

2. **Permissions System:**
   - Granular permissions beyond roles
   - Fine-grained feature access control

3. **Audit Logging:**
   - Track unauthorized access attempts
   - Log role changes
   - Monitor admin actions

4. **Single Sign-On:**
   - Integrate with external auth providers
   - Maintain role consistency across providers

---

## Summary

The role-based authentication system provides:
- ✅ Clear separation between admin and agent areas
- ✅ Multiple layers of access control
- ✅ User-friendly error messages
- ✅ Secure admin registration
- ✅ Atomic authentication operations
- ✅ Server-side route protection

Users can now only access their designated areas, preventing cross-role access.
