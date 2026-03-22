import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, CreditCard, FileText, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/users', icon: Users, label: 'Users', end: false },
  { to: '/admin/subscriptions', icon: CreditCard, label: 'Subscriptions', end: false },
  { to: '/admin/content', icon: FileText, label: 'Content', end: false },
];

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-60 border-r border-border bg-card p-4 flex flex-col">
        <div className="mb-6">
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground mb-4" onClick={() => navigate('/home')}>
            <ArrowLeft className="w-4 h-4" /> Back to App
          </Button>
          <h2 className="font-display text-lg font-bold px-3">Admin Panel</h2>
        </div>
        <nav className="space-y-1 flex-1">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`
              }
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};
