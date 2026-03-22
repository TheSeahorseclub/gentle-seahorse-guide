
CREATE OR REPLACE FUNCTION public.get_admin_metrics()
 RETURNS json
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
        SELECT us.user_id, us.plan, us.status, us.updated_at, p.full_name, p.email
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
    )
  ) INTO result;
  RETURN result;
END;
$function$;
