import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, UserCheck, CreditCard, Clock, UserX, DollarSign, TrendingUp, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const CHART_COLORS = [
  'hsl(205, 70%, 65%)',
  'hsl(200, 55%, 72%)',
  'hsl(215, 55%, 68%)',
  'hsl(210, 50%, 78%)',
];

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
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Dashboard Overview</h1>
          <p className="text-muted-foreground text-sm mt-1">Loading metrics…</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-5">
                <div className="h-4 bg-muted rounded w-20 mb-3" />
                <div className="h-7 bg-muted rounded w-12" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const statCards = [
    { label: 'Total Users', value: metrics?.total_users ?? 0, icon: Users, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Active (30d)', value: metrics?.active_users ?? 0, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Free Users', value: metrics?.free_users ?? 0, icon: UserCheck, color: 'text-muted-foreground', bg: 'bg-muted/60' },
    { label: 'Premium', value: metrics?.premium_users ?? 0, icon: CreditCard, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Trial', value: metrics?.trial_users ?? 0, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Cancelled', value: metrics?.cancelled_users ?? 0, icon: UserX, color: 'text-destructive', bg: 'bg-destructive/10' },
    { label: 'MRR', value: `£${Number(metrics?.monthly_revenue ?? 0).toFixed(2)}`, icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  const recentSignups = (metrics?.recent_signups ?? []) as any[];
  const recentSubChanges = (metrics?.recent_subscription_changes ?? []) as any[];
  const mostViewed = (metrics?.most_viewed_content ?? []) as any[];
  const signupsByMonth = (metrics?.signups_by_month ?? []) as any[];
  const subsByPlan = (metrics?.subscriptions_by_plan ?? []) as any[];
  const subsByProvider = (metrics?.subscriptions_by_provider ?? []) as any[];
  const subsByPlatform = (metrics?.subscriptions_by_platform ?? []) as any[];

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground text-sm mt-1">Monitor your platform performance at a glance</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(c => (
          <Card key={c.label} variant="soft" className="border border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
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

      {/* Charts row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* User growth chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            {signupsByMonth.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={signupsByMonth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(205, 35%, 88%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(210, 22%, 45%)' }} />
                  <YAxis tick={{ fontSize: 11, fill: 'hsl(210, 22%, 45%)' }} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: '12px',
                      border: '1px solid hsl(205, 35%, 88%)',
                      boxShadow: '0 4px 20px -4px hsl(205 55% 50% / 0.15)',
                      fontSize: '13px',
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(205, 70%, 65%)" radius={[6, 6, 0, 0]} name="Signups" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[220px] flex items-center justify-center text-muted-foreground text-sm">No signup data yet</div>
            )}
          </CardContent>
        </Card>

        {/* Plan distribution chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Plan Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {subsByPlan.length > 0 ? (
              <div className="flex items-center gap-6">
                <ResponsiveContainer width="50%" height={220}>
                  <PieChart>
                    <Pie
                      data={subsByPlan}
                      dataKey="count"
                      nameKey="plan"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      innerRadius={40}
                    >
                      {subsByPlan.map((_: any, i: number) => (
                        <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        borderRadius: '12px',
                        border: '1px solid hsl(205, 35%, 88%)',
                        fontSize: '13px',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-3">
                  {subsByPlan.map((item: any, i: number) => (
                    <div key={item.plan} className="flex items-center gap-2.5">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }} />
                      <span className="text-sm text-foreground capitalize">{item.plan}</span>
                      <span className="text-sm font-semibold text-foreground ml-auto">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-[220px] flex items-center justify-center text-muted-foreground text-sm">No plan data yet</div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Bottom sections */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent signups */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              Recent Signups
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentSignups.length > 0 ? recentSignups.slice(0, 6).map((u: any) => (
              <div key={u.user_id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{u.full_name || 'Anonymous'}</p>
                  <p className="text-xs text-muted-foreground">{u.email}</p>
                </div>
                <div className="text-right">
                  <Badge variant={u.plan === 'premium' ? 'default' : 'secondary'} className="text-xs">{u.plan}</Badge>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    {u.created_at ? format(new Date(u.created_at), 'dd MMM') : '—'}
                  </p>
                </div>
              </div>
            )) : (
              <p className="text-sm text-muted-foreground text-center py-4">No signups yet</p>
            )}
          </CardContent>
        </Card>

        {/* Recent subscription changes */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-primary" />
              Subscription Changes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentSubChanges.length > 0 ? recentSubChanges.slice(0, 6).map((s: any, i: number) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{s.full_name || 'Anonymous'}</p>
                  <p className="text-xs text-muted-foreground">{s.email}</p>
                </div>
                <div className="text-right">
                  <Badge variant={s.status === 'active' ? 'default' : s.status === 'cancelled' ? 'destructive' : 'outline'} className="text-xs">
                    {s.status}
                  </Badge>
                  <p className="text-[11px] text-muted-foreground mt-1 capitalize">{s.plan}</p>
                </div>
              </div>
            )) : (
              <p className="text-sm text-muted-foreground text-center py-4">No changes yet</p>
            )}
          </CardContent>
        </Card>

        {/* Most viewed content */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Eye className="w-4 h-4 text-primary" />
              Most Viewed Content
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mostViewed.length > 0 ? mostViewed.slice(0, 6).map((c: any, i: number) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                <p className="text-sm text-foreground truncate max-w-[160px]">{c.content_title}</p>
                <span className="text-xs font-semibold text-muted-foreground bg-muted/60 px-2 py-1 rounded-lg">
                  {c.view_count} views
                </span>
              </div>
            )) : (
              <p className="text-sm text-muted-foreground text-center py-4">No views yet</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
