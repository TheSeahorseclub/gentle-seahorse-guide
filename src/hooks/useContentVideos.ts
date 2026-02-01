import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface ContentVideo {
  id: string;
  cycle_number: number;
  title: string;
  description: string | null;
  video_path: string;
  video_order: number;
  is_published: boolean;
  created_at: string;
}

export const cycleLabels: Record<number, string> = {
  1: '0–3 months',
  2: '4–6 months',
  3: '7–9 months',
  4: '10–12 months',
  5: '13–15 months',
  6: '16–18 months',
  7: '19–21 months',
  8: '22–24 months',
  9: '25–27 months',
  10: '28–30 months',
  11: '31–33 months',
  12: '34–36 months',
};

export const useContentVideos = () => {
  return useQuery({
    queryKey: ['content-videos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('content_videos')
        .select('*')
        .eq('is_published', true)
        .order('cycle_number', { ascending: true })
        .order('video_order', { ascending: true });

      if (error) {
        console.error('Error fetching videos:', error);
        throw error;
      }

      return data as ContentVideo[];
    },
  });
};

export const getVideoPublicUrl = (videoPath: string): string | null => {
  if (!videoPath) return null;
  
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  if (!supabaseUrl) return null;
  
  return `${supabaseUrl}/storage/v1/object/public/videos/${videoPath}`;
};

// Group videos by cycle number
export const groupVideosByCycle = (videos: ContentVideo[]): Record<number, ContentVideo[]> => {
  return videos.reduce((acc, video) => {
    const cycle = video.cycle_number;
    if (!acc[cycle]) {
      acc[cycle] = [];
    }
    acc[cycle].push(video);
    return acc;
  }, {} as Record<number, ContentVideo[]>);
};
