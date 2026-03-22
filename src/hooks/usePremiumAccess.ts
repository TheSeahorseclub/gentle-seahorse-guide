import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export function usePremiumAccess() {
  const { user } = useAuth();

  const { data: plan = 'free', isLoading } = useQuery({
    queryKey: ['user-plan', user?.id],
    queryFn: async () => {
      if (!user) return 'free';
      const { data } = await supabase
        .from('profiles')
        .select('plan')
        .eq('user_id', user.id)
        .single();
      return (data as any)?.plan ?? 'free';
    },
    enabled: !!user,
  });

  return {
    plan,
    isPremium: plan === 'premium',
    isFree: plan === 'free',
    isLoading,
  };
}
