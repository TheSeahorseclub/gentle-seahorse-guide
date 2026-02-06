import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/appStore';
import { useAuth } from '@/contexts/AuthContext';
import { Activity, Sparkles, BookOpen, Calendar, ChevronRight, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

const developmentWindows = [
  { ageRange: [0, 3], focus: 'Regulation and co-regulation', description: 'Your child is learning to feel safe in the world through your presence.' },
  { ageRange: [4, 6], focus: 'Social connection', description: 'Early smiles and sounds are building the foundations of communication.' },
  { ageRange: [7, 9], focus: 'Exploration and trust', description: 'Curiosity is growing, supported by secure attachment.' },
  { ageRange: [10, 12], focus: 'Movement and independence', description: 'Physical exploration expands their world.' },
  { ageRange: [13, 18], focus: 'Language and emotion', description: 'Words and feelings are becoming intertwined.' },
  { ageRange: [19, 24], focus: 'Self-awareness', description: 'Your child is beginning to understand themselves as separate.' },
  { ageRange: [25, 30], focus: 'Social play', description: 'Parallel play becomes interactive engagement.' },
  { ageRange: [31, 36], focus: 'Imagination and empathy', description: 'Abstract thinking and emotional understanding bloom.' },
];

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile, getTodaySignal } = useAppStore();
  const { user, signOut } = useAuth();
  const todaySignal = getTodaySignal();
  const childAge = userProfile?.childAgeMonths || 0;
  const currentWindow = developmentWindows.find(
    w => childAge >= w.ageRange[0] && childAge <= w.ageRange[1]
  ) || developmentWindows[0];

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <MobileLayout>
      <div className="px-6 pt-8 pb-4">
        {/* Header */}
        <div className="mb-6 animate-fade-in flex items-start justify-between">
          <div>
            <p className="text-muted-foreground text-base">{greeting()}</p>
            <h1 className="font-display text-2xl font-bold text-foreground">
              The Seahorse Club
            </h1>
          </div>
          <button
            onClick={signOut}
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            aria-label="Sign out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-6 animate-slide-up">
          <Card 
            variant="interactive" 
            className="p-4"
            onClick={() => navigate('/tracker')}
          >
            <Activity className="w-6 h-6 text-primary mb-2" />
            <p className="font-medium text-foreground">Log signals</p>
            <p className="text-sm text-muted-foreground mt-1">
              {todaySignal ? 'Update today' : 'Not logged today'}
            </p>
          </Card>
          
          <Card 
            variant="interactive" 
            className="p-4"
            onClick={() => navigate('/insight')}
          >
            <Sparkles className="w-6 h-6 text-coral mb-2" />
            <p className="font-medium text-foreground">Today's insight</p>
            <p className="text-sm text-muted-foreground mt-1">
              Nervous system view
            </p>
          </Card>
        </div>

        {/* Development Window */}
        <Card variant="sunrise" className="p-5 mb-6 animate-slide-up">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-coral/30 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 text-coral-foreground" />
            </div>
            <div>
              <p className="text-sm text-coral-foreground/70 mb-1">
                Current developmental window
              </p>
              <h3 className="font-display font-semibold text-coral-foreground mb-2">
                {currentWindow.focus}
              </h3>
              <p className="text-sm text-coral-foreground/80 leading-relaxed">
                {currentWindow.description}
              </p>
            </div>
          </div>
        </Card>

        {/* Micro Lessons Preview */}
        <div className="mb-6 animate-slide-up">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display font-semibold text-foreground">
              Micro lessons
            </h2>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-primary"
              onClick={() => navigate('/lessons')}
            >
              View all
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          
          <Card 
            variant="interactive" 
            className="p-4"
            onClick={() => navigate('/lessons')}
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl gradient-ocean flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-7 h-7 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">
                  Understanding early regulation
                </p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  6 minutes · Brain development
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Calm reminder */}
        <Card variant="soft" className="p-5 animate-fade-in-slow">
          <p className="text-center text-muted-foreground italic leading-relaxed">
            "Every moment of connection builds your child's foundation for wellbeing."
          </p>
        </Card>
      </div>
    </MobileLayout>
  );
};
