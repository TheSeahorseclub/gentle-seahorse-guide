import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export function useAdmin() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['admin-role', user?.id],
    queryFn: async () => {
      if (!user) return false;
      const { data, error } = await supabase.rpc('has_role', {
        _user_id: user.id,
        _role: 'admin',
      } as any);

      if (error) {
        console.error('Failed to verify admin role', error);
        return false;
      }

      return Boolean(data);
    },
    enabled: !!user,
    retry: false,
  });
}
