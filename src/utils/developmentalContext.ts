export interface DevelopmentalContext {
  ageRange: string;
  description: string;
  signalNotes: string;
}

export function getDevelopmentalContext(ageMonths: number): DevelopmentalContext {
  if (ageMonths <= 3) {
    return {
      ageRange: '0–3 months',
      description: 'During this early period, babies are adapting to life outside the womb. Sleep patterns, feeding rhythms, and regulation are still developing. Variability in signals is typical and expected.',
      signalNotes: 'Irregular sleep-wake cycles and frequent feeding are developmentally appropriate. Crying is a primary communication method at this age.',
    };
  }
  
  if (ageMonths <= 6) {
    return {
      ageRange: '3–6 months',
      description: 'Babies are beginning to develop more predictable rhythms. Social engagement increases, and early self-regulation skills start to emerge.',
      signalNotes: 'Some settling of feeding patterns may be observed. Sleep may still be fragmented but often shows gradual consolidation.',
    };
  }
  
  if (ageMonths <= 9) {
    return {
      ageRange: '6–9 months',
      description: 'This period often includes significant developmental changes including increased mobility and emerging separation awareness. Temporary disruptions to established patterns are common.',
      signalNotes: 'Sleep regressions and increased need for comfort are normal during developmental leaps. Feeding patterns may shift with the introduction of solids.',
    };
  }
  
  if (ageMonths <= 12) {
    return {
      ageRange: '9–12 months',
      description: 'Approaching the first year, babies typically show increased independence alongside continued need for secure attachment. Communication becomes more intentional.',
      signalNotes: 'Transitions may require additional support as mobility increases. Social referencing and checking in with caregivers is typical.',
    };
  }
  
  if (ageMonths <= 18) {
    return {
      ageRange: '12–18 months',
      description: 'Toddlers are developing autonomy while still relying heavily on caregiver support for emotional regulation. Language is emerging rapidly.',
      signalNotes: 'Variable signals around transitions and sleep are common. Feeding preferences may become more pronounced.',
    };
  }
  
  if (ageMonths <= 24) {
    return {
      ageRange: '18–24 months',
      description: 'Growing independence is balanced with continued co-regulation needs. Emotional expression becomes more complex.',
      signalNotes: 'Big feelings and need for support during transitions are developmentally appropriate. Patterns may show day-to-day variation.',
    };
  }
  
  return {
    ageRange: '24+ months',
    description: 'Children at this age are developing more sophisticated self-regulation while still benefiting from consistent caregiver support and attunement.',
    signalNotes: 'Established patterns may still show variation during periods of change, growth, or stress.',
  };
}
