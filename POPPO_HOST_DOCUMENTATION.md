# Poppo Host Registration System Documentation

## Overview

The Poppo Host Registration System allows users to register as Poppo hosts and enables administrators to manage host registrations.

---

## Database Schema

### Table: `poppo_host`

```sql
CREATE TABLE poppo_host (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  date_of_birth DATE NOT NULL,
  gender VARCHAR(10) NOT NULL CHECK (gender IN ('male', 'female')),
  phone_number VARCHAR(20) NOT NULL,
  poppo_id VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | UUID | Yes | Auto-generated primary key |
| name | VARCHAR(255) | Yes | Full name of host |
| date_of_birth | DATE | Yes | Birth date of host |
| gender | VARCHAR(10) | Yes | Either 'male' or 'female' |
| phone_number | VARCHAR(20) | Yes | Contact phone number |
| poppo_id | VARCHAR(50) | Yes | Unique Poppo account ID |
| email | VARCHAR(255) | Yes | Contact email address |
| created_at | TIMESTAMP | Auto | Registration timestamp |
| updated_at | TIMESTAMP | Auto | Last update timestamp |

### Indexes

- `idx_poppo_host_poppo_id` - For fast lookups by Poppo ID
- `idx_poppo_host_email` - For email-based searches
- `idx_poppo_host_phone` - For phone-based searches

### Security

- Row Level Security (RLS) enabled
- Public can insert (new registrations)
- Users can view their own records
- Admins can manage all records (via metadata role check)

---

## Features

### 1. Public Registration Form

**URL:** `/register-as-poppo-host`

**Description:** User-friendly registration form for new Poppo hosts

**Fields:**
- Full Name (required)
- Date of Birth (required, date picker)
- Gender (required, dropdown: Male/Female)
- Phone Number (required, validated format)
- Poppo ID (required)
- Email (required, email validation)

**Features:**
- Real-time field validation
- Error messages for invalid inputs
- Success notification on submission
- FAQ section with common questions
- Links to login and home pages

**Validation Rules:**
- Name: Non-empty string
- DOB: Valid date in past
- Gender: Must be 'male' or 'female'
- Phone: Valid phone number format
- Poppo ID: Non-empty, unique
- Email: Valid email format

### 2. Admin Management Page

**URL:** `/admin/poppo-hosts`

**Description:** Admin dashboard for managing Poppo host registrations

**Features:**
- Table view of all registrations
- Pagination (5, 10, 25, 50 rows per page)
- Edit functionality via modal dialog
- Delete with confirmation
- Gender visual indicator (chips)
- Registration date display
- Search/filter by any field

**Permissions:**
- Admin only (role: 'admin')
- Protected by middleware and role checks

---

## API Functions

### Registration Functions

#### `registerPoppoHost(hostData)`

Register a new Poppo host.

```javascript
import { registerPoppoHost } from '@/lib/supabase';

const result = await registerPoppoHost({
  name: 'John Doe',
  dateOfBirth: '1995-05-15',
  gender: 'male',
  phoneNumber: '+1 (555) 123-4567',
  poppoId: 'poppo_user_12345',
  email: 'john@example.com'
});

if (result.success) {
  console.log('Host registered:', result.data);
} else {
  console.error('Registration failed:', result.error);
}
```

**Returns:**
```javascript
{
  success: true,
  data: {
    id: 'uuid',
    name: 'John Doe',
    date_of_birth: '1995-05-15',
    gender: 'male',
    phone_number: '+1 (555) 123-4567',
    poppo_id: 'poppo_user_12345',
    email: 'john@example.com',
    created_at: '2025-01-15T10:30:00Z',
    updated_at: '2025-01-15T10:30:00Z'
  }
}
```

---

### Read Functions

#### `getPoppoHosts(from = 0, to = 19)`

Get paginated list of Poppo hosts.

```javascript
import { getPoppoHosts } from '@/lib/supabase';

const result = await getPoppoHosts(0, 9); // First 10 records

