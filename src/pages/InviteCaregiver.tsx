import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useCurrentChild } from '@/hooks/useCurrentChild';
import { usePremiumAccess } from '@/hooks/usePremiumAccess';
import { toast } from 'sonner';
import { ChevronLeft, Users, Mail, Copy, CheckCircle, Shield } from 'lucide-react';

export const InviteCaregiver: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: currentChild } = useCurrentChild();
  const { isPremium } = usePremiumAccess();
  const [copied, setCopied] = useState(false);

  // Generate a shareable invite link
  const inviteLink = `${window.location.origin}/auth?invite=family`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      toast.success('Invite link copied to clipboard');
      setTimeout(() => setCopied(false), 3000);
    } catch {
      toast.error('Failed to copy link');
    }
  };

  if (!isPremium) {
    return (
      <MobileLayout>
        <div className="px-6 pt-8 pb-4">
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => navigate('/settings')}
              className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h1 className="font-display text-2xl font-bold text-foreground">Invite Caregiver</h1>
          </div>
          <Card className="p-6 text-center">
            <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="font-display text-lg font-semibold text-foreground mb-2">
              Premium Feature
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Invite up to 3 caregivers per child with Premium. Everyone stays in sync.
            </p>
            <Button variant="ocean" onClick={() => navigate('/upgrade')}>
              Upgrade to Premium
            </Button>
          </Card>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <div className="px-6 pt-8 pb-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate('/settings')}
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="font-display text-2xl font-bold text-foreground">Invite Caregiver</h1>
        </div>

        <div className="space-y-4">
          <Card className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-5 h-5 text-primary" />
              <h2 className="font-display font-semibold text-foreground">Share invite link</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Share this link with your partner, nanny, or another caregiver. They'll create an account and be linked to your family.
            </p>

            <div className="flex gap-2">
              <Input
                value={inviteLink}
                readOnly
                className="text-xs bg-muted/50"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopy}
                className="flex-shrink-0"
              >
                {copied ? (
                  <CheckCircle className="w-4 h-4 text-primary" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </Card>

          {/* Instructions */}
          <Card className="p-5">
            <h3 className="font-display font-semibold text-foreground mb-3">How it works</h3>
            <div className="space-y-3">
              {[
                'Share the invite link with your caregiver',
                'They create an account using the link',
                "You'll both see the same child data in sync",
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-xs font-semibold text-primary">
                    {i + 1}
                  </span>
                  <p className="text-sm text-muted-foreground">{step}</p>
                </div>
              ))}
            </div>
          </Card>

          <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4">
            <p className="text-xs text-muted-foreground text-center">
              You can have up to 3 caregivers per child. All caregivers can log signals and view insights.
            </p>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};
