import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Loader2, Film } from 'lucide-react';
import { useContentVideos, groupVideosByCycle, cycleLabels } from '@/hooks/useContentVideos';
import { VideoCard } from './VideoCard';
import { VideoPlayerModal } from './VideoPlayerModal';
import type { ContentVideo } from '@/hooks/useContentVideos';

export const VideoLibrary: React.FC = () => {
  const { data: videos, isLoading, error } = useContentVideos();
  const [selectedVideo, setSelectedVideo] = useState<ContentVideo | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handlePlay = (video: ContentVideo) => {
    setSelectedVideo(video);
    setModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Card variant="soft" className="p-6">
        <p className="text-center text-muted-foreground">
          Unable to load videos right now. Please try again later.
        </p>
      </Card>
    );
  }

  if (!videos || videos.length === 0) {
    return (
      <Card variant="soft" className="p-8">
        <div className="text-center">
          <Film className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
          <p className="text-muted-foreground italic">
            New video lessons are coming soon. Check back for gentle, supportive content to help you on your journey.
          </p>
        </div>
      </Card>
    );
  }

  const groupedVideos = videos ? groupVideosByCycle(videos) : {};
  
  // Static array of all 12 cycles - always render all sections
  const allCycles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <>
      <div className="space-y-8">
        {allCycles.map((cycleNumber) => {
          const cycleVideos = groupedVideos[cycleNumber];
          const ageLabel = cycleLabels[cycleNumber] || `Cycle ${cycleNumber}`;

          return (
            <div key={cycleNumber} className="animate-fade-in">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">
                    {cycleNumber}
                  </span>
                </div>
                <div>
                  <h2 className="font-display font-semibold text-foreground">
                    Cycle {cycleNumber}
                  </h2>
                  <p className="text-sm text-muted-foreground">{ageLabel}</p>
                </div>
              </div>

              {cycleVideos && cycleVideos.length > 0 ? (
                <div className="space-y-3">
                  {cycleVideos.map((video) => (
                    <VideoCard
                      key={video.id}
                      video={video}
                      onPlay={handlePlay}
                    />
                  ))}
                </div>
              ) : (
                <Card variant="soft" className="p-4">
                  <p className="text-center text-sm text-muted-foreground italic">
                    New lessons coming soon.
                  </p>
                </Card>
              )}
            </div>
          );
        })}

        <Card variant="soft" className="p-4">
          <p className="text-center text-sm text-muted-foreground italic leading-relaxed">
            All content is evidence-informed and designed to support your parenting journey with care and understanding.
          </p>
        </Card>
      </div>

      <VideoPlayerModal
        video={selectedVideo}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  );
};
