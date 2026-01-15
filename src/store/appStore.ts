import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { 
  UserProfile, 
  DailySignal, 
  DailyInsight, 
  WeeklyReflection,
  CaregiverType,
  ConfidenceLevel 
} from '@/types';

interface AppState {
  // User Profile
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
  updateOnboarding: (data: Partial<UserProfile>) => void;
  completeOnboarding: () => void;
  
  // Daily Signals
  dailySignals: DailySignal[];
  addDailySignal: (signal: DailySignal) => void;
  getTodaySignal: () => DailySignal | undefined;
  
  // Insights
  dailyInsights: DailyInsight[];
  addDailyInsight: (insight: DailyInsight) => void;
  getTodayInsight: () => DailyInsight | undefined;
  
  // Weekly Reflections
  weeklyReflections: WeeklyReflection[];
  addWeeklyReflection: (reflection: WeeklyReflection) => void;
  
  // Utility
  resetApp: () => void;
}

const getToday = () => new Date().toISOString().split('T')[0];

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // User Profile
      userProfile: null,
      setUserProfile: (profile) => set({ userProfile: profile }),
      updateOnboarding: (data) => set((state) => ({
        userProfile: state.userProfile 
          ? { ...state.userProfile, ...data }
          : {
              childAgeMonths: 0,
              caregiverType: 'mother' as CaregiverType,
              confidenceLevel: 3 as ConfidenceLevel,
              onboardingComplete: false,
              createdAt: new Date().toISOString(),
              ...data
            }
      })),
      completeOnboarding: () => set((state) => ({
        userProfile: state.userProfile 
          ? { ...state.userProfile, onboardingComplete: true }
          : null
      })),
      
      // Daily Signals
      dailySignals: [],
      addDailySignal: (signal) => set((state) => {
        const existing = state.dailySignals.findIndex(s => s.date === signal.date);
        if (existing >= 0) {
          const updated = [...state.dailySignals];
          updated[existing] = signal;
          return { dailySignals: updated };
        }
        return { dailySignals: [...state.dailySignals, signal] };
      }),
      getTodaySignal: () => {
        const today = getToday();
        return get().dailySignals.find(s => s.date === today);
      },
      
      // Insights
      dailyInsights: [],
      addDailyInsight: (insight) => set((state) => ({
        dailyInsights: [...state.dailyInsights, insight]
      })),
      getTodayInsight: () => {
        const today = getToday();
        return get().dailyInsights.find(i => i.date === today);
      },
      
      // Weekly Reflections
      weeklyReflections: [],
      addWeeklyReflection: (reflection) => set((state) => ({
        weeklyReflections: [...state.weeklyReflections, reflection]
      })),
      
      // Utility
      resetApp: () => set({
        userProfile: null,
        dailySignals: [],
        dailyInsights: [],
        weeklyReflections: []
      })
    }),
    {
      name: 'seahorse-club-storage',
    }
  )
);
