import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Users } from 'lucide-react';
import { format } from 'date-fns';

type FilterType = 'all' | 'free' | 'premium' | 'trial' | 'cancelled' | 'admin';

const filterOptions: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Free', value: 'free' },
  { label: 'Premium', value: 'premium' },
  { label: 'Trial', value: 'trial' },
  { label: 'Cancelled', value: 'cancelled' },
  { label: 'Admin', value: 'admin' },
];

export const AdminUsers: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_admin_users' as any);
      if (error) throw error;
      return (data as any[]) ?? [];
    },
  });

  const { data: adminUserIds = [] } = useQuery({
    queryKey: ['admin-role-ids'],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from('user_roles')
        .select('user_id')
        .eq('role', 'admin');
      if (error) return [];
      return (data ?? []).map((r: any) => r.user_id);
    },
  });

  const filtered = useMemo(() => {
    let result = users;

    if (search) {
      const q = search.toLowerCase();
      result = result.filter((u: any) =>
        (u.full_name || '').toLowerCase().includes(q) ||
        (u.email || '').toLowerCase().includes(q)
      );
    }

    if (filter === 'free') result = result.filter((u: any) => u.plan === 'free');
    else if (filter === 'premium') result = result.filter((u: any) => u.plan === 'premium');
    else if (filter === 'trial') result = result.filter((u: any) => u.trial_status === 'active');
    else if (filter === 'cancelled') result = result.filter((u: any) => u.subscription_status === 'cancelled');
    else if (filter === 'admin') result = result.filter((u: any) => adminUserIds.includes(u.user_id));

    return result;
  }, [users, search, filter, adminUserIds]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Users</h1>
        <p className="text-muted-foreground text-sm mt-1">{users.length} registered users</p>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {filterOptions.map(opt => (
            <Button
              key={opt.value}
              variant={filter === opt.value ? 'default' : 'outline'}
              size="sm"
              className="rounded-xl text-xs"
              onClick={() => setFilter(opt.value)}
            >
              {opt.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center gap-2">
        <Users className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">{filtered.length} users shown</span>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-8 text-center text-muted-foreground">Loading users…</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Subscription</TableHead>
                    <TableHead>Trial</TableHead>
                    <TableHead>Signed Up</TableHead>
                    <TableHead>Last Login</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((u: any) => {
                    const isAdmin = adminUserIds.includes(u.user_id);
                    return (
                      <TableRow key={u.user_id} className="hover:bg-muted/20">
                        <TableCell className="font-medium">{u.full_name || '—'}</TableCell>
                        <TableCell className="text-sm">{u.email || '—'}</TableCell>
                        <TableCell>
                          <Badge variant={isAdmin ? 'default' : 'secondary'} className="text-xs">
                            {isAdmin ? 'Admin' : 'User'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={u.plan === 'premium' ? 'default' : 'secondary'} className="text-xs capitalize">
                            {u.plan}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={u.subscription_status === 'active' ? 'default' : u.subscription_status === 'cancelled' ? 'destructive' : 'outline'}
                            className="text-xs"
                          >
                            {u.subscription_status || 'none'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={u.trial_status === 'active' ? 'default' : 'outline'} className="text-xs">
                            {u.trial_status || 'none'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                          {u.created_at ? format(new Date(u.created_at), 'dd MMM yyyy') : '—'}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                          {u.last_login ? format(new Date(u.last_login), 'dd MMM yyyy HH:mm') : 'Never'}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {filtered.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center text-muted-foreground py-12">
                        {search || filter !== 'all' ? 'No users match your filters' : 'No users found'}
                      </TableCell>
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
