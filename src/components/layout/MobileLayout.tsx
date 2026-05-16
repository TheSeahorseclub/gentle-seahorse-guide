import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Activity, Sparkles, BookOpen, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { OceanBackground } from '@/components/shared/OceanBackground';

interface MobileLayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
}

const navItems = [
  { path: '/home', icon: Home, label: 'Home' },
  { path: '/tracker', icon: Activity, label: 'Signals' },
  { path: '/insight', icon: Sparkles, label: 'Insight' },
  { path: '/content', icon: BookOpen, label: 'Library' },
  { path: '/export', icon: FileText, label: 'Export' },
];

export const MobileLayout: React.FC<MobileLayoutProps> = ({ children, showNav = true }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      <OceanBackground />
      {/* Main content */}
      <main className={cn(
        "flex-1 overflow-y-auto",
        showNav && "pb-24"
      )}>
        {children}
      </main>

      {/* Bottom Navigation */}
      {showNav && (
        <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border shadow-float z-50 pb-safe-bottom">
          <div className="flex items-center justify-around h-20 max-w-lg mx-auto px-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 min-w-[64px]",
                    isActive 
                      ? "text-primary bg-primary/10" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  <item.icon className={cn(
                    "w-6 h-6 transition-transform duration-200",
                    isActive && "scale-110"
                  )} />
                  <span className="text-xs font-medium">{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
};
