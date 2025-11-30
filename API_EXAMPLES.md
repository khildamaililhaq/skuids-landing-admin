# Role-Based Auth API Examples

## Admin Registration Endpoint

### Endpoint
```
POST /api/admin-register
```

### Headers Required
```
Content-Type: application/json
x-admin-secret: your-admin-secret-key
```

### Request Body
```json
{
  "email": "admin@example.com",
  "password": "SecurePassword123",
  "name": "Admin Name"
}
```

### Successful Response (201)
```json
{
  "success": true,
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "admin@example.com",
    "email_confirmed_at": null,
    "phone": "",
    "confirmation_sent_at": "2025-01-15T10:30:00Z",
    "app_metadata": {
      "provider": "email",
      "providers": ["email"]
    },
    "user_metadata": {
      "full_name": "Admin Name",
      "role": "admin"
    },
    "identities": [
      {
        "identity_id": "550e8400-e29b-41d4-a716-446655440000",
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "user_id": "550e8400-e29b-41d4-a716-446655440000",
        "identity_data": {
          "email": "admin@example.com"
        },
        "provider": "email",
        "last_sign_in_at": null,
        "created_at": "2025-01-15T10:30:00Z",
        "updated_at": "2025-01-15T10:30:00Z"
      }
    ],
    "created_at": "2025-01-15T10:30:00Z",
    "updated_at": "2025-01-15T10:30:00Z"
  },
  "message": "Admin registration successful! Please check your email to verify your account."
}
```

### Error Response (401 - Unauthorized)
```json
{
  "success": false,
  "error": "Unauthorized"
}
```

### Error Response (400 - Missing Fields)
```json
{
  "success": false,
  "error": "Missing required fields: email, password"
}
```

### Error Response (409 - Email Already Exists)
```json
{
  "success": false,
  "error": "User already registered"
}
```

---

## Agent Registration Endpoint

### Endpoint
```
POST /api/register
```

### Headers Required
```
Content-Type: application/json
```

### Request Body
```json
{
  "name": "Agent Name",
  "email": "agent@example.com",
  "password": "SecurePassword123"
}
```

### Successful Response (201)
```json
{
  "success": true,
  "user": {
    "id": "660e8400-e29b-41d4-a716-446655440000",
    "email": "agent@example.com",
    "email_confirmed_at": null,
    "phone": "",
    "confirmation_sent_at": "2025-01-15T10:30:00Z",
    "app_metadata": {
      "provider": "email",
      "providers": ["email"]
    },
    "user_metadata": {
      "full_name": "Agent Name",
      "role": "agent"
    },
    "identities": [
      {
        "identity_id": "660e8400-e29b-41d4-a716-446655440000",
        "id": "660e8400-e29b-41d4-a716-446655440000",
        "user_id": "660e8400-e29b-41d4-a716-446655440000",
        "identity_data": {
          "email": "agent@example.com"
        },
        "provider": "email",
        "last_sign_in_at": null,
        "created_at": "2025-01-15T10:30:00Z",
        "updated_at": "2025-01-15T10:30:00Z"
      }
    ],
    "created_at": "2025-01-15T10:30:00Z",
    "updated_at": "2025-01-15T10:30:00Z"
  },
  "message": "Registration successful! Please check your email to verify your account."
}
```

### Error Response (400 - Missing Fields)
```json
{
  "success": false,
  "error": "Missing required fields: email, password, name"
}
```

---

## Admin Login Endpoint

### Endpoint
```
POST /api/auth (Admin)
```

### Headers Required
```
Content-Type: application/json
```

### Request Body
```json
{
  "email": "admin@example.com",
  "password": "SecurePassword123"
}
```

### Successful Response (200)
```json
{
  "success": true,
  "message": "Login successful",
  "token": "admin-token-1705315800000",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "admin@example.com",
    "user_metadata": {
      "role": "admin",
      "full_name": "Admin Name"
    }
  }
}
```

### Error Response (401 - Wrong Credentials)
```json
{
  "success": false,
  "error": "Invalid credentials"
}
```

### Error Response (401 - Agent Credentials)
```json
{
  "success": false,
  "error": "Only admins can access the admin panel. Please use the agent login page."
}
```

### Error Response (401 - Not Verified)
```json
{
  "success": false,
  "error": "Email not confirmed"
}
```

---

## Agent Login Endpoint

### Endpoint
```
POST via /login page (Agent)
```

### Headers Required
```
Content-Type: application/json
```

### Request Body
```json
{
  "email": "agent@example.com",
  "password": "SecurePassword123"
}
```

