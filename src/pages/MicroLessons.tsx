import React from 'react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { PageHeader } from '@/components/shared/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GraduationCap, Film } from 'lucide-react';
import { WeeklyLearning } from '@/components/learn/WeeklyLearning';
import { VideoLibrary } from '@/components/learn/VideoLibrary';

export const MicroLessons: React.FC = () => {
  return (
    <MobileLayout>
      <PageHeader 
        title="Learn" 
        subtitle="Gentle, evidence-informed guidance to support your journey. No pressure, no judgement."
      />

      <div className="px-6 pb-8">
        <Tabs defaultValue="weekly" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="weekly" className="gap-2">
              <GraduationCap className="w-4 h-4" />
              Weekly
            </TabsTrigger>
            <TabsTrigger value="videos" className="gap-2">
              <Film className="w-4 h-4" />
              Videos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="weekly" className="mt-0">
            <WeeklyLearning />
          </TabsContent>

          <TabsContent value="videos" className="mt-0">
            <VideoLibrary />
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  );
};