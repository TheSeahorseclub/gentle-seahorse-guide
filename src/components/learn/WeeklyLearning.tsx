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
    title: 'Safety, Sleep, and First Connections',
    gentleFocus: 'Respecting natural rhythms and building early connection',
    icon: Heart,
    introduction: 'During this first week, your baby will be very sleepy and is adapting to life outside the womb. The nervous system is still highly immature, and regulation depends almost entirely on the caregiver. Focus on respecting your baby\'s natural rhythms. There is no need to overstimulate.',
    howToSupport: [
      'When interacting, keep your face approximately 30 cm from your baby\'s face — their vision is still blurred, and this distance supports visual comfort',
      'Make eye contact when possible and smile gently',
      'Speak slowly, calmly, and rhythmically',
      'No structured motor activities are required this week — gentle handling, holding, and skin-to-skin contact are sufficient',
    ],
    neurodevelopmentalNote: 'Research in early social neuroscience shows that face-to-face interaction activates early social brain networks, supporting emotional security and future communication.',
    isStartingPoint: true,
  },
  {
    week: 2,
    title: 'The Human Face as the First Toy',
    gentleFocus: 'Facial expression and melodic interaction',
    icon: MessageCircle,
    introduction: 'Your baby\'s favourite "toy" is your face. This week is about playful, gentle interaction through expression and voice.',
    howToSupport: [
      'Raise your eyebrows, open and close your mouth, show your tongue, blink slowly',
      'Speak using a slightly exaggerated, melodic tone (often called "parentese")',
      'Allow pauses between interactions so your baby can process and respond',
    ],
    neurodevelopmentalNote: 'Studies show that babies are biologically primed to respond to facial expressions and rhythmic speech, which supports early language and social development.',
  },
  {
    week: 3,
    title: 'Patterns, Voice, and Familiarity',
    gentleFocus: 'Repetition, language exposure, and early motor exploration',
    icon: Hand,
    introduction: 'Your baby is beginning to notice patterns in sound and interaction. Familiar voices and consistent words help build a sense of safety.',
    howToSupport: [
      'Choose a small group of simple words and repeat them consistently throughout the week',
      'Read aloud stories you used during pregnancy — familiarity supports neural recognition and emotional safety',
      'Introduce tummy time for short periods, always supervised',
      'Place your baby on their tummy to encourage head lifting and upper-body strength',
    ],
    neurodevelopmentalNote: 'Neuroscience research shows that repetition strengthens neural pathways, especially in early language networks.',
  },
  {
    week: 4,
    title: 'Hands, Discovery, and First Rituals',
    gentleFocus: 'Hand discovery, early grasping, and predictable routines',
    icon: Moon,
    introduction: 'This is a period of hand discovery. Your baby is also ready for the gentle introduction of bedtime rituals that support their developing nervous system.',
    howToSupport: [
      'Offer rattles or soft objects that can safely be brought to the mouth — always prefer items that are petrol-free',
      'Encourage reaching and grasping movements',
      'Continue facial games and allow pauses so your baby can respond',
      'Begin introducing a simple baby bedtime story routine',
      'Create a predictable sleep ritual: bath at the same time, gentle hand and feet massage, dim lights, calm voice or soft music',
    ],
    neurodevelopmentalNote: 'Consistent rituals help regulate stress hormones and support sleep-wake cycles, according to infant sleep research.',
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
