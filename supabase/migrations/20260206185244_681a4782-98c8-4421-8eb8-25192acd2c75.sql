-- Force PostgREST schema reload by commenting a table
COMMENT ON TABLE public.families IS 'Family unit grouping';

-- Re-grant permissions to be safe  
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;