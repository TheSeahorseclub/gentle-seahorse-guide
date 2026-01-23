import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useLocalUserId } from './useLocalUserId';
import { subDays, format, startOfDay, endOfDay, parseISO } from 'date-fns';

export interface SignalEntry {
  id: string;
  signal_type: string;
  description: string;
  created_at: string;
}

export interface DaySignals {
  date: string;
  signals: Record<string, string[]>;
}

export interface SignalTypeAggregation {
  signalType: string;
  label: string;
  daysLogged: number;
  frequencies: Record<string, number>;
}

export interface TrendAnalysis {
  trend: 'increasing-stability' | 'variable' | 'no-clear-trend' | 'consistent';
  description: string;
}

export interface AnalyticsData {
  periodStart: Date;
  periodEnd: Date;
  daysWithData: number;
  totalDays: number;
  dailySignals: DaySignals[];
  aggregations: SignalTypeAggregation[];
  overallTrend: TrendAnalysis;
  isLoading: boolean;
  error: string | null;
}

const SIGNAL_TYPE_LABELS: Record<string, string> = {
  sleep: 'Sleep',
  crying: 'Crying',
  feeding: 'Feeding',
  interaction: 'Interaction',
  transitions: 'Transitions',
};

const SIGNAL_DESCRIPTIONS: Record<string, Record<string, string>> = {
  sleep: {
    restful: 'Restful',
    unsettled: 'Unsettled',
    mixed: 'Mixed',
  },
  crying: {
    'calm-day': 'Calm day',
    'some-fussiness': 'Some fussiness',
    'more-than-usual': 'More than usual',
  },
  feeding: {
    settled: 'Settled',
    variable: 'Variable',
    challenging: 'Challenging',
  },
  interaction: {
    connected: 'Connected',
    quiet: 'Quiet',
    'seeking-comfort': 'Seeking comfort',
  },
  transitions: {
    smooth: 'Smooth',
    'needs-support': 'Needs support',
    'finding-it-hard': 'Finding it hard',
  },
};

function analyzeTrend(dailySignals: DaySignals[]): TrendAnalysis {
  if (dailySignals.length < 2) {
    return {
      trend: 'no-clear-trend',
      description: 'Not enough data to identify patterns yet.',
    };
  }

  // Analyze stability by looking at "positive" vs "challenging" signals over time
  const positiveDescriptions = ['restful', 'calm-day', 'settled', 'connected', 'smooth'];
  
  const dailyScores = dailySignals.map(day => {
    const allDescriptions = Object.values(day.signals).flat();
    const positiveCount = allDescriptions.filter(d => positiveDescriptions.includes(d)).length;
    const totalCount = allDescriptions.length;
    return totalCount > 0 ? positiveCount / totalCount : 0.5;
  });

  // Check if scores are trending up, down, or variable
  const firstHalf = dailyScores.slice(0, Math.ceil(dailyScores.length / 2));
  const secondHalf = dailyScores.slice(Math.ceil(dailyScores.length / 2));
  
  const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
  const secondAvg = secondHalf.length > 0 ? secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length : firstAvg;
  
  const variance = dailyScores.reduce((sum, score) => {
    const mean = (firstAvg + secondAvg) / 2;
    return sum + Math.pow(score - mean, 2);
  }, 0) / dailyScores.length;

  if (variance > 0.15) {
    return {
      trend: 'variable',
      description: 'Signals have shown some variability across the observed period.',
    };
  }
  
  if (secondAvg > firstAvg + 0.1) {
    return {
      trend: 'increasing-stability',
      description: 'There appears to be a gentle trend toward more settled patterns.',
    };
  }
  
  if (Math.abs(secondAvg - firstAvg) <= 0.1) {
    return {
      trend: 'consistent',
      description: 'Signals have remained relatively consistent across the observed period.',
    };
  }

  return {
    trend: 'no-clear-trend',
    description: 'No distinct pattern has emerged from the observed signals.',
  };
}

export function useSignalAnalytics(days: number = 7): AnalyticsData {
  const localUserId = useLocalUserId();
  const [data, setData] = useState<Omit<AnalyticsData, 'isLoading' | 'error'>>({
    periodStart: subDays(new Date(), days - 1),
    periodEnd: new Date(),
    daysWithData: 0,
    totalDays: days,
    dailySignals: [],
    aggregations: [],
    overallTrend: { trend: 'no-clear-trend', description: '' },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAndAnalyze() {
      if (!localUserId) {
        setIsLoading(false);
        return;
      }

      try {
        const periodStart = startOfDay(subDays(new Date(), days - 1));
        const periodEnd = endOfDay(new Date());

        const { data: signals, error: fetchError } = await supabase
          .from('signal_entries')
          .select('*')
          .eq('user_id', localUserId)
          .gte('created_at', periodStart.toISOString())
          .lte('created_at', periodEnd.toISOString())
          .order('created_at', { ascending: true });

        if (fetchError) throw fetchError;

        // Group signals by day
        const signalsByDay: Record<string, Record<string, string[]>> = {};
        
        (signals || []).forEach((signal: SignalEntry) => {
          const date = format(parseISO(signal.created_at), 'yyyy-MM-dd');
          if (!signalsByDay[date]) {
            signalsByDay[date] = {};
          }
          if (!signalsByDay[date][signal.signal_type]) {
            signalsByDay[date][signal.signal_type] = [];
          }
          signalsByDay[date][signal.signal_type].push(signal.description);
        });

        const dailySignals: DaySignals[] = Object.entries(signalsByDay)
          .map(([date, signals]) => ({ date, signals }))
          .sort((a, b) => a.date.localeCompare(b.date));

        // Aggregate by signal type
        const aggregations: SignalTypeAggregation[] = Object.keys(SIGNAL_TYPE_LABELS).map(signalType => {
          const frequencies: Record<string, number> = {};
          let daysLogged = 0;

          dailySignals.forEach(day => {
            if (day.signals[signalType]) {
              daysLogged++;
              day.signals[signalType].forEach(desc => {
                const label = SIGNAL_DESCRIPTIONS[signalType]?.[desc] || desc;
                frequencies[label] = (frequencies[label] || 0) + 1;
              });
            }
          });

          return {
            signalType,
            label: SIGNAL_TYPE_LABELS[signalType],
            daysLogged,
            frequencies,
          };
        }).filter(agg => agg.daysLogged > 0);

        const overallTrend = analyzeTrend(dailySignals);

        setData({
          periodStart,
          periodEnd,
          daysWithData: dailySignals.length,
          totalDays: days,
          dailySignals,
          aggregations,
          overallTrend,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load signal data');
      } finally {
        setIsLoading(false);
      }
    }

    fetchAndAnalyze();
  }, [localUserId, days]);

  return { ...data, isLoading, error };
}
