import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { subDays, format, startOfDay, endOfDay, parseISO, getDay } from 'date-fns';

export interface SleepSummary {
  totalLogs: number;
  avgDurationMinutes: number;
  qualityDistribution: Record<string, number>;
  earliestStart: string | null;
  latestEnd: string | null;
  consistencyScore: number; // 0-100
}

export interface WakeWindowSummary {
  totalLogs: number;
  avgDurationMinutes: number;
  longestWindow: number;
  shortestWindow: number;
  activities: Record<string, number>;
}

export interface SleepSignalCorrelation {
  goodSleepDays: { avgSignals: number; count: number };
  poorSleepDays: { avgSignals: number; count: number };
  insight: string;
}

export interface CaregiverBreakdown {
  name: string;
  signalCount: number;
  sleepLogCount: number;
  totalEntries: number;
}

export interface WeeklyPattern {
  dayOfWeek: string;
  avgSignalCount: number;
  dominantMood: string;
}

export interface ClinicalSleepData {
  sleepSummary: SleepSummary;
  wakeSummary: WakeWindowSummary;
  correlation: SleepSignalCorrelation;
  caregiverBreakdown: CaregiverBreakdown[];
  weeklyPatterns: WeeklyPattern[];
  isLoading: boolean;
}

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function useClinicalSleepData(childId: string | undefined, familyId: string | undefined, days: number = 30): ClinicalSleepData {
  const [data, setData] = useState<Omit<ClinicalSleepData, 'isLoading'>>({
    sleepSummary: { totalLogs: 0, avgDurationMinutes: 0, qualityDistribution: {}, earliestStart: null, latestEnd: null, consistencyScore: 0 },
    wakeSummary: { totalLogs: 0, avgDurationMinutes: 0, longestWindow: 0, shortestWindow: 0, activities: {} },
    correlation: { goodSleepDays: { avgSignals: 0, count: 0 }, poorSleepDays: { avgSignals: 0, count: 0 }, insight: '' },
    caregiverBreakdown: [],
    weeklyPatterns: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!childId) { setIsLoading(false); return; }

    async function fetch() {
      const since = format(subDays(new Date(), days - 1), 'yyyy-MM-dd');
      const sinceISO = startOfDay(subDays(new Date(), days - 1)).toISOString();

      // Fetch all data in parallel
      const [sleepRes, wakeRes, signalRes, membersRes] = await Promise.all([
        supabase.from('sleep_logs').select('*').eq('child_id', childId!).gte('log_date', since).order('log_date'),
        supabase.from('wake_windows').select('*').eq('child_id', childId!).gte('log_date', since).order('log_date'),
        supabase.from('signal_entries').select('*').eq('child_id', childId!).gte('created_at', sinceISO).order('created_at'),
        familyId ? supabase.from('family_members').select('user_id, role').eq('family_id', familyId) : Promise.resolve({ data: [] }),
      ]);

      const sleeps = sleepRes.data ?? [];
      const wakes = wakeRes.data ?? [];
      const signals = signalRes.data ?? [];
      const members = (membersRes as any).data ?? [];

      // --- Caregiver name map ---
      const memberIds = members.map((m: any) => m.user_id);
      let nameMap = new Map<string, string>();
      if (memberIds.length > 0) {
        const { data: profiles } = await supabase.from('profiles').select('user_id, full_name, email').in('user_id', memberIds);
        (profiles ?? []).forEach((p: any) => nameMap.set(p.user_id, p.full_name || p.email || 'Caregiver'));
      }

      // --- 1. Sleep Summary ---
      const durations = sleeps.filter(s => s.duration_minutes).map(s => s.duration_minutes!);
      const qualityDist: Record<string, number> = {};
      sleeps.forEach(s => {
        const q = s.sleep_quality || 'Not recorded';
        qualityDist[q] = (qualityDist[q] || 0) + 1;
      });

      const starts = sleeps.filter(s => s.time_started).map(s => s.time_started!).sort();
      const ends = sleeps.filter(s => s.time_ended).map(s => s.time_ended!).sort();

      // Consistency: std dev of durations
      const avgDur = durations.length > 0 ? durations.reduce((a, b) => a + b, 0) / durations.length : 0;
      const variance = durations.length > 1 ? durations.reduce((s, d) => s + Math.pow(d - avgDur, 2), 0) / durations.length : 0;
      const stdDev = Math.sqrt(variance);
      const consistencyScore = durations.length > 0 ? Math.max(0, Math.min(100, Math.round(100 - stdDev * 2))) : 0;

      const sleepSummary: SleepSummary = {
        totalLogs: sleeps.length,
        avgDurationMinutes: Math.round(avgDur),
        qualityDistribution: qualityDist,
        earliestStart: starts[0] ?? null,
        latestEnd: ends[ends.length - 1] ?? null,
        consistencyScore,
      };

      // --- 2. Wake Window Summary ---
      const wakeDurations = wakes.filter(w => w.duration_minutes).map(w => w.duration_minutes!);
      const activities: Record<string, number> = {};
      wakes.forEach(w => {
        const a = w.activity || 'Unspecified';
        activities[a] = (activities[a] || 0) + 1;
      });

      const avgWake = wakeDurations.length > 0 ? wakeDurations.reduce((a, b) => a + b, 0) / wakeDurations.length : 0;

      const wakeSummary: WakeWindowSummary = {
        totalLogs: wakes.length,
        avgDurationMinutes: Math.round(avgWake),
        longestWindow: wakeDurations.length > 0 ? Math.max(...wakeDurations) : 0,
        shortestWindow: wakeDurations.length > 0 ? Math.min(...wakeDurations) : 0,
        activities,
      };

      // --- 3. Sleep-Signal Correlation ---
      const sleepByDate: Record<string, number[]> = {};
      sleeps.forEach(s => {
        if (!sleepByDate[s.log_date]) sleepByDate[s.log_date] = [];
        if (s.duration_minutes) sleepByDate[s.log_date].push(s.duration_minutes);
      });

      const signalsByDate: Record<string, number> = {};
      signals.forEach(s => {
        const d = format(parseISO(s.created_at), 'yyyy-MM-dd');
        signalsByDate[d] = (signalsByDate[d] || 0) + 1;
      });

      let goodDays = { total: 0, signals: 0 };
      let poorDays = { total: 0, signals: 0 };

      Object.entries(sleepByDate).forEach(([date, durs]) => {
        const totalSleep = durs.reduce((a, b) => a + b, 0);
        const sigCount = signalsByDate[date] || 0;
        if (totalSleep >= avgDur) {
          goodDays.total++;
          goodDays.signals += sigCount;
        } else {
          poorDays.total++;
          poorDays.signals += sigCount;
        }
      });

      const goodAvg = goodDays.total > 0 ? goodDays.signals / goodDays.total : 0;
      const poorAvg = poorDays.total > 0 ? poorDays.signals / poorDays.total : 0;

      let correlationInsight = 'Insufficient data to draw correlations.';
      if (goodDays.total > 0 && poorDays.total > 0) {
        if (poorAvg > goodAvg * 1.3) {
          correlationInsight = 'Days with less sleep tend to show more signal entries, which may indicate increased need for support.';
        } else if (goodAvg > poorAvg * 1.3) {
          correlationInsight = 'Days with better sleep tend to show more logged signals, possibly reflecting greater caregiver engagement.';
        } else {
          correlationInsight = 'No strong correlation observed between sleep duration and signal frequency during this period.';
        }
      }

      const correlation: SleepSignalCorrelation = {
        goodSleepDays: { avgSignals: Math.round(goodAvg * 10) / 10, count: goodDays.total },
        poorSleepDays: { avgSignals: Math.round(poorAvg * 10) / 10, count: poorDays.total },
        insight: correlationInsight,
      };

      // --- 4. Caregiver Breakdown ---
      const caregiverSignals: Record<string, { signals: number; sleepLogs: number }> = {};
      signals.forEach(s => {
        if (!caregiverSignals[s.user_id]) caregiverSignals[s.user_id] = { signals: 0, sleepLogs: 0 };
        caregiverSignals[s.user_id].signals++;
      });
      sleeps.forEach(s => {
        if (!caregiverSignals[s.user_id]) caregiverSignals[s.user_id] = { signals: 0, sleepLogs: 0 };
        caregiverSignals[s.user_id].sleepLogs++;
      });

      const caregiverBreakdown: CaregiverBreakdown[] = Object.entries(caregiverSignals).map(([uid, counts]) => ({
        name: nameMap.get(uid) || 'Unknown',
        signalCount: counts.signals,
        sleepLogCount: counts.sleepLogs,
        totalEntries: counts.signals + counts.sleepLogs,
      })).sort((a, b) => b.totalEntries - a.totalEntries);

      // --- 5. Weekly Patterns ---
      const dayBuckets: Record<number, { signals: number[]; moods: string[] }> = {};
      for (let i = 0; i < 7; i++) dayBuckets[i] = { signals: [], moods: [] };

      const signalDateMap: Record<string, { count: number; descs: string[] }> = {};
      signals.forEach(s => {
        const d = format(parseISO(s.created_at), 'yyyy-MM-dd');
        if (!signalDateMap[d]) signalDateMap[d] = { count: 0, descs: [] };
        signalDateMap[d].count++;
        signalDateMap[d].descs.push(s.description);
      });

      Object.entries(signalDateMap).forEach(([dateStr, info]) => {
        const dow = getDay(parseISO(dateStr));
        dayBuckets[dow].signals.push(info.count);
        dayBuckets[dow].moods.push(...info.descs);
      });

      const positiveDescs = ['restful', 'calm-day', 'settled', 'connected', 'smooth'];

      const weeklyPatterns: WeeklyPattern[] = Object.entries(dayBuckets).map(([dow, bucket]) => {
        const avg = bucket.signals.length > 0 ? bucket.signals.reduce((a, b) => a + b, 0) / bucket.signals.length : 0;
        const positiveCount = bucket.moods.filter(m => positiveDescs.includes(m)).length;
        const dominantMood = bucket.moods.length === 0 ? 'No data' : positiveCount > bucket.moods.length / 2 ? 'Mostly settled' : 'More variable';
        return {
          dayOfWeek: DAY_NAMES[parseInt(dow)],
          avgSignalCount: Math.round(avg * 10) / 10,
          dominantMood,
        };
      });

      setData({ sleepSummary, wakeSummary, correlation, caregiverBreakdown, weeklyPatterns });
      setIsLoading(false);
    }

    fetch();
  }, [childId, familyId, days]);

  return { ...data, isLoading };
}
