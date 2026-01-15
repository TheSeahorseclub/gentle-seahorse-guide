import React from 'react';
import { cn } from '@/lib/utils';

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
}

export const OnboardingProgress: React.FC<OnboardingProgressProps> = ({
  currentStep,
  totalSteps
}) => {
  return (
    <div className="flex items-center gap-2 px-6 py-4">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "h-1.5 rounded-full flex-1 transition-all duration-500",
            index < currentStep 
              ? "bg-primary" 
              : index === currentStep 
                ? "bg-primary/40"
                : "bg-muted"
          )}
        />
      ))}
    </div>
  );
};
