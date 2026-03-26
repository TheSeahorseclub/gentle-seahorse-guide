
-- 1. Create family_role enum
CREATE TYPE public.family_role AS ENUM ('owner', 'caregiver', 'viewer');

-- 2. Add owner_user_id to families
ALTER TABLE public.families ADD COLUMN owner_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;

-- 3. Create family_members table
CREATE TABLE public.family_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id uuid NOT NULL REFERENCES public.families(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role family_role NOT NULL DEFAULT 'caregiver',
  invited_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (family_id, user_id)
);

-- 4. Enable RLS
ALTER TABLE public.family_members ENABLE ROW LEVEL SECURITY;

-- 5. Migrate existing child_caregivers data to family_members
INSERT INTO public.family_members (family_id, user_id, role, invited_by, created_at)
SELECT DISTINCT c.family_id, cc.user_id,
  CASE WHEN cc.role = 'admin' THEN 'owner'::family_role ELSE 'caregiver'::family_role END,
  cc.invited_by, cc.created_at
FROM public.child_caregivers cc
JOIN public.children c ON c.id = cc.child_id
WHERE c.family_id IS NOT NULL
ON CONFLICT (family_id, user_id) DO NOTHING;

-- 6. Set owner_user_id on families from migrated data
UPDATE public.families f SET owner_user_id = fm.user_id
FROM public.family_members fm
WHERE fm.family_id = f.id AND fm.role = 'owner';

-- 7. New helper: check if user is member of a family (replaces old is_family_member)
CREATE OR REPLACE FUNCTION public.is_family_member(_user_id uuid, _family_id uuid)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.family_members
    WHERE user_id = _user_id AND family_id = _family_id
  );
$$;

-- 8. New helper: check if user is family owner
CREATE OR REPLACE FUNCTION public.is_family_owner(_user_id uuid, _family_id uuid)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.family_members
    WHERE user_id = _user_id AND family_id = _family_id AND role = 'owner'
  );
$$;

-- 9. New helper: check family role
CREATE OR REPLACE FUNCTION public.has_family_role(_user_id uuid, _family_id uuid, _role family_role)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.family_members
    WHERE user_id = _user_id AND family_id = _family_id AND role = _role
  );
$$;

-- 10. Replace is_child_caregiver to use family_members
CREATE OR REPLACE FUNCTION public.is_child_caregiver(_user_id uuid, _child_id uuid)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.family_members fm
    JOIN public.children c ON c.family_id = fm.family_id
    WHERE fm.user_id = _user_id AND c.id = _child_id
  );
$$;

-- 11. Replace is_family_admin to use family_members
CREATE OR REPLACE FUNCTION public.is_family_admin(_user_id uuid, _family_id uuid)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.family_members
    WHERE user_id = _user_id AND family_id = _family_id AND role = 'owner'
  );
$$;

-- 12. Replace has_child_role to use family_members
CREATE OR REPLACE FUNCTION public.has_child_role(_user_id uuid, _child_id uuid, _role caregiver_role)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.family_members fm
    JOIN public.children c ON c.family_id = fm.family_id
    WHERE fm.user_id = _user_id AND c.id = _child_id
      AND (
        (_role = 'admin' AND fm.role = 'owner') OR
        (_role = 'caregiver' AND fm.role IN ('owner', 'caregiver'))
      )
  );
$$;

-- 13. Validate max family members (owner + 2 caregivers = 3 total)
CREATE OR REPLACE FUNCTION public.validate_max_family_members()
RETURNS trigger
LANGUAGE plpgsql SET search_path = 'public'
AS $$
DECLARE
  member_count integer;
BEGIN
  SELECT count(*) INTO member_count
  FROM public.family_members
  WHERE family_id = NEW.family_id;

  IF member_count >= 3 THEN
    RAISE EXCEPTION 'Maximum of 3 members per family reached';
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER enforce_max_family_members
BEFORE INSERT ON public.family_members
FOR EACH ROW EXECUTE FUNCTION public.validate_max_family_members();

-- 14. RLS policies for family_members
CREATE POLICY "Family members can view their family members"
ON public.family_members FOR SELECT TO authenticated
USING (is_family_member(auth.uid(), family_id));

CREATE POLICY "Family owners can insert members"
ON public.family_members FOR INSERT TO authenticated
WITH CHECK (
  (auth.uid() = user_id) OR is_family_owner(auth.uid(), family_id)
);

CREATE POLICY "Family owners can remove members"
ON public.family_members FOR DELETE TO authenticated
USING (is_family_owner(auth.uid(), family_id));

CREATE POLICY "Admins can manage all family members"
ON public.family_members FOR ALL TO authenticated
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- 15. Update families RLS to use new functions
DROP POLICY IF EXISTS "Family members can view their family" ON public.families;
DROP POLICY IF EXISTS "Family admins can update family" ON public.families;

CREATE POLICY "Family members can view their family"
ON public.families FOR SELECT TO authenticated
USING (is_family_member(auth.uid(), id));

CREATE POLICY "Family owners can update family"
ON public.families FOR UPDATE TO authenticated
USING (is_family_owner(auth.uid(), id));

-- 16. Update complete_onboarding to use family_members
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
  
  -- Insert into family_members as owner
  INSERT INTO public.family_members (family_id, user_id, role) VALUES (_family_id, _user_id, 'owner');
  
  -- Keep child_caregivers for backward compatibility
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
