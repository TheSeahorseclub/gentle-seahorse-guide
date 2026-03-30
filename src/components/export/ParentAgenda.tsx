import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useParentAgenda, AgendaEntry } from '@/hooks/useParentAgenda';
import { ClipboardList, Moon, Sun, Lightbulb, Activity, User } from 'lucide-react';
import { format, parseISO } from 'date-fns';

const typeConfig: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  signal: { icon: Activity, color: 'text-primary', bg: 'bg-primary/10' },
  sleep: { icon: Moon, color: 'text-primary', bg: 'bg-primary/10' },
  wake: { icon: Sun, color: 'text-coral', bg: 'bg-coral/10' },
  insight: { icon: Lightbulb, color: 'text-amber-600', bg: 'bg-amber-50' },
};

interface Props {
  days?: number;
}

export const ParentAgenda: React.FC<Props> = ({ days = 30 }) => {
  const { data: entries, isLoading } = useParentAgenda(days);

  if (isLoading) {
    return (
      <Card variant="soft" className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <ClipboardList className="w-4 h-4 text-primary" />
          <h3 className="font-display font-semibold text-foreground">Parent Activity Log</h3>
        </div>
        <div className="space-y-2">
          {[1, 2, 3].map(i => (
            <Skeleton key={i} className="h-14 w-full rounded-lg" />
          ))}
        </div>
      </Card>
    );
  }

  // Group by date
  const grouped = new Map<string, AgendaEntry[]>();
  (entries ?? []).forEach(e => {
    const day = format(parseISO(e.date), 'yyyy-MM-dd');
    if (!grouped.has(day)) grouped.set(day, []);
    grouped.get(day)!.push(e);
  });

  const sortedDays = Array.from(grouped.keys()).sort((a, b) => b.localeCompare(a));

  return (
    <Card variant="soft" className="p-4">
      <div className="flex items-center gap-2 mb-3">
        <ClipboardList className="w-4 h-4 text-primary" />
        <h3 className="font-display font-semibold text-foreground">
          Parent Activity Log
        </h3>
        <Badge variant="secondary" className="text-xs ml-auto">
          {days} days
        </Badge>
      </div>

      {sortedDays.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No data logged in the last {days} days.
        </p>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
          {sortedDays.map(day => {
            const dayEntries = grouped.get(day)!;
            return (
              <div key={day}>
                <p className="text-xs font-medium text-muted-foreground mb-2 sticky top-0 bg-card/90 backdrop-blur-sm py-1">
                  {format(parseISO(day), 'EEE, d MMM yyyy')}
                </p>
                <div className="space-y-1.5">
                  {dayEntries.map((entry, i) => {
                    const config = typeConfig[entry.type] || typeConfig.signal;
                    const Icon = config.icon;
                    return (
                      <div
                        key={`${entry.date}-${i}`}
                        className="flex items-start gap-2.5 p-2 rounded-lg bg-secondary/30"
                      >
                        <div className={`w-7 h-7 rounded-md ${config.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <Icon className={`w-3.5 h-3.5 ${config.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-foreground capitalize">
                              {entry.label}
                            </span>
                            <span className="text-[10px] text-muted-foreground">
                              {format(parseISO(entry.date), 'HH:mm')}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">
                            {entry.detail}
                          </p>
                          {entry.caregiverName && (
                            <div className="flex items-center gap-1 mt-1">
                              <User className="w-3 h-3 text-muted-foreground" />
                              <span className="text-[10px] text-muted-foreground">
                                {entry.caregiverName}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <p className="text-[10px] text-muted-foreground italic text-center mt-3">
        Shows all data logged by caregivers in the last {days} days.
      </p>
    </Card>
  );
};
