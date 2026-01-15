import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/appStore';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export const WeeklyReflection: React.FC = () => {
  const navigate = useNavigate();
  const { addWeeklyReflection } = useAppStore();
  const [confidence, setConfidence] = useState<boolean | null>(null);
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    
    addWeeklyReflection({
      id: `reflection-${weekStart.toISOString().split('T')[0]}`,
      weekStartDate: weekStart.toISOString().split('T')[0],
      confidenceImproved: confidence,
      notes: notes || undefined,
    });
    
    navigate('/home');
  };

  return (
    <MobileLayout showNav={false}>
      <PageHeader 
        title="Weekly reflection" 
        subtitle="A moment to pause and notice how you're feeling as a parent."
      />

      <div className="px-6 space-y-6">
        <Card variant="sunrise" className="p-5 animate-fade-in">
          <h2 className="font-display font-semibold text-coral-foreground mb-4">
            Do you feel more confident supporting your child this week?
          </h2>
          
          <div className="flex gap-3">
            <button
              className={cn(
                "flex-1 py-4 rounded-xl font-medium transition-all duration-200 border-2",
                confidence === true
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground border-border hover:border-primary/50"
              )}
              onClick={() => setConfidence(true)}
            >
              Yes, I do 😊
            </button>
            <button
              className={cn(
                "flex-1 py-4 rounded-xl font-medium transition-all duration-200 border-2",
                confidence === false
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground border-border hover:border-primary/50"
              )}
              onClick={() => setConfidence(false)}
            >
              Not yet 💭
            </button>
          </div>
        </Card>

        <div className="animate-slide-up">
          <label className="block font-medium text-foreground mb-2">
            Anything you'd like to note? (optional)
          </label>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="A moment that stood out, a challenge, or something you noticed..."
            className="min-h-[120px] resize-none"
          />
        </div>

        <Card variant="soft" className="p-4 animate-fade-in-slow">
          <p className="text-center text-sm text-muted-foreground italic leading-relaxed">
            There's no right answer. This reflection is just for you—to notice your own journey as you support your little one.
          </p>
        </Card>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background to-transparent pt-8">
        <div className="flex gap-3 max-w-sm mx-auto">
          <Button
            variant="outline"
            size="lg"
            className="flex-1"
            onClick={() => navigate('/home')}
          >
            Skip for now
          </Button>
          <Button
            variant="ocean"
            size="lg"
            className="flex-1"
            disabled={confidence === null}
            onClick={handleSubmit}
          >
            Save reflection
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};
