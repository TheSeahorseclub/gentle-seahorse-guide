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
    title: 'Acompanhe os sinais do seu bebé',
    description: 'Registe os sinais diários — sono, choro, alimentação, interações — e entenda melhor o que o seu filho está a comunicar.',
    highlight: 'Cada sinal registado ajuda a construir uma visão completa do desenvolvimento.',
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: Sparkles,
    emoji: '✨',
    title: 'Insights personalizados com IA',
    description: 'Receba análises diárias baseadas nos dados que regista. A nossa IA identifica padrões e oferece sugestões de apoio.',
    highlight: 'Insights adaptados à idade e fase de desenvolvimento do seu bebé.',
    color: 'bg-coral/20 text-coral-foreground',
  },
  {
    icon: Moon,
    emoji: '🌙',
    title: 'Previsão inteligente de sono',
    description: 'Com base no histórico de sono, a IA prevê horários de despertar e recomenda janelas de sono ideais para a idade.',
    highlight: 'Alertas de regressão de sono e recomendações personalizadas.',
    color: 'bg-accent text-accent-foreground',
  },
  {
    icon: FileText,
    emoji: '📋',
    title: 'Resumo clínico para o médico',
    description: 'Gere um relatório completo para partilhar com o pediatra ou especialista. Numa visita inesperada ao médico, não precisa contar apenas com a memória.',
    highlight: 'Todos os dados organizados num documento profissional pronto para partilhar.',
    color: 'bg-secondary text-secondary-foreground',
  },
  {
    icon: Users,
    emoji: '👀',
    title: 'Acompanhe a nanny de longe',
    description: 'Cada cuidador pode registar sinais. Mesmo estando longe, sabe exatamente o que aconteceu durante o dia com o registo de quem forneceu cada informação.',
    highlight: 'Histórico completo com identificação do cuidador responsável.',
    color: 'bg-calm/30 text-calm-foreground',
  },
  {
    icon: BookOpen,
    emoji: '📚',
    title: 'Aprenda ao seu ritmo',
    description: 'Micro-lições em vídeo sobre desenvolvimento infantil, regulação emocional e muito mais. Conteúdo curto e prático para pais ocupados.',
    highlight: 'Biblioteca de vídeos disponível gratuitamente para todos os utilizadores.',
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
          Pular tour
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
              'Começar a usar!'
            ) : (
              <>
                Próximo
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