if (result.success) {
  console.log('Hosts:', result.data);
  console.log('Total count:', result.count);
}
```

**Parameters:**
- `from` (number): Start index (default: 0)
- `to` (number): End index (default: 19)

**Returns:**
```javascript
{
  success: true,
  data: [...], // Array of host objects
  count: 50    // Total number of records
}
```

#### `getPoppoHostById(id)`

Get a specific host by ID.

```javascript
import { getPoppoHostById } from '@/lib/supabase';

const result = await getPoppoHostById('550e8400-e29b-41d4-a716-446655440000');

if (result.success) {
  console.log('Host:', result.data);
}
```

#### `getPoppoHostByPoppoId(poppoId)`

Get a host by their Poppo ID.

```javascript
import { getPoppoHostByPoppoId } from '@/lib/supabase';

const result = await getPoppoHostByPoppoId('poppo_user_12345');

if (result.success) {
  console.log('Host:', result.data);
}
```

---

### Update Functions

#### `updatePoppoHost(id, updates)`

Update host information.

```javascript
import { updatePoppoHost } from '@/lib/supabase';

const result = await updatePoppoHost('host-id', {
  name: 'Jane Doe',
  dateOfBirth: '1995-05-15',
  gender: 'female',
  phoneNumber: '+1 (555) 987-6543',
  poppoId: 'poppo_user_12345',
  email: 'jane@example.com'
});

if (result.success) {
  console.log('Host updated:', result.data);
}
```

---

### Delete Functions

#### `deletePoppoHost(id)`

Delete a host record.

```javascript
import { deletePoppoHost } from '@/lib/supabase';

const result = await deletePoppoHost('host-id');

if (result.success) {
  console.log('Host deleted');
} else {
  console.error('Deletion failed:', result.error);
}
```

---

## User Interface

### Registration Form (`/register-as-poppo-host`)

```
┌─────────────────────────────────────┐
│     Register as Poppo Host          │
│                                     │
│  Full Name: [________________]      │
│  Date of Birth: [________________]  │
│  Gender: [Dropdown ▼]               │
│  Phone: [________________]           │
│  Poppo ID: [________________]        │
│  Email: [________________]           │
│                                     │
│  [Register as Poppo Host Button]   │
│                                     │
│  Benefits:                          │
│  - Access to hosting opportunities  │
│  - Competitive commission rates     │
│  - Professional support             │
│  - Real-time earnings tracking      │
│  - Marketing tools                  │
└─────────────────────────────────────┘
```

### Admin Management (`/admin/poppo-hosts`)

```
┌──────────────────────────────────────────────────────────────┐
│ Poppo Hosts Management                                       │
├──────────────────────────────────────────────────────────────┤
│ Name | DOB | Gender | Phone | Poppo ID | Email | Date | Actions│
├──────────────────────────────────────────────────────────────┤
│ John │ ... │ Male ● │ ...   │ ...      │ ...   │ ... │ Edit Del│
│ Jane │ ... │ Fem ● │ ...   │ ...      │ ...   │ ... │ Edit Del│
├──────────────────────────────────────────────────────────────┤
│ Rows per page: [10 ▼]  1-10 of 50 [< | >]                   │
└──────────────────────────────────────────────────────────────┘
```

---

## Setup Instructions

### 1. Run Database Migration

Execute the SQL script in Supabase SQL Editor:

```bash
# File: scripts/create-poppo-host-table.sql
```

Or via Supabase dashboard:
- Go to SQL Editor
- Create new query
- Copy contents of `create-poppo-host-table.sql`
- Click "Run"

### 2. Verify Installation

Check that:
- ✅ Table `poppo_host` exists
- ✅ Indexes are created
- ✅ RLS policies are enabled

Query to verify:
```sql
SELECT * FROM poppo_host LIMIT 1;
```

### 3. Test Registration Form

1. Navigate to `/register-as-poppo-host`
2. Fill in all fields
3. Click "Register as Poppo Host"
4. Check success notification
5. Verify record appears in admin panel

### 4. Test Admin Panel

1. Go to `/admin`
2. Navigate to "Poppo Hosts" from sidebar
3. Verify registered hosts appear
4. Test edit functionality
5. Test delete functionality

---

## Error Handling

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| "poppo_id already exists" | Poppo ID not unique | Use different Poppo ID |
| "Invalid phone format" | Phone not formatted correctly | Use format: +1 (555) 123-4567 |
| "Invalid email" | Email format incorrect | Check email address |
| "Access denied" | Not authenticated or wrong role | Login as admin |
| "Unique constraint violation" | Duplicate poppo_id | Verify Poppo ID is unique |

---

## Data Validation

### Client-Side Validation

- Name: Required, min 2 characters
- DOB: Required, must be valid date
- Gender: Required, must be 'male' or 'female'
- Phone: Required, valid phone format
- Poppo ID: Required, must be unique
- Email: Required, valid email format

### Server-Side Validation

- All fields checked by Supabase
- Unique constraint on poppo_id
- Gender check constraint
- NOT NULL constraints

---

## Examples

### Example: Register a Host

```javascript
const hostData = {
  name: 'Maria Santos',
  dateOfBirth: '1992-08-22',
  gender: 'female',
  phoneNumber: '+62 812 3456 7890',
  poppoId: 'poppo_maria_santos_001',
  email: 'maria.santos@example.com'
};

