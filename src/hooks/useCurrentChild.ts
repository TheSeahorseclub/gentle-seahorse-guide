import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export interface CurrentChild {
  id: string;
  name: string;
  ageMonths: number;
  familyId: string | null;
  role: 'admin' | 'caregiver';
}

export function useCurrentChild() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['current-child', user?.id],
    queryFn: async (): Promise<CurrentChild | null> => {
      if (!user) return null;

      const { data, error } = await supabase
        .from('child_caregivers')
        .select('role, children(id, name, age_months, family_id)')
        .eq('user_id', user.id)
        .limit(1)
        .maybeSingle();

      if (error || !data?.children) return null;

      const child = data.children as unknown as {
        id: string;
        name: string;
        age_months: number;
        family_id: string | null;
      };

      return {
        id: child.id,
        name: child.name,
        ageMonths: child.age_months,
        familyId: child.family_id,
        role: data.role as 'admin' | 'caregiver',
      };
    },
    enabled: !!user,
  });
}
