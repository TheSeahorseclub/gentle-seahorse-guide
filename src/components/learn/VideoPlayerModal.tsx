import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import type { ContentVideo } from '@/hooks/useContentVideos';
import { getVideoPublicUrl } from '@/hooks/useContentVideos';

interface VideoPlayerModalProps {
  video: ContentVideo | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  video,
  open,
  onOpenChange,
}) => {
  if (!video) return null;

  const videoUrl = getVideoPublicUrl(video.video_path);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="font-display text-lg">
            {video.title}
          </DialogTitle>
          {video.description && (
            <DialogDescription className="text-muted-foreground">
              {video.description}
            </DialogDescription>
          )}
        </DialogHeader>
        
        <div className="p-6 pt-4">
          <AspectRatio ratio={16 / 9} className="bg-muted rounded-xl overflow-hidden">
            <video
              key={videoUrl}
              className="w-full h-full object-contain bg-black"
              controls
              playsInline
              preload="metadata"
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </AspectRatio>
        </div>
      </DialogContent>
    </Dialog>
  );
};
