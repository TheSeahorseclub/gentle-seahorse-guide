import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export interface Subscription {
  plan: string;
  exportDaysLimit: number;
}

export function useSubscription() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['subscription', user?.id],
    queryFn: async (): Promise<Subscription> => {
      if (!user) return { plan: 'free', exportDaysLimit: 3 };

      const { data, error } = await supabase
        .from('user_subscriptions')
        .select('plan, export_days_limit')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error || !data) return { plan: 'free', exportDaysLimit: 3 };

      return {
        plan: data.plan,
        exportDaysLimit: data.export_days_limit,
      };
    },
    enabled: !!user,
  });
}
