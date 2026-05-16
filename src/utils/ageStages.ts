export type AgeStageId =
  | 'pregnancy'
  | 'newborn'
  | '1-3m'
  | '3-6m'
  | '6-9m'
  | '9-12m'
  | '12-18m'
  | '18-24m'
  | '2-3y';

export interface AgeStage {
  id: AgeStageId;
  label: string;
  short: string;
  minMonths: number; // inclusive
  maxMonths: number; // inclusive
}

// minMonths = -1 reserved for pregnancy (we won't auto-select it)
export const AGE_STAGES: AgeStage[] = [
  { id: 'pregnancy', label: 'Pregnancy', short: 'Pregnancy', minMonths: -99, maxMonths: -1 },
  { id: 'newborn', label: 'Newborn (0–1 month)', short: '0–1m', minMonths: 0, maxMonths: 0 },
  { id: '1-3m', label: '1–3 months', short: '1–3m', minMonths: 1, maxMonths: 2 },
  { id: '3-6m', label: '3–6 months', short: '3–6m', minMonths: 3, maxMonths: 5 },
  { id: '6-9m', label: '6–9 months', short: '6–9m', minMonths: 6, maxMonths: 8 },
  { id: '9-12m', label: '9–12 months', short: '9–12m', minMonths: 9, maxMonths: 11 },
  { id: '12-18m', label: '12–18 months', short: '12–18m', minMonths: 12, maxMonths: 17 },
  { id: '18-24m', label: '18–24 months', short: '18–24m', minMonths: 18, maxMonths: 23 },
  { id: '2-3y', label: '2–3 years', short: '2–3y', minMonths: 24, maxMonths: 36 },
];

export function getStageForAgeMonths(ageMonths: number | null | undefined): AgeStage {
  if (ageMonths == null) return AGE_STAGES[1]; // default to newborn
  const found = AGE_STAGES.find(
    (s) => s.id !== 'pregnancy' && ageMonths >= s.minMonths && ageMonths <= s.maxMonths
  );
  return found ?? AGE_STAGES[AGE_STAGES.length - 1];
}

export function getStageById(id: AgeStageId): AgeStage | undefined {
  return AGE_STAGES.find((s) => s.id === id);
}

// Approximate week of life (0-indexed)
export function getCurrentWeek(ageMonths: number | null | undefined): number {
  if (ageMonths == null || ageMonths < 0) return 0;
  return Math.max(0, Math.floor(ageMonths * 4.345));
}

export type SectionId =
  | 'development'
  | 'feeding'
  | 'sleep'
  | 'wellbeing'
  | 'milestones'
  | 'health'
  | 'activities'
  | 'expert'
  | 'videos';

export interface ContentSection {
  id: SectionId;
  label: string;
  description: string;
  tint: string; // tailwind classes for soft pastel tint
  iconName:
    | 'Brain'
    | 'Apple'
    | 'Moon'
    | 'Heart'
    | 'Sparkles'
    | 'ShieldCheck'
    | 'Palette'
    | 'GraduationCap'
    | 'PlayCircle';
}

export const CONTENT_SECTIONS: ContentSection[] = [
  { id: 'development', label: 'Child Development', description: 'Brain & body growth', tint: 'bg-sky-50 text-sky-700', iconName: 'Brain' },
  { id: 'feeding', label: 'Feeding & Nutrition', description: 'Milk, solids, mealtimes', tint: 'bg-amber-50 text-amber-700', iconName: 'Apple' },
  { id: 'sleep', label: 'Sleep', description: 'Rest & routines', tint: 'bg-indigo-50 text-indigo-700', iconName: 'Moon' },
  { id: 'wellbeing', label: 'Parent Wellbeing', description: 'Support for you', tint: 'bg-rose-50 text-rose-700', iconName: 'Heart' },
  { id: 'milestones', label: 'Milestones', description: 'What to expect', tint: 'bg-emerald-50 text-emerald-700', iconName: 'Sparkles' },
  { id: 'health', label: 'Health & Safety', description: 'Care essentials', tint: 'bg-teal-50 text-teal-700', iconName: 'ShieldCheck' },
  { id: 'activities', label: 'Activities & Bonding', description: 'Play & connection', tint: 'bg-orange-50 text-orange-700', iconName: 'Palette' },
  { id: 'expert', label: 'Expert Advice', description: 'From specialists', tint: 'bg-violet-50 text-violet-700', iconName: 'GraduationCap' },
  { id: 'videos', label: 'Videos & Learning', description: 'Watch & learn', tint: 'bg-blue-50 text-blue-700', iconName: 'PlayCircle' },
];

export function getSectionById(id: SectionId): ContentSection | undefined {
  return CONTENT_SECTIONS.find((s) => s.id === id);
}
