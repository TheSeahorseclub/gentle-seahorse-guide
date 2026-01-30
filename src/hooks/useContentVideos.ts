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

// Normalize path to match actual file naming convention (uppercase Module)
const normalizeVideoPath = (path: string): string => {
  // Convert lowercase "module" to uppercase "Module" to match storage files
  return path.replace(/module(\d)/gi, 'Module$1');
};

export const getVideoPublicUrl = (videoPath: string): string | null => {
  if (!videoPath) {
    console.error('Video path is missing');
    return null;
  }
  
  // Normalize path to match actual file naming in storage
  const normalizedPath = normalizeVideoPath(videoPath);
  
  // Supabase getPublicUrl already handles URL encoding internally
  const { data } = supabase.storage
    .from('videos')
    .getPublicUrl(normalizedPath);
  
  if (!data?.publicUrl) {
    console.error('Failed to get public URL for video:', normalizedPath);
    return null;
  }
  
  console.log('Video path normalized:', videoPath, '→', normalizedPath);
  return data.publicUrl;
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
