-- Create a SECURITY DEFINER function for onboarding
-- This bypasses PostgREST permission caching issues
CREATE OR REPLACE FUNCTION public.complete_onboarding(
  _user_id UUID,
  _child_age_months INTEGER
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _family_id UUID;
  _child_id UUID;
BEGIN
  -- 1. Create family
  INSERT INTO public.families (name)
  VALUES ('My Family')
  RETURNING id INTO _family_id;

  -- 2. Create child
  INSERT INTO public.children (name, age_months, family_id)
  VALUES ('', _child_age_months, _family_id)
  RETURNING id INTO _child_id;

  -- 3. Link caregiver as admin
  INSERT INTO public.child_caregivers (user_id, child_id, role)
  VALUES (_user_id, _child_id, 'admin');

  -- 4. Create free subscription (ignore if already exists)
  INSERT INTO public.user_subscriptions (user_id)
  VALUES (_user_id)
  ON CONFLICT (user_id) DO NOTHING;

  RETURN json_build_object(
    'family_id', _family_id,
    'child_id', _child_id
  );
END;
$$;