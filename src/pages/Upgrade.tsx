import React from 'react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X, Sparkles, Crown } from 'lucide-react';
import { usePremiumAccess } from '@/hooks/usePremiumAccess';

const freeFeatures = [
  { text: '1 child profile', included: true },
  { text: 'Daily signal tracking', included: true },
  { text: 'Basic milestone tracking', included: true },
  { text: 'Weekly learning (text)', included: true },
  { text: 'Export last 3 days only', included: true },
  { text: 'Video library', included: false },
  { text: 'Multiple caregivers', included: false },
  { text: 'Extended export history', included: false },
  { text: 'Personalised recommendations', included: false },
];

const premiumFeatures = [
  { text: '1 child profile', included: true },
  { text: 'Daily signal tracking', included: true },
  { text: 'Full milestone tracking', included: true },
  { text: 'Weekly learning (text)', included: true },
  { text: 'Full video library access', included: true },
  { text: 'Multiple caregivers per child', included: true },
  { text: 'Export 30 days, 3 months or 1 year', included: true },
  { text: 'Personalised recommendations', included: true },
  { text: 'Full content library (0–3 years)', included: true },
];

export const Upgrade: React.FC = () => {
  const { isPremium } = usePremiumAccess();

  return (
    <MobileLayout>
      <PageHeader
        title="Choose your plan"
        subtitle="Support your child's development with evidence-based guidance."
      />

      <div className="px-6 pb-8 space-y-5">
        {/* Free Tier */}
        <Card variant="soft" className="p-5 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
              <span className="text-lg font-display font-bold text-muted-foreground">F</span>
            </div>
            <div>
              <h3 className="font-display font-semibold text-foreground">Free</h3>
              <p className="text-sm text-muted-foreground">£0 forever</p>
            </div>
          </div>
          <ul className="space-y-2">
            {freeFeatures.map((f, i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                {f.included ? (
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                ) : (
                  <X className="w-4 h-4 text-muted-foreground/40 flex-shrink-0" />
                )}
                <span className={f.included ? 'text-foreground' : 'text-muted-foreground/60'}>
                  {f.text}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Premium Tier */}
        <Card variant="sunrise" className="p-5 relative overflow-hidden animate-slide-up">
          <div className="absolute top-3 right-3">
            <span className="text-xs font-medium bg-primary/20 text-primary px-2 py-1 rounded-full">
              Recommended
            </span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl gradient-ocean flex items-center justify-center">
              <Crown className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-coral-foreground">Premium</h3>
              <p className="text-sm text-coral-foreground/80">
                <span className="text-2xl font-display font-bold">£8.88</span> / month
              </p>
            </div>
          </div>
          <ul className="space-y-2 mb-5">
            {premiumFeatures.map((f, i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-coral-foreground">{f.text}</span>
              </li>
            ))}
          </ul>

          {isPremium ? (
            <Button variant="outline" size="lg" className="w-full" disabled>
              You're on Premium ✨
            </Button>
          ) : (
            <Button variant="ocean" size="lg" className="w-full">
              <Sparkles className="w-5 h-5" />
              Start Premium — £8.88/mo
            </Button>
          )}
        </Card>

        <p className="text-xs text-center text-muted-foreground leading-relaxed px-4">
          Cancel anytime. Your data is always yours. Premium supports continued development of evidence-based content.
        </p>
      </div>
    </MobileLayout>
  );
};
