CREATE OR REPLACE FUNCTION public.complete_onboarding(_user_id uuid, _child_age_months integer, _child_name text DEFAULT ''::text)
 RETURNS json
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  _family_id UUID;
  _child_id UUID;
  _is_promo boolean;
BEGIN
  _is_promo := now() < '2026-03-27T23:59:59Z'::timestamptz;

  INSERT INTO public.families (name, owner_user_id) VALUES ('My Family', _user_id) RETURNING id INTO _family_id;
  INSERT INTO public.children (name, age_months, family_id) VALUES (COALESCE(NULLIF(trim(_child_name), ''), ''), _child_age_months, _family_id) RETURNING id INTO _child_id;
  INSERT INTO public.family_members (family_id, user_id, role) VALUES (_family_id, _user_id, 'owner');
  INSERT INTO public.child_caregivers (user_id, child_id, role) VALUES (_user_id, _child_id, 'admin');

  INSERT INTO public.user_subscriptions (user_id, plan, export_days_limit, status, platform, entitlement_status)
  VALUES (
    _user_id,
    CASE WHEN _is_promo THEN 'premium' ELSE 'free' END,
    CASE WHEN _is_promo THEN 365 ELSE 3 END,
    'active',
    'web',
    CASE WHEN _is_promo THEN 'active' ELSE 'none' END
  )
  ON CONFLICT (user_id) DO UPDATE SET
    plan = EXCLUDED.plan,
    export_days_limit = EXCLUDED.export_days_limit,
    entitlement_status = EXCLUDED.entitlement_status;

  RETURN json_build_object('family_id', _family_id, 'child_id', _child_id);
END;
$function$;