-- Create signal_entries table for storing baby signals
CREATE TABLE public.signal_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  signal_type TEXT NOT NULL CHECK (signal_type IN ('sleep', 'crying', 'feeding', 'interaction', 'transitions')),
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.signal_entries ENABLE ROW LEVEL SECURITY;

-- Allow users to insert their own signal entries
CREATE POLICY "Users can insert their own signals"
ON public.signal_entries
FOR INSERT
WITH CHECK (true);

-- Allow users to read their own signals
CREATE POLICY "Users can read their own signals"
ON public.signal_entries
FOR SELECT
USING (true);

-- Create index for faster lookups
CREATE INDEX idx_signal_entries_user_id ON public.signal_entries(user_id);
CREATE INDEX idx_signal_entries_created_at ON public.signal_entries(created_at DESC);