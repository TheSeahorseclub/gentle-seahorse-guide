import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { useCurrentChild } from '@/hooks/useCurrentChild';
import { supabase } from '@/integrations/supabase/client';
import { subDays, format } from 'date-fns';

export interface SleepLogRow {
  id: string;
  log_date: string;
  time_started: string | null;
  time_ended: string | null;
  duration_minutes: number | null;
  sleep_quality: string | null;
}

export interface WakeWindowRow {
  id: string;
  log_date: string;
  time_started: string | null;
  time_ended: string | null;
  duration_minutes: number | null;
  activity: string | null;
}

export function useSleepHistory(days = 14) {
  const { user } = useAuth();
  const { data: child } = useCurrentChild();

  const since = format(subDays(new Date(), days), 'yyyy-MM-dd');

  const sleepQuery = useQuery({
    queryKey: ['sleep-logs', child?.id, days],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sleep_logs')
        .select('id, log_date, time_started, time_ended, duration_minutes, sleep_quality')
        .eq('child_id', child!.id)
        .gte('log_date', since)
        .order('log_date', { ascending: false })
        .order('time_started', { ascending: true });
      if (error) throw error;
      return (data ?? []) as SleepLogRow[];
    },
    enabled: !!user && !!child,
  });

  const wakeQuery = useQuery({
    queryKey: ['wake-windows', child?.id, days],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('wake_windows')
        .select('id, log_date, time_started, time_ended, duration_minutes, activity')
        .eq('child_id', child!.id)
        .gte('log_date', since)
        .order('log_date', { ascending: false })
        .order('time_started', { ascending: true });
      if (error) throw error;
      return (data ?? []) as WakeWindowRow[];
    },
    enabled: !!user && !!child,
  });

  return {
    sleepLogs: sleepQuery.data ?? [],
    wakeLogs: wakeQuery.data ?? [],
    isLoading: sleepQuery.isLoading || wakeQuery.isLoading,
  };
}
