import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { OnboardingProgress } from '@/components/onboarding/OnboardingProgress';
import { useAppStore } from '@/store/appStore';
import { cn } from '@/lib/utils';
import type { ConfidenceLevel } from '@/types';

const confidenceLevels: { value: ConfidenceLevel; label: string; emoji: string }[] = [
  { value: 1, label: 'Finding it quite hard', emoji: '💭' },
  { value: 2, label: 'A little unsure', emoji: '🤔' },
  { value: 3, label: 'Growing in confidence', emoji: '🌱' },
  { value: 4, label: 'Feeling quite confident', emoji: '😊' },
  { value: 5, label: 'Feeling very confident', emoji: '✨' },
];

export const Confidence: React.FC = () => {
  const navigate = useNavigate();
  const { updateOnboarding, completeOnboarding } = useAppStore();
  const [selected, setSelected] = useState<ConfidenceLevel | null>(null);

  const handleContinue = () => {
    if (selected) {
      updateOnboarding({ confidenceLevel: selected });
      completeOnboarding();
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <OnboardingProgress currentStep={2} totalSteps={3} />
      
      <div className="flex-1 px-6 py-4">
        <div className="max-w-sm mx-auto">
          <h1 className="font-display text-2xl font-bold text-foreground mb-2 animate-fade-in">
            How confident do you feel understanding your child right now?
          </h1>
          <p className="text-muted-foreground text-base mb-8 animate-fade-in">
            There's no right answer—this helps us understand where to start.
          </p>

          <div className="space-y-3 animate-slide-up">
            {confidenceLevels.map((level) => (
              <button
                key={level.value}
                className={cn(
                  "w-full p-4 rounded-2xl text-left transition-all duration-200 border-2",
                  selected === level.value 
                    ? "bg-primary/10 border-primary" 
                    : "bg-card border-transparent hover:bg-muted/50 shadow-card"
                )}
                onClick={() => setSelected(level.value)}
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{level.emoji}</span>
                  <span className={cn(
                    "font-medium",
                    selected === level.value ? "text-primary" : "text-foreground"
                  )}>
                    {level.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 pb-8">
        <Button
          variant="ocean"
          size="lg"
          className="w-full max-w-sm mx-auto block"
          disabled={selected === null}
          onClick={handleContinue}
        >
          Start exploring
        </Button>
      </div>
    </div>
  );
};
