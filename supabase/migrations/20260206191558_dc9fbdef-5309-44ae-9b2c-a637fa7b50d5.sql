
-- Sleep logs table for detailed sleep session tracking
CREATE TABLE public.sleep_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  child_id UUID NOT NULL REFERENCES public.children(id),
  family_id UUID REFERENCES public.families(id),
  log_date DATE NOT NULL DEFAULT CURRENT_DATE,
  time_started TIME,
  time_ended TIME,
  duration_minutes INTEGER,
  sleep_quality TEXT CHECK (sleep_quality IN ('deep', 'light', 'restless')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.sleep_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Caregivers can insert sleep logs for their children"
ON public.sleep_logs FOR INSERT
WITH CHECK (auth.uid() = user_id AND is_child_caregiver(auth.uid(), child_id));

CREATE POLICY "Caregivers can read sleep logs for their children"
ON public.sleep_logs FOR SELECT
USING (is_child_caregiver(auth.uid(), child_id));

CREATE POLICY "Caregivers can delete their own sleep logs"
ON public.sleep_logs FOR DELETE
USING (auth.uid() = user_id AND is_child_caregiver(auth.uid(), child_id));

-- Wake windows table for tracking awake periods
CREATE TABLE public.wake_windows (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  child_id UUID NOT NULL REFERENCES public.children(id),
  family_id UUID REFERENCES public.families(id),
  log_date DATE NOT NULL DEFAULT CURRENT_DATE,
  time_started TIME,
  time_ended TIME,
  duration_minutes INTEGER,
  activity TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.wake_windows ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Caregivers can insert wake windows for their children"
ON public.wake_windows FOR INSERT
WITH CHECK (auth.uid() = user_id AND is_child_caregiver(auth.uid(), child_id));

CREATE POLICY "Caregivers can read wake windows for their children"
ON public.wake_windows FOR SELECT
USING (is_child_caregiver(auth.uid(), child_id));

CREATE POLICY "Caregivers can delete their own wake windows"
ON public.wake_windows FOR DELETE
USING (auth.uid() = user_id AND is_child_caregiver(auth.uid(), child_id));

-- Grant permissions
GRANT ALL ON public.sleep_logs TO authenticated;
GRANT ALL ON public.wake_windows TO authenticated;