const result = await registerPoppoHost(hostData);
console.log(result);
```

### Example: Get All Hosts with Pagination

```javascript
const page = 0;
const pageSize = 10;

const result = await getPoppoHosts(
  page * pageSize,
  (page + 1) * pageSize - 1
);

console.log(`Page ${page + 1}:`, result.data);
console.log(`Total hosts: ${result.count}`);
```

### Example: Update Host

```javascript
const hostId = '550e8400-e29b-41d4-a716-446655440000';

const result = await updatePoppoHost(hostId, {
  name: 'Maria Santos Updated',
  dateOfBirth: '1992-08-22',
  gender: 'female',
  phoneNumber: '+62 812 9999 8888',
  poppoId: 'poppo_maria_santos_001',
  email: 'maria.new@example.com'
});

if (result.success) {
  console.log('Updated:', result.data);
}
```

---

## Security Considerations

1. **Public Registration:** Anyone can register
   - Consider adding email verification
   - Add CAPTCHA for spam prevention
   - Add rate limiting

2. **Admin Access:** Requires admin role
   - Protected by middleware
   - Protected by component-level checks
   - Requires proper authentication

3. **Data Privacy:**
   - Personal information stored securely
   - RLS policies prevent unauthorized access
   - Consider GDPR compliance for EU users

4. **Unique Constraint:**
   - Poppo ID must be unique
   - Prevents duplicate registrations
   - Email can be duplicated (allow multiple registrations per email)

---

## Future Enhancements

1. **Email Verification**
   - Send confirmation email after registration
   - Require email verification before approval
   - Resend verification link functionality

2. **Admin Approval Workflow**
   - Add approval status field
   - Require admin approval before host is active
   - Send notification to host when approved

3. **Advanced Search/Filter**
   - Search by name, email, Poppo ID
   - Filter by gender, registration date
   - Export to CSV/Excel

4. **Host Profiles**
   - Public host profile page
   - Stats dashboard (earnings, followers)
   - Performance metrics

5. **Integration**
   - Link to Poppo API for verification
   - Sync earnings data
   - Automated payout processing

---

## Files Modified/Created

| File | Type | Purpose |
|------|------|---------|
| `scripts/create-poppo-host-table.sql` | SQL | Database migration |
| `src/lib/supabase.js` | JS | CRUD functions |
| `src/app/register-as-poppo-host/page.js` | React | Registration form |
| `src/app/admin/poppo-hosts/page.js` | React | Admin management |
| `src/components/admin/AdminSidebar.js` | React | Added sidebar menu item |

---

## Testing Checklist

- [ ] Register a new host via form
- [ ] Verify record appears in database
- [ ] Verify record appears in admin table
- [ ] Test form validation (empty fields)
- [ ] Test email validation
- [ ] Test phone validation
- [ ] Test duplicate Poppo ID (should fail)
- [ ] Test edit host information
- [ ] Test delete host (with confirmation)
- [ ] Test pagination in admin table
- [ ] Test access control (non-admin cannot access)
- [ ] Verify all required fields are saved

---

## Support

For issues or questions:
1. Check database migrations are applied
2. Verify Supabase connection
3. Check RLS policies are correct
4. Review error messages in browser console
5. Check server logs for detailed errors
