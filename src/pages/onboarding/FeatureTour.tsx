import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Activity, FileText, Users, Sparkles, BookOpen, Moon, ChevronRight, ChevronLeft 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const tourSteps = [
  {
    icon: Activity,
    emoji: '🧠',
    title: 'Track your baby\'s signals',
    description: 'Log daily signals — sleep, crying, feeding, interactions — and better understand what your child is communicating.',
    highlight: 'Every signal logged helps build a complete picture of their development.',
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: Sparkles,
    emoji: '✨',
    title: 'Personalised AI insights',
    description: 'Receive daily analyses based on the data you log. Our AI identifies patterns and offers support suggestions.',
    highlight: 'Insights tailored to your baby\'s age and developmental stage.',
    color: 'bg-coral/20 text-coral-foreground',
  },
  {
    icon: Moon,
    emoji: '🌙',
    title: 'Smart sleep prediction',
    description: 'Based on sleep history, the AI predicts wake times and recommends ideal sleep windows for your baby\'s age.',
    highlight: 'Sleep regression alerts and personalised recommendations.',
    color: 'bg-accent text-accent-foreground',
  },
  {
    icon: FileText,
    emoji: '📋',
    title: 'Clinical summary for the doctor',
    description: 'Generate a full report to share with your paediatrician or specialist. In an unexpected visit, you won\'t need to rely on memory alone.',
    highlight: 'All data organised in a professional document ready to share.',
    color: 'bg-secondary text-secondary-foreground',
  },
  {
    icon: Users,
    emoji: '👀',
    title: 'Monitor the nanny from afar',
    description: 'Each caregiver can log signals. Even when you\'re away, you\'ll know exactly what happened during the day and who provided the information.',
    highlight: 'Full history with caregiver identification.',
    color: 'bg-calm/30 text-calm-foreground',
  },
  {
    icon: BookOpen,
    emoji: '📚',
    title: 'Learn at your own pace',
    description: 'Short video micro-lessons on child development, emotional regulation and more. Brief, practical content for busy parents.',
    highlight: 'Video library available free for all users.',
    color: 'bg-lavender text-lavender-foreground',
  },
];

export const FeatureTour: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const step = tourSteps[currentStep];
  const isLast = currentStep === tourSteps.length - 1;
  const Icon = step.icon;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress dots */}
      <div className="flex items-center gap-2 px-6 py-4">
        {tourSteps.map((_, index) => (
          <div
            key={index}
            className={cn(
              "h-1.5 rounded-full flex-1 transition-all duration-500",
              index < currentStep 
                ? "bg-primary" 
                : index === currentStep 
                  ? "bg-primary/60"
                  : "bg-muted"
            )}
          />
        ))}
      </div>

      {/* Skip button */}
      <div className="flex justify-end px-6">
        <button
          onClick={() => navigate('/home')}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors py-1 px-2"
        >
          Skip tour
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-4">
        <div className="max-w-sm mx-auto text-center animate-fade-in" key={currentStep}>
          {/* Icon */}
          <div className={cn(
            "w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6",
            step.color
          )}>
            <Icon className="w-10 h-10" />
          </div>

          {/* Emoji */}
          <span className="text-4xl mb-4 block">{step.emoji}</span>

          {/* Title */}
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">
            {step.title}
          </h2>

          {/* Description */}
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            {step.description}
          </p>

          {/* Highlight */}
          <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4">
            <p className="text-sm text-foreground/80 leading-relaxed">
              💡 {step.highlight}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-6 pb-8 space-y-3">
        <div className="flex gap-3 max-w-sm mx-auto">
          {currentStep > 0 && (
            <Button
              variant="outline"
              size="lg"
              className="flex-shrink-0"
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
          )}
          
          <Button
            variant="ocean"
            size="lg"
            className="flex-1"
            onClick={() => {
              if (isLast) {
                navigate('/home');
              } else {
                setCurrentStep(currentStep + 1);
              }
            }}
          >
            {isLast ? (
              'Start using the app!'
            ) : (
              <>
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </>
            )}
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          {currentStep + 1} de {tourSteps.length}
        </p>
      </div>
    </div>
  );
};
