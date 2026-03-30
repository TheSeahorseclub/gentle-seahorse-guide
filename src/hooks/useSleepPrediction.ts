import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useCurrentChild } from './useCurrentChild';
import { useAuth } from '@/contexts/AuthContext';

export interface SleepPrediction {
  idealWakeWindow: string;
  predictedNextWake: string | null;
  napRecommendation: string;
  sleepRegression: string;
  averageTotalSleep: string;
  trend: string;
  insights: string[];
  tips: string[];
}

export function useSleepPrediction() {
  const { user } = useAuth();
  const { data: child } = useCurrentChild();

  return useQuery({
    queryKey: ['sleep-prediction', child?.id],
    queryFn: async (): Promise<SleepPrediction> => {
      const { data, error } = await supabase.functions.invoke('sleep-analysis', {
        body: { child_id: child!.id, age_months: child!.ageMonths },
      });
      if (error) throw error;
      return data as SleepPrediction;
    },
    enabled: !!user && !!child,
    staleTime: 1000 * 60 * 30, // cache 30 min
    retry: 1,
  });
}
