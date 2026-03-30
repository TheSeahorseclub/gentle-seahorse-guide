import React, { useState, useMemo } from 'react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCurrentChild } from '@/hooks/useCurrentChild';
import { useSubscription } from '@/hooks/useSubscription';
import { usePremiumAccess } from '@/hooks/usePremiumAccess';
import { useSignalAnalytics } from '@/hooks/useSignalAnalytics';
import { getDevelopmentalContext } from '@/utils/developmentalContext';
import { generateClinicalPdf } from '@/utils/generateClinicalPdf';
import { ClinicalSummaryPreview } from '@/components/export/ClinicalSummaryPreview';
import { PremiumGate } from '@/components/shared/PremiumGate';
import { FileText, Download, Eye, Loader2, AlertCircle, Lock } from 'lucide-react';

function generateClinicalReflection(
  analytics: ReturnType<typeof useSignalAnalytics>,
  childAgeMonths: number
): string {
  if (analytics.daysWithData === 0) {
    return 'No observations have been recorded during this period. Regular logging of daily signals can help build a clearer picture over time.';
  }

  const { aggregations, overallTrend, daysWithData } = analytics;
  
  const positiveSignals = ['Restful', 'Calm day', 'Settled', 'Connected', 'Smooth'];
  const challengingSignals = ['Unsettled', 'More than usual', 'Challenging', 'Seeking comfort', 'Finding it hard'];
  
  let positiveCount = 0;
  let challengingCount = 0;
  let totalCount = 0;
  
  aggregations.forEach(agg => {
    Object.entries(agg.frequencies).forEach(([category, count]) => {
      totalCount += count;
      if (positiveSignals.includes(category)) positiveCount += count;
      if (challengingSignals.includes(category)) challengingCount += count;
    });
  });

  const positiveRatio = totalCount > 0 ? positiveCount / totalCount : 0;
  const challengingRatio = totalCount > 0 ? challengingCount / totalCount : 0;

  let reflection = `Over ${daysWithData} day${daysWithData > 1 ? 's' : ''} of parent-reported observations, `;

  if (positiveRatio > 0.6) {
    reflection += 'signals have predominantly reflected settled patterns across most categories. ';
  } else if (challengingRatio > 0.5) {
    reflection += 'observations have shown periods requiring additional support and attunement. ';
  } else {
    reflection += 'observations have shown a mix of settled periods and times requiring additional support. ';
  }

  if (overallTrend.trend === 'increasing-stability') {
    reflection += 'There appears to be a gentle movement toward more consistent patterns. ';
  } else if (overallTrend.trend === 'variable') {
    reflection += 'Some day-to-day variability has been observed, which is common in early development. ';
  }

  if (childAgeMonths <= 6) {
    reflection += 'At this early age, establishing rhythms is an ongoing developmental process.';
  } else if (childAgeMonths <= 12) {
    reflection += 'These observations can support ongoing conversations about developmental support.';
  } else {
    reflection += 'This summary may be helpful context for discussions with healthcare providers.';
  }

  return reflection;
}

