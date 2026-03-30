import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { OnboardingProgress } from '@/components/onboarding/OnboardingProgress';
import { useAppStore } from '@/store/appStore';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
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
  const queryClient = useQueryClient();
  const { userProfile, updateOnboarding, completeOnboarding } = useAppStore();
  const { user } = useAuth();
  const { toast } = useToast();
  const [selected, setSelected] = useState<ConfidenceLevel | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleContinue = async () => {
    if (!selected || !user) return;
    
    setIsSaving(true);
    
    try {
      const ageMonths = userProfile?.childAgeMonths || 0;
      const babyName = userProfile?.babyName || '';

      // Use RPC function for atomic onboarding
      const { data, error: rpcError } = await supabase.rpc('complete_onboarding', {
        _user_id: user.id,
        _child_age_months: ageMonths,
        _child_name: babyName,
      });

      if (rpcError) throw rpcError;

      const result = data as { family_id: string; child_id: string };

      // Update local store
      updateOnboarding({ confidenceLevel: selected });
      completeOnboarding();

      // Set query cache so routing immediately recognises onboarding as complete
      queryClient.setQueryData(['current-child', user.id], {
        id: result.child_id,
        name: '',
        ageMonths: ageMonths,
        familyId: result.family_id,
        role: 'admin' as const,
      });

      navigate('/onboarding/tour');
    } catch (error) {
      console.error('Onboarding error:', error);
      toast({
        title: 'Something went wrong',
        description: 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <OnboardingProgress currentStep={3} totalSteps={4} />
      
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
                disabled={isSaving}
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
          disabled={selected === null || isSaving}
          onClick={handleContinue}
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Setting up...
            </>
          ) : (
            'Start exploring'
          )}
        </Button>
      </div>
    </div>
  );
};
