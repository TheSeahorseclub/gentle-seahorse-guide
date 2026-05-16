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
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Search, FileText, Pencil } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { AGE_STAGES, CONTENT_SECTIONS, type AgeStageId, type SectionId } from '@/utils/ageStages';

interface ContentItem {
  id: string;
  title: string;
  description: string | null;
  body: string | null;
  image_url: string | null;
  age_stage: AgeStageId | null;
  section: SectionId | null;
  content_type: string;
  access_level: string;
  week_recommended: number[] | null;
  is_published: boolean;
  created_at: string;
}

interface FormState {
  id?: string;
  title: string;
  description: string;
  body: string;
  image_url: string;
  age_stage: string;
  section: string;
  content_type: string;
  access_level: string;
  week_recommended: string; // comma-separated
  is_published: boolean;
}

const emptyForm: FormState = {
  title: '', description: '', body: '', image_url: '',
  age_stage: '', section: '',
  content_type: 'article', access_level: 'free',
  week_recommended: '', is_published: true,
};

export const AdminContent: React.FC = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [sectionFilter, setSectionFilter] = useState<string>('all');
  const [accessFilter, setAccessFilter] = useState<string>('all');

  const { data: content = [], isLoading } = useQuery({
    queryKey: ['admin-content'],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from('app_content').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data as ContentItem[];
    },
  });

  const filtered = useMemo(() => {
    let r = content;
    if (search) {
      const q = search.toLowerCase();
      r = r.filter((c) => c.title.toLowerCase().includes(q));
    }
    if (stageFilter !== 'all') r = r.filter((c) => c.age_stage === stageFilter);
    if (sectionFilter !== 'all') r = r.filter((c) => c.section === sectionFilter);
    if (accessFilter !== 'all') r = r.filter((c) => c.access_level === accessFilter);
    return r;
  }, [content, search, stageFilter, sectionFilter, accessFilter]);

  const openCreate = () => { setForm(emptyForm); setOpen(true); };
  const openEdit = (c: ContentItem) => {
    setForm({
      id: c.id,
      title: c.title,
      description: c.description || '',
      body: c.body || '',
      image_url: c.image_url || '',
      age_stage: c.age_stage || '',
      section: c.section || '',
      content_type: c.content_type || 'article',
      access_level: c.access_level || 'free',
      week_recommended: (c.week_recommended || []).join(','),
      is_published: c.is_published,
    });
    setOpen(true);
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      const weeks = form.week_recommended
        .split(',')
        .map((s) => parseInt(s.trim(), 10))
        .filter((n) => Number.isFinite(n) && n >= 0);
      const payload: any = {
        title: form.title,
        description: form.description || null,
        body: form.body || null,
        image_url: form.image_url || null,
        age_stage: form.age_stage || null,
        section: form.section || null,
        content_type: form.content_type,
        access_level: form.access_level,
        week_recommended: weeks.length ? weeks : null,
        is_published: form.is_published,
      };
      if (form.id) {
        const { error } = await (supabase as any).from('app_content').update(payload).eq('id', form.id);
        if (error) throw error;
      } else {
        const { error } = await (supabase as any).from('app_content').insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-content'] });
      setForm(emptyForm); setOpen(false);
      toast.success(form.id ? 'Content updated' : 'Content created');
    },
    onError: (e: any) => toast.error(e.message || 'Failed to save'),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase as any).from('app_content').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-content'] });
      toast.success('Deleted');
    },
    onError: () => toast.error('Failed to delete'),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Content Management</h1>
          <p className="text-muted-foreground text-sm mt-1">{content.length} items</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-2 rounded-xl" onClick={openCreate}>
              <Plus className="w-4 h-4" /> Add Content
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-display">{form.id ? 'Edit Content' : 'New Content'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <div>
                <Label className="text-xs">Title</Label>
                <Input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className="mt-1" />
              </div>
              <div>
                <Label className="text-xs">Short description</Label>
                <Textarea rows={2} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className="mt-1" />
              </div>
              <div>
                <Label className="text-xs">Body (Markdown)</Label>
                <Textarea rows={6} value={form.body} onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))} className="mt-1 font-mono text-xs" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Age Stage</Label>
                  <Select value={form.age_stage} onValueChange={(v) => setForm((f) => ({ ...f, age_stage: v }))}>
                    <SelectTrigger className="mt-1"><SelectValue placeholder="Select…" /></SelectTrigger>
                    <SelectContent>
                      {AGE_STAGES.map((s) => <SelectItem key={s.id} value={s.id}>{s.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs">Section</Label>
                  <Select value={form.section} onValueChange={(v) => setForm((f) => ({ ...f, section: v }))}>
                    <SelectTrigger className="mt-1"><SelectValue placeholder="Select…" /></SelectTrigger>
                    <SelectContent>
                      {CONTENT_SECTIONS.map((s) => <SelectItem key={s.id} value={s.id}>{s.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Type</Label>
                  <Select value={form.content_type} onValueChange={(v) => setForm((f) => ({ ...f, content_type: v }))}>
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
                  <Label className="text-xs">Access</Label>
                  <Select value={form.access_level} onValueChange={(v) => setForm((f) => ({ ...f, access_level: v }))}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label className="text-xs">Image URL (optional)</Label>
                <Input value={form.image_url} onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))} className="mt-1" placeholder="https://…" />
              </div>
              <div>
                <Label className="text-xs">Recommended weeks (comma-separated, 0–156)</Label>
                <Input value={form.week_recommended} onChange={(e) => setForm((f) => ({ ...f, week_recommended: e.target.value }))} className="mt-1" placeholder="e.g. 4,5,6" />
                <p className="text-[10px] text-muted-foreground mt-1">Shown as "Recommended this week" when the baby reaches any of these weeks.</p>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <Label className="text-sm">Published</Label>
                  <p className="text-[11px] text-muted-foreground">Visible to parents</p>
                </div>
                <Switch checked={form.is_published} onCheckedChange={(v) => setForm((f) => ({ ...f, is_published: v }))} />
              </div>
              <Button className="w-full rounded-xl" onClick={() => saveMutation.mutate()} disabled={!form.title || saveMutation.isPending}>
                {saveMutation.isPending ? 'Saving…' : (form.id ? 'Save changes' : 'Create')}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search content…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={stageFilter} onValueChange={setStageFilter}>
          <SelectTrigger className="w-[160px] h-9 text-xs rounded-xl"><SelectValue placeholder="Stage" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All stages</SelectItem>
            {AGE_STAGES.map((s) => <SelectItem key={s.id} value={s.id}>{s.label}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={sectionFilter} onValueChange={setSectionFilter}>
          <SelectTrigger className="w-[160px] h-9 text-xs rounded-xl"><SelectValue placeholder="Section" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All sections</SelectItem>
            {CONTENT_SECTIONS.map((s) => <SelectItem key={s.id} value={s.id}>{s.label}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={accessFilter} onValueChange={setAccessFilter}>
          <SelectTrigger className="w-[120px] h-9 text-xs rounded-xl"><SelectValue placeholder="Access" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All access</SelectItem>
            <SelectItem value="free">Free</SelectItem>
            <SelectItem value="premium">Premium</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <FileText className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">{filtered.length} items shown</span>
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-8 text-center text-muted-foreground">Loading…</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead>Title</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead>Section</TableHead>
                    <TableHead>Access</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="w-20"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((c) => (
                    <TableRow key={c.id} className="hover:bg-muted/20">
                      <TableCell className="font-medium">{c.title}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {AGE_STAGES.find((s) => s.id === c.age_stage)?.short || '—'}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {CONTENT_SECTIONS.find((s) => s.id === c.section)?.label || '—'}
                      </TableCell>
                      <TableCell>
                        <Badge variant={c.access_level === 'premium' ? 'default' : 'secondary'} className="text-[10px] capitalize">
                          {c.access_level}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={c.is_published ? 'outline' : 'secondary'} className="text-[10px]">
                          {c.is_published ? 'Live' : 'Draft'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                        {format(new Date(c.created_at), 'dd MMM yyyy')}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(c)}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => deleteMutation.mutate(c.id)}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filtered.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-muted-foreground py-12">
                        No content matches your filters
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
