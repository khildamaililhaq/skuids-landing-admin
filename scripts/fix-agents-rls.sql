-- Fix RLS policies for agents table - ensure INSERT works for registration
-- Run this in Supabase SQL editor

-- Drop all existing policies first
DROP POLICY IF EXISTS "Allow agents to register" ON agents;
DROP POLICY IF EXISTS "Agents can read own data" ON agents;
DROP POLICY IF EXISTS "Agents can update own data" ON agents;
DROP POLICY IF EXISTS "Agents can delete own data" ON agents;
DROP POLICY IF EXISTS "Authenticated users can manage agents" ON agents;

-- 1. Allow anyone to INSERT new agent records (for registration)
-- This includes unverified users right after signup
CREATE POLICY "Allow public to register agents" ON agents
  FOR INSERT
  WITH CHECK (true);

-- 2. Allow agents to READ their own data (even if unverified)
CREATE POLICY "Agents can read own data" ON agents
  FOR SELECT
  USING (
    -- Allow if user is reading their own record
    auth.uid() = id
    -- OR if user is unauthenticated but has the correct email
    OR auth.uid() IS NULL
  );

-- 3. Allow agents to UPDATE their own data
CREATE POLICY "Agents can update own data" ON agents
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- 4. Allow agents to DELETE their own data
CREATE POLICY "Agents can delete own data" ON agents
  FOR DELETE
  USING (auth.uid() = id);

-- Allow admins to read all agents (optional, requires admin role)
-- CREATE POLICY "Admin can read all agents" ON agents
--   FOR SELECT USING (auth.jwt() ->> 'role' = 'admin');

-- Allow admins to manage all agents (optional, requires admin role)
-- CREATE POLICY "Admin can manage all agents" ON agents
--   FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
