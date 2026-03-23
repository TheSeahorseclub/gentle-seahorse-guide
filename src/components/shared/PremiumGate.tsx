import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PremiumGateProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export const PremiumGate: React.FC<PremiumGateProps> = ({
  title = 'Premium Feature',
  description = 'Upgrade to Premium to unlock this feature and support your child\'s development journey.',
  children,
}) => {
  const navigate = useNavigate();

  return (
    <Card variant="soft" className="p-6 text-center space-y-4 animate-fade-in">
      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
        <Lock className="w-7 h-7 text-primary" />
      </div>
      <div>
        <h3 className="font-display font-semibold text-foreground text-lg mb-2">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
          {description}
        </p>
      </div>
      {children}
      <Button
        variant="ocean"
        size="lg"
        className="w-full"
        onClick={() => navigate('/upgrade')}
      >
        <Sparkles className="w-5 h-5" />
        Upgrade to Premium — £8.88/mo
      </Button>
    </Card>
  );
};
