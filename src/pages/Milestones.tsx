import React from 'react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/card';
import { useAppStore } from '@/store/appStore';
import { cn } from '@/lib/utils';

const developmentWindows = [
  { 
    ageRange: [0, 3], 
    title: 'Finding safety',
    focus: 'Regulation and co-regulation', 
    description: 'Your child is learning to feel safe in the world through your calm, consistent presence. Their nervous system is beginning to understand rhythms of rest, feeding, and comfort.',
    whatToNotice: ['Response to your voice', 'Settling patterns', 'Eye contact moments']
  },
  { 
    ageRange: [4, 6], 
    title: 'First connections',
    focus: 'Social smiles and sounds', 
    description: 'Early smiles and coos are building the foundations of communication. Your child is discovering that their expressions create responses in you.',
    whatToNotice: ['Social smiles', 'Babbling sounds', 'Reaching towards you']
  },
  { 
    ageRange: [7, 9], 
    title: 'Safe exploration',
    focus: 'Curiosity with security', 
    description: 'Curiosity is growing, always supported by the knowledge that you are nearby. Object exploration and cause-and-effect learning begin.',
    whatToNotice: ['Looking back to you', 'Exploring objects', 'Stranger awareness']
  },
  { 
    ageRange: [10, 12], 
    title: 'Moving forward',
    focus: 'Physical independence', 
    description: 'Physical exploration expands their world—crawling, cruising, perhaps first steps. Each new movement is an act of brave exploration.',
    whatToNotice: ['Movement attempts', 'Pointing and showing', 'Simple gestures']
  },
  { 
    ageRange: [13, 18], 
    title: 'Words and feelings',
    focus: 'Language emerges', 
    description: 'First words appear alongside big emotions. Your child is learning that language can express what they feel inside.',
    whatToNotice: ['First words', 'Understanding instructions', 'Emotional expressions']
  },
  { 
    ageRange: [19, 24], 
    title: 'I am me',
    focus: 'Self-awareness grows', 
    description: 'Your child begins to understand themselves as a separate person with their own will. This is both wonderful and challenging.',
    whatToNotice: ['Using "me" and "mine"', 'Asserting preferences', 'Recognising themselves']
  },
  { 
    ageRange: [25, 30], 
    title: 'Playing together',
    focus: 'Social play emerges', 
    description: 'Parallel play becomes interactive. Your child is learning the complex dance of playing with others.',
    whatToNotice: ['Interest in other children', 'Sharing attempts', 'Pretend play begins']
  },
  { 
    ageRange: [31, 36], 
    title: 'Imagination blooms',
    focus: 'Abstract thinking', 
    description: 'Imagination and empathy flourish. Your child can hold stories in mind and begin to understand others have feelings too.',
    whatToNotice: ['Complex pretend play', 'Showing concern for others', 'Asking "why" questions']
  },
];

export const Milestones: React.FC = () => {
  const { userProfile } = useAppStore();
  const childAge = userProfile?.childAgeMonths || 0;

  return (
    <MobileLayout>
      <PageHeader 
        title="Living milestones" 
        subtitle="Development happens in windows, not checkboxes. Every child moves at their own pace."
      />

      <div className="px-6 space-y-4 pb-8">
        {developmentWindows.map((window, index) => {
          const isCurrent = childAge >= window.ageRange[0] && childAge <= window.ageRange[1];
          const isPast = childAge > window.ageRange[1];
          
          return (
            <Card 
              key={index}
              variant={isCurrent ? 'sunrise' : 'default'}
              className={cn(
                "p-5 transition-all duration-300",
                isCurrent && "ring-2 ring-coral/30",
                isPast && "opacity-70"
              )}
            >
              <div className="flex items-start gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold",
                  isCurrent 
                    ? "bg-coral text-coral-foreground" 
                    : isPast 
                      ? "bg-muted text-muted-foreground"
                      : "bg-primary/10 text-primary"
                )}>
                  {window.ageRange[0]}–{window.ageRange[1]}m
                </div>
                
                <div className="flex-1">
                  {isCurrent && (
                    <span className="inline-block text-xs font-medium text-coral-foreground bg-coral/20 px-2 py-0.5 rounded-full mb-2">
                      Current window
                    </span>
                  )}
                  
                  <h3 className={cn(
                    "font-display font-semibold mb-1",
                    isCurrent ? "text-coral-foreground" : "text-foreground"
                  )}>
                    {window.title}
                  </h3>
                  
                  <p className={cn(
                    "text-sm font-medium mb-2",
                    isCurrent ? "text-coral-foreground/80" : "text-primary"
                  )}>
                    {window.focus}
                  </p>
                  
                  <p className={cn(
                    "text-sm leading-relaxed mb-3",
                    isCurrent ? "text-coral-foreground/70" : "text-muted-foreground"
                  )}>
                    {window.description}
                  </p>
                  
                  <div className={cn(
                    "text-xs",
                    isCurrent ? "text-coral-foreground/60" : "text-muted-foreground/80"
                  )}>
                    <span className="font-medium">You might notice: </span>
                    {window.whatToNotice.join(' • ')}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
        
        <Card variant="soft" className="p-4 mt-6">
          <p className="text-center text-sm text-muted-foreground italic leading-relaxed">
            These windows are guides, not deadlines. Development is a gentle unfolding, not a race.
          </p>
        </Card>
      </div>
    </MobileLayout>
  );
};
