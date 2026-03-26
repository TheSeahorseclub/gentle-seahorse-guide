import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export interface CurrentChild {
  id: string;
  name: string;
  ageMonths: number;
  familyId: string | null;
  familyRole: 'owner' | 'caregiver' | 'viewer';
}

export function useCurrentChild() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['current-child', user?.id],
    queryFn: async (): Promise<CurrentChild | null> => {
      if (!user) return null;

      // Get family membership first
      const { data: membership, error: memError } = await supabase
        .from('family_members')
        .select('family_id, role')
        .eq('user_id', user.id)
        .limit(1)
        .maybeSingle();

      if (memError || !membership) return null;

      // Get first child in this family
      const { data: child, error: childError } = await supabase
        .from('children')
        .select('id, name, age_months, family_id')
        .eq('family_id', membership.family_id)
        .limit(1)
        .maybeSingle();

      if (childError || !child) return null;

      return {
        id: child.id,
        name: child.name,
        ageMonths: child.age_months,
        familyId: child.family_id,
        familyRole: membership.role as 'owner' | 'caregiver' | 'viewer',
      };
    },
    enabled: !!user,
  });
}
