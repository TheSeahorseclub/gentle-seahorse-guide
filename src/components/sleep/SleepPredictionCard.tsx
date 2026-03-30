import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useSleepPrediction } from '@/hooks/useSleepPrediction';
import { Brain, Clock, Moon, AlertTriangle, TrendingUp, Lightbulb, RefreshCw } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { useCurrentChild } from '@/hooks/useCurrentChild';

export const SleepPredictionCard: React.FC = () => {
  const { data, isLoading, error, isFetching } = useSleepPrediction();
  const queryClient = useQueryClient();
  const { data: child } = useCurrentChild();

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['sleep-prediction', child?.id] });
  };

  if (isLoading) {
    return (
      <Card className="p-5 border border-border bg-card space-y-3">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          <span className="font-display font-semibold text-foreground">AI Sleep Analysis</span>
        </div>
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-20 w-full" />
      </Card>
    );
  }

  if (error || !data) {
    return (
      <Card className="p-5 border border-border bg-card">
        <div className="flex items-center gap-2 mb-2">
          <Brain className="w-5 h-5 text-primary" />
          <span className="font-display font-semibold text-foreground">AI Sleep Analysis</span>
        </div>
        <p className="text-sm text-muted-foreground">
          {data && 'error' in data
            ? String((data as any).error)
            : 'Log some sleep data to get AI predictions.'}
        </p>
        <Button variant="outline" size="sm" className="mt-3" onClick={handleRefresh}>
          <RefreshCw className="w-4 h-4 mr-1" /> Try again
        </Button>
      </Card>
    );
  }

  const trendColor = data.trend === 'improving' ? 'text-green-600' : data.trend === 'declining' ? 'text-coral' : 'text-muted-foreground';

  return (
    <Card className="p-5 border border-border bg-card space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          <span className="font-display font-semibold text-foreground">AI Sleep Analysis</span>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleRefresh} disabled={isFetching}>
          <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-secondary/50 rounded-lg p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <Clock className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs text-muted-foreground">Wake Window</span>
          </div>
          <p className="text-sm font-medium text-foreground">{data.idealWakeWindow}</p>
        </div>
        <div className="bg-secondary/50 rounded-lg p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <Moon className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs text-muted-foreground">Avg Sleep</span>
          </div>
          <p className="text-sm font-medium text-foreground">{data.averageTotalSleep}</p>
        </div>
        <div className="bg-secondary/50 rounded-lg p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <TrendingUp className={`w-3.5 h-3.5 ${trendColor}`} />
            <span className="text-xs text-muted-foreground">Trend</span>
          </div>
          <p className={`text-sm font-medium capitalize ${trendColor}`}>{data.trend}</p>
        </div>
        <div className="bg-secondary/50 rounded-lg p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <Moon className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs text-muted-foreground">Naps</span>
          </div>
          <p className="text-sm font-medium text-foreground">{data.napRecommendation}</p>
        </div>
      </div>

      {/* Sleep regression alert */}
      {data.sleepRegression && data.sleepRegression.toLowerCase().includes('true') && (
        <div className="bg-coral/10 rounded-lg p-3 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-coral mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-coral">Sleep Regression Signs</p>
            <p className="text-xs text-muted-foreground mt-0.5">{data.sleepRegression}</p>
          </div>
        </div>
      )}

      {/* Predicted wake */}
      {data.predictedNextWake && (
        <div className="bg-primary/5 rounded-lg p-3 border border-primary/10">
          <p className="text-xs text-muted-foreground mb-1">Predicted next wake pattern</p>
          <p className="text-sm font-medium text-foreground">{data.predictedNextWake}</p>
        </div>
      )}

      {/* Insights */}
      {data.insights && data.insights.length > 0 && (
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <Lightbulb className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Insights</span>
          </div>
          <ul className="space-y-1.5">
            {data.insights.map((insight, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 flex-shrink-0" />
                {insight}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tips */}
      {data.tips && data.tips.length > 0 && (
        <div>
          <span className="text-sm font-medium text-foreground">Tips</span>
          <ul className="space-y-1.5 mt-2">
            {data.tips.map((tip, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                <Badge variant="outline" className="text-[10px] px-1.5 mt-0.5 flex-shrink-0">
                  {i + 1}
                </Badge>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="text-[10px] text-muted-foreground italic text-center">
        AI-generated based on logged data. Not medical advice.
      </p>
    </Card>
  );
};
