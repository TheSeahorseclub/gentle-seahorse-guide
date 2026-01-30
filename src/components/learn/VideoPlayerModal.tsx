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

  const handleError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error('Video playback failed for path:', video.video_path);
    console.error('Video URL attempted:', videoUrl);
    console.error('Error event:', e);
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
              <div className="w-full h-full flex flex-col items-center justify-center bg-muted text-muted-foreground gap-3 p-4">
                <AlertCircle className="w-10 h-10" />
                <p className="text-sm font-medium">Video unavailable — check path/bucket</p>
                {/* DEBUG INFO */}
                <div className="mt-2 p-2 bg-background/50 rounded text-xs font-mono text-left w-full max-w-md space-y-1">
                  <p><strong>video_path:</strong> {video.video_path}</p>
                  <p className="break-all"><strong>publicUrl:</strong> {videoUrl || 'NULL'}</p>
                  <p><strong>bucket:</strong> videos</p>
                  {hasError && <p className="text-destructive"><strong>error:</strong> Failed to load video</p>}
                </div>
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
        
        {/* DEBUG INFO in modal footer - temporary */}
        <div className="px-6 pb-4">
          <div className="p-2 bg-muted/50 rounded-lg text-xs font-mono space-y-1 border border-dashed border-muted-foreground/30">
            <p><strong>video_path:</strong> {video.video_path}</p>
            <p className="break-all"><strong>publicUrl:</strong> {videoUrl || 'NULL'}</p>
            <p><strong>bucket:</strong> videos</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
