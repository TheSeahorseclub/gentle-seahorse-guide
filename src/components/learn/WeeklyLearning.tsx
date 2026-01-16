import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Heart, Hand, MessageCircle, Moon, Sparkles, Check, Circle } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { cn } from '@/lib/utils';

interface WeekContent {
  week: number;
  title: string;
  gentleFocus: string;
  icon: React.ElementType;
  introduction: string;
  howToSupport: string[];
  neurodevelopmentalNote: string;
  isStartingPoint?: boolean;
}

const month1Weeks: WeekContent[] = [
  {
    week: 1,
    title: 'Early Connection & Sensory Awareness',
    gentleFocus: 'Emotional bonding and sensory regulation',
    icon: Heart,
    introduction: 'During this first week, babies are adapting to the outside world. Their nervous system is still developing and can be sensitive to sound, light, touch, and emotional tone.',
    howToSupport: [
      'Spend quiet moments looking into your baby\'s eyes and smiling gently',
      'Talk to your baby using a calm, natural voice',
      'Hold your baby close, supporting skin-to-skin contact when possible',
      'Keep stimulation minimal — silence is the key',
    ],
    neurodevelopmentalNote: 'Early eye contact and calm voice tones help the nervous system associate human connection with safety.',
    isStartingPoint: true,
  },
  {
    week: 2,
    title: 'Motor Exploration — Curious Behaviour',
    gentleFocus: 'Natural movement and early motor discovery',
    icon: Hand,
    introduction: 'Babies begin to notice their own bodies and movements. This stage is about exploration, not performance.',
    howToSupport: [
      'Place your baby on their tummy for short moments when awake',
      'Allow free movement on a safe, flat surface',
      'Encourage natural stretching and turning',
      'Avoid forcing positions or structured exercises',
    ],
    neurodevelopmentalNote: 'These early movements support the development of motor pathways and body awareness.',
  },
  {
    week: 3,
    title: 'Cognitive Stimulation Through Interaction',
    gentleFocus: 'Listening, attention, and early communication',
    icon: MessageCircle,
    introduction: 'At this stage, babies often respond more clearly to voices, facial expressions, and familiar sounds.',
    howToSupport: [
      'Talk to your baby during everyday activities',
      'Describe what you are doing using simple, gentle language',
      'Respond when your baby makes sounds or facial expressions',
    ],
    neurodevelopmentalNote: 'Repetition and responsive interaction help the brain begin to recognise patterns and meaning — this will support their first words later.',
  },
  {
    week: 4,
    title: 'Emotional Regulation & Predictability',
    gentleFocus: 'Routine, calmness, and emotional safety',
    icon: Moon,
    introduction: 'By the fourth week, babies often benefit from gentle predictability in their daily experiences.',
    howToSupport: [
      'Create simple, flexible routines for sleep and care',
      'Reduce environmental noise when possible',
      'Use calm rituals such as bathing or gentle massage',
      'Observe what seems to soothe your baby most',
    ],
    neurodevelopmentalNote: 'Predictable routines help the nervous system feel supported and safe.',
  },
];

const CURRENT_MONTH = 1;
const TOTAL_WEEKS = month1Weeks.length;

