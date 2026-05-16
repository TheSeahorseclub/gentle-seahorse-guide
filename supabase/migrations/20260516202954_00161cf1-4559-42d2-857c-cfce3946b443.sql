ALTER TABLE public.app_content
  ADD COLUMN IF NOT EXISTS age_stage text,
  ADD COLUMN IF NOT EXISTS section text,
  ADD COLUMN IF NOT EXISTS body text,
  ADD COLUMN IF NOT EXISTS image_url text,
  ADD COLUMN IF NOT EXISTS week_recommended integer[],
  ADD COLUMN IF NOT EXISTS is_published boolean NOT NULL DEFAULT true;

CREATE INDEX IF NOT EXISTS idx_app_content_stage_section ON public.app_content (age_stage, section);
CREATE INDEX IF NOT EXISTS idx_app_content_published ON public.app_content (is_published);
CREATE INDEX IF NOT EXISTS idx_app_content_week_recommended ON public.app_content USING GIN (week_recommended);

-- Best-effort backfill of age_stage from age_group
UPDATE public.app_content SET age_stage = CASE
  WHEN age_group ILIKE '%pregnan%' THEN 'pregnancy'
  WHEN age_group ~* '(0-1|newborn)' THEN 'newborn'
  WHEN age_group ~* '1-3' THEN '1-3m'
  WHEN age_group ~* '3-6' THEN '3-6m'
  WHEN age_group ~* '6-9' THEN '6-9m'
  WHEN age_group ~* '9-12' THEN '9-12m'
  WHEN age_group ~* '12-18' THEN '12-18m'
  WHEN age_group ~* '18-24' THEN '18-24m'
  WHEN age_group ~* '(2-3|24-36)' THEN '2-3y'
  ELSE age_stage
END
WHERE age_stage IS NULL;

-- Update RLS for unpublished content (admins can still manage all)
DROP POLICY IF EXISTS "Anyone can view free content" ON public.app_content;
CREATE POLICY "Anyone can view free content"
ON public.app_content FOR SELECT TO authenticated
USING (access_level = 'free' AND is_published = true);

DROP POLICY IF EXISTS "Premium users can view premium content" ON public.app_content;
CREATE POLICY "Premium users can view premium content"
ON public.app_content FOR SELECT TO authenticated
USING (
  access_level = 'premium' AND is_published = true AND EXISTS (
    SELECT 1 FROM public.profiles WHERE profiles.user_id = auth.uid() AND profiles.plan = 'premium'
  )
);