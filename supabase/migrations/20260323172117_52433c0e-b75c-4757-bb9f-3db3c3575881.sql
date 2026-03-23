
-- Validation trigger: max 3 caregivers per child
CREATE OR REPLACE FUNCTION public.validate_max_caregivers()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
DECLARE
  caregiver_count integer;
BEGIN
  SELECT count(*) INTO caregiver_count
  FROM public.child_caregivers
  WHERE child_id = NEW.child_id;

  IF caregiver_count >= 3 THEN
    RAISE EXCEPTION 'Maximum of 3 caregivers per child reached';
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER enforce_max_caregivers
  BEFORE INSERT ON public.child_caregivers
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_max_caregivers();
