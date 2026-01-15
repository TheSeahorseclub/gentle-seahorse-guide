import React, { useState } from 'react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/appStore';
import { Sparkles, Brain, Heart, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// Placeholder insights based on signal patterns
const getPlaceholderInsight = () => ({
  meaning: "Your child's nervous system may be processing new experiences. Unsettled moments often reflect their brain working hard to integrate new learning and sensations.",
  support: "Stay close and calm. Your regulated presence helps their nervous system learn to find balance. Gentle rhythms—like rocking or soft humming—can be especially settling today."
});

export const DailyInsight: React.FC = () => {
  const { getTodaySignal, getTodayInsight, addDailyInsight } = useAppStore();
  const todaySignal = getTodaySignal();
  const existingInsight = getTodayInsight();
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [insight, setInsight] = useState<{ meaning: string; support: string } | null>(
    existingInsight ? { 
      meaning: existingInsight.nervousSystemMeaning, 
      support: existingInsight.supportSuggestion 
    } : null
  );

  const handleGenerateInsight = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newInsight = getPlaceholderInsight();
    setInsight(newInsight);
    
    const today = new Date().toISOString().split('T')[0];
    addDailyInsight({
      id: `insight-${today}`,
      date: today,
      nervousSystemMeaning: newInsight.meaning,
      supportSuggestion: newInsight.support,
      generatedAt: new Date().toISOString(),
    });
    
    setIsGenerating(false);
  };

  if (!todaySignal) {
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
        {insight ? (
          <>
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
                  <p className="text-coral-foreground/80 leading-relaxed">
                    {insight.support}
                  </p>
                </div>
              </div>
            </Card>

            {/* Gentle reminder */}
            <Card variant="soft" className="p-4 animate-fade-in-slow">
              <p className="text-center text-sm text-muted-foreground italic">
                This is educational guidance, not medical advice. Every child is unique, and you know yours best.
              </p>
            </Card>
          </>
        ) : (
          <div className="py-8 text-center animate-fade-in">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full gradient-ocean flex items-center justify-center animate-breathe">
              <Sparkles className="w-12 h-12 text-primary-foreground" />
            </div>
            
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">
              Ready for your insight
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xs mx-auto">
              Based on today's signals, we'll share what this might mean for your child's nervous system.
            </p>
            
            <Button
              variant="ocean"
              size="lg"
              className="min-w-[200px]"
              onClick={handleGenerateInsight}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate today's insight
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};
