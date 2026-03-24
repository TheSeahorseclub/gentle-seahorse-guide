
-- Update handle_new_user to grant premium to signups before 2026-03-27
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, avatar_url, email, plan, subscription_status)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', ''),
    NEW.email,
    CASE WHEN now() < '2026-03-27T23:59:59Z'::timestamptz THEN 'premium' ELSE 'free' END,
    CASE WHEN now() < '2026-03-27T23:59:59Z'::timestamptz THEN 'active' ELSE 'none' END
  );
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user');
  RETURN NEW;
END;
$$;

-- Also update complete_onboarding to create premium subscription for early signups
CREATE OR REPLACE FUNCTION public.complete_onboarding(_user_id uuid, _child_age_months integer)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  _family_id UUID;
  _child_id UUID;
  _is_promo boolean;
BEGIN
  _is_promo := now() < '2026-03-27T23:59:59Z'::timestamptz;

  INSERT INTO public.families (name) VALUES ('My Family') RETURNING id INTO _family_id;
  INSERT INTO public.children (name, age_months, family_id) VALUES ('', _child_age_months, _family_id) RETURNING id INTO _child_id;
  INSERT INTO public.child_caregivers (user_id, child_id, role) VALUES (_user_id, _child_id, 'admin');

  INSERT INTO public.user_subscriptions (user_id, plan, export_days_limit, status)
  VALUES (
    _user_id,
    CASE WHEN _is_promo THEN 'premium' ELSE 'free' END,
    CASE WHEN _is_promo THEN 365 ELSE 3 END,
    'active'
  )
  ON CONFLICT (user_id) DO UPDATE SET
    plan = EXCLUDED.plan,
    export_days_limit = EXCLUDED.export_days_limit;

  RETURN json_build_object('family_id', _family_id, 'child_id', _child_id);
END;
$$;
