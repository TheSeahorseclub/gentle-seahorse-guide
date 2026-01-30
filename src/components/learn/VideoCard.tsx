import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import type { ContentVideo } from '@/hooks/useContentVideos';
import { getVideoPublicUrl } from '@/hooks/useContentVideos';

interface VideoCardProps {
  video: ContentVideo;
  onPlay: (video: ContentVideo) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, onPlay }) => {
  const publicUrl = getVideoPublicUrl(video.video_path);
  
  return (
    <Card variant="interactive" className="p-4">
      <div className="flex gap-4">
        {/* Thumbnail placeholder */}
        <div className="w-20 h-20 rounded-xl gradient-ocean flex items-center justify-center flex-shrink-0">
          <Play className="w-8 h-8 text-primary-foreground" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-foreground mb-1 leading-tight">
            {video.title}
          </h3>
          
          {video.description && (
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {video.description}
            </p>
          )}
        </div>
      </div>
      
      <div className="mt-4">
        <Button 
          variant="soft" 
          size="sm" 
          className="w-full"
          onClick={() => onPlay(video)}
        >
          <Play className="w-4 h-4" />
          Play video
        </Button>
      </div>
      
      {/* DEBUG INFO - temporary */}
      <div className="mt-3 p-2 bg-muted/50 rounded-lg text-xs font-mono space-y-1 border border-dashed border-muted-foreground/30">
        <p><strong>video_path:</strong> {video.video_path}</p>
        <p className="break-all"><strong>publicUrl:</strong> {publicUrl || 'NULL'}</p>
        <p><strong>bucket:</strong> videos</p>
      </div>
    </Card>
  );
};
