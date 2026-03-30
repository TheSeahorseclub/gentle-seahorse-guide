import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useCurrentChild } from './useCurrentChild';
import { useAuth } from '@/contexts/AuthContext';
import { subDays, format } from 'date-fns';

export interface AgendaEntry {
  date: string;
  type: 'signal' | 'sleep' | 'wake' | 'insight';
  label: string;
  detail: string;
  caregiverName: string | null;
}

export function useParentAgenda(days = 30) {
  const { user } = useAuth();
  const { data: child } = useCurrentChild();
  const since = format(subDays(new Date(), days), 'yyyy-MM-dd');

  return useQuery({
    queryKey: ['parent-agenda', child?.id, days],
    queryFn: async (): Promise<AgendaEntry[]> => {
      if (!child) return [];

      // Fetch all caregivers for the child's family to map user_ids to names
      const { data: members } = await supabase
        .from('family_members')
        .select('user_id, role')
        .eq('family_id', child.familyId!);

      const memberIds = (members ?? []).map(m => m.user_id);

      const { data: profiles } = await supabase
        .from('profiles')
        .select('user_id, full_name, email')
        .in('user_id', memberIds.length > 0 ? memberIds : ['none']);

      const nameMap = new Map<string, string>();
      (profiles ?? []).forEach(p => {
        nameMap.set(p.user_id, p.full_name || p.email || 'Unknown');
      });

      const entries: AgendaEntry[] = [];

      // Signal entries
      const { data: signals } = await supabase
        .from('signal_entries')
        .select('created_at, signal_type, description, user_id')
        .eq('child_id', child.id)
        .gte('created_at', new Date(since).toISOString())
        .order('created_at', { ascending: false });

      (signals ?? []).forEach(s => {
        entries.push({
          date: s.created_at,
          type: 'signal',
          label: s.signal_type,
          detail: s.description,
          caregiverName: nameMap.get(s.user_id) ?? null,
        });
      });

      // Sleep logs
      const { data: sleeps } = await supabase
        .from('sleep_logs')
        .select('created_at, log_date, duration_minutes, sleep_quality, user_id')
        .eq('child_id', child.id)
        .gte('log_date', since)
        .order('log_date', { ascending: false });

      (sleeps ?? []).forEach(s => {
        entries.push({
          date: s.created_at,
          type: 'sleep',
          label: 'Sleep',
          detail: `${s.duration_minutes ?? 0}min – ${s.sleep_quality ?? 'no quality'}`,
          caregiverName: nameMap.get(s.user_id) ?? null,
        });
      });

      // Wake windows
      const { data: wakes } = await supabase
        .from('wake_windows')
        .select('created_at, log_date, duration_minutes, activity, user_id')
        .eq('child_id', child.id)
        .gte('log_date', since)
        .order('log_date', { ascending: false });

      (wakes ?? []).forEach(w => {
        entries.push({
          date: w.created_at,
          type: 'wake',
          label: 'Wake Window',
          detail: `${w.duration_minutes ?? 0}min${w.activity ? ' – ' + w.activity : ''}`,
          caregiverName: nameMap.get(w.user_id) ?? null,
        });
      });

      // Daily insights
      const { data: insights } = await supabase
        .from('daily_insights')
        .select('created_at, title, user_id')
        .eq('child_id', child.id)
        .gte('created_at', new Date(since).toISOString())
        .order('created_at', { ascending: false });

      (insights ?? []).forEach(i => {
        entries.push({
          date: i.created_at,
          type: 'insight',
          label: 'Insight',
          detail: i.title,
          caregiverName: nameMap.get(i.user_id) ?? null,
        });
      });

      // Sort all by date desc
      entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      return entries;
    },
    enabled: !!user && !!child,
  });
}
