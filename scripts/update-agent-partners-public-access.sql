-- Apply public read access to agent_partners table
-- This script updates RLS policies to allow public read access

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
