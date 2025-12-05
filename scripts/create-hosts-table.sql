-- Create hosts table for Skuids
CREATE TABLE IF NOT EXISTS hosts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  date_of_birth DATE NOT NULL,
  gender VARCHAR(10) NOT NULL CHECK (gender IN ('male', 'female')),
  partner_id UUID REFERENCES partners(id) ON DELETE SET NULL,
  domicile VARCHAR(255) NOT NULL,
  whatsapp_number VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_hosts_partner_id ON hosts(partner_id);
CREATE INDEX IF NOT EXISTS idx_hosts_email ON hosts(email);
CREATE INDEX IF NOT EXISTS idx_hosts_whatsapp ON hosts(whatsapp_number);

-- Enable RLS (Row Level Security)
ALTER TABLE hosts ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public registration)
CREATE POLICY "Enable insert for public registration"
  ON hosts
  FOR INSERT
  WITH CHECK (true);

-- Allow anyone to read all records (public data)
CREATE POLICY "Enable read for public"
  ON hosts
  FOR SELECT
  USING (true);

-- Allow admins to update and delete
CREATE POLICY "Enable update for admins"
  ON hosts
  FOR UPDATE
  USING (
    (SELECT raw_user_meta_data ->> 'role' FROM auth.users WHERE auth.users.id = auth.uid()) = 'admin'
  )
  WITH CHECK (
    (SELECT raw_user_meta_data ->> 'role' FROM auth.users WHERE auth.users.id = auth.uid()) = 'admin'
  );

CREATE POLICY "Enable delete for admins"
  ON hosts
  FOR DELETE
  USING (
    (SELECT raw_user_meta_data ->> 'role' FROM auth.users WHERE auth.users.id = auth.uid()) = 'admin'
  );
