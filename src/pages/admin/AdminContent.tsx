import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Search, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface ContentItem {
  id: string;
  title: string;
  category: string | null;
  age_group: string | null;
  description: string | null;
  content_type: string;
  access_level: string;
  created_at: string;
}

type ContentFilter = 'all' | 'free' | 'premium';

const emptyForm = { title: '', category: '', age_group: '', description: '', content_type: 'article', access_level: 'free' };

export const AdminContent: React.FC = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [search, setSearch] = useState('');
  const [accessFilter, setAccessFilter] = useState<ContentFilter>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [ageFilter, setAgeFilter] = useState('all');

  const { data: content = [], isLoading } = useQuery({
    queryKey: ['admin-content'],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from('app_content')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as ContentItem[];
    },
  });

  const categories = useMemo(() => {
    const cats = [...new Set(content.map(c => c.category).filter(Boolean))] as string[];
    return cats.sort();
  }, [content]);

  const ageGroups = useMemo(() => {
    const ages = [...new Set(content.map(c => c.age_group).filter(Boolean))] as string[];
    return ages.sort();
  }, [content]);

  const filtered = useMemo(() => {
    let result = content;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(c => c.title.toLowerCase().includes(q) || (c.category || '').toLowerCase().includes(q));
    }
    if (accessFilter !== 'all') result = result.filter(c => c.access_level === accessFilter);
    if (categoryFilter !== 'all') result = result.filter(c => c.category === categoryFilter);
    if (ageFilter !== 'all') result = result.filter(c => c.age_group === ageFilter);
    return result;
  }, [content, search, accessFilter, categoryFilter, ageFilter]);

  const createMutation = useMutation({
    mutationFn: async () => {
      const { error } = await (supabase as any).from('app_content').insert({
        title: form.title,
        category: form.category || null,
        age_group: form.age_group || null,
        description: form.description || null,
        content_type: form.content_type,
        access_level: form.access_level,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-content'] });
      setForm(emptyForm);
      setOpen(false);
      toast.success('Content created');
    },
    onError: () => toast.error('Failed to create content'),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase as any).from('app_content').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-content'] });
      toast.success('Content deleted');
    },
    onError: () => toast.error('Failed to delete content'),
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Content Management</h1>
          <p className="text-muted-foreground text-sm mt-1">{content.length} items</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-2 rounded-xl">
              <Plus className="w-4 h-4" /> Add Content
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-display">New Content</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <div>
                <Label className="text-xs font-medium text-muted-foreground">Title</Label>
                <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="mt-1" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">Category</Label>
                  <Input placeholder="e.g. brain-development" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="mt-1" />
                </div>
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">Age Group</Label>
                  <Input placeholder="e.g. 0-12" value={form.age_group} onChange={e => setForm(f => ({ ...f, age_group: e.target.value }))} className="mt-1" />
                </div>
              </div>
              <div>
                <Label className="text-xs font-medium text-muted-foreground">Description</Label>
                <Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="mt-1" rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">Type</Label>
                  <Select value={form.content_type} onValueChange={v => setForm(f => ({ ...f, content_type: v }))}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="article">Article</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="lesson">Lesson</SelectItem>
                      <SelectItem value="guide">Guide</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">Access Level</Label>
                  <Select value={form.access_level} onValueChange={v => setForm(f => ({ ...f, access_level: v }))}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="w-full rounded-xl" onClick={() => createMutation.mutate()} disabled={!form.title || createMutation.isPending}>
                {createMutation.isPending ? 'Creating…' : 'Create Content'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search content…" value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {(['all', 'free', 'premium'] as ContentFilter[]).map(f => (
            <Button
              key={f}
              variant={accessFilter === f ? 'default' : 'outline'}
              size="sm"
              className="rounded-xl text-xs capitalize"
              onClick={() => setAccessFilter(f)}
            >
              {f}
            </Button>
          ))}
          {categories.length > 0 && (
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[140px] h-8 text-xs rounded-xl">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          )}
          {ageGroups.length > 0 && (
            <Select value={ageFilter} onValueChange={setAgeFilter}>
              <SelectTrigger className="w-[130px] h-8 text-xs rounded-xl">
                <SelectValue placeholder="Age Group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ages</SelectItem>
                {ageGroups.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="flex items-center gap-2">
        <FileText className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">{filtered.length} items shown</span>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-8 text-center text-muted-foreground">Loading content…</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Age Group</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Access</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((c: ContentItem) => (
                    <TableRow key={c.id} className="hover:bg-muted/20">
                      <TableCell className="font-medium">{c.title}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{c.category || '—'}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{c.age_group || '—'}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs capitalize">{c.content_type}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={c.access_level === 'premium' ? 'default' : 'secondary'} className="text-xs capitalize">
                          {c.access_level}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                        {format(new Date(c.created_at), 'dd MMM yyyy')}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => deleteMutation.mutate(c.id)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filtered.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-muted-foreground py-12">
                        {search || accessFilter !== 'all' ? 'No content matches your filters' : 'No content yet'}
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
