import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { AlertCircle } from 'lucide-react';
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
  const [hasError, setHasError] = useState(false);

  if (!video) return null;

  const videoUrl = getVideoPublicUrl(video.video_path);

  const handleError = () => {
    console.error('Video playback failed for path:', video.video_path);
    setHasError(true);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setHasError(false);
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
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
            {!videoUrl || hasError ? (
              <div className="w-full h-full flex flex-col items-center justify-center bg-muted text-muted-foreground gap-3">
                <AlertCircle className="w-10 h-10" />
                <p className="text-sm font-medium">Video unavailable</p>
                <p className="text-xs text-center px-4">
                  This video could not be loaded. Please try again later.
                </p>
              </div>
            ) : (
              <video
                key={videoUrl}
                className="w-full h-full object-contain bg-black"
                controls
                playsInline
                preload="metadata"
                onError={handleError}
              >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </AspectRatio>
        </div>
      </DialogContent>
    </Dialog>
  );
};
