
-- =============================================
-- Data Integrity & Family Architecture Migration
-- =============================================

-- 1. Clean legacy data (stored with random localStorage IDs, not auth)
DELETE FROM public.signal_entries;
DELETE FROM public.daily_insights;

-- 2. Create families table
CREATE TABLE public.families (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL DEFAULT 'My Family',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.families ENABLE ROW LEVEL SECURITY;

-- 3. Add family_id to children
ALTER TABLE public.children 
  ADD COLUMN family_id UUID REFERENCES public.families(id) ON DELETE CASCADE;

-- 4. Migrate signal_entries: user_id TEXT → UUID, add child_id + family_id
ALTER TABLE public.signal_entries 
  ALTER COLUMN user_id SET DATA TYPE UUID USING user_id::uuid;
ALTER TABLE public.signal_entries 
  ADD COLUMN child_id UUID NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  ADD COLUMN family_id UUID REFERENCES public.families(id) ON DELETE CASCADE;

-- 5. Migrate daily_insights: user_id TEXT → UUID, add child_id + family_id
ALTER TABLE public.daily_insights
  DROP CONSTRAINT IF EXISTS daily_insights_user_id_insight_date_key;
ALTER TABLE public.daily_insights
  ALTER COLUMN user_id SET DATA TYPE UUID USING user_id::uuid;
ALTER TABLE public.daily_insights
  ADD COLUMN child_id UUID NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  ADD COLUMN family_id UUID REFERENCES public.families(id) ON DELETE CASCADE;
-- Unique constraint now includes child_id
ALTER TABLE public.daily_insights 
  ADD CONSTRAINT daily_insights_user_child_date_key UNIQUE (user_id, child_id, insight_date);

-- 6. Create user_subscriptions table (Stripe-ready)
CREATE TABLE public.user_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  plan TEXT NOT NULL DEFAULT 'free',
  export_days_limit INTEGER NOT NULL DEFAULT 30,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;

-- 7. Helper functions for family-level access
CREATE OR REPLACE FUNCTION public.is_family_member(_user_id UUID, _family_id UUID)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.child_caregivers cc
    JOIN public.children c ON c.id = cc.child_id
    WHERE cc.user_id = _user_id AND c.family_id = _family_id
  );
$$;

CREATE OR REPLACE FUNCTION public.is_family_admin(_user_id UUID, _family_id UUID)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.child_caregivers cc
    JOIN public.children c ON c.id = cc.child_id
    WHERE cc.user_id = _user_id AND c.family_id = _family_id AND cc.role = 'admin'
  );
$$;

-- 8. RLS: Families
CREATE POLICY "Family members can view their family"
  ON public.families FOR SELECT
  USING (public.is_family_member(auth.uid(), id));

CREATE POLICY "Authenticated users can create families"
  ON public.families FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Family admins can update family"
  ON public.families FOR UPDATE
  USING (public.is_family_admin(auth.uid(), id));

-- 9. RLS: signal_entries (replace old open policies)
DROP POLICY IF EXISTS "Users can insert their own signals" ON public.signal_entries;
DROP POLICY IF EXISTS "Users can read their own signals" ON public.signal_entries;

CREATE POLICY "Caregivers can insert signals for their children"
  ON public.signal_entries FOR INSERT
  WITH CHECK (auth.uid() = user_id AND public.is_child_caregiver(auth.uid(), child_id));

CREATE POLICY "Caregivers can read signals for their children"
  ON public.signal_entries FOR SELECT
  USING (public.is_child_caregiver(auth.uid(), child_id));

-- 10. RLS: daily_insights (replace old open policies)
DROP POLICY IF EXISTS "Users can insert their own insights" ON public.daily_insights;
DROP POLICY IF EXISTS "Users can read their own insights" ON public.daily_insights;

CREATE POLICY "Caregivers can insert insights for their children"
  ON public.daily_insights FOR INSERT
  WITH CHECK (auth.uid() = user_id AND public.is_child_caregiver(auth.uid(), child_id));

CREATE POLICY "Caregivers can read insights for their children"
  ON public.daily_insights FOR SELECT
  USING (public.is_child_caregiver(auth.uid(), child_id));

-- 11. RLS: user_subscriptions
CREATE POLICY "Users can view their own subscription"
  ON public.user_subscriptions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own subscription"
  ON public.user_subscriptions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscription"
  ON public.user_subscriptions FOR UPDATE
  USING (auth.uid() = user_id);

-- 12. Trigger for updated_at on user_subscriptions
CREATE TRIGGER update_user_subscriptions_updated_at
  BEFORE UPDATE ON public.user_subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
