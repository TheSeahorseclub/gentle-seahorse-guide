import React, { useEffect, useState } from 'react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X, Sparkles, Crown, Settings, Loader2 } from 'lucide-react';
import { usePremiumAccess } from '@/hooks/usePremiumAccess';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

const PRICES = {
  monthly: { id: 'price_1TFHJrHB4GxrSvgshSfUEA0j', label: '£8.88 / month', amount: '£8.88' },
  yearly: { id: 'price_1TFHPFHB4GxrSvgspzaJH1gE', label: '£88.80 / year (save 17%)', amount: '£88.80' },
};

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
  const { isPremium, isLoading: premiumLoading } = usePremiumAccess();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);

  // After successful checkout, re-check subscription
  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      toast.success('Welcome to Premium! 🎉 Your subscription is active.');
      checkSubscription();
    }
    if (searchParams.get('cancelled') === 'true') {
      toast.info('Checkout was cancelled.');
    }
  }, [searchParams]);

  const checkSubscription = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('check-subscription');
      if (!error && data?.subscribed) {
        queryClient.invalidateQueries({ queryKey: ['entitlement'] });
        queryClient.invalidateQueries({ queryKey: ['subscription'] });
      }
    } catch (err) {
      console.error('Error checking subscription:', err);
    }
  };

  const handleCheckout = async () => {
    if (!user) {
      toast.error('Please sign in first.');
      return;
    }
    setCheckoutLoading(true);
    try {
      const priceId = PRICES[billingCycle].id;
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId },
      });
      if (error) throw error;
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to start checkout');
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    setPortalLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');
      if (error) throw error;
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to open billing portal');
    } finally {
      setPortalLoading(false);
    }
  };

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
                <span className="text-2xl font-display font-bold">{PRICES[billingCycle].amount}</span>
                {billingCycle === 'monthly' ? ' / month' : ' / year'}
              </p>
            </div>
          </div>

          {/* Billing toggle */}
          {!isPremium && (
            <div className="flex gap-2 mb-4">
              <Button
                variant={billingCycle === 'monthly' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setBillingCycle('monthly')}
                className="flex-1 text-xs"
              >
                Monthly
              </Button>
              <Button
                variant={billingCycle === 'yearly' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setBillingCycle('yearly')}
                className="flex-1 text-xs"
              >
                Yearly (save 17%)
              </Button>
            </div>
          )}

          <ul className="space-y-2 mb-5">
            {premiumFeatures.map((f, i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-coral-foreground">{f.text}</span>
              </li>
            ))}
          </ul>

          {isPremium ? (
            <div className="space-y-2">
              <Button variant="outline" size="lg" className="w-full" disabled>
                You're on Premium ✨
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full"
                onClick={handleManageSubscription}
                disabled={portalLoading}
              >
                {portalLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Settings className="w-4 h-4 mr-2" />
                )}
                Manage Subscription
              </Button>
            </div>
          ) : (
            <Button
              variant="ocean"
              size="lg"
              className="w-full"
              onClick={handleCheckout}
              disabled={checkoutLoading}
            >
              {checkoutLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Sparkles className="w-5 h-5" />
              )}
              Start Premium — {PRICES[billingCycle].label}
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
