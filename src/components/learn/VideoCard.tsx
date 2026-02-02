import React from 'react';
import { Card } from '@/components/ui/card';
import { Play, AlertCircle } from 'lucide-react';
import type { ContentVideo } from '@/hooks/useContentVideos';
import { getVideoPublicUrl } from '@/hooks/useContentVideos';

interface VideoCardProps {
  video: ContentVideo;
  onPlay?: (video: ContentVideo) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const videoUrl = getVideoPublicUrl(video.video_path);
  const isCloudflareStream = /^[a-f0-9]{32}$/i.test(video.video_path);

  return (
    <Card variant="default" className="p-4">
      <div className="mb-3">
        <h3 className="font-medium text-foreground mb-1 leading-tight">
          {video.title}
        </h3>
        
        {video.description && (
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {video.description}
          </p>
        )}
      </div>
      
      {/* Video player - Cloudflare Stream iframe or placeholder */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-muted">
        {isCloudflareStream && videoUrl ? (
          <iframe
            src={videoUrl}
            className="absolute inset-0 w-full h-full border-0"
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted text-muted-foreground gap-2">
            <Play className="w-10 h-10" />
            <p className="text-sm">Video coming soon</p>
          </div>
        )}
      </div>
    </Card>
  );
};
