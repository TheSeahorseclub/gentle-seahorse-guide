import React from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, CreditCard, FileText, Settings, ArrowLeft, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Overview', end: true },
  { to: '/admin/users', icon: Users, label: 'Users', end: false },
  { to: '/admin/subscriptions', icon: CreditCard, label: 'Subscriptions', end: false },
  { to: '/admin/content', icon: FileText, label: 'Content', end: false },
  { to: '/admin/settings', icon: Settings, label: 'Settings', end: false },
];

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card/80 backdrop-blur-sm flex flex-col shrink-0">
        {/* Brand header */}
        <div className="p-5 border-b border-border">
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-8 h-8 rounded-xl gradient-ocean flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-display text-sm font-bold text-foreground leading-tight">The Seahorse Club</h2>
              <span className="text-[11px] text-muted-foreground font-medium">Admin Panel</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-0.5">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary/10 text-primary shadow-sm'
                    : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
                }`
              }
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Back to app */}
        <div className="p-3 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
            onClick={() => navigate('/home')}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to App
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
