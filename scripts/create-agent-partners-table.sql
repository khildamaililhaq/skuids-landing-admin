-- Create agent_partners join table for Skuids
CREATE TABLE IF NOT EXISTS agent_partners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  partner_id UUID NOT NULL REFERENCES partners(id) ON DELETE CASCADE,
  status BOOLEAN DEFAULT false,
  approved_date TIMESTAMP WITH TIME ZONE,
  approved_by UUID REFERENCES auth.users(id),
  invitee_host_link TEXT,
  invitee_agent_link TEXT,
  application_images JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(agent_id, partner_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_agent_partners_agent_id ON agent_partners (agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_partners_partner_id ON agent_partners (partner_id);
CREATE INDEX IF NOT EXISTS idx_agent_partners_status ON agent_partners (status);

-- Enable Row Level Security (RLS)
ALTER TABLE agent_partners ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Agents can view their partner relationships" ON agent_partners;
DROP POLICY IF EXISTS "Authenticated users can manage agent partners" ON agent_partners;
DROP POLICY IF EXISTS "Public can read agent partners" ON agent_partners;

-- Allow public to read all agent partners
CREATE POLICY "Public can read agent partners" ON agent_partners
  FOR SELECT USING (true);

-- Create policy for agents to view their own partner relationships
CREATE POLICY "Agents can view their partner relationships" ON agent_partners
  FOR SELECT USING (auth.uid() = agent_id);

-- Create policy for authenticated users (admin) to manage agent partners
CREATE POLICY "Authenticated users can manage agent partners" ON agent_partners
  FOR ALL USING (auth.role() = 'authenticated');

-- Drop existing trigger if exists
DROP TRIGGER IF EXISTS update_agent_partners_updated_at ON agent_partners;

-- Create trigger for updated_at
CREATE TRIGGER update_agent_partners_updated_at
  BEFORE UPDATE ON agent_partners
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();