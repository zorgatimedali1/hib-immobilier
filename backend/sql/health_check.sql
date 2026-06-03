-- Run this SQL in your Supabase Dashboard → SQL Editor
-- This creates a simple health check function for the Keep Alive GitHub Action

CREATE OR REPLACE FUNCTION health_check()
RETURNS integer
LANGUAGE sql
AS $$
  SELECT 1;
$$;
