-- Create the videos storage bucket (public)
INSERT INTO storage.buckets (id, name, public)
VALUES ('videos', 'videos', true);

-- Allow public read access to videos
CREATE POLICY "Anyone can view videos"
ON storage.objects
FOR SELECT
USING (bucket_id = 'videos');