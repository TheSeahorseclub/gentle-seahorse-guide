import React from 'react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import type { SignalTypeAggregation } from '@/hooks/useSignalAnalytics';

interface SignalFrequencyChartProps {
  aggregation: SignalTypeAggregation;
}

// Neutral, calm color palette
const CHART_COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--muted-foreground))',
  'hsl(var(--accent))',
];

export const SignalFrequencyChart: React.FC<SignalFrequencyChartProps> = ({
  aggregation,
}) => {
  const data = Object.entries(aggregation.frequencies).map(([category, count], index) => ({
    category,
    count,
    fill: CHART_COLORS[index % CHART_COLORS.length],
  }));

  const chartConfig: ChartConfig = data.reduce((acc, item) => {
    acc[item.category] = {
      label: item.category,
      color: item.fill,
    };
    return acc;
  }, {} as ChartConfig);

  if (data.length === 0) {
    return (
      <div className="h-32 flex items-center justify-center text-muted-foreground text-sm">
        No data for this signal type
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <ChartContainer config={chartConfig} className="h-32 w-full">
        <BarChart data={data} layout="vertical" margin={{ left: 80, right: 20 }}>
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="category"
            tickLine={false}
            axisLine={false}
            width={75}
            tick={{ fontSize: 11 }}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={24}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  );
};
