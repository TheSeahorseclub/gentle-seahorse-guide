-- Grant table privileges to anon and authenticated roles
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.families TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.children TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.child_caregivers TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.signal_entries TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.daily_insights TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.profiles TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.user_subscriptions TO anon, authenticated;
GRANT SELECT ON TABLE public.content_videos TO anon, authenticated;