
-- System-wide role enum (separate from caregiver_role)
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- User roles table (per security best practices, roles stored separately)
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles without recursion
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

-- Expand profiles table
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS email text,
  ADD COLUMN IF NOT EXISTS last_login timestamptz,
  ADD COLUMN IF NOT EXISTS country text,
  ADD COLUMN IF NOT EXISTS child_age_group text,
  ADD COLUMN IF NOT EXISTS plan text NOT NULL DEFAULT 'free',
  ADD COLUMN IF NOT EXISTS subscription_status text NOT NULL DEFAULT 'none',
  ADD COLUMN IF NOT EXISTS trial_status text DEFAULT 'none';

-- Backfill emails from auth.users
UPDATE public.profiles p SET email = u.email FROM auth.users u WHERE p.user_id = u.id AND p.email IS NULL;

-- Backfill default roles for existing users
INSERT INTO public.user_roles (user_id, role)
SELECT p.user_id, 'user'::app_role FROM public.profiles p
ON CONFLICT DO NOTHING;

-- Expand user_subscriptions for IAP readiness
ALTER TABLE public.user_subscriptions
  ADD COLUMN IF NOT EXISTS billing_cycle text DEFAULT 'monthly',
  ADD COLUMN IF NOT EXISTS price numeric(10,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS currency text DEFAULT 'GBP',
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'active',
  ADD COLUMN IF NOT EXISTS started_at timestamptz DEFAULT now(),
  ADD COLUMN IF NOT EXISTS renewal_date timestamptz,
  ADD COLUMN IF NOT EXISTS cancelled_at timestamptz,
  ADD COLUMN IF NOT EXISTS payment_provider text,
  ADD COLUMN IF NOT EXISTS trial_start timestamptz,
  ADD COLUMN IF NOT EXISTS trial_end timestamptz,
  ADD COLUMN IF NOT EXISTS trial_active boolean DEFAULT false;

-- App content table for content management
CREATE TABLE public.app_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text,
  age_group text,
  description text,
  content_type text NOT NULL DEFAULT 'article',
  access_level text NOT NULL DEFAULT 'free',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.app_content ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_app_content_updated_at BEFORE UPDATE ON public.app_content
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Content views for analytics tracking
CREATE TABLE public.content_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  content_id uuid REFERENCES public.app_content(id) ON DELETE CASCADE,
  content_title text,
  viewed_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.content_views ENABLE ROW LEVEL SECURITY;

-- Update handle_new_user to populate email and assign default role
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $function$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, avatar_url, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', ''),
    NEW.email
  );
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user');
  RETURN NEW;
END;
$function$;

-- Admin metrics RPC (security definer, admin-only)
CREATE OR REPLACE FUNCTION public.get_admin_metrics()
RETURNS json LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
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
    'monthly_revenue', (SELECT COALESCE(sum(price), 0) FROM public.user_subscriptions WHERE status = 'active' AND plan != 'free'),
    'recent_signups', (
      SELECT COALESCE(json_agg(row_to_json(p)), '[]'::json)
      FROM (SELECT user_id, full_name, email, plan, created_at FROM public.profiles ORDER BY created_at DESC LIMIT 10) p
    )
  ) INTO result;
  RETURN result;
END;
$function$;

-- Admin users list RPC
CREATE OR REPLACE FUNCTION public.get_admin_users()
RETURNS json LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $function$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;
  RETURN (
    SELECT COALESCE(json_agg(row_to_json(u)), '[]'::json)
    FROM (
      SELECT p.user_id, p.full_name, p.email, p.plan, p.subscription_status,
             p.trial_status, p.last_login, p.created_at, p.country, p.child_age_group
      FROM public.profiles p
      ORDER BY p.created_at DESC
    ) u
  );
END;
$function$;

-- Admin subscriptions list RPC
CREATE OR REPLACE FUNCTION public.get_admin_subscriptions()
RETURNS json LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $function$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;
  RETURN (
    SELECT COALESCE(json_agg(row_to_json(s)), '[]'::json)
    FROM (
      SELECT us.id, us.user_id, us.plan, us.status, us.billing_cycle, us.price, us.currency,
             us.started_at, us.renewal_date, us.cancelled_at, us.payment_provider,
             us.trial_start, us.trial_end, us.trial_active,
             p.full_name, p.email
      FROM public.user_subscriptions us
      LEFT JOIN public.profiles p ON p.user_id = us.user_id
      ORDER BY us.created_at DESC
    ) s
  );
END;
$function$;

-- RLS: user_roles
CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all roles" ON public.user_roles
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- RLS: app_content
CREATE POLICY "Anyone can view free content" ON public.app_content
  FOR SELECT TO authenticated USING (access_level = 'free');
CREATE POLICY "Premium users can view premium content" ON public.app_content
  FOR SELECT TO authenticated
  USING (access_level = 'premium' AND EXISTS (
    SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND plan = 'premium'
  ));
CREATE POLICY "Admins can manage all content" ON public.app_content
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- RLS: content_views
CREATE POLICY "Users can insert own views" ON public.content_views
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view own history" ON public.content_views
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all analytics" ON public.content_views
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Admin can view/update all profiles
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update all profiles" ON public.profiles
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Admin can view/update all subscriptions
CREATE POLICY "Admins can view all subscriptions" ON public.user_subscriptions
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update all subscriptions" ON public.user_subscriptions
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
