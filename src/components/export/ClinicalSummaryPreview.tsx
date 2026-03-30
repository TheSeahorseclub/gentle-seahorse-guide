import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { AlertCircle, Calendar, Baby, TrendingUp, BookOpen, Stethoscope, BarChart3 } from 'lucide-react';
import { SignalFrequencyChart } from './SignalFrequencyChart';
import { DailyTrendChart } from './DailyTrendChart';
import { ParentAgenda } from './ParentAgenda';
import type { AnalyticsData } from '@/hooks/useSignalAnalytics';
import type { DevelopmentalContext } from '@/utils/developmentalContext';

interface ClinicalSummaryPreviewProps {
  childAgeMonths: number;
  analytics: AnalyticsData;
  developmentalContext: DevelopmentalContext;
  clinicalReflection: string;
  exportDays: number;
}

export const ClinicalSummaryPreview: React.FC<ClinicalSummaryPreviewProps> = ({
  childAgeMonths,
  analytics,
  developmentalContext,
  clinicalReflection,
  exportDays,
}) => {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center pb-2">
        <h2 className="font-display text-xl font-semibold text-foreground">
          Clinical Signals Summary
        </h2>
        <p className="text-sm text-muted-foreground">(Parent-Reported)</p>
      </div>

      {/* Section 1: Context */}
      <Card variant="soft" className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-4 h-4 text-primary" />
          <h3 className="font-display font-semibold text-foreground">1. Context</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Baby className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">
              <span className="text-muted-foreground">Age:</span>{' '}
              <span className="font-medium">{childAgeMonths} months</span>
            </span>
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">Period:</span>{' '}
            <span className="font-medium">
              {format(analytics.periodStart, 'd MMM')} – {format(analytics.periodEnd, 'd MMM yyyy')}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <Badge variant="outline" className="text-xs">
            {analytics.daysWithData} of {analytics.totalDays} days logged
          </Badge>
        </div>

        <div className="bg-muted/50 rounded-lg p-3 border border-border/50">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <p className="text-xs text-muted-foreground italic leading-relaxed">
              This summary organises parent-reported signals and does not provide diagnosis, assessment, or prediction.
            </p>
          </div>
        </div>
      </Card>

      {/* Section 2: Aggregated Signals */}
      <Card variant="soft" className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 className="w-4 h-4 text-primary" />
          <h3 className="font-display font-semibold text-foreground">2. Aggregated Signals</h3>
        </div>

        {analytics.aggregations.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No signals were recorded during this period.
          </p>
        ) : (
          <div className="space-y-4">
            {analytics.aggregations.map(agg => (
              <div key={agg.signalType} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{agg.label}</span>
                  <Badge variant="secondary" className="text-xs">
                    {agg.daysLogged} days
                  </Badge>
                </div>
                <SignalFrequencyChart aggregation={agg} />
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Section 3: Trend Description */}
      <Card variant="soft" className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-primary" />
          <h3 className="font-display font-semibold text-foreground">3. Trend Description</h3>
        </div>
        
        <p className="text-sm text-muted-foreground leading-relaxed">
          {analytics.overallTrend.description}
        </p>
      </Card>

      {/* Section 4: Developmental Context */}
      <Card variant="soft" className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-4 h-4 text-primary" />
          <h3 className="font-display font-semibold text-foreground">4. Developmental Context</h3>
        </div>
        
        <Badge variant="outline" className="mb-3 text-xs">{developmentalContext.ageRange}</Badge>
        
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
          {developmentalContext.description}
        </p>
        
        <p className="text-sm text-muted-foreground leading-relaxed">
          {developmentalContext.signalNotes}
        </p>
      </Card>

      {/* Section 5: Clinical Reflection */}
      <Card variant="soft" className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Stethoscope className="w-4 h-4 text-primary" />
          <h3 className="font-display font-semibold text-foreground">5. Clinical Reflection</h3>
        </div>
        
        <p className="text-sm text-muted-foreground leading-relaxed">
          {clinicalReflection}
        </p>
      </Card>

      {/* Section 6: Visualisation */}
      <Card variant="soft" className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 className="w-4 h-4 text-primary" />
          <h3 className="font-display font-semibold text-foreground">6. Daily Observations</h3>
        </div>
        
        <DailyTrendChart dailySignals={analytics.dailySignals} />
        
        <div className="mt-3 bg-muted/50 rounded-lg p-2 border border-border/50">
          <p className="text-xs text-muted-foreground italic text-center">
            Not a performance measure
          </p>
        </div>
      </Card>

      {/* Section 7: Parent Activity Log */}
      <ParentAgenda days={30} />
    </div>
  );
};
