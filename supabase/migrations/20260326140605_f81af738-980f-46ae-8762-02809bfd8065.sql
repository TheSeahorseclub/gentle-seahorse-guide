
-- 1. Add platform and entitlement_status to user_subscriptions
ALTER TABLE public.user_subscriptions
  ADD COLUMN IF NOT EXISTS platform text NOT NULL DEFAULT 'web',
  ADD COLUMN IF NOT EXISTS entitlement_status text NOT NULL DEFAULT 'none';

-- 2. Populate entitlement_status from existing data
UPDATE public.user_subscriptions
SET entitlement_status = CASE
  WHEN plan = 'premium' AND status = 'active' THEN 'active'
  WHEN trial_active = true THEN 'trial'
  WHEN status = 'cancelled' THEN 'expired'
  ELSE 'none'
END;

-- 3. Update complete_onboarding to set entitlement_status
CREATE OR REPLACE FUNCTION public.complete_onboarding(_user_id uuid, _child_age_months integer)
RETURNS json
LANGUAGE plpgsql SECURITY DEFINER SET search_path = 'public'
AS $$
DECLARE
  _family_id UUID;
  _child_id UUID;
  _is_promo boolean;
BEGIN
  _is_promo := now() < '2026-03-27T23:59:59Z'::timestamptz;

  INSERT INTO public.families (name, owner_user_id) VALUES ('My Family', _user_id) RETURNING id INTO _family_id;
  INSERT INTO public.children (name, age_months, family_id) VALUES ('', _child_age_months, _family_id) RETURNING id INTO _child_id;
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
$$;

-- 4. Update get_admin_metrics to include provider/platform breakdowns
CREATE OR REPLACE FUNCTION public.get_admin_metrics()
RETURNS json
LANGUAGE plpgsql SECURITY DEFINER SET search_path = 'public'
AS $$
DECLARE
  result json;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;
  SELECT json_build_object(
    'total_users', (SELECT count(*) FROM public.profiles),
    'free_users', (SELECT count(*) FROM public.profiles WHERE plan = 'free'),
    'premium_users', (SELECT count(*) FROM public.profiles WHERE plan = 'premium'),
    'trial_users', (SELECT count(*) FROM public.profiles WHERE trial_status = 'active'),
    'cancelled_users', (SELECT count(*) FROM public.user_subscriptions WHERE status = 'cancelled'),
    'active_users', (SELECT count(*) FROM public.profiles WHERE last_login > now() - interval '30 days'),
    'monthly_revenue', (SELECT COALESCE(sum(price), 0) FROM public.user_subscriptions WHERE status = 'active' AND plan != 'free'),
    'recent_signups', (
      SELECT COALESCE(json_agg(row_to_json(p)), '[]'::json)
      FROM (SELECT user_id, full_name, email, plan, created_at FROM public.profiles ORDER BY created_at DESC LIMIT 10) p
    ),
    'recent_subscription_changes', (
      SELECT COALESCE(json_agg(row_to_json(s)), '[]'::json)
      FROM (
        SELECT us.user_id, us.plan, us.status, us.updated_at, us.payment_provider, us.platform,
               us.entitlement_status, p.full_name, p.email
        FROM public.user_subscriptions us
        LEFT JOIN public.profiles p ON p.user_id = us.user_id
        ORDER BY us.updated_at DESC LIMIT 10
      ) s
    ),
    'most_viewed_content', (
      SELECT COALESCE(json_agg(row_to_json(cv)), '[]'::json)
      FROM (
        SELECT content_title, count(*) as view_count
        FROM public.content_views
        WHERE content_title IS NOT NULL
        GROUP BY content_title
        ORDER BY view_count DESC LIMIT 10
      ) cv
    ),
    'signups_by_month', (
      SELECT COALESCE(json_agg(row_to_json(m)), '[]'::json)
      FROM (
        SELECT to_char(date_trunc('month', created_at), 'Mon YYYY') as month,
               count(*) as count
        FROM public.profiles
        WHERE created_at > now() - interval '12 months'
        GROUP BY date_trunc('month', created_at)
        ORDER BY date_trunc('month', created_at) ASC
      ) m
    ),
    'subscriptions_by_plan', (
      SELECT COALESCE(json_agg(row_to_json(sp)), '[]'::json)
      FROM (
        SELECT plan, count(*) as count
        FROM public.profiles
        GROUP BY plan
      ) sp
    ),
    'subscriptions_by_provider', (
      SELECT COALESCE(json_agg(row_to_json(bp)), '[]'::json)
      FROM (
        SELECT COALESCE(payment_provider, 'none') as provider, count(*) as count
        FROM public.user_subscriptions
        GROUP BY payment_provider
      ) bp
    ),
    'subscriptions_by_platform', (
      SELECT COALESCE(json_agg(row_to_json(pl)), '[]'::json)
      FROM (
        SELECT platform, count(*) as count
        FROM public.user_subscriptions
        GROUP BY platform
      ) pl
    ),
    'entitlement_breakdown', (
      SELECT COALESCE(json_agg(row_to_json(eb)), '[]'::json)
      FROM (
        SELECT entitlement_status, count(*) as count
        FROM public.user_subscriptions
        GROUP BY entitlement_status
      ) eb
    )
  ) INTO result;
  RETURN result;
END;
$$;

-- 5. Update get_admin_subscriptions to include new fields
CREATE OR REPLACE FUNCTION public.get_admin_subscriptions()
RETURNS json
LANGUAGE plpgsql SECURITY DEFINER SET search_path = 'public'
AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;
  RETURN (
    SELECT COALESCE(json_agg(row_to_json(s)), '[]'::json)
    FROM (
      SELECT us.id, us.user_id, us.plan, us.status, us.billing_cycle, us.price, us.currency,
             us.started_at, us.renewal_date, us.cancelled_at, us.payment_provider,
             us.platform, us.entitlement_status,
             us.trial_start, us.trial_end, us.trial_active,
             p.full_name, p.email
      FROM public.user_subscriptions us
      LEFT JOIN public.profiles p ON p.user_id = us.user_id
      ORDER BY us.created_at DESC
    ) s
  );
END;
$$;