### Successful Response (200)
```json
{
  "success": true,
  "user": {
    "id": "660e8400-e29b-41d4-a716-446655440000",
    "email": "agent@example.com",
    "email_confirmed_at": "2025-01-15T10:30:00Z",
    "phone": "",
    "app_metadata": {
      "provider": "email",
      "providers": ["email"]
    },
    "user_metadata": {
      "full_name": "Agent Name",
      "role": "agent"
    },
    "created_at": "2025-01-15T10:30:00Z",
    "updated_at": "2025-01-15T10:30:00Z"
  }
}
```

### Error Response (401 - Wrong Credentials)
```json
{
  "success": false,
  "error": "Invalid login credentials"
}
```

### Error Response (401 - Admin Credentials)
```json
{
  "success": false,
  "error": "Only agents can access this area. Please check your login credentials or use the admin login page."
}
```

---

## cURL Examples

### Create Admin Account
```bash
curl -X POST http://localhost:3000/api/admin-register \
  -H "Content-Type: application/json" \
  -H "x-admin-secret: your-admin-secret-key" \
  -d '{
    "email": "newadmin@example.com",
    "password": "SecurePass123",
    "name": "New Admin"
  }'
```

### Create Agent Account
```bash
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Agent",
    "email": "newagent@example.com",
    "password": "SecurePass123"
  }'
```

### Admin Login
```bash
curl -X POST http://localhost:3000/api/auth \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "SecurePass123"
  }'
```

---

## JavaScript/Fetch Examples

### Register Admin
```javascript
const registerAdmin = async () => {
  const response = await fetch('/api/admin-register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-secret': 'your-admin-secret-key'
    },
    body: JSON.stringify({
      email: 'admin@example.com',
      password: 'SecurePass123',
      name: 'Admin Name'
    })
  });

  const data = await response.json();
  
  if (data.success) {
    console.log('Admin created:', data.user);
  } else {
    console.error('Error:', data.error);
  }
};
```

### Register Agent
```javascript
const registerAgent = async () => {
  const response = await fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'Agent Name',
      email: 'agent@example.com',
      password: 'SecurePass123'
    })
  });

  const data = await response.json();
  
  if (data.success) {
    console.log('Agent registered:', data.user);
  } else {
    console.error('Error:', data.error);
  }
};
```

### Admin Login (via Supabase client)
```javascript
import { signInUser } from '@/lib/supabase';

const adminLogin = async () => {
  const result = await signInUser('admin@example.com', 'SecurePass123');
  
  if (result.success) {
    console.log('Admin logged in:', result.user);
    // Redirect to admin dashboard
    window.location.href = '/admin';
  } else {
    console.error('Login failed:', result.error);
  }
};
```

### Agent Login (via Supabase client)
```javascript
import { loginAgent } from '@/lib/supabase';

const agentLogin = async () => {
  const result = await loginAgent('agent@example.com', 'SecurePass123');
  
  if (result.success) {
    console.log('Agent logged in:', result.user);
    // Redirect to client dashboard
    window.location.href = '/client';
  } else {
    console.error('Login failed:', result.error);
  }
};
```

---

## Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | OK - Login successful | Agent/Admin login succeeds |
| 201 | Created - User registered | Account created successfully |
| 400 | Bad Request - Missing fields | Email or password not provided |
| 401 | Unauthorized - Wrong role | Admin tries agent login |
| 409 | Conflict - Email exists | Email already registered |
| 500 | Server Error | Database or auth service down |

---

## Role Values

Always use **lowercase** role values:

- ✅ `"role": "admin"` - For admin users
- ✅ `"role": "agent"` - For agent users

**NOT:**
- ❌ `"role": "Admin"` - Incorrect capitalization
- ❌ `"role": "ADMIN"` - Incorrect capitalization
- ❌ `"role": "administrator"` - Incorrect value

---

## Flow Diagrams

### Admin Registration & Login
```
POST /api/admin-register
    ↓
Verify x-admin-secret header
    ↓
Create auth user with role: 'admin'
    ↓
Return user with metadata { role: 'admin' }
    ↓
Admin logs in at /admin
    ↓
signInUser() called
    ↓
Check role === 'admin'
    ↓
Success → Admin dashboard
```

### Agent Registration & Login
```
POST /api/register
    ↓
Create auth user with role: 'agent'
    ↓
Return user with metadata { role: 'agent' }
    ↓
Email confirmation sent
    ↓
Agent verifies email
    ↓
Agent logs in at /login
    ↓
loginAgent() called
    ↓
Check role === 'agent'
    ↓
Success → Agent dashboard
```

### Cross-Role Prevention
```
Agent tries /admin login
    ↓
Enters credentials (agent email + password)
    ↓
signInUser() called
    ↓
Check role === 'admin'
    ↓
role === 'agent' (NOT admin)
    ↓
Sign out user
    ↓
Return error: "Only admins can access..."
```
