import React, { useMemo } from 'react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Card } from '@/components/ui/card';
import { useCurrentChild } from '@/hooks/useCurrentChild';
import { useSignalAnalytics } from '@/hooks/useSignalAnalytics';
import { useSleepHistory } from '@/hooks/useSleepHistory';
import { ChevronLeft, TrendingUp, Activity, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = [
  'hsl(205, 70%, 65%)',
  'hsl(210, 60%, 72%)',
  'hsl(200, 55%, 60%)',
  'hsl(215, 55%, 68%)',
  'hsl(0, 55%, 55%)',
  'hsl(190, 50%, 65%)',
];

export const Trends: React.FC = () => {
  const navigate = useNavigate();
  const { data: currentChild } = useCurrentChild();
  const analytics = useSignalAnalytics(currentChild?.id, 14);
  const { sleepLogs } = useSleepHistory(14);

  // Signal type distribution from aggregations
  const signalsByType = useMemo(() => {
    return analytics.aggregations.map((agg) => ({
      name: agg.label,
      value: agg.daysLogged,
    }));
  }, [analytics.aggregations]);

  // Signals per day from dailySignals
  const signalsByDay = useMemo(() => {
    return analytics.dailySignals.map((day) => {
      const count = Object.values(day.signals).reduce((sum, arr) => sum + arr.length, 0);
      const d = new Date(day.date);
      return {
        date: d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
        count,
      };
    });
  }, [analytics.dailySignals]);

  // Sleep duration per day
  const sleepByDay = useMemo(() => {
    const byDate: Record<string, number> = {};
    sleepLogs.forEach((log) => {
      byDate[log.log_date] = (byDate[log.log_date] || 0) + (log.duration_minutes || 0);
    });
    return Object.entries(byDate)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, mins]) => ({
        date: new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
        hours: +(mins / 60).toFixed(1),
      }));
  }, [sleepLogs]);

  return (
    <MobileLayout>
      <div className="px-6 pt-8 pb-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate('/home')}
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Trends</h1>
            <p className="text-sm text-muted-foreground">Last 14 days overview</p>
          </div>
        </div>

        <div className="space-y-5">
          {/* Signals per day */}
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-primary" />
              <h2 className="font-display font-semibold text-foreground">Daily updates logged</h2>
            </div>
            {signalsByDay.length > 0 ? (
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={signalsByDay}>
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} interval={2} stroke="hsl(210, 22%, 45%)" />
                  <YAxis allowDecimals={false} tick={{ fontSize: 10 }} stroke="hsl(210, 22%, 45%)" />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(205, 70%, 65%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">No data yet. Start logging daily updates.</p>
            )}
          </Card>

          {/* Signal type distribution */}
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h2 className="font-display font-semibold text-foreground">Signal types</h2>
            </div>
            {signalsByType.length > 0 ? (
              <div className="flex items-center gap-4">
                <ResponsiveContainer width="50%" height={160}>
                  <PieChart>
                    <Pie data={signalsByType} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60}>
                      {signalsByType.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex-1 space-y-1">
                  {signalsByType.map((item, i) => (
                    <div key={item.name} className="flex items-center gap-2 text-xs">
                      <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                      <span className="text-foreground truncate">{item.name}</span>
                      <span className="text-muted-foreground ml-auto">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">No signals recorded yet.</p>
            )}
          </Card>

          {/* Overall trend */}
          {analytics.overallTrend && (
            <Card className="p-5 bg-primary/5 border-primary/10">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <h3 className="font-display font-semibold text-foreground text-sm capitalize">
                  {analytics.overallTrend.trend.replace(/-/g, ' ')}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">{analytics.overallTrend.description}</p>
            </Card>
          )}

          {/* Sleep trends */}
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Moon className="w-5 h-5 text-primary" />
              <h2 className="font-display font-semibold text-foreground">Sleep duration (hours)</h2>
            </div>
            {sleepByDay.length > 0 ? (
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={sleepByDay}>
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} interval={2} stroke="hsl(210, 22%, 45%)" />
                  <YAxis tick={{ fontSize: 10 }} stroke="hsl(210, 22%, 45%)" />
                  <Tooltip />
                  <Bar dataKey="hours" fill="hsl(215, 55%, 68%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">No sleep data yet.</p>
            )}
          </Card>
        </div>
      </div>
    </MobileLayout>
  );
};
