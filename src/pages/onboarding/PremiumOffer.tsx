import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, Crown, Shield, Clock, Users, FileText, Sparkles } from 'lucide-react';

const benefits = [
  {
    icon: FileText,
    text: 'Download the Clinical Summary anytime — never rely on memory alone at a doctor\'s visit',
  },
  {
    icon: Users,
    text: 'Monitor your nanny or any caregiver remotely — know exactly what happened during the day',
  },
  {
    icon: Sparkles,
    text: 'Personalised AI insights tailored to your baby\'s age and development stage',
  },
  {
    icon: Clock,
    text: 'Smart sleep predictions — know when your baby is likely to wake and plan your day',
  },
  {
    icon: Shield,
    text: 'Up to 3 caregiver profiles per child — mum, dad, nanny, all in sync',
  },
];

export const PremiumOffer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="px-6 pt-8 pb-4">
        <div className="max-w-sm mx-auto text-center">
          <div className="w-16 h-16 rounded-3xl gradient-ocean flex items-center justify-center mx-auto mb-5 animate-fade-in">
            <Crown className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground mb-2 animate-fade-in">
            You're all set!
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed animate-fade-in">
            Before you start, would you like to unlock the full potential of the app?
          </p>
        </div>
      </div>

      {/* Benefits */}
      <div className="flex-1 px-6 py-4">
        <div className="max-w-sm mx-auto space-y-3 animate-slide-up">
          <p className="text-sm font-medium text-foreground/80 mb-4">
            With Premium, you get:
          </p>

          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-2xl bg-card shadow-card"
              >
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon className="w-4.5 h-4.5 text-primary" />
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                  {benefit.text}
                </p>
              </div>
            );
          })}

          {/* Social proof */}
          <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 mt-4">
            <p className="text-sm text-foreground/80 leading-relaxed text-center">
              Trusted by parents who want the best insights into their child's development — because every signal matters.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="p-6 pb-8 space-y-3">
        <div className="max-w-sm mx-auto space-y-3">
          <Button
            variant="ocean"
            size="lg"
            className="w-full"
            onClick={() => navigate('/upgrade')}
          >
            <Crown className="w-5 h-5 mr-2" />
            See Premium plans
          </Button>

          <button
            onClick={() => navigate('/home')}
            className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
          >
            Maybe later — start with Free
          </button>
        </div>
      </div>
    </div>
  );
};
