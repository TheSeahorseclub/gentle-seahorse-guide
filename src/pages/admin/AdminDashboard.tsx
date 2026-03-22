import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Users, UserCheck, CreditCard, Clock, UserX, DollarSign } from 'lucide-react';
import { format } from 'date-fns';

export const AdminDashboard: React.FC = () => {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ['admin-metrics'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_admin_metrics' as any);
      if (error) throw error;
      return data as any;
    },
  });

  if (isLoading) {
    return <p className="text-muted-foreground">Loading metrics…</p>;
  }

  const cards = [
    { label: 'Total Users', value: metrics?.total_users ?? 0, icon: Users, color: 'text-primary' },
    { label: 'Free Users', value: metrics?.free_users ?? 0, icon: UserCheck, color: 'text-muted-foreground' },
    { label: 'Premium', value: metrics?.premium_users ?? 0, icon: CreditCard, color: 'text-emerald-600' },
    { label: 'Trial', value: metrics?.trial_users ?? 0, icon: Clock, color: 'text-amber-600' },
    { label: 'Cancelled', value: metrics?.cancelled_users ?? 0, icon: UserX, color: 'text-destructive' },
    { label: 'Monthly Revenue', value: `£${Number(metrics?.monthly_revenue ?? 0).toFixed(2)}`, icon: DollarSign, color: 'text-emerald-600' },
  ];

  const recentSignups = (metrics?.recent_signups ?? []) as any[];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {cards.map(c => (
          <Card key={c.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{c.label}</CardTitle>
              <c.icon className={`w-4 h-4 ${c.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{c.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-lg font-semibold mb-4">Recent Signups</h2>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Signed Up</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentSignups.map((u: any) => (
                <TableRow key={u.user_id}>
                  <TableCell className="font-medium">{u.full_name || '—'}</TableCell>
                  <TableCell>{u.email || '—'}</TableCell>
                  <TableCell>
                    <Badge variant={u.plan === 'premium' ? 'default' : 'secondary'}>{u.plan}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {u.created_at ? format(new Date(u.created_at), 'dd MMM yyyy') : '—'}
                  </TableCell>
                </TableRow>
              ))}
              {recentSignups.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground py-8">No users yet</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
