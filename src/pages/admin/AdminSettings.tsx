import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Database, Bell, CreditCard } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const sections = [
    {
      icon: Shield,
      title: 'Authentication',
      description: 'Email/password and Google OAuth are enabled. Password reset is configured.',
      status: 'Active',
    },
    {
      icon: Database,
      title: 'Database',
      description: 'Row-level security is enabled on all tables. Admin-only functions are protected.',
      status: 'Secured',
    },
    {
      icon: CreditCard,
      title: 'Subscriptions',
      description: 'Free and Premium plans are configured. Apple IAP fields are ready for future integration.',
      status: 'Ready',
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Push notifications and email onboarding are not yet configured.',
      status: 'Pending',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Platform configuration overview</p>
      </div>

      <div className="grid gap-4">
        {sections.map(s => (
          <Card key={s.title}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <s.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{s.title}</CardTitle>
                    <CardDescription className="text-sm mt-0.5">{s.description}</CardDescription>
                  </div>
                </div>
                <Badge
                  variant={s.status === 'Pending' ? 'outline' : 'default'}
                  className="text-xs"
                >
                  {s.status}
                </Badge>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};
