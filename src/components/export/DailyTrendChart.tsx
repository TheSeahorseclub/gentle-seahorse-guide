import React from 'react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { format, parseISO } from 'date-fns';
import type { DaySignals } from '@/hooks/useSignalAnalytics';

interface DailyTrendChartProps {
  dailySignals: DaySignals[];
}

const chartConfig: ChartConfig = {
  signals: {
    label: 'Signals logged',
    color: 'hsl(var(--primary))',
  },
};

export const DailyTrendChart: React.FC<DailyTrendChartProps> = ({ dailySignals }) => {
  const data = dailySignals.map(day => ({
    date: format(parseISO(day.date), 'MMM d'),
    signals: Object.values(day.signals).flat().length,
  }));

  if (data.length === 0) {
    return (
      <div className="h-40 flex items-center justify-center text-muted-foreground text-sm">
        No data to display
      </div>
    );
  }

  return (
    <ChartContainer config={chartConfig} className="h-40 w-full">
      <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 10 }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 10 }}
          width={30}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line
          type="monotone"
          dataKey="signals"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={{ fill: 'hsl(var(--primary))', strokeWidth: 0, r: 4 }}
        />
      </LineChart>
    </ChartContainer>
  );
};
