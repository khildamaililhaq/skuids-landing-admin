# Role-Based Auth - Quick Setup & Testing Guide

## What Changed

Your app now has **strict role-based access control**:
- ✅ Admins can ONLY login to `/admin`
- ✅ Agents can ONLY login to `/client`
- ✅ Cross-role login attempts are blocked with clear error messages

---

## Environment Setup

### 1. Add Environment Variable

Update your `.env.local`:

```env
# Add this line - change the value to something secure in production
ADMIN_REGISTER_SECRET=your-secure-admin-secret-key
```

### 2. Install Supabase SSR Package (if not already installed)

```bash
npm install @supabase/ssr
```

---

## Testing the Implementation

### Scenario 1: Admin Tries to Login with Agent Credentials ❌

1. Go to `http://localhost:3000/admin`
2. Enter an agent's email and password
3. **Expected Result:** 
   - ❌ Login fails
   - Error message: "Only admins can access the admin panel. Please use the agent login page."

---

### Scenario 2: Agent Tries to Login with Admin Credentials ❌

1. Go to `http://localhost:3000/login`
2. Enter an admin's email and password
3. **Expected Result:**
   - ❌ Login fails
   - Error message: "Only agents can access this area. Please check your login credentials or use the admin login page."

---

### Scenario 3: Admin Logs in Successfully ✅

1. Go to `http://localhost:3000/admin`
2. Enter admin credentials
3. **Expected Result:**
   - ✅ Login succeeds
   - Redirected to admin dashboard
   - Can access all admin features

---

### Scenario 4: Agent Logs in Successfully ✅

1. Go to `http://localhost:3000/login`
2. Enter agent credentials
3. **Expected Result:**
   - ✅ Login succeeds
   - Redirected to `/client` dashboard
   - Can access agent features

---

### Scenario 5: Admin Tries to Access Agent Route 🔒

1. Admin logs in successfully
2. Try to navigate to `http://localhost:3000/client/dashboard`
3. **Expected Result:**
   - 🔒 Redirected to home page
   - Cannot access agent area

---

### Scenario 6: Agent Tries to Access Admin Route 🔒

1. Agent logs in successfully
2. Try to navigate to `http://localhost:3000/admin/products`
3. **Expected Result:**
   - 🔒 Redirected to home page
   - Cannot access admin area

---

## Creating Test Accounts

### Create an Admin Account

Use the admin registration endpoint:

```bash
curl -X POST http://localhost:3000/api/admin-register \
  -H "Content-Type: application/json" \
  -H "x-admin-secret: your-secure-admin-secret-key" \
  -d '{
    "email": "testadmin@example.com",
    "password": "Test@123456",
    "name": "Test Admin"
  }'
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "...",
    "email": "testadmin@example.com",
    "user_metadata": {
      "role": "admin"
    }
  }
}
```

### Create an Agent Account

1. Go to `http://localhost:3000/register`
2. Fill in the form
3. Submit
4. Verify email

OR use the agent registration endpoint:

```bash
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Agent",
    "email": "testagent@example.com",
    "password": "Test@123456"
  }'
```

---

## Checking User Roles in Supabase

1. Go to your Supabase dashboard
2. Navigate to **Authentication** → **Users**
3. Click on a user
4. Look for **User Metadata** section
5. You should see `"role": "admin"` or `"role": "agent"`

---

## Protection Layers

The system has **3 layers of protection**:

### Layer 1: Login Function (Client-side)
- `signInUser()` for admins - checks role after password auth
- `loginAgent()` for agents - checks role after password auth
- If role doesn't match, user is signed out immediately

### Layer 2: Middleware (Server-side)
- Routes `/admin/*` - only allows users with `role: admin`
- Routes `/client/*` - only allows users with `role: agent`
- Redirects unauthorized users to home page

### Layer 3: Component Verification (Client-side)
- Admin page verifies admin role on mount
- Client page verifies agent role on mount
- Provides extra protection against session manipulation

---

## Common Issues & Solutions

### Issue: "Access Denied" Loop
**Cause:** User metadata doesn't have the correct role
**Solution:** Check Supabase user metadata - ensure role is exactly `"admin"` or `"agent"` (lowercase)

### Issue: 401 Error on Admin Registration
**Cause:** `x-admin-secret` header doesn't match environment variable
**Solution:** Verify the header value matches `ADMIN_REGISTER_SECRET` in `.env.local`

### Issue: Middleware Errors in Logs
**Cause:** Supabase SSR package not installed
**Solution:** Run `npm install @supabase/ssr`

### Issue: Role Check Not Working
**Cause:** User session not loaded yet
**Solution:** Wait for auth state to load (check Loading indicator)

---

## File Changes Summary

| File | Changes |
|------|---------|
| `src/lib/supabase.js` | Added role checks to `signInUser()` and `loginAgent()` |
| `src/app/api/register/route.js` | Added role to user metadata |
| `src/app/api/admin-register/route.js` | NEW - Admin registration with auth |
| `middleware.js` | Added role-based route protection |
| `src/app/admin/page.js` | Added role verification and access denied UI |
| `src/app/client/page.js` | Added role verification |
| `ROLE_BASED_AUTH_IMPLEMENTATION.md` | Complete documentation |

---

## Next Steps

1. ✅ Test all 6 scenarios above
2. ✅ Create test admin and agent accounts
3. ✅ Verify login redirects work correctly
4. ✅ Test middleware protection by trying cross-role access
5. ✅ Check Supabase user metadata for correct roles

---

## Need Help?

Refer to **ROLE_BASED_AUTH_IMPLEMENTATION.md** for:
- Detailed architecture explanation
- Complete code examples
- Migration guide for existing users
- Security considerations
- Troubleshooting guide

---

## Quick Summary

**Before:**
- ❌ Anyone could login to any area if they had valid credentials

**Now:**
- ✅ Admins can ONLY access admin area
- ✅ Agents can ONLY access agent area
- ✅ Cross-role login attempts fail with clear error messages
- ✅ Multiple protection layers (login, middleware, component)
- ✅ Secure admin account creation via API
