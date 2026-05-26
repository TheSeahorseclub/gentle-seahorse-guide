import React, { useEffect, useState } from 'react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X, Sparkles, Crown, Loader2, RotateCcw } from 'lucide-react';
import { usePremiumAccess } from '@/hooks/usePremiumAccess';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { getOfferings, purchasePackage, restorePurchases, hasActiveEntitlement } from '@/lib/purchases';
import { supabase } from '@/integrations/supabase/client';

const freeFeatures = [
  { text: '1 child profile', included: true },
  { text: '1 caregiver login', included: true },
  { text: 'Daily signal tracking', included: true },
  { text: 'Basic milestone tracking', included: true },
  { text: 'Weekly learning (text)', included: true },
  { text: 'Export last 3 days only', included: true },
  { text: 'Video library access', included: true },
  { text: 'Multiple caregivers', included: false },
  { text: 'Download any date range', included: false },
  { text: 'Personalised recommendations', included: false },
  { text: 'Full content library (0–3 years)', included: false },
];

const premiumFeatures = [
  { text: 'Up to 3 caregiver profiles per child', included: true },
  { text: 'Daily signal tracking', included: true },
  { text: 'Full milestone tracking', included: true },
  { text: 'Full video library access', included: true },
  { text: 'Personalised recommendations', included: true },
  { text: 'Full content library (0–3 years)', included: true },
  { text: 'Clinical summary export — any date range', included: true },
  { text: 'Monitor caregiver activity remotely', included: true },
];

export const Upgrade: React.FC = () => {
  const { isPremium, isLoading: premiumLoading } = usePremiumAccess();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [offerings, setOfferings] = useState<any>(null);
  const [offeringsLoading, setOfferingsLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [purchasing, setPurchasing] = useState(false);
  const [restoring, setRestoring] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = (attempt = 0) => {
      getOfferings()
        .then((o) => {
          if (cancelled) return;
          console.log('[RC] offerings:', JSON.stringify(o, null, 2));
          setOfferings(o);
          const annual = o?.current?.availablePackages?.find((p: any) => p.packageType === 'ANNUAL');
          const monthly = o?.current?.availablePackages?.find((p: any) => p.packageType === 'MONTHLY');
          setSelectedPackage(annual || monthly || o?.current?.availablePackages?.[0]);
          setOfferingsLoading(false);
        })
        .catch((err) => {
          if (cancelled) return;
          if (err?.message === 'rc-not-ready' && attempt < 5) {
            setTimeout(() => load(attempt + 1), 600);
            return;
          }
          if (err?.message !== 'not-native') {
            console.error('[RC] getOfferings error:', err);
            toast.error('Could not load subscription options.');
          }
          setOfferingsLoading(false);
        });
    };
    load();
    return () => { cancelled = true; };
  }, []);

  const syncEntitlementToDb = async () => {
    if (!user) return;
    await supabase.from('user_subscriptions').upsert({
      user_id: user.id,
      entitlement_status: 'active',
      plan: 'premium',
      status: 'active',
    }, { onConflict: 'user_id' });
    queryClient.invalidateQueries({ queryKey: ['entitlement'] });
    queryClient.invalidateQueries({ queryKey: ['subscription'] });
  };

  const handlePurchase = async () => {
    if (!selectedPackage) return;
    setPurchasing(true);
    try {
      const { customerInfo } = await purchasePackage(selectedPackage);
      if (hasActiveEntitlement(customerInfo)) {
        await syncEntitlementToDb();
        toast.success('Welcome to Premium!');
      }
    } catch (err: any) {
      if (err?.code !== '1') { // 1 = user cancelled
        toast.error('Purchase failed. Please try again.');
      }
    } finally {
      setPurchasing(false);
    }
  };

  const handleRestore = async () => {
    setRestoring(true);
    try {
      const { customerInfo } = await restorePurchases();
      if (hasActiveEntitlement(customerInfo)) {
        await syncEntitlementToDb();
        toast.success('Purchases restored!');
      } else {
        toast.info('No active subscription found.');
      }
    } catch {
      toast.error('Restore failed. Please try again.');
    } finally {
      setRestoring(false);
    }
  };

  const monthly = offerings?.current?.availablePackages?.find((p: any) => p.packageType === 'MONTHLY');
  const annual = offerings?.current?.availablePackages?.find((p: any) => p.packageType === 'ANNUAL');

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
                {f.included
                  ? <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  : <X className="w-4 h-4 text-muted-foreground/40 flex-shrink-0" />}
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
              {selectedPackage && (
                <p className="text-sm text-coral-foreground/80">
                  <span className="text-2xl font-display font-bold">
                    {selectedPackage.product?.priceString}
                  </span>
                  {selectedPackage.packageType === 'MONTHLY' ? ' / month' : ' / year'}
                </p>
              )}
            </div>
          </div>

          {/* Package picker */}
          {!isPremium && !offeringsLoading && (monthly || annual) && (
            <div className="flex gap-2 mb-4">
              {monthly && (
                <Button
                  variant={selectedPackage?.packageType === 'MONTHLY' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedPackage(monthly)}
                  className="flex-1 text-xs"
                >
                  Monthly
                </Button>
              )}
              {annual && (
                <Button
                  variant={selectedPackage?.packageType === 'ANNUAL' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedPackage(annual)}
                  className="flex-1 text-xs"
                >
                  Yearly (save ~26%)
                </Button>
              )}
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
            <Button variant="outline" size="lg" className="w-full" disabled>
              You're on Premium ✨
            </Button>
          ) : (
            <Button
              variant="ocean"
              size="lg"
              className="w-full"
              onClick={handlePurchase}
              disabled={purchasing || offeringsLoading || !selectedPackage}
            >
              {purchasing || offeringsLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Sparkles className="w-5 h-5" />
              )}
              {offeringsLoading
                ? 'Loading...'
                : selectedPackage
                  ? `Start Premium — ${selectedPackage.product?.priceString}`
                  : 'Unavailable'}
            </Button>
          )}
        </Card>

        {/* Restore + legal */}
        {!isPremium && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-muted-foreground"
            onClick={handleRestore}
            disabled={restoring}
          >
            {restoring ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <RotateCcw className="w-4 h-4 mr-2" />}
            Restore Purchases
          </Button>
        )}

        <p className="text-xs text-center text-muted-foreground leading-relaxed px-4">
          Subscriptions auto-renew unless cancelled at least 24 hours before the end of the current period.
          Manage or cancel in your App Store account settings. Cancel anytime.
        </p>
      </div>
    </MobileLayout>
  );
};
