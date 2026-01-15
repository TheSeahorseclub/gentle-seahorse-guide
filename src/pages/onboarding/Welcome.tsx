import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen gradient-calm flex flex-col items-center justify-center px-8 py-12">
      {/* Hero illustration area */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-sm">
        <h1 className="font-display text-3xl font-bold text-foreground text-center mb-4 animate-fade-in">
          The Seahorse Club
        </h1>
        
        <p className="text-muted-foreground text-center text-lg leading-relaxed mb-2 animate-fade-in">
          Understanding your little one's signals, together.
        </p>
        
        <p className="text-muted-foreground/80 text-center text-base leading-relaxed animate-fade-in">
          A gentle guide to your child's early development, with no diagnoses, no labels—just calm, supportive understanding.
        </p>
      </div>

      {/* CTA Area */}
      <div className="w-full max-w-sm space-y-4 pb-8 animate-slide-up">
        <Button 
          variant="ocean" 
          size="xl" 
          className="w-full"
          onClick={() => navigate('/onboarding/age')}
        >
          Begin your journey
        </Button>
        
        <p className="text-center text-sm text-muted-foreground">
          Takes about 2 minutes
        </p>
      </div>
    </div>
  );
};
