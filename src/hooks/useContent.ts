import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { AgeStageId, SectionId } from '@/utils/ageStages';

export interface ContentItem {
  id: string;
  title: string;
  description: string | null;
  body: string | null;
  image_url: string | null;
  age_stage: AgeStageId | null;
  section: SectionId | null;
  content_type: string;
  access_level: 'free' | 'premium';
  week_recommended: number[] | null;
  is_published: boolean;
  created_at: string;
}

export function useContentByStage(stage: AgeStageId | null | undefined) {
  return useQuery({
    queryKey: ['content-by-stage', stage],
    enabled: !!stage,
    queryFn: async (): Promise<ContentItem[]> => {
      const { data, error } = await (supabase as any)
        .from('app_content')
        .select('*')
        .eq('is_published', true)
        .eq('age_stage', stage)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data || []) as ContentItem[];
    },
  });
}

export function useContentItem(id: string | undefined) {
  return useQuery({
    queryKey: ['content-item', id],
    enabled: !!id,
    queryFn: async (): Promise<ContentItem | null> => {
      const { data, error } = await (supabase as any)
        .from('app_content')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      if (error) throw error;
      return (data || null) as ContentItem | null;
    },
  });
}

export function useRecommendedThisWeek(stage: AgeStageId | null | undefined, week: number) {
  return useQuery({
    queryKey: ['content-recommended', stage, week],
    enabled: !!stage,
    queryFn: async (): Promise<ContentItem[]> => {
      const { data, error } = await (supabase as any)
        .from('app_content')
        .select('*')
        .eq('is_published', true)
        .eq('age_stage', stage)
        .contains('week_recommended', [week])
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data || []) as ContentItem[];
    },
  });
}
