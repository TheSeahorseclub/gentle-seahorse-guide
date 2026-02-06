import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/appStore';
import { useAuth } from '@/contexts/AuthContext';
import { useCurrentChild } from '@/hooks/useCurrentChild';
import { Moon, MessageCircle, Utensils, Heart, RefreshCw, Check, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { SleepSignal, CryingSignal, FeedingSignal, InteractionSignal, TransitionsSignal } from '@/types';

type SignalCategory = 'sleep' | 'crying' | 'feeding' | 'interaction' | 'transitions';

interface SignalOption<T> {
  value: T;
  label: string;
  description: string;
}

const sleepOptions: SignalOption<SleepSignal['quality']>[] = [
  { value: 'restful', label: 'Restful', description: 'Settled and calm sleep' },
  { value: 'mixed', label: 'Mixed', description: 'Some settled, some unsettled' },
  { value: 'unsettled', label: 'Unsettled', description: 'Difficulty settling' },
];

const cryingOptions: SignalOption<CryingSignal['level']>[] = [
  { value: 'calm-day', label: 'Calm day', description: 'Mostly content today' },
  { value: 'some-fussiness', label: 'Some fussiness', description: 'Occasional unsettled moments' },
  { value: 'more-than-usual', label: 'More than usual', description: 'Needed extra comfort' },
];

const feedingOptions: SignalOption<FeedingSignal['pattern']>[] = [
  { value: 'settled', label: 'Settled', description: 'Feeding went smoothly' },
  { value: 'variable', label: 'Variable', description: 'Some good, some challenging' },
  { value: 'challenging', label: 'Challenging', description: 'Feeding was difficult today' },
];

const interactionOptions: SignalOption<InteractionSignal['engagement']>[] = [
  { value: 'connected', label: 'Connected', description: 'Engaged and responsive' },
  { value: 'quiet', label: 'Quiet', description: 'More withdrawn than usual' },
  { value: 'seeking-comfort', label: 'Seeking comfort', description: 'Wanted to be close' },
];

const transitionsOptions: SignalOption<TransitionsSignal['ease']>[] = [
  { value: 'smooth', label: 'Smooth', description: 'Adapted easily to changes' },
  { value: 'needs-support', label: 'Needs support', description: 'Required extra help' },
  { value: 'finding-it-hard', label: 'Finding it hard', description: 'Struggled with changes' },
];

const categories: { key: SignalCategory; label: string; icon: React.ElementType }[] = [
  { key: 'sleep', label: 'Sleep', icon: Moon },
  { key: 'crying', label: 'Crying', icon: MessageCircle },
  { key: 'feeding', label: 'Feeding', icon: Utensils },
  { key: 'interaction', label: 'Interaction', icon: Heart },
  { key: 'transitions', label: 'Transitions', icon: RefreshCw },
];

export const SignalTracker: React.FC = () => {
  const navigate = useNavigate();
  const { addDailySignal, getTodaySignal } = useAppStore();
  const { user } = useAuth();
  const { data: currentChild } = useCurrentChild();
  const existingSignal = getTodaySignal();
  const { toast } = useToast();

  const [currentCategory, setCurrentCategory] = useState<SignalCategory>('sleep');
  const [signals, setSignals] = useState({
    sleep: existingSignal?.sleep?.quality || null as SleepSignal['quality'] | null,
    crying: existingSignal?.crying?.level || null as CryingSignal['level'] | null,
    feeding: existingSignal?.feeding?.pattern || null as FeedingSignal['pattern'] | null,
    interaction: existingSignal?.interaction?.engagement || null as InteractionSignal['engagement'] | null,
    transitions: existingSignal?.transitions?.ease || null as TransitionsSignal['ease'] | null,
  });
  const [savedSignals, setSavedSignals] = useState<Set<SignalCategory>>(new Set());
  const [isSaving, setIsSaving] = useState(false);

  const currentCategoryIndex = categories.findIndex(c => c.key === currentCategory);
  const isLastCategory = currentCategoryIndex === categories.length - 1;
  const allComplete = Object.values(signals).every(v => v !== null);
  const hasAnySavedSignal = savedSignals.size > 0;

  const getOptionsForCategory = (category: SignalCategory) => {
    switch (category) {
      case 'sleep': return sleepOptions;
      case 'crying': return cryingOptions;
      case 'feeding': return feedingOptions;
      case 'interaction': return interactionOptions;
      case 'transitions': return transitionsOptions;
    }
  };

  const getLabelForValue = (category: SignalCategory, value: string): string => {
    const options = getOptionsForCategory(category);
    return options.find(opt => opt.value === value)?.label || value;
  };

  const handleSelect = async (value: string) => {
    if (!user || !currentChild) return;

    setSignals(prev => ({ ...prev, [currentCategory]: value }));
    setIsSaving(true);

    try {
      const { error } = await supabase.from('signal_entries').insert({
        user_id: user.id,
        child_id: currentChild.id,
        family_id: currentChild.familyId,
        signal_type: currentCategory,
        description: getLabelForValue(currentCategory, value),
      });

      if (error) throw error;

      setSavedSignals(prev => new Set([...prev, currentCategory]));
    } catch (error) {
      console.error('Error saving signal:', error);
      toast({
        title: 'Could not save signal',
        description: 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleNext = () => {
    if (isLastCategory) {
      const today = new Date().toISOString().split('T')[0];
      addDailySignal({
        id: `signal-${today}`,
        date: today,
        sleep: { quality: signals.sleep as SleepSignal['quality'] },
        crying: { level: signals.crying as CryingSignal['level'] },
        feeding: { pattern: signals.feeding as FeedingSignal['pattern'] },
        interaction: { engagement: signals.interaction as InteractionSignal['engagement'] },
        transitions: { ease: signals.transitions as TransitionsSignal['ease'] },
      });
      navigate('/insight');
    } else {
      setCurrentCategory(categories[currentCategoryIndex + 1].key);
    }
  };

  const handlePrevious = () => {
    if (currentCategoryIndex > 0) {
      setCurrentCategory(categories[currentCategoryIndex - 1].key);
    }
  };

  const CurrentIcon = categories[currentCategoryIndex].icon;
  const currentOptions = getOptionsForCategory(currentCategory);
  const currentValue = signals[currentCategory];

  return (
    <MobileLayout>
      <PageHeader 
        title="Today's signals" 
        subtitle="How has your little one been today? There are no wrong answers."
      />

      <div className="px-6">
        {/* Category tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 -mx-6 px-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = currentCategory === cat.key;
            const isComplete = signals[cat.key] !== null;
            
            return (
              <button
                key={cat.key}
                onClick={() => setCurrentCategory(cat.key)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 flex-shrink-0",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : isComplete 
                      ? "bg-muted text-foreground"
                      : "bg-card text-muted-foreground border border-border"
                )}
              >
                {isComplete && !isActive ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Icon className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Current category header */}
        <div className="flex items-center gap-3 mb-4 animate-fade-in">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <CurrentIcon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="font-display font-semibold text-lg text-foreground">
              {categories[currentCategoryIndex].label}
            </h2>
            <p className="text-sm text-muted-foreground">
              How was this today?
            </p>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-8 animate-slide-up">
          {currentOptions.map((option) => (
            <Card
              key={option.value}
              variant={currentValue === option.value ? 'calm' : 'interactive'}
              className={cn(
                "p-4 cursor-pointer border-2 transition-all duration-200",
                currentValue === option.value 
                  ? "border-primary bg-primary/10" 
                  : "border-transparent"
              )}
              onClick={() => handleSelect(option.value)}
            >
              <p className={cn(
                "font-medium mb-1",
                currentValue === option.value ? "text-primary" : "text-foreground"
              )}>
                {option.label}
              </p>
              <p className="text-sm text-muted-foreground">
                {option.description}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="fixed bottom-24 left-0 right-0 px-6 pb-4 bg-gradient-to-t from-background via-background to-transparent pt-8">
        <div className="flex gap-3 max-w-sm mx-auto">
          {currentCategoryIndex > 0 && (
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={handlePrevious}
            >
              Back
            </Button>
          )}
          <Button
            variant="ocean"
            size="lg"
            className="flex-1"
            disabled={currentValue === null || isSaving || !hasAnySavedSignal}
            onClick={handleNext}
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : null}
            {isLastCategory ? (allComplete ? 'See insight' : 'Finish') : 'Next'}
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};
