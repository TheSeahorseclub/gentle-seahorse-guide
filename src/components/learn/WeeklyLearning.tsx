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
import {
  Heart, Hand, MessageCircle, Moon, Sparkles, Check, Circle,
  Eye, Brain, Smile, Music, Move, Sun,
} from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { cn } from '@/lib/utils';
import { allMonths, type WeekContent } from '@/data/weeklyContent';

const iconMap: Record<string, React.ElementType> = {
  heart: Heart,
  'message-circle': MessageCircle,
  hand: Hand,
  moon: Moon,
  sparkles: Sparkles,
  eye: Eye,
  brain: Brain,
  smile: Smile,
  music: Music,
  move: Move,
  sun: Sun,
  baby: Heart,
};

export const WeeklyLearning: React.FC = () => {
  const [openItem, setOpenItem] = useState<string>('1-1');
  const { completedWeeks, markWeekComplete, markWeekIncomplete, isWeekComplete, getMonthProgress } = useAppStore();

  const totalAllWeeks = allMonths.reduce((sum, m) => sum + m.weeks.length, 0);
  const totalCompleted = completedWeeks.length;
  const overallProgress = Math.round((totalCompleted / totalAllWeeks) * 100);

  const handleToggleComplete = (month: number, week: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isWeekComplete(month, week)) {
      markWeekIncomplete(month, week);
    } else {
      markWeekComplete(month, week);
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <Card variant="soft" className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-display font-semibold text-foreground">Your Journey</span>
          </div>
          <span className="text-sm text-muted-foreground">
            {totalCompleted} of {totalAllWeeks} weeks
          </span>
        </div>
        <Progress value={overallProgress} className="h-2 mb-2" />
        <p className="text-xs text-muted-foreground">
          {overallProgress === 0 && "Begin your gentle learning journey"}
          {overallProgress > 0 && overallProgress < 100 && "You're making wonderful progress"}
          {overallProgress === 100 && "🎉 All months complete! Well done."}
        </p>
      </Card>

      {/* Gentle guidance */}
      <Card variant="soft" className="p-4 border-l-4 border-l-primary">
        <p className="text-sm text-muted-foreground leading-relaxed">
          <span className="font-medium text-foreground">Start here: Month 1, Week 1</span> — A gentle place to begin your journey. You can explore all weeks at your own pace.
        </p>
      </Card>

      {/* Months */}
      {allMonths.map((monthData) => {
        const monthWeekCount = monthData.weeks.length;
        const monthProgress = getMonthProgress(monthData.month, monthWeekCount);
        const monthCompletedCount = completedWeeks.filter(w => w.startsWith(`${monthData.month}-`)).length;

        return (
          <div key={monthData.month} className="space-y-4">
            {/* Month Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-display font-semibold text-foreground">{monthData.title}</h2>
                  <p className="text-sm text-muted-foreground">{monthData.subtitle}</p>
                </div>
              </div>
              <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-0">
                {monthCompletedCount}/{monthWeekCount}
              </Badge>
            </div>

            {monthProgress > 0 && (
              <Progress value={monthProgress} className="h-1.5" />
            )}

            {/* Weekly Accordion */}
            <Accordion
              type="single"
              collapsible
              value={openItem}
              onValueChange={setOpenItem}
              className="space-y-3"
            >
              {monthData.weeks.map((weekContent) => {
                const WeekIcon = iconMap[weekContent.iconName] || Heart;
                const isComplete = isWeekComplete(monthData.month, weekContent.week);
                const itemKey = `${monthData.month}-${weekContent.week}`;

                return (
                  <AccordionItem key={itemKey} value={itemKey} className="border-0">
                    <Card
                      variant="interactive"
                      className={cn(
                        "overflow-hidden transition-all",
                        isComplete && "ring-1 ring-primary/30 bg-primary/5"
                      )}
                    >
                      <AccordionTrigger className="px-4 py-4 hover:no-underline [&[data-state=open]]:pb-0">
                        <div className="flex items-center gap-3 text-left w-full">
                          <button
                            onClick={(e) => handleToggleComplete(monthData.month, weekContent.week, e)}
                            className={cn(
                              "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all",
                              isComplete
                                ? "bg-primary text-primary-foreground"
                                : "bg-primary/10 text-primary hover:bg-primary/20"
                            )}
                          >
                            {isComplete ? <Check className="w-5 h-5" /> : <WeekIcon className="w-5 h-5" />}
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
                          {weekContent.introduction.split('\n\n').map((para, i) => (
                            <p key={i} className="text-sm text-muted-foreground leading-relaxed">
                              {para}
                            </p>
                          ))}

                          {/* Content Sections */}
                          {weekContent.sections.map((section, idx) => (
                            <div key={idx}>
                              <p className="text-sm font-medium text-foreground mb-2">
                                {section.label}
                              </p>
                              <ul className="space-y-2">
                                {section.points.map((point, pIdx) => (
                                  <li key={pIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                    <span>{point}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}

                          {/* Weekly CTA */}
                          {weekContent.weeklyCta && (
                            <Card variant="soft" className="p-3 border-l-4 border-l-primary">
                              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                                This week's focus
                              </p>
                              <p className="text-sm text-foreground leading-relaxed">
                                {weekContent.weeklyCta}
                              </p>
                            </Card>
                          )}

                          {/* Extra Guidance */}
                          {weekContent.extraGuidance && (
                            <div className="bg-muted/30 rounded-lg p-3">
                              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                                {weekContent.extraGuidance.title}
                              </p>
                              <ul className="space-y-2">
                                {weekContent.extraGuidance.points.map((point, pIdx) => (
                                  <li key={pIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                    <span>{point}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

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
                            onClick={(e) => handleToggleComplete(monthData.month, weekContent.week, e)}
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

            {/* Month closing note */}
            {monthData.closingNote && (
              <Card variant="soft" className="p-4">
                {monthData.closingNote.split('\n\n').map((para, i) => (
                  <p key={i} className="text-sm text-muted-foreground leading-relaxed mb-2 last:mb-0">
                    {para}
                  </p>
                ))}
              </Card>
            )}
          </div>
        );
      })}

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
