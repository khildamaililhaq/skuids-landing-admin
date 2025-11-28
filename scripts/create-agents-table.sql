-- Create agents table for Skuids
CREATE TABLE IF NOT EXISTS agents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  username TEXT NOT NULL UNIQUE,
  phone_number TEXT,
  email TEXT NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Drop password_hash column if it exists (since Supabase handles auth)
ALTER TABLE agents DROP COLUMN IF EXISTS password_hash;

-- Create index on username for login
CREATE INDEX IF NOT EXISTS idx_agents_username ON agents (username);

-- Create index on email
CREATE INDEX IF NOT EXISTS idx_agents_email ON agents (email);

-- Drop existing trigger if exists
DROP TRIGGER IF EXISTS update_agents_updated_at ON agents;

-- Enable Row Level Security (RLS)
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Agents can read own data" ON agents;
DROP POLICY IF EXISTS "Authenticated users can manage agents" ON agents;

-- Create policy for agents to read their own data
CREATE POLICY "Agents can read own data" ON agents
  FOR SELECT USING (auth.uid() = id);

-- Create policy for authenticated users (admin) to manage agents
CREATE POLICY "Authenticated users can manage agents" ON agents
  FOR ALL USING (auth.role() = 'authenticated');

-- Function to update updated_at timestamp (if not exists)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_agents_updated_at
  BEFORE UPDATE ON agents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();