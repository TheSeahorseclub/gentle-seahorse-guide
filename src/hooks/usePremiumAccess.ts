import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export function usePremiumAccess() {
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ['entitlement', user?.id],
    queryFn: async () => {
      if (!user) return { plan: 'free', entitlement: 'none' };

      const { data: sub } = await supabase
        .from('user_subscriptions')
        .select('plan, entitlement_status, platform, payment_provider')
        .eq('user_id', user.id)
        .maybeSingle();

      return {
        plan: (sub as any)?.plan ?? 'free',
        entitlement: (sub as any)?.entitlement_status ?? 'none',
        platform: (sub as any)?.platform ?? 'web',
        provider: (sub as any)?.payment_provider ?? null,
      };
    },
    enabled: !!user,
  });

  const entitlement = data?.entitlement ?? 'none';

  return {
    plan: data?.plan ?? 'free',
    entitlement,
    platform: data?.platform ?? 'web',
    provider: data?.provider ?? null,
    isPremium: entitlement === 'active' || entitlement === 'trial',
    isFree: entitlement !== 'active' && entitlement !== 'trial',
    isLoading,
  };
}
