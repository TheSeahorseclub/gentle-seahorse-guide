import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { OnboardingProgress } from '@/components/onboarding/OnboardingProgress';
import { useAppStore } from '@/store/appStore';
import { cn } from '@/lib/utils';
import type { CaregiverType } from '@/types';

const caregiverOptions: { label: string; value: CaregiverType }[] = [
  { label: 'Mother', value: 'mother' },
  { label: 'Father', value: 'father' },
  { label: 'Grandparent', value: 'grandparent' },
  { label: 'Other family member', value: 'other-family' },
  { label: 'Foster carer', value: 'foster-carer' },
  { label: 'Other', value: 'other' },
];

export const CaregiverTypePage: React.FC = () => {
  const navigate = useNavigate();
  const { updateOnboarding } = useAppStore();
  const [selected, setSelected] = useState<CaregiverType | null>(null);

  const handleContinue = () => {
    if (selected) {
      updateOnboarding({ caregiverType: selected });
      navigate('/onboarding/confidence');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <OnboardingProgress currentStep={2} totalSteps={4} />
      
      <div className="flex-1 px-6 py-4">
        <div className="max-w-sm mx-auto">
          <h1 className="font-display text-2xl font-bold text-foreground mb-2 animate-fade-in">
            What's your role?
          </h1>
          <p className="text-muted-foreground text-base mb-8 animate-fade-in">
            This helps us tailor the experience for you.
          </p>

          <div className="space-y-3 animate-slide-up">
            {caregiverOptions.map((option) => (
              <Card
                key={option.value}
                variant={selected === option.value ? 'calm' : 'interactive'}
                className={cn(
                  "p-4 cursor-pointer border-2 transition-all duration-200",
                  selected === option.value 
                    ? "border-primary bg-primary/10" 
                    : "border-transparent"
                )}
                onClick={() => setSelected(option.value)}
              >
                <span className={cn(
                  "font-medium",
                  selected === option.value ? "text-primary" : "text-foreground"
                )}>
                  {option.label}
                </span>
              </Card>
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
          Continue
        </Button>
      </div>
    </div>
  );
};
