import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export const AdminSubscriptions: React.FC = () => {
  const { data: subs = [], isLoading } = useQuery({
    queryKey: ['admin-subscriptions'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_admin_subscriptions' as any);
      if (error) throw error;
      return (data as any[]) ?? [];
    },
  });

  if (isLoading) return <p className="text-muted-foreground">Loading subscriptions…</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Subscriptions</h1>
        <span className="text-sm text-muted-foreground">{subs.length} total</span>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Billing</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Trial</TableHead>
                <TableHead>Started</TableHead>
                <TableHead>Renewal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subs.map((s: any) => (
                <TableRow key={s.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{s.full_name || '—'}</p>
                      <p className="text-xs text-muted-foreground">{s.email || ''}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={s.plan === 'premium' ? 'default' : 'secondary'}>{s.plan}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={s.status === 'active' ? 'default' : s.status === 'cancelled' ? 'destructive' : 'outline'}>
                      {s.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{s.billing_cycle || '—'}</TableCell>
                  <TableCell className="text-sm">
                    {s.price > 0 ? `${s.currency} ${Number(s.price).toFixed(2)}` : 'Free'}
                  </TableCell>
                  <TableCell className="text-sm">{s.payment_provider || '—'}</TableCell>
                  <TableCell>
                    {s.trial_active ? (
                      <Badge variant="default">Active</Badge>
                    ) : (
                      <span className="text-sm text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {s.started_at ? format(new Date(s.started_at), 'dd MMM yyyy') : '—'}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {s.renewal_date ? format(new Date(s.renewal_date), 'dd MMM yyyy') : '—'}
                  </TableCell>
                </TableRow>
              ))}
              {subs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className="text-center text-muted-foreground py-8">No subscriptions found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
