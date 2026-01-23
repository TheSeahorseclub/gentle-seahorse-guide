-- Create daily_insights table
CREATE TABLE public.daily_insights (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  insight_text TEXT NOT NULL,
  support_sugg TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  insight_date DATE NOT NULL DEFAULT CURRENT_DATE
);

-- Create unique constraint to prevent duplicates per user per day
CREATE UNIQUE INDEX idx_daily_insights_user_date ON public.daily_insights (user_id, insight_date);

-- Enable RLS
ALTER TABLE public.daily_insights ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can read their own insights"
ON public.daily_insights
FOR SELECT
USING (true);

CREATE POLICY "Users can insert their own insights"
ON public.daily_insights
FOR INSERT
WITH CHECK (true);