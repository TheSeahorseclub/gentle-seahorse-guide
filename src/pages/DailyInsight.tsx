import React, { useState, useEffect } from 'react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Brain, Heart, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { getLocalUserId } from '@/hooks/useLocalUserId';

interface SignalEntry {
  id: string;
  signal_type: string;
  description: string;
  created_at: string;
}

// Generate insight based on signal patterns
const generateInsight = (signals: SignalEntry[]) => {
  const signalTypes = signals.map(s => s.signal_type);
  const descriptions = signals.map(s => s.description.toLowerCase());
  
  // Analyze patterns for title
  const hasUnsettled = descriptions.some(d => 
    d.includes('unsettled') || d.includes('fussiness') || d.includes('challenging') || d.includes('hard')
  );
  const hasCalm = descriptions.some(d => 
    d.includes('restful') || d.includes('calm') || d.includes('settled') || d.includes('smooth')
  );
  
  let title: string;
  let meaning: string;
  let suggestions: string[];
  
  if (hasUnsettled && !hasCalm) {
    title = "A day of big feelings";
    meaning = "Your little one's nervous system may be working hard to process new experiences today. These signals often reflect their brain actively integrating sensations and learning. Unsettled moments are a natural part of development and may indicate they're reaching for comfort and connection.";
    suggestions = [
      "Stay close and calm — your regulated presence helps their nervous system find balance.",
      "Gentle rhythms like rocking, soft humming, or skin-to-skin contact may be especially settling today."
    ];
  } else if (hasCalm && !hasUnsettled) {
    title = "Signals of a settled day";
    meaning = "Today's signals suggest your child's nervous system may be in a calm, regulated state. This is a wonderful foundation for connection and gentle exploration. These moments of ease reflect the safety they feel in your care.";
    suggestions = [
      "Enjoy this calm window for quiet connection — eye contact, soft voices, and gentle play.",
      "These settled moments are perfect for introducing new experiences at their pace."
    ];
  } else {
    title = "A day of mixed signals";
    meaning = "Your child may be moving between different states today, which is completely normal. Their nervous system is learning to navigate various experiences. These mixed signals often reflect their growing capacity to adapt and self-regulate with your support.";
    suggestions = [
      "Follow their lead and offer comfort when they signal they need it.",
      "Create predictable rhythms in your day — consistency helps their nervous system feel safe."
    ];
  }
  
  return { title, meaning, suggestions };
};

export const DailyInsight: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [todaySignals, setTodaySignals] = useState<SignalEntry[]>([]);
  const [insight, setInsight] = useState<{ title: string; meaning: string; suggestions: string[] } | null>(null);

  useEffect(() => {
    const fetchTodaySignals = async () => {
      const userId = getLocalUserId();
      
      // Get start of today in local time
      const now = new Date();
      const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
      
      const { data, error } = await supabase
        .from('signal_entries')
        .select('*')
        .eq('user_id', userId)
        .gte('created_at', startOfToday.toISOString())
        .lte('created_at', now.toISOString())
        .order('created_at', { ascending: true });
      
      if (error) {
        console.error('Error fetching signals:', error);
        setIsLoading(false);
        return;
      }
      
      setTodaySignals(data || []);
      
      if (data && data.length > 0) {
        setInsight(generateInsight(data));
      }
      
      setIsLoading(false);
    };
    
    fetchTodaySignals();
  }, []);

  if (isLoading) {
    return (
      <MobileLayout>
        <PageHeader 
          title="Today's insight" 
          subtitle="Loading your signals..."
        />
        <div className="px-6 py-12 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </MobileLayout>
    );
  }

  if (todaySignals.length === 0) {
    return (
      <MobileLayout>
        <PageHeader 
          title="Today's insight" 
          subtitle="Log today's signals first to receive your personalised nervous system insight."
        />
        <div className="px-6 py-8 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground mb-6">
            Once you log today's signals, we'll help you understand what they might mean for your child's nervous system.
          </p>
          <Button variant="ocean" onClick={() => window.location.href = '/tracker'}>
            Log signals
          </Button>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <PageHeader 
        title="Today's nervous system insight" 
        subtitle="A gentle understanding of what you observed today."
      />

      <div className="px-6 space-y-6">
        {insight && (
          <>
            {/* Insight Title */}
            <div className="text-center animate-fade-in">
              <h2 className="font-display text-xl font-semibold text-foreground">
                {insight.title}
              </h2>
            </div>

            {/* What this might mean */}
            <Card variant="soft" className="p-5 animate-fade-in">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-calm/30 flex items-center justify-center flex-shrink-0">
                  <Brain className="w-5 h-5 text-calm-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-2">
                    What this might mean
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {insight.meaning}
                  </p>
                </div>
              </div>
            </Card>

            {/* How to support */}
            <Card variant="sunrise" className="p-5 animate-fade-in">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-coral/30 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 text-coral-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-coral-foreground mb-2">
                    How to support today
                  </h3>
                  <ul className="space-y-2">
                    {insight.suggestions.map((suggestion, index) => (
                      <li key={index} className="text-coral-foreground/80 leading-relaxed">
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>

            {/* Disclaimer */}
            <Card variant="soft" className="p-4 animate-fade-in-slow">
              <p className="text-center text-sm text-muted-foreground italic">
                Educational only — not medical advice. Every child is unique, and you know yours best.
              </p>
            </Card>
          </>
        )}
      </div>
    </MobileLayout>
  );
};