export const Export: React.FC = () => {
  const { data: currentChild } = useCurrentChild();
  const { data: subscription } = useSubscription();
  const { isPremium } = usePremiumAccess();
  
  const exportPeriodOptions = isPremium
    ? [
        { label: 'Last 30 days', days: 30 },
        { label: 'Last 3 months', days: 90 },
        { label: 'Last year', days: 365 },
      ]
    : [{ label: 'Last 3 days', days: 3 }];

  const [selectedPeriodIdx, setSelectedPeriodIdx] = useState(0);
  const exportDays = exportPeriodOptions[selectedPeriodIdx]?.days ?? 3;
  const childAgeMonths = currentChild?.ageMonths || 0;
  const analytics = useSignalAnalytics(currentChild?.id, exportDays);
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const developmentalContext = useMemo(
    () => getDevelopmentalContext(childAgeMonths),
    [childAgeMonths]
  );
  const clinicalReflection = useMemo(
    () => generateClinicalReflection(analytics, childAgeMonths),
    [analytics, childAgeMonths]
  );

  const handleDownloadPdf = async () => {
    setIsGenerating(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const pdf = generateClinicalPdf({
        childAgeMonths,
        analytics,
        developmentalContext,
        clinicalReflection,
      });
      
      pdf.save(`clinical-signals-summary-${new Date().toISOString().split('T')[0]}.pdf`);
    } finally {
      setIsGenerating(false);
    }
  };

  if (analytics.isLoading) {
    return (
      <MobileLayout>
        <PageHeader 
          title="Export summary" 
          subtitle="Preparing your clinical signals summary..."
        />
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <PageHeader 
        title="Export summary" 
        subtitle="A professional summary of parent-reported observations."
      />

      <div className="px-6 space-y-4 pb-8">
        {!showPreview && (
          <>
            <Card variant="soft" className="p-5 animate-fade-in">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-2">
                    Clinical Signals Summary
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    A structured summary of parent-reported signals, designed to support clinical discussion. Not a diagnostic tool.
                  </p>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-3 animate-slide-up">
              <Card variant="default" className="p-4 text-center">
                <p className="text-3xl font-display font-bold text-primary mb-1">
                  {analytics.daysWithData}
                </p>
                <p className="text-sm text-muted-foreground">
                  Days logged
                </p>
              </Card>
              <Card variant="default" className="p-4 text-center">
                <p className="text-3xl font-display font-bold text-primary mb-1">
                  {childAgeMonths}m
                </p>
                <p className="text-sm text-muted-foreground">
                  Child's age
                </p>
              </Card>
            </div>

            <Card variant="sunrise" className="p-5 animate-fade-in">
              <h3 className="font-display font-semibold text-coral-foreground mb-3">
                What's included
              </h3>
              <ul className="space-y-2 text-sm text-coral-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-coral-foreground/60 mt-2 flex-shrink-0" />
                  <span>{exportDays}-day observation period analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-coral-foreground/60 mt-2 flex-shrink-0" />
                  <span>Signal frequency per category</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-coral-foreground/60 mt-2 flex-shrink-0" />
                  <span>Neutral trend description</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-coral-foreground/60 mt-2 flex-shrink-0" />
                  <span>Age-appropriate developmental context</span>
                </li>
              </ul>
            </Card>

            {/* Period selector */}
            <Card variant="soft" className="p-5 animate-fade-in">
              <h3 className="font-display font-semibold text-foreground mb-3">
                Export period
              </h3>
              <div className="flex gap-2 flex-wrap">
                {exportPeriodOptions.map((opt, idx) => (
                  <Button
                    key={opt.days}
                    variant={selectedPeriodIdx === idx ? 'ocean' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedPeriodIdx(idx)}
                  >
                    {opt.label}
                  </Button>
                ))}
                {!isPremium && (
                  <>
                    <Button variant="outline" size="sm" disabled className="opacity-50 gap-1">
                      <Lock className="w-3 h-3" /> 30 days
                    </Button>
                    <Button variant="outline" size="sm" disabled className="opacity-50 gap-1">
                      <Lock className="w-3 h-3" /> 3 months
                    </Button>
                    <Button variant="outline" size="sm" disabled className="opacity-50 gap-1">
                      <Lock className="w-3 h-3" /> 1 year
                    </Button>
                  </>
                )}
              </div>
              {!isPremium && (
                <p className="text-xs text-muted-foreground mt-2">
                  Upgrade to Premium for extended export periods.
                </p>
              )}
            </Card>
            <Card variant="soft" className="p-5 animate-fade-in">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-2">
                    Important note
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    This summary organises parent-reported signals and does not provide diagnosis, assessment, or prediction. It is designed to support, not replace, clinical discussion.
                  </p>
                </div>
              </div>
            </Card>

            <div className="pt-4 space-y-3 animate-slide-up">
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => setShowPreview(true)}
                disabled={analytics.daysWithData === 0}
              >
                <Eye className="w-5 h-5" />
                Preview summary
              </Button>
              
              <Button
                variant="ocean"
                size="lg"
                className="w-full"
                onClick={handleDownloadPdf}
                disabled={isGenerating || analytics.daysWithData === 0}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : analytics.daysWithData === 0 ? (
                  'Log signals to generate summary'
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    Download PDF
                  </>
                )}
              </Button>
            </div>
          </>
        )}

        {showPreview && (
          <div className="space-y-4 animate-fade-in">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPreview(false)}
              className="mb-2"
            >
              ← Back to export
            </Button>
            
            <ClinicalSummaryPreview
              childAgeMonths={childAgeMonths}
              analytics={analytics}
              developmentalContext={developmentalContext}
              clinicalReflection={clinicalReflection}
              exportDays={exportDays}
            />
            
            <div className="pt-4 sticky bottom-4">
              <Button
                variant="ocean"
                size="lg"
                className="w-full shadow-lg"
                onClick={handleDownloadPdf}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    Download PDF
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};
