import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { OnboardingProgress } from '@/components/onboarding/OnboardingProgress';
import { useAppStore } from '@/store/appStore';

export const ChildAge: React.FC = () => {
  const navigate = useNavigate();
  const { updateOnboarding } = useAppStore();
  const [months, setMonths] = useState('');
  const [weeks, setWeeks] = useState('');

  const monthsNum = parseInt(months) || 0;
  const weeksNum = parseInt(weeks) || 0;
  const isValid = monthsNum >= 0 && monthsNum <= 36 && weeksNum >= 0 && weeksNum <= 4 && (monthsNum > 0 || weeksNum > 0);
  const totalWeeks = Math.round(monthsNum * 4.33) + weeksNum;

  const handleContinue = () => {
    if (isValid) {
      updateOnboarding({ childAgeMonths: monthsNum, childAgeWeeks: weeksNum });
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
            Tell us the exact age so we can match week-by-week content.
          </p>

          <div className="space-y-5 animate-slide-up">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Months
                </label>
                <Input
                  type="number"
                  min={0}
                  max={36}
                  placeholder="0"
                  value={months}
                  onChange={(e) => setMonths(e.target.value)}
                  className="text-base text-center"
                />
                <p className="text-xs text-muted-foreground mt-1 text-center">0–36</p>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Weeks
                </label>
                <Input
                  type="number"
                  min={0}
                  max={4}
                  placeholder="0"
                  value={weeks}
                  onChange={(e) => setWeeks(e.target.value)}
                  className="text-base text-center"
                />
                <p className="text-xs text-muted-foreground mt-1 text-center">0–4</p>
              </div>
            </div>

            {(monthsNum > 0 || weeksNum > 0) && (
              <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10 animate-fade-in">
                <p className="text-sm text-muted-foreground mb-1">Your baby's age</p>
                <p className="font-display text-lg font-semibold text-foreground">
                  {monthsNum} {monthsNum === 1 ? 'month' : 'months'} and {weeksNum} {weeksNum === 1 ? 'week' : 'weeks'}
                </p>
                <p className="text-sm text-primary font-medium mt-1">
                  ≈ Week {totalWeeks} of development
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-6 pb-8">
        <Button
          variant="ocean"
          size="lg"
          className="w-full max-w-sm mx-auto block"
          disabled={!isValid}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
