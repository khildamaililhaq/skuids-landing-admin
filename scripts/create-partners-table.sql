-- Create partners table for Skuids
CREATE TABLE IF NOT EXISTS partners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  photo TEXT,
  agent_join_link TEXT,
  hosts_join_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on name for search
CREATE INDEX IF NOT EXISTS idx_partners_name ON partners (name);

-- Create index on created_at for ordering
CREATE INDEX IF NOT EXISTS idx_partners_created_at ON partners (created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Public read access for partners" ON partners
  FOR SELECT USING (true);

-- Create policy for authenticated users to manage partners (admin)
CREATE POLICY "Authenticated users can manage partners" ON partners
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
CREATE TRIGGER update_partners_updated_at
  BEFORE UPDATE ON partners
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();