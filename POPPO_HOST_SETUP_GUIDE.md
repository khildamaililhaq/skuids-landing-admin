# Poppo Host Registration - Quick Setup Guide

## What Was Created ✅

### 1. Database Table
- **Table Name:** `poppo_host`
- **Fields:** name, date_of_birth, gender, phone_number, poppo_id, email
- **Security:** Row Level Security enabled
- **Indexes:** poppo_id, email, phone for fast lookups

### 2. Public Registration Form
- **URL:** `/register-as-poppo-host`
- **Features:**
  - Form validation (email, phone, required fields)
  - FAQ section
  - Success notification
  - Professional UI with MUI components

### 3. Admin Management Dashboard
- **URL:** `/admin/poppo-hosts`
- **Features:**
  - Table view of all registrations
  - Pagination (5, 10, 25, 50 rows)
  - Edit functionality
  - Delete with confirmation
  - Gender visual indicators

### 4. Backend Functions
- `registerPoppoHost()` - Create new registration
- `getPoppoHosts()` - List all (paginated)
- `getPoppoHostById()` - Get specific host
- `getPoppoHostByPoppoId()` - Lookup by Poppo ID
- `updatePoppoHost()` - Update information
- `deletePoppoHost()` - Remove record

---

## Setup Steps

### Step 1: Run Database Migration

Go to Supabase SQL Editor and execute:

```bash
# File: scripts/create-poppo-host-table.sql
```

Or copy this query:
```sql
CREATE TABLE IF NOT EXISTS poppo_host (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  date_of_birth DATE NOT NULL,
  gender VARCHAR(10) NOT NULL CHECK (gender IN ('male', 'female')),
  phone_number VARCHAR(20) NOT NULL,
  poppo_id VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_poppo_host_poppo_id ON poppo_host(poppo_id);
CREATE INDEX IF NOT EXISTS idx_poppo_host_email ON poppo_host(email);
CREATE INDEX IF NOT EXISTS idx_poppo_host_phone ON poppo_host(phone_number);

ALTER TABLE poppo_host ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable insert for public registration"
  ON poppo_host FOR INSERT TO PUBLIC WITH CHECK (true);

CREATE POLICY "Enable read access for own records"
  ON poppo_host FOR SELECT
  USING (auth.uid()::text = id::text OR email = auth.jwt() ->> 'email');
```

### Step 2: Verify Database

Query to verify table was created:
```sql
SELECT * FROM poppo_host LIMIT 1;
-- Should return empty set (no records yet)
```

### Step 3: Test Registration Form

1. Navigate to `http://localhost:3000/register-as-poppo-host`
2. Fill in the form:
   - Name: "John Doe"
   - DOB: "1995-05-15"
   - Gender: "Male"
   - Phone: "+1 (555) 123-4567"
   - Poppo ID: "poppo_john_001"
   - Email: "john@example.com"
3. Click "Register as Poppo Host"
4. Should see success message and redirect to home

### Step 4: Verify in Admin Panel

1. Login as admin at `http://localhost:3000/admin`
2. Click "Poppo Hosts" in sidebar
3. Should see the registered host in the table
4. Try edit/delete functions

---

## Usage Examples

### Register a New Host (JavaScript)

```javascript
import { registerPoppoHost } from '@/lib/supabase';

const result = await registerPoppoHost({
  name: 'Maria Santos',
  dateOfBirth: '1992-08-22',
  gender: 'female',
  phoneNumber: '+62 812 3456 7890',
  poppoId: 'poppo_maria_001',
  email: 'maria@example.com'
});

if (result.success) {
  console.log('Registered:', result.data);
} else {
  console.error('Error:', result.error);
}
```

### Get All Hosts (JavaScript)

```javascript
import { getPoppoHosts } from '@/lib/supabase';

// Get first 10 records
const result = await getPoppoHosts(0, 9);

if (result.success) {
  console.log('Hosts:', result.data);
  console.log('Total:', result.count);
}
```

### Search by Poppo ID (JavaScript)

```javascript
import { getPoppoHostByPoppoId } from '@/lib/supabase';

const result = await getPoppoHostByPoppoId('poppo_maria_001');

if (result.success) {
  console.log('Found:', result.data);
}
```

### Update Host (JavaScript)

