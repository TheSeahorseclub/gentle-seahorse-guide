import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCurrentChild } from '@/hooks/useCurrentChild';
import { useContentByStage, useRecommendedThisWeek } from '@/hooks/useContent';
import {
  AGE_STAGES,
  CONTENT_SECTIONS,
  getCurrentWeek,
  getStageForAgeMonths,
  type AgeStageId,
} from '@/utils/ageStages';
import {
  Brain, Apple, Moon, Heart, Sparkles, ShieldCheck, Palette,
  GraduationCap, PlayCircle, ChevronRight, Lock, BookOpen,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const ICONS = { Brain, Apple, Moon, Heart, Sparkles, ShieldCheck, Palette, GraduationCap, PlayCircle };

export const Content: React.FC = () => {
  const navigate = useNavigate();
  const { data: currentChild } = useCurrentChild();
  const ageMonths = currentChild?.ageMonths ?? 0;
  const currentStage = useMemo(() => getStageForAgeMonths(ageMonths), [ageMonths]);
  const currentWeek = useMemo(() => getCurrentWeek(ageMonths), [ageMonths]);

  const [selectedStage, setSelectedStage] = useState<AgeStageId>(currentStage.id);
  const { data: stageContent = [], isLoading } = useContentByStage(selectedStage);
  const { data: recommended = [] } = useRecommendedThisWeek(currentStage.id, currentWeek);

  const countsBySection = useMemo(() => {
    const map: Record<string, number> = {};
    stageContent.forEach((c) => {
      if (c.section) map[c.section] = (map[c.section] || 0) + 1;
    });
    return map;
  }, [stageContent]);

  return (
    <MobileLayout>
      <div className="px-5 pt-8 pb-6 max-w-lg mx-auto">
        {/* Header */}
        <header className="mb-6">
          <p className="text-sm text-muted-foreground font-medium">Content for {currentChild?.name || 'your baby'}</p>
          <h1 className="font-display text-3xl font-bold text-foreground mt-1">Learning Library</h1>
        </header>

        {/* Progress timeline */}
        <section className="mb-6" aria-label="Developmental stage timeline">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Stage timeline</h2>
            <Badge variant="secondary" className="text-[10px]">Now: {currentStage.short}</Badge>
          </div>
          <div className="overflow-x-auto -mx-5 px-5">
            <div className="flex gap-2 pb-1 min-w-max">
              {AGE_STAGES.map((stage) => {
                const isCurrent = stage.id === currentStage.id;
                const isSelected = stage.id === selectedStage;
                return (
                  <button
                    key={stage.id}
                    onClick={() => setSelectedStage(stage.id)}
                    className={cn(
                      'flex flex-col items-center gap-1.5 px-3 py-2 rounded-xl border transition-all min-w-[72px]',
                      isSelected
                        ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                        : 'bg-card border-border text-foreground hover:bg-muted/50',
                    )}
                  >
                    <span className={cn(
                      'w-2 h-2 rounded-full',
                      isCurrent ? 'bg-emerald-500' : isSelected ? 'bg-primary-foreground' : 'bg-muted-foreground/40',
                    )} />
                    <span className="text-xs font-medium whitespace-nowrap">{stage.short}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Recommended this week */}
        {selectedStage === currentStage.id && recommended.length > 0 && (
          <section className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-primary" />
              <h2 className="font-display text-base font-semibold text-foreground">Recommended this week</h2>
            </div>
            <div className="flex gap-3 overflow-x-auto -mx-5 px-5 pb-2">
              {recommended.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigate(`/content/item/${item.id}`)}
                  className="text-left min-w-[240px] max-w-[240px] bg-card border border-border rounded-2xl p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-1 text-[10px] uppercase tracking-wide text-primary font-semibold mb-2">
                    <Sparkles className="w-3 h-3" /> For week {currentWeek}
                  </div>
                  <h3 className="font-display font-semibold text-foreground text-sm leading-snug line-clamp-2">{item.title}</h3>
                  {item.description && (
                    <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">{item.description}</p>
                  )}
                  {item.access_level === 'premium' && (
                    <Badge variant="outline" className="mt-3 text-[10px] gap-1">
                      <Lock className="w-2.5 h-2.5" /> Premium
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Section grid */}
        <section>
          <h2 className="font-display text-base font-semibold text-foreground mb-3">
            Browse {AGE_STAGES.find((s) => s.id === selectedStage)?.label}
          </h2>
          {isLoading ? (
            <div className="py-12 text-center text-sm text-muted-foreground">Loading content…</div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {CONTENT_SECTIONS.map((sec) => {
                const Icon = ICONS[sec.iconName];
                const count = countsBySection[sec.id] || 0;
                return (
                  <button
                    key={sec.id}
                    onClick={() => navigate(`/content/${selectedStage}/${sec.id}`)}
                    className="text-left bg-card border border-border rounded-2xl p-4 hover:shadow-md transition-all hover:-translate-y-0.5"
                  >
                    <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center mb-3', sec.tint)}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-semibold text-sm text-foreground leading-tight">{sec.label}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{count} {count === 1 ? 'item' : 'items'}</p>
                  </button>
                );
              })}
            </div>
          )}

          {!isLoading && stageContent.length === 0 && (
            <Card className="mt-4 p-6 text-center border-dashed">
              <BookOpen className="w-8 h-8 mx-auto text-muted-foreground/60 mb-2" />
              <p className="text-sm text-muted-foreground">No content yet for this stage — check back soon.</p>
            </Card>
          )}
        </section>
      </div>
    </MobileLayout>
  );
};

export default Content;
