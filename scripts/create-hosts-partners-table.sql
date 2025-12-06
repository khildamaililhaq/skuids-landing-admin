-- Create hosts_partners junction table for Skuids
CREATE TABLE IF NOT EXISTS hosts_partners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  host_id UUID NOT NULL REFERENCES hosts(id) ON DELETE CASCADE,
  partner_id UUID NOT NULL REFERENCES partners(id) ON DELETE CASCADE,
  is_proceeded BOOLEAN DEFAULT false,
  is_banned BOOLEAN DEFAULT false,
  register_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(host_id, partner_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_hosts_partners_host_id ON hosts_partners(host_id);
CREATE INDEX IF NOT EXISTS idx_hosts_partners_partner_id ON hosts_partners(partner_id);
CREATE INDEX IF NOT EXISTS idx_hosts_partners_is_proceeded ON hosts_partners(is_proceeded);
CREATE INDEX IF NOT EXISTS idx_hosts_partners_is_banned ON hosts_partners(is_banned);

-- Enable RLS (Row Level Security)
ALTER TABLE hosts_partners ENABLE ROW LEVEL SECURITY;

-- Allow public to read
CREATE POLICY "Public can read hosts_partners"
  ON hosts_partners
  FOR SELECT
  USING (true);

-- Allow hosts to read their own partnerships
CREATE POLICY "Hosts can read their partnerships"
  ON hosts_partners
  FOR SELECT
  USING (auth.uid()::text = host_id::text);

-- Allow authenticated users (admin) to manage
CREATE POLICY "Admins can manage hosts_partners"
  ON hosts_partners
  FOR ALL
  USING (auth.role() = 'authenticated');

-- Drop existing trigger if exists
DROP TRIGGER IF EXISTS update_hosts_partners_updated_at ON hosts_partners;

-- Create trigger for updated_at
CREATE TRIGGER update_hosts_partners_updated_at
  BEFORE UPDATE ON hosts_partners
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
