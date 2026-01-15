import React, { useState } from 'react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/appStore';
import { FileText, Download, Check, AlertCircle } from 'lucide-react';

export const Export: React.FC = () => {
  const { userProfile, dailySignals } = useAppStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleGenerateSummary = async () => {
    setIsGenerating(true);
    
    // Simulate generation delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsGenerating(false);
    setGenerated(true);
  };

  const signalCount = dailySignals.length;
  const daysCovered = signalCount > 0 
    ? Math.ceil((new Date().getTime() - new Date(dailySignals[0].date).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <MobileLayout>
      <PageHeader 
        title="Export summary" 
        subtitle="Generate a neutral summary of your observations. No diagnoses, no scores, no labels."
      />

      <div className="px-6 space-y-6">
        {/* Summary preview */}
        <Card variant="soft" className="p-5 animate-fade-in">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-foreground mb-2">
                Observation summary
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                A neutral record of the signals you've observed, presented in calm, descriptive language suitable for sharing with healthcare providers if you choose.
              </p>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 animate-slide-up">
          <Card variant="default" className="p-4 text-center">
            <p className="text-3xl font-display font-bold text-primary mb-1">
              {signalCount}
            </p>
            <p className="text-sm text-muted-foreground">
              Days logged
            </p>
          </Card>
          <Card variant="default" className="p-4 text-center">
            <p className="text-3xl font-display font-bold text-primary mb-1">
              {userProfile?.childAgeMonths || 0}m
            </p>
            <p className="text-sm text-muted-foreground">
              Child's age
            </p>
          </Card>
        </div>

        {/* What's included */}
        <Card variant="sunrise" className="p-5 animate-fade-in">
          <h3 className="font-display font-semibold text-coral-foreground mb-3">
            What's included
          </h3>
          <ul className="space-y-2 text-sm text-coral-foreground/80">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>Observation period and child's age</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>Summary of daily signal patterns</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>Descriptive language only—no scores or labels</span>
            </li>
          </ul>
        </Card>

        {/* What's NOT included */}
        <Card variant="soft" className="p-5 animate-fade-in">
          <h3 className="font-display font-semibold text-foreground mb-3">
            What's not included
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
              <span>No diagnoses or clinical assessments</span>
            </li>
            <li className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
              <span>No developmental scores or comparisons</span>
            </li>
            <li className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
              <span>No recommendations requiring professional input</span>
            </li>
          </ul>
        </Card>

        {/* Generate button */}
        <div className="pt-4 pb-8 animate-slide-up">
          {generated ? (
            <Card variant="calm" className="p-5 text-center">
              <Check className="w-12 h-12 mx-auto text-primary mb-3" />
              <h3 className="font-display font-semibold text-foreground mb-2">
                Summary ready
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Your observation summary has been generated.
              </p>
              <Button variant="ocean" size="lg" className="w-full">
                <Download className="w-5 h-5" />
                Download PDF
              </Button>
            </Card>
          ) : (
            <Button
              variant="ocean"
              size="lg"
              className="w-full"
              onClick={handleGenerateSummary}
              disabled={isGenerating || signalCount === 0}
            >
              {isGenerating ? (
                'Generating...'
              ) : signalCount === 0 ? (
                'Log signals to generate summary'
              ) : (
                <>
                  <FileText className="w-5 h-5" />
                  Generate summary
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </MobileLayout>
  );
};
