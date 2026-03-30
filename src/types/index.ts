// User and Onboarding Types
export interface UserProfile {
  childAgeMonths: number;
  childAgeWeeks?: number;
  babyName?: string;
  caregiverType: CaregiverType;
  confidenceLevel: ConfidenceLevel;
  onboardingComplete: boolean;
  createdAt: string;
}

export type CaregiverType = 
  | 'mother'
  | 'father'
  | 'grandparent'
  | 'other-family'
  | 'foster-carer'
  | 'other';

export type ConfidenceLevel = 1 | 2 | 3 | 4 | 5;

// Signal Tracking Types
export interface DailySignal {
  id: string;
  date: string;
  sleep: SleepSignal;
  crying: CryingSignal;
  feeding: FeedingSignal;
  interaction: InteractionSignal;
  transitions: TransitionsSignal;
  notes?: string;
}

export interface SleepSignal {
  quality: 'restful' | 'unsettled' | 'mixed';
  notes?: string;
}

export interface CryingSignal {
  level: 'calm-day' | 'some-fussiness' | 'more-than-usual';
  notes?: string;
}

export interface FeedingSignal {
  pattern: 'settled' | 'variable' | 'challenging';
  notes?: string;
}

export interface InteractionSignal {
  engagement: 'connected' | 'quiet' | 'seeking-comfort';
  notes?: string;
}

export interface TransitionsSignal {
  ease: 'smooth' | 'needs-support' | 'finding-it-hard';
  notes?: string;
}

// Insight Types
export interface DailyInsight {
  id: string;
  date: string;
  nervousSystemMeaning: string;
  supportSuggestion: string;
  generatedAt: string;
}

// Milestone Types
export interface DevelopmentWindow {
  id: string;
  ageRangeMonths: [number, number];
  title: string;
  description: string;
  focus: string;
}

// Micro Lesson Types
export interface MicroLesson {
  id: string;
  title: string;
  duration: string;
  description: string;
  topic: LessonTopic;
  thumbnailUrl?: string;
  videoUrl?: string;
}

export type LessonTopic = 
  | 'brain-development'
  | 'nervous-system'
  | 'mental-health-foundations'
  | 'attachment-safety';

// Weekly Reflection Types
export interface WeeklyReflection {
  id: string;
  weekStartDate: string;
  confidenceImproved: boolean | null;
  notes?: string;
}

// Export Summary Types
export interface ExportSummary {
  generatedAt: string;
  childAgeMonths: number;
  signalsSummary: string;
  observationPeriod: string;
}
