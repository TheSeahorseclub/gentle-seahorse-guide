
-- Create profiles table (auto-created on signup)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();

-- Children table
CREATE TABLE public.children (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL DEFAULT '',
  age_months INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.children ENABLE ROW LEVEL SECURITY;

-- Caregiver role enum
CREATE TYPE public.caregiver_role AS ENUM ('admin', 'caregiver');

-- Child-caregiver junction table (roles stored here, NOT on profiles)
CREATE TABLE public.child_caregivers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID REFERENCES public.children(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role caregiver_role NOT NULL DEFAULT 'caregiver',
  invited_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(child_id, user_id)
);

ALTER TABLE public.child_caregivers ENABLE ROW LEVEL SECURITY;

-- Security definer function to check caregiver role (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_child_role(_user_id UUID, _child_id UUID, _role caregiver_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.child_caregivers
    WHERE user_id = _user_id
      AND child_id = _child_id
      AND role = _role
  );
$$;

-- Function to check if user is any caregiver for a child
CREATE OR REPLACE FUNCTION public.is_child_caregiver(_user_id UUID, _child_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.child_caregivers
    WHERE user_id = _user_id
      AND child_id = _child_id
  );
$$;

-- RLS for children
CREATE POLICY "Users can view their linked children"
ON public.children FOR SELECT
TO authenticated
USING (public.is_child_caregiver(auth.uid(), id));

CREATE POLICY "Admins can update their children"
ON public.children FOR UPDATE
TO authenticated
USING (public.has_child_role(auth.uid(), id, 'admin'));

CREATE POLICY "Authenticated users can create children"
ON public.children FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Admins can delete their children"
ON public.children FOR DELETE
TO authenticated
USING (public.has_child_role(auth.uid(), id, 'admin'));

-- RLS for child_caregivers
CREATE POLICY "Users can view caregivers of their children"
ON public.child_caregivers FOR SELECT
TO authenticated
USING (public.is_child_caregiver(auth.uid(), child_id));

CREATE POLICY "Self or admin can add caregivers"
ON public.child_caregivers FOR INSERT
TO authenticated
WITH CHECK (
  (auth.uid() = user_id)
  OR
  public.has_child_role(auth.uid(), child_id, 'admin')
);

CREATE POLICY "Admins can remove caregivers"
ON public.child_caregivers FOR DELETE
TO authenticated
USING (public.has_child_role(auth.uid(), child_id, 'admin'));

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_children_updated_at
BEFORE UPDATE ON public.children
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
