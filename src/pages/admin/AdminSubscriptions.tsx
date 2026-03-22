import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CreditCard, Clock, UserX, DollarSign } from 'lucide-react';
import { format } from 'date-fns';

type SubFilter = 'all' | 'active' | 'trial' | 'cancelled';

export const AdminSubscriptions: React.FC = () => {
  const [filter, setFilter] = useState<SubFilter>('all');

  const { data: subs = [], isLoading } = useQuery({
    queryKey: ['admin-subscriptions'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_admin_subscriptions' as any);
      if (error) throw error;
      return (data as any[]) ?? [];
    },
  });

  const counts = useMemo(() => ({
    active: subs.filter((s: any) => s.status === 'active').length,
    trial: subs.filter((s: any) => s.trial_active).length,
    cancelled: subs.filter((s: any) => s.status === 'cancelled').length,
    revenue: subs.filter((s: any) => s.status === 'active' && s.plan !== 'free')
      .reduce((sum: number, s: any) => sum + Number(s.price || 0), 0),
  }), [subs]);

  const filtered = useMemo(() => {
    if (filter === 'active') return subs.filter((s: any) => s.status === 'active');
    if (filter === 'trial') return subs.filter((s: any) => s.trial_active);
    if (filter === 'cancelled') return subs.filter((s: any) => s.status === 'cancelled');
    return subs;
  }, [subs, filter]);

  const summaryCards = [
    { label: 'Active', value: counts.active, icon: CreditCard, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Trial', value: counts.trial, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Cancelled', value: counts.cancelled, icon: UserX, color: 'text-destructive', bg: 'bg-destructive/10' },
    { label: 'MRR', value: `£${counts.revenue.toFixed(2)}`, icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Subscriptions</h1>
        <p className="text-muted-foreground text-sm mt-1">{subs.length} total subscriptions</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map(c => (
          <Card key={c.label} variant="soft" className="border border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{c.label}</span>
                <div className={`w-8 h-8 rounded-xl ${c.bg} flex items-center justify-center`}>
                  <c.icon className={`w-4 h-4 ${c.color}`} />
                </div>
              </div>
              <div className="text-2xl font-bold text-foreground">{c.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-1.5">
        {(['all', 'active', 'trial', 'cancelled'] as SubFilter[]).map(f => (
          <Button
            key={f}
            variant={filter === f ? 'default' : 'outline'}
            size="sm"
            className="rounded-xl text-xs capitalize"
            onClick={() => setFilter(f)}
          >
            {f}
          </Button>
        ))}
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-8 text-center text-muted-foreground">Loading subscriptions…</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
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
                  {filtered.map((s: any) => (
                    <TableRow key={s.id} className="hover:bg-muted/20">
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm">{s.full_name || '—'}</p>
                          <p className="text-xs text-muted-foreground">{s.email || ''}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={s.plan === 'premium' ? 'default' : 'secondary'} className="text-xs capitalize">{s.plan}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={s.status === 'active' ? 'default' : s.status === 'cancelled' ? 'destructive' : 'outline'}
                          className="text-xs"
                        >
                          {s.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{s.billing_cycle || '—'}</TableCell>
                      <TableCell className="text-sm">
                        {s.price > 0 ? `${s.currency || 'GBP'} ${Number(s.price).toFixed(2)}` : 'Free'}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{s.payment_provider || '—'}</TableCell>
                      <TableCell>
                        {s.trial_active ? (
                          <Badge variant="default" className="text-xs">Active</Badge>
                        ) : (
                          <span className="text-sm text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                        {s.started_at ? format(new Date(s.started_at), 'dd MMM yyyy') : '—'}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                        {s.renewal_date ? format(new Date(s.renewal_date), 'dd MMM yyyy') : '—'}
                      </TableCell>
                    </TableRow>
                  ))}
                  {filtered.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center text-muted-foreground py-12">No subscriptions found</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
