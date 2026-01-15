import React from 'react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Play, Clock, BookOpen, Brain, Heart, Shield } from 'lucide-react';
import type { MicroLesson, LessonTopic } from '@/types';

const topicIcons: Record<LessonTopic, React.ElementType> = {
  'brain-development': Brain,
  'nervous-system': BookOpen,
  'mental-health-foundations': Heart,
  'attachment-safety': Shield,
};

const topicLabels: Record<LessonTopic, string> = {
  'brain-development': 'Brain development',
  'nervous-system': 'Nervous system',
  'mental-health-foundations': 'Mental health foundations',
  'attachment-safety': 'Attachment & safety',
};

const lessons: MicroLesson[] = [
  {
    id: '1',
    title: 'Understanding early regulation',
    duration: '6 minutes',
    description: 'Learn how your baby\'s nervous system develops the ability to calm down, and how your presence supports this process.',
    topic: 'nervous-system',
  },
  {
    id: '2',
    title: 'The first 1000 days of brain building',
    duration: '8 minutes',
    description: 'Discover how everyday interactions literally shape your child\'s developing brain architecture.',
    topic: 'brain-development',
  },
  {
    id: '3',
    title: 'Co-regulation: Your calm is their calm',
    duration: '7 minutes',
    description: 'Understand why your emotional state matters so much, and how to use this knowledge without pressure.',
    topic: 'nervous-system',
  },
  {
    id: '4',
    title: 'Attachment security explained simply',
    duration: '9 minutes',
    description: 'What secure attachment really means, and why it\'s about "good enough" rather than perfect parenting.',
    topic: 'attachment-safety',
  },
  {
    id: '5',
    title: 'Foundations of mental wellbeing',
    duration: '8 minutes',
    description: 'How the experiences of early childhood create the foundations for lifelong emotional health.',
    topic: 'mental-health-foundations',
  },
  {
    id: '6',
    title: 'Reading your baby\'s signals',
    duration: '6 minutes',
    description: 'A gentle guide to understanding what your baby is communicating through their behaviour and body language.',
    topic: 'nervous-system',
  },
  {
    id: '7',
    title: 'Safe exploration and healthy boundaries',
    duration: '7 minutes',
    description: 'How to support your child\'s natural curiosity while keeping them safe and secure.',
    topic: 'attachment-safety',
  },
  {
    id: '8',
    title: 'Stress and the developing brain',
    duration: '10 minutes',
    description: 'Understanding the difference between healthy challenges and harmful stress in early development.',
    topic: 'brain-development',
  },
];

export const MicroLessons: React.FC = () => {
  const handleDownload = (lesson: MicroLesson) => {
    // Placeholder for future download functionality
    console.log('Download requested for:', lesson.title);
  };

  const groupedLessons = lessons.reduce((acc, lesson) => {
    if (!acc[lesson.topic]) {
      acc[lesson.topic] = [];
    }
    acc[lesson.topic].push(lesson);
    return acc;
  }, {} as Record<LessonTopic, MicroLesson[]>);

  return (
    <MobileLayout>
      <PageHeader 
        title="Micro lessons" 
        subtitle="Short, calm educational videos to deepen your understanding. No pressure, no judgement—just knowledge."
      />

      <div className="px-6 space-y-8 pb-8">
        {(Object.entries(groupedLessons) as [LessonTopic, MicroLesson[]][]).map(([topic, topicLessons]) => {
          const TopicIcon = topicIcons[topic];
          
          return (
            <div key={topic} className="animate-fade-in">
              <div className="flex items-center gap-2 mb-4">
                <TopicIcon className="w-5 h-5 text-primary" />
                <h2 className="font-display font-semibold text-foreground">
                  {topicLabels[topic]}
                </h2>
              </div>
              
              <div className="space-y-3">
                {topicLessons.map((lesson) => (
                  <Card key={lesson.id} variant="interactive" className="p-4">
                    <div className="flex gap-4">
                      {/* Thumbnail placeholder */}
                      <div className="w-20 h-20 rounded-xl gradient-ocean flex items-center justify-center flex-shrink-0">
                        <Play className="w-8 h-8 text-primary-foreground" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground mb-1 leading-tight">
                          {lesson.title}
                        </h3>
                        
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{lesson.duration}</span>
                        </div>
                        
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                          {lesson.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex gap-2">
                      <Button 
                        variant="soft" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleDownload(lesson)}
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                      >
                        <Play className="w-4 h-4" />
                        Watch now
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
        
        <Card variant="soft" className="p-4">
          <p className="text-center text-sm text-muted-foreground italic leading-relaxed">
            All content is evidence-informed and NHS-aligned. These lessons are educational and do not constitute medical advice.
          </p>
        </Card>
      </div>
    </MobileLayout>
  );
};