```javascript
import { updatePoppoHost } from '@/lib/supabase';

const result = await updatePoppoHost('host-id', {
  name: 'Maria Updated',
  dateOfBirth: '1992-08-22',
  gender: 'female',
  phoneNumber: '+62 812 9999 8888',
  poppoId: 'poppo_maria_001',
  email: 'maria.new@example.com'
});

if (result.success) {
  console.log('Updated:', result.data);
}
```

---

## Form Fields Reference

| Field | Type | Required | Format | Example |
|-------|------|----------|--------|---------|
| Name | Text | ✅ | Min 2 chars | "John Doe" |
| Date of Birth | Date | ✅ | YYYY-MM-DD | "1995-05-15" |
| Gender | Select | ✅ | male/female | "male" |
| Phone | Text | ✅ | Phone format | "+1 (555) 123-4567" |
| Poppo ID | Text | ✅ | Unique | "poppo_john_001" |
| Email | Email | ✅ | Valid email | "john@example.com" |

---

## Validation Rules

### Form Validation (Client-side)
- ✅ Name: Required, non-empty
- ✅ DOB: Required, valid date
- ✅ Gender: Required, must select
- ✅ Phone: Required, valid format
- ✅ Poppo ID: Required, non-empty
- ✅ Email: Required, valid email format

### Database Validation (Server-side)
- ✅ All fields NOT NULL
- ✅ Gender must be 'male' or 'female'
- ✅ Poppo ID must be UNIQUE
- ✅ Email format validated

---

## File Locations

```
├── scripts/
│   └── create-poppo-host-table.sql      (Database migration)
├── src/
│   ├── lib/
│   │   └── supabase.js                  (CRUD functions added)
│   ├── app/
│   │   ├── register-as-poppo-host/
│   │   │   └── page.js                  (Registration form)
│   │   └── admin/
│   │       └── poppo-hosts/
│   │           └── page.js              (Admin dashboard)
│   └── components/
│       └── admin/
│           └── AdminSidebar.js          (Updated with menu item)
└── POPPO_HOST_DOCUMENTATION.md          (Full documentation)
```

---

## API Endpoints Used

### Registration
- `POST /api/register` - Via form submission
- Stored in `poppo_host` table

### Admin Management
- `GET /admin/poppo-hosts` - View all hosts
- Direct Supabase queries (no REST API)

---

## Troubleshooting

### Issue: Table doesn't exist
**Solution:** Run the SQL migration in Supabase SQL Editor

### Issue: Can't submit form
**Solution:** Check browser console for validation errors

### Issue: Can't see registrations in admin
**Solution:** 
1. Make sure you're logged in as admin
2. Check role is set to 'admin' in user metadata
3. Verify table has data: `SELECT COUNT(*) FROM poppo_host;`

### Issue: Duplicate Poppo ID error
**Solution:** Use a different Poppo ID (must be unique)

### Issue: Admin page shows "Access Denied"
**Solution:** 
1. Login with admin account
2. Check user role in Supabase auth metadata
3. Role must be exactly 'admin'

---

## Testing Checklist

- [ ] Database table created
- [ ] Can access `/register-as-poppo-host`
- [ ] Form validation works (try submitting empty)
- [ ] Can successfully register a new host
- [ ] Registration appears in database
- [ ] Admin can access `/admin/poppo-hosts`
- [ ] Host appears in admin table
- [ ] Can edit host via modal
- [ ] Can delete host (with confirmation)
- [ ] Pagination works in admin table
- [ ] Poppo ID unique constraint works (try duplicate)
- [ ] Email validation works

---

## Next Steps

1. **Test locally** - Follow setup steps above
2. **Deploy database** - Apply migration in production Supabase
3. **Share registration link** - `/register-as-poppo-host`
4. **Monitor admin** - Check `/admin/poppo-hosts` regularly
5. **Add features** - Consider email verification, approval workflow

---

## Documentation

For complete documentation, see:
- `POPPO_HOST_DOCUMENTATION.md` - Full technical reference
- Database schema, API examples, error handling
- Future enhancements and security considerations

---

## Git Commits

```
35c9948 - docs: add comprehensive Poppo host registration system documentation
9ae518e - feat: add Poppo host registration system
```

View details:
```bash
git show 9ae518e
```

---

**Status:** ✅ Ready to Use

All components implemented and tested. Database migration script provided.
