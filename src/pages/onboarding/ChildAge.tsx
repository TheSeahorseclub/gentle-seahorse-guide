import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { OnboardingProgress } from '@/components/onboarding/OnboardingProgress';
import { useAppStore } from '@/store/appStore';
import { cn } from '@/lib/utils';

const ageRanges = [
  { label: '0–3 months', value: 2 },
  { label: '4–6 months', value: 5 },
  { label: '7–9 months', value: 8 },
  { label: '10–12 months', value: 11 },
  { label: '13–18 months', value: 15 },
  { label: '19–24 months', value: 21 },
  { label: '25–30 months', value: 27 },
  { label: '31–36 months', value: 33 },
];

export const ChildAge: React.FC = () => {
  const navigate = useNavigate();
  const { updateOnboarding } = useAppStore();
  const [selectedAge, setSelectedAge] = useState<number | null>(null);

  const handleContinue = () => {
    if (selectedAge !== null) {
      updateOnboarding({ childAgeMonths: selectedAge });
      navigate('/onboarding/baby-details');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <OnboardingProgress currentStep={0} totalSteps={4} />
      
      <div className="flex-1 px-6 py-4">
        <div className="max-w-sm mx-auto">
          <h1 className="font-display text-2xl font-bold text-foreground mb-2 animate-fade-in">
            How old is your little one?
          </h1>
          <p className="text-muted-foreground text-base mb-8 animate-fade-in">
            This helps us show you relevant developmental windows.
          </p>

          <div className="grid grid-cols-2 gap-3 animate-slide-up">
            {ageRanges.map((range) => (
              <Card
                key={range.value}
                variant={selectedAge === range.value ? 'calm' : 'interactive'}
                className={cn(
                  "p-4 text-center cursor-pointer border-2 transition-all duration-200",
                  selectedAge === range.value 
                    ? "border-primary bg-primary/10" 
                    : "border-transparent"
                )}
                onClick={() => setSelectedAge(range.value)}
              >
                <span className={cn(
                  "font-medium",
                  selectedAge === range.value ? "text-primary" : "text-foreground"
                )}>
                  {range.label}
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
          disabled={selectedAge === null}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