export const WeeklyLearning: React.FC = () => {
  const [openWeek, setOpenWeek] = useState<string>('week-1');
  const { completedWeeks, markWeekComplete, markWeekIncomplete, isWeekComplete, getMonthProgress } = useAppStore();
  
  const progress = getMonthProgress(CURRENT_MONTH, TOTAL_WEEKS);
  const completedCount = completedWeeks.filter(w => w.startsWith(`${CURRENT_MONTH}-`)).length;

  const handleToggleComplete = (week: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isWeekComplete(CURRENT_MONTH, week)) {
      markWeekIncomplete(CURRENT_MONTH, week);
    } else {
      markWeekComplete(CURRENT_MONTH, week);
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Card */}
      <Card variant="soft" className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-display font-semibold text-foreground">Your Journey</span>
          </div>
          <span className="text-sm text-muted-foreground">
            {completedCount} of {TOTAL_WEEKS} weeks
          </span>
        </div>
        <Progress value={progress} className="h-2 mb-2" />
        <p className="text-xs text-muted-foreground">
          {progress === 0 && "Begin your gentle learning journey"}
          {progress > 0 && progress < 100 && "You're making wonderful progress"}
          {progress === 100 && "🎉 Month 1 complete! Well done."}
        </p>
      </Card>

      {/* Month Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="font-display font-semibold text-foreground">Month 1</h2>
          <p className="text-sm text-muted-foreground">The first steps of connection</p>
        </div>
      </div>

      {/* Gentle guidance */}
      <Card variant="soft" className="p-4 border-l-4 border-l-primary">
        <p className="text-sm text-muted-foreground leading-relaxed">
          <span className="font-medium text-foreground">Start here: Week 1</span> — A gentle place to begin your journey. You can explore all weeks at your own pace.
        </p>
      </Card>

      {/* Weekly Accordion */}
      <Accordion 
        type="single" 
        collapsible 
        value={openWeek}
        onValueChange={setOpenWeek}
        className="space-y-3"
      >
        {month1Weeks.map((weekContent) => {
          const WeekIcon = weekContent.icon;
          const isComplete = isWeekComplete(CURRENT_MONTH, weekContent.week);
          
          return (
            <AccordionItem 
              key={`week-${weekContent.week}`} 
              value={`week-${weekContent.week}`}
              className="border-0"
            >
              <Card 
                variant="interactive" 
                className={cn(
                  "overflow-hidden transition-all",
                  isComplete && "ring-1 ring-primary/30 bg-primary/5"
                )}
              >
                <AccordionTrigger className="px-4 py-4 hover:no-underline [&[data-state=open]]:pb-0">
                  <div className="flex items-center gap-3 text-left w-full">
                    {/* Completion indicator */}
                    <button
                      onClick={(e) => handleToggleComplete(weekContent.week, e)}
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all",
                        isComplete 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-primary/10 text-primary hover:bg-primary/20"
                      )}
                    >
                      {isComplete ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <WeekIcon className="w-5 h-5" />
                      )}
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={cn(
                          "font-display font-semibold",
                          isComplete ? "text-primary" : "text-foreground"
                        )}>
                          Week {weekContent.week}
                        </span>
                        {weekContent.isStartingPoint && !isComplete && (
                          <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-0">
                            A gentle place to start
                          </Badge>
                        )}
                        {isComplete && (
                          <Badge variant="secondary" className="text-xs bg-primary/20 text-primary border-0">
                            Completed
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {weekContent.title}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                
                <AccordionContent className="px-4 pb-4">
                  <div className="pt-4 space-y-4">
                    {/* Gentle Focus */}
                    <div className="bg-muted/50 rounded-lg p-3">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                        Gentle focus
                      </p>
                      <p className="text-sm text-foreground font-medium">
                        {weekContent.gentleFocus}
                      </p>
                    </div>

                    {/* Introduction */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {weekContent.introduction}
                    </p>

                    {/* How to Support */}
                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">
                        How parents can support:
                      </p>
                      <ul className="space-y-2">
                        {weekContent.howToSupport.map((tip, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Neurodevelopmental Note */}
                    <Card variant="sunrise" className="p-3">
                      <p className="text-xs font-medium text-coral-foreground/70 uppercase tracking-wide mb-1">
                        Neurodevelopmental note
                      </p>
                      <p className="text-sm text-coral-foreground/90 leading-relaxed">
                        {weekContent.neurodevelopmentalNote}
                      </p>
                    </Card>

                    {/* Mark Complete Button */}
                    <Button
                      variant={isComplete ? "outline" : "default"}
                      size="sm"
                      className="w-full"
                      onClick={(e) => handleToggleComplete(weekContent.week, e)}
                    >
                      {isComplete ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Completed — tap to undo
                        </>
                      ) : (
                        <>
                          <Circle className="w-4 h-4 mr-2" />
                          Mark as complete
                        </>
                      )}
                    </Button>
                  </div>
                </AccordionContent>
              </Card>
            </AccordionItem>
          );
        })}
      </Accordion>

      {/* Important Note */}
      <Card variant="soft" className="p-4">
        <p className="text-sm font-medium text-foreground mb-2">
          Important note for parents
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
          This content is educational and preventive. It does not diagnose or assess development.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          All guidance is designed to be <span className="font-medium">calm</span>, <span className="font-medium">supportive</span>, and <span className="font-medium">non-clinical</span>.
        </p>
      </Card>
    </div>
  );
};
