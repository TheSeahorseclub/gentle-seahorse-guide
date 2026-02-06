import React, { useState, useEffect } from 'react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Calendar, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useCurrentChild } from '@/hooks/useCurrentChild';
import { format, parseISO } from 'date-fns';

interface InsightEntry {
  id: string;
  title: string;
  insight_text: string;
  support_sugg: string | null;
  insight_date: string;
  created_at: string;
}

export const InsightHistory: React.FC = () => {
  const { data: currentChild, isLoading: childLoading } = useCurrentChild();
  const [isLoading, setIsLoading] = useState(true);
  const [insights, setInsights] = useState<InsightEntry[]>([]);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!currentChild) return;

    const fetchInsights = async () => {
      const { data, error } = await supabase
        .from('daily_insights')
        .select('*')
        .eq('child_id', currentChild.id)
        .order('insight_date', { ascending: false });
      
      if (error) {
        console.error('Error fetching insights:', error);
        setIsLoading(false);
        return;
      }
      
      setInsights(data || []);
      setIsLoading(false);
    };
    
    fetchInsights();
  }, [currentChild]);

  const toggleExpanded = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'EEEE, d MMMM yyyy');
    } catch {
      return dateString;
    }
  };

  if (childLoading || isLoading) {
    return (
      <MobileLayout>
        <PageHeader 
          title="Your past observations" 
          subtitle="Loading your insights..."
        />
        <div className="px-6 py-12 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </MobileLayout>
    );
  }

  if (insights.length === 0) {
    return (
      <MobileLayout>
        <PageHeader 
          title="Your past observations" 
          subtitle="A gentle record of what you've noticed."
        />
        <div className="px-6 py-8 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
            <Calendar className="w-10 h-10 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">
            No observations yet. When you log signals and view your daily insight, they'll appear here as a gentle record of your journey.
          </p>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <PageHeader 
        title="Your past observations" 
        subtitle="A gentle record of what you've noticed."
      />

      <div className="px-6 space-y-4 pb-6">
        {insights.map((insight) => {
          const isExpanded = expandedIds.has(insight.id);
          const supportSuggestions = insight.support_sugg?.split(' | ') || [];
          
          return (
            <Collapsible
              key={insight.id}
              open={isExpanded}
              onOpenChange={() => toggleExpanded(insight.id)}
            >
              <Card variant="soft" className="overflow-hidden">
                <CollapsibleTrigger className="w-full p-4 text-left">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground mb-1">
                        {formatDate(insight.insight_date)}
                      </p>
                      <h3 className="font-display font-semibold text-foreground">
                        {insight.title}
                      </h3>
                      {!isExpanded && (
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {insight.insight_text}
                        </p>
                      )}
                    </div>
                    <ChevronDown 
                      className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </CollapsibleTrigger>
                
                <CollapsibleContent>
                  <div className="px-4 pb-4 space-y-4">
                    <div>
                      <p className="text-muted-foreground leading-relaxed">
                        {insight.insight_text}
                      </p>
                    </div>
                    
                    {supportSuggestions.length > 0 && supportSuggestions[0] && (
                      <div className="pt-3 border-t border-border/50">
                        <p className="text-sm font-medium text-foreground mb-2">
                          Ways to support
                        </p>
                        <ul className="space-y-2">
                          {supportSuggestions.map((suggestion, index) => (
                            <li 
                              key={index} 
                              className="text-sm text-muted-foreground leading-relaxed"
                            >
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          );
        })}
      </div>
    </MobileLayout>
  );
};
