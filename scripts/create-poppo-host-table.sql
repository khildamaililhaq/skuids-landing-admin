-- Create poppo_host table
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

-- Create index for poppo_id lookup
CREATE INDEX IF NOT EXISTS idx_poppo_host_poppo_id ON poppo_host(poppo_id);
CREATE INDEX IF NOT EXISTS idx_poppo_host_email ON poppo_host(email);
CREATE INDEX IF NOT EXISTS idx_poppo_host_phone ON poppo_host(phone_number);

-- Enable RLS (Row Level Security)
ALTER TABLE poppo_host ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
-- Allow anyone to insert (public registration)
CREATE POLICY "Enable insert for public registration"
  ON poppo_host
  FOR INSERT
  TO PUBLIC
  WITH CHECK (true);

-- Allow users to view their own records
CREATE POLICY "Enable read access for own records"
  ON poppo_host
  FOR SELECT
  USING (
    auth.uid()::text = id::text OR
    email = auth.jwt() ->> 'email'
  );

-- Allow admins to view all records (optional - requires admin role)
-- CREATE POLICY "Enable read for admins"
--   ON poppo_host
--   FOR SELECT
--   USING (
--     (SELECT raw_user_meta_data ->> 'role' FROM auth.users WHERE auth.users.id = auth.uid()) = 'admin'
--   );
