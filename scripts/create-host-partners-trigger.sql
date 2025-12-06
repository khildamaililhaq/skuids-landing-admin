-- Create a function to automatically create host-partner entries when a host registers
CREATE OR REPLACE FUNCTION create_host_partners()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert host-partner entries for all existing partners
  INSERT INTO hosts_partners (host_id, partner_id, is_proceeded, is_banned, register_date)
  SELECT NEW.id, p.id, false, false, NOW()
  FROM partners p
  ON CONFLICT (host_id, partner_id) DO NOTHING;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to execute the function when a new host is inserted
DROP TRIGGER IF EXISTS trigger_create_host_partners ON hosts;

CREATE TRIGGER trigger_create_host_partners
AFTER INSERT ON hosts
FOR EACH ROW
EXECUTE FUNCTION create_host_partners();
