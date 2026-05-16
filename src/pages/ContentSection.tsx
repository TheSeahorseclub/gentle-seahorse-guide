import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Lock, FileText } from 'lucide-react';
import { useContentByStage } from '@/hooks/useContent';
import { getSectionById, getStageById, type AgeStageId, type SectionId } from '@/utils/ageStages';

export const ContentSection: React.FC = () => {
  const navigate = useNavigate();
  const { stage, section } = useParams<{ stage: AgeStageId; section: SectionId }>();
  const stageInfo = stage ? getStageById(stage) : undefined;
  const sectionInfo = section ? getSectionById(section) : undefined;
  const { data: all = [], isLoading } = useContentByStage(stage);

  const items = useMemo(() => all.filter((c) => c.section === section), [all, section]);

  return (
    <MobileLayout>
      <div className="px-5 pt-6 pb-10 max-w-lg mx-auto">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/content')}
          className="-ml-2 mb-3 gap-1 text-muted-foreground"
        >
          <ChevronLeft className="w-4 h-4" /> All sections
        </Button>

        <header className="mb-6">
          <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">
            {stageInfo?.label}
          </p>
          <h1 className="font-display text-2xl font-bold text-foreground mt-1">
            {sectionInfo?.label || 'Content'}
          </h1>
          {sectionInfo?.description && (
            <p className="text-sm text-muted-foreground mt-1">{sectionInfo.description}</p>
          )}
        </header>

        {isLoading ? (
          <div className="py-12 text-center text-sm text-muted-foreground">Loading…</div>
        ) : items.length === 0 ? (
          <Card className="p-6 text-center border-dashed">
            <FileText className="w-8 h-8 mx-auto text-muted-foreground/60 mb-2" />
            <p className="text-sm text-muted-foreground">Nothing here yet — new content is added regularly.</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(`/content/item/${item.id}`)}
                className="w-full text-left bg-card border border-border rounded-2xl p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h2 className="font-display font-semibold text-foreground text-base leading-snug">{item.title}</h2>
                    {item.description && (
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-[10px] capitalize">{item.content_type}</Badge>
                      {item.access_level === 'premium' && (
                        <Badge variant="secondary" className="text-[10px] gap-1">
                          <Lock className="w-2.5 h-2.5" /> Premium
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default ContentSection;
