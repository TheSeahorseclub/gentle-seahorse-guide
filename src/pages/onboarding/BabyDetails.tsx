import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { OnboardingProgress } from '@/components/onboarding/OnboardingProgress';
import { useAppStore } from '@/store/appStore';

export const BabyDetails: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile, updateOnboarding } = useAppStore();
  const [babyName, setBabyName] = useState('');

  const ageMonths = userProfile?.childAgeMonths ?? 0;
  const ageWeeks = userProfile?.childAgeWeeks ?? 0;
  const totalWeeks = Math.round(ageMonths * 4.33) + ageWeeks;

  const handleContinue = () => {
    updateOnboarding({ babyName: babyName.trim() || undefined });
    navigate('/onboarding/caregiver');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <OnboardingProgress currentStep={1} totalSteps={4} />

      <div className="flex-1 px-6 py-4">
        <div className="max-w-sm mx-auto">
          <h1 className="font-display text-2xl font-bold text-foreground mb-2 animate-fade-in">
            Tell us about your baby
          </h1>
          <p className="text-muted-foreground text-base mb-8 animate-fade-in">
            A name or nickname helps us personalise your experience.
          </p>

          <div className="space-y-6 animate-slide-up">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Baby's name or nickname
              </label>
              <Input
                placeholder="e.g. Leo, little one, baby..."
                value={babyName}
                onChange={(e) => setBabyName(e.target.value)}
                maxLength={50}
                className="text-base"
              />
              <p className="text-xs text-muted-foreground mt-1">Optional — you can always change this later</p>
            </div>

            <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10">
              <p className="text-sm text-muted-foreground mb-1">Based on your selection</p>
              <p className="font-display text-lg font-semibold text-foreground">
                ~{ageMonths} months old · Week {weeks}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                We'll tailor content to this developmental stage.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 pb-8">
        <Button
          variant="ocean"
          size="lg"
          className="w-full max-w-sm mx-auto block"
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
