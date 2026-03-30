import React, { useState } from 'react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Moon, Sun, Clock, BarChart3 } from 'lucide-react';
import { useSleepHistory } from '@/hooks/useSleepHistory';
import { format, parseISO } from 'date-fns';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { cn } from '@/lib/utils';

const qualityColor: Record<string, string> = {
  deep: 'hsl(var(--primary))',
  light: 'hsl(var(--calm))',
  restless: 'hsl(var(--coral))',
};

const qualityLabel: Record<string, string> = {
  deep: 'Deep',
  light: 'Light',
  restless: 'Restless',
};

const chartConfig: ChartConfig = {
  totalSleep: { label: 'Sleep (hrs)', color: 'hsl(var(--primary))' },
  totalWake: { label: 'Wake (hrs)', color: 'hsl(var(--coral))' },
};

function formatTime(t: string | null): string {
  if (!t) return '—';
  const [h, m] = t.split(':');
  const hour = parseInt(h);
  const suffix = hour >= 12 ? 'pm' : 'am';
  const display = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${display}:${m}${suffix}`;
}

export const SleepHistory: React.FC = () => {
  const [days, setDays] = useState(14);
  const { sleepLogs, wakeLogs, isLoading } = useSleepHistory(days);

  // Group by date
  const dateMap = new Map<string, { sleep: typeof sleepLogs; wake: typeof wakeLogs }>();
  sleepLogs.forEach(s => {
    if (!dateMap.has(s.log_date)) dateMap.set(s.log_date, { sleep: [], wake: [] });
    dateMap.get(s.log_date)!.sleep.push(s);
  });
  wakeLogs.forEach(w => {
    if (!dateMap.has(w.log_date)) dateMap.set(w.log_date, { sleep: [], wake: [] });
    dateMap.get(w.log_date)!.wake.push(w);
  });

  const sortedDates = Array.from(dateMap.keys()).sort((a, b) => b.localeCompare(a));

  // Chart data
  const chartData = Array.from(dateMap.entries())
    .map(([date, { sleep, wake }]) => ({
      date: format(parseISO(date), 'MMM d'),
      totalSleep: Math.round((sleep.reduce((sum, s) => sum + (s.duration_minutes ?? 0), 0) / 60) * 10) / 10,
      totalWake: Math.round((wake.reduce((sum, w) => sum + (w.duration_minutes ?? 0), 0) / 60) * 10) / 10,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <MobileLayout>
      <PageHeader
        title="Sleep patterns"
        subtitle="Review past sleep logs and wake windows"
      />

      <div className="px-6">
        {/* Period selector */}
        <div className="flex gap-2 mb-5">
          {[7, 14, 30].map(d => (
            <button
              key={d}
              onClick={() => setDays(d)}
              className={cn(
                'px-4 py-1.5 rounded-full text-sm font-medium transition-all',
                days === d
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-muted-foreground border border-border'
              )}
            >
              {d}d
            </button>
          ))}
        </div>

        {/* AI Sleep Prediction */}
        <div className="mb-5">
          <SleepPredictionCard />
        </div>

        <Tabs defaultValue="timeline" className="mb-6">
          <TabsList className="w-full">
            <TabsTrigger value="timeline" className="flex-1 gap-1.5">
              <Clock className="w-4 h-4" /> Timeline
            </TabsTrigger>
            <TabsTrigger value="chart" className="flex-1 gap-1.5">
              <BarChart3 className="w-4 h-4" /> Chart
            </TabsTrigger>
          </TabsList>

          {/* Timeline Tab */}
          <TabsContent value="timeline">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <Skeleton key={i} className="h-32 w-full rounded-xl" />
                ))}
              </div>
            ) : sortedDates.length === 0 ? (
              <Card className="p-8 text-center border border-border">
                <Moon className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">No sleep data logged yet</p>
                <p className="text-sm text-muted-foreground mt-1">Start tracking sleep from the signal tracker</p>
              </Card>
            ) : (
              <div className="space-y-4 pb-6">
                {sortedDates.map(date => {
                  const { sleep, wake } = dateMap.get(date)!;
                  const totalSleepMin = sleep.reduce((s, l) => s + (l.duration_minutes ?? 0), 0);
                  const totalWakeMin = wake.reduce((s, w) => s + (w.duration_minutes ?? 0), 0);

                  return (
                    <Card key={date} className="p-4 border border-border bg-card">
                      {/* Date header */}
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-display font-semibold text-foreground">
                          {format(parseISO(date), 'EEE, MMM d')}
                        </h3>
                        <div className="flex gap-3 text-xs text-muted-foreground">
                          {totalSleepMin > 0 && (
                            <span className="flex items-center gap-1">
                              <Moon className="w-3 h-3" />
                              {Math.floor(totalSleepMin / 60)}h {totalSleepMin % 60}m
                            </span>
                          )}
                          {totalWakeMin > 0 && (
                            <span className="flex items-center gap-1">
                              <Sun className="w-3 h-3" />
                              {Math.floor(totalWakeMin / 60)}h {totalWakeMin % 60}m
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Sleep sessions */}
                      {sleep.length > 0 && (
                        <div className="space-y-2 mb-3">
                          {sleep.map(s => (
                            <div
                              key={s.id}
                              className="flex items-center gap-3 p-2.5 rounded-lg bg-secondary/50"
                            >
                              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <Moon className="w-4 h-4 text-primary" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium text-foreground">
                                    {formatTime(s.time_started)} – {formatTime(s.time_ended)}
                                  </span>
                                  {s.duration_minutes != null && (
                                    <span className="text-xs text-muted-foreground">
                                      ({Math.floor(s.duration_minutes / 60)}h {s.duration_minutes % 60}m)
                                    </span>
                                  )}
                                </div>
                                {s.sleep_quality && (
                                  <span
                                    className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-medium"
                                    style={{
                                      backgroundColor: `${qualityColor[s.sleep_quality]}20`,
                                      color: qualityColor[s.sleep_quality],
                                    }}
                                  >
                                    {qualityLabel[s.sleep_quality] ?? s.sleep_quality}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Wake windows */}
                      {wake.length > 0 && (
                        <div className="space-y-2">
                          {wake.map(w => (
                            <div
                              key={w.id}
                              className="flex items-center gap-3 p-2.5 rounded-lg bg-accent/30"
                            >
                              <div className="w-8 h-8 rounded-lg bg-coral/10 flex items-center justify-center flex-shrink-0">
                                <Sun className="w-4 h-4 text-coral" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium text-foreground">
                                    {formatTime(w.time_started)} – {formatTime(w.time_ended)}
                                  </span>
                                  {w.duration_minutes != null && (
                                    <span className="text-xs text-muted-foreground">
                                      ({w.duration_minutes}m)
                                    </span>
                                  )}
                                </div>
                                {w.activity && (
                                  <p className="text-xs text-muted-foreground mt-0.5 truncate">
                                    {w.activity}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          {/* Chart Tab */}
          <TabsContent value="chart">
            {isLoading ? (
              <Skeleton className="h-52 w-full rounded-xl" />
            ) : chartData.length === 0 ? (
              <Card className="p-8 text-center border border-border">
                <BarChart3 className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">No data to chart yet</p>
              </Card>
            ) : (
              <Card className="p-4 border border-border bg-card">
                <h3 className="font-display font-semibold text-sm text-foreground mb-3">
                  Daily totals (hours)
                </h3>
                <ChartContainer config={chartConfig} className="h-52 w-full">
                  <BarChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fontSize: 10 }} />
                    <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10 }} width={30} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="totalSleep" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="totalWake" fill="hsl(var(--coral))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ChartContainer>

                {/* Legend */}
                <div className="flex justify-center gap-6 mt-3">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <div className="w-3 h-3 rounded-sm bg-primary" />
                    Sleep
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <div className="w-3 h-3 rounded-sm bg-coral" />
                    Wake
                  </div>
                </div>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  );
};
