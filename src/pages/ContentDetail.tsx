import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Lock } from 'lucide-react';
import { useContentItem } from '@/hooks/useContent';
import { usePremiumAccess } from '@/hooks/usePremiumAccess';
import { PremiumGate } from '@/components/shared/PremiumGate';
import { getSectionById, getStageById } from '@/utils/ageStages';

export const ContentDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: item, isLoading } = useContentItem(id);
  const { isPremium } = usePremiumAccess();

  if (isLoading) {
    return (
      <MobileLayout>
        <div className="px-5 pt-12 text-center text-sm text-muted-foreground">Loading…</div>
      </MobileLayout>
    );
  }

  if (!item) {
    return (
      <MobileLayout>
        <div className="px-5 pt-12 text-center">
          <p className="text-sm text-muted-foreground mb-4">This content isn't available.</p>
          <Button variant="outline" onClick={() => navigate('/content')}>Back to library</Button>
        </div>
      </MobileLayout>
    );
  }

  const stage = item.age_stage ? getStageById(item.age_stage) : undefined;
  const section = item.section ? getSectionById(item.section) : undefined;
  const locked = item.access_level === 'premium' && !isPremium;

  return (
    <MobileLayout>
      <div className="px-5 pt-6 pb-12 max-w-lg mx-auto">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="-ml-2 mb-3 gap-1 text-muted-foreground"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </Button>

        {item.image_url && (
          <img
            src={item.image_url}
            alt={item.title}
            className="w-full h-44 object-cover rounded-2xl mb-4"
          />
        )}

        <div className="flex items-center gap-2 mb-2 flex-wrap">
          {stage && <Badge variant="secondary" className="text-[10px]">{stage.label}</Badge>}
          {section && <Badge variant="outline" className="text-[10px]">{section.label}</Badge>}
          {item.access_level === 'premium' && (
            <Badge className="text-[10px] gap-1"><Lock className="w-2.5 h-2.5" /> Premium</Badge>
          )}
        </div>

        <h1 className="font-display text-2xl font-bold text-foreground leading-tight">{item.title}</h1>
        {item.description && (
          <p className="text-base text-muted-foreground mt-2 leading-relaxed">{item.description}</p>
        )}

        <div className="mt-6">
          {locked ? (
            <PremiumGate
              title="Premium content"
              description="Upgrade to Premium to read this article and unlock the full learning library."
            />
          ) : item.body ? (
            <Card className="p-5">
              <article className="prose prose-sm max-w-none text-foreground prose-headings:font-display prose-headings:text-foreground prose-p:text-foreground/90 prose-a:text-primary">
                <ReactMarkdown>{item.body}</ReactMarkdown>
              </article>
            </Card>
          ) : (
            <Card className="p-5 text-sm text-muted-foreground">
              Full article coming soon.
            </Card>
          )}
        </div>
      </div>
    </MobileLayout>
  );
};

export default ContentDetail;
