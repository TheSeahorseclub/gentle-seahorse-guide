-- Create content_videos table for storing video metadata
CREATE TABLE public.content_videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cycle_number SMALLINT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  video_path TEXT NOT NULL,
  video_order SMALLINT NOT NULL DEFAULT 1,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.content_videos ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read published videos (public content)
CREATE POLICY "Anyone can view published videos"
ON public.content_videos
FOR SELECT
USING (is_published = true);

-- Create index for efficient querying
CREATE INDEX idx_content_videos_cycle_order ON public.content_videos (cycle_number, video_order);
CREATE INDEX idx_content_videos_published ON public.content_videos (is_published);