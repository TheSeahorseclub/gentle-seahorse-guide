import React from 'react';
import { Card } from '@/components/ui/card';
import type { ContentVideo } from '@/hooks/useContentVideos';

interface VideoCardProps {
  video: ContentVideo;
  onPlay?: (video: ContentVideo) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
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
      
      {/* Cloudflare Stream embedded video player */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-muted">
        <iframe
          src="https://customer-e236ffdew96i1dkq.cloudflarestream.com/166d3a4b6c8187eb4c319dc71cf64433/iframe"
          className="absolute inset-0 w-full h-full border-0"
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>
    </Card>
  );
};
