import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Moon, Sun, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export interface SleepLogEntry {
  timeStarted: string;
  timeEnded: string;
  durationHrs: string;
  durationMin: string;
  quality: 'deep' | 'light' | 'restless' | '';
}

export interface WakeWindowEntry {
  timeStarted: string;
  timeEnded: string;
  durationMin: string;
  activity: string;
}

interface SleepTrackerFormProps {
  userId: string;
  childId: string;
  familyId: string | null;
  onComplete: () => void;
}

const emptySleeLog = (): SleepLogEntry => ({
  timeStarted: '',
  timeEnded: '',
  durationHrs: '',
  durationMin: '',
  quality: '',
});

const emptyWakeWindow = (): WakeWindowEntry => ({
  timeStarted: '',
  timeEnded: '',
  durationMin: '',
  activity: '',
});

function calcDuration(start: string, end: string): { hrs: number; min: number } | null {
  if (!start || !end) return null;
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  let diff = (eh * 60 + em) - (sh * 60 + sm);
  if (diff < 0) diff += 24 * 60; // overnight
  return { hrs: Math.floor(diff / 60), min: diff % 60 };
}

export const SleepTrackerForm: React.FC<SleepTrackerFormProps> = ({
  userId,
  childId,
  familyId,
  onComplete,
}) => {
  const { toast } = useToast();
  const [sleepLogs, setSleepLogs] = useState<SleepLogEntry[]>([emptySleeLog()]);
  const [wakeWindows, setWakeWindows] = useState<WakeWindowEntry[]>([emptyWakeWindow()]);
  const [isSaving, setIsSaving] = useState(false);

  const updateSleepLog = (index: number, field: keyof SleepLogEntry, value: string) => {
    setSleepLogs(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };

      // Auto-calc duration when both times are set
      if (field === 'timeStarted' || field === 'timeEnded') {
        const entry = updated[index];
        const dur = calcDuration(
          field === 'timeStarted' ? value : entry.timeStarted,
          field === 'timeEnded' ? value : entry.timeEnded,
        );
        if (dur) {
          updated[index].durationHrs = String(dur.hrs);
          updated[index].durationMin = String(dur.min);
        }
      }
      return updated;
    });
  };

  const updateWakeWindow = (index: number, field: keyof WakeWindowEntry, value: string) => {
    setWakeWindows(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };

      if (field === 'timeStarted' || field === 'timeEnded') {
        const entry = updated[index];
        const dur = calcDuration(
          field === 'timeStarted' ? value : entry.timeStarted,
          field === 'timeEnded' ? value : entry.timeEnded,
        );
        if (dur) {
          updated[index].durationMin = String(dur.hrs * 60 + dur.min);
        }
      }
      return updated;
    });
  };

  const addSleepLog = () => setSleepLogs(prev => [...prev, emptySleeLog()]);
  const removeSleepLog = (i: number) => setSleepLogs(prev => prev.filter((_, idx) => idx !== i));

  const addWakeWindow = () => setWakeWindows(prev => [...prev, emptyWakeWindow()]);
  const removeWakeWindow = (i: number) => setWakeWindows(prev => prev.filter((_, idx) => idx !== i));

  const hasValidSleepLog = sleepLogs.some(l => l.timeStarted && l.timeEnded && l.quality);
  const hasValidWakeWindow = wakeWindows.some(w => w.timeStarted && w.timeEnded);
  const canSave = hasValidSleepLog || hasValidWakeWindow;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Save sleep logs
      const validSleepLogs = sleepLogs.filter(l => l.timeStarted || l.timeEnded || l.quality);
      if (validSleepLogs.length > 0) {
        const sleepInserts = validSleepLogs.map(l => ({
          user_id: userId,
          child_id: childId,
          family_id: familyId,
          time_started: l.timeStarted || null,
          time_ended: l.timeEnded || null,
          duration_minutes: l.durationHrs || l.durationMin
            ? (parseInt(l.durationHrs || '0') * 60) + parseInt(l.durationMin || '0')
            : null,
          sleep_quality: l.quality || null,
        }));

        const { error: sleepError } = await supabase
          .from('sleep_logs')
          .insert(sleepInserts);

        if (sleepError) throw sleepError;
      }

      // Save wake windows
      const validWakeWindows = wakeWindows.filter(w => w.timeStarted || w.timeEnded || w.activity);
      if (validWakeWindows.length > 0) {
        const wakeInserts = validWakeWindows.map(w => ({
          user_id: userId,
          child_id: childId,
          family_id: familyId,
          time_started: w.timeStarted || null,
          time_ended: w.timeEnded || null,
          duration_minutes: w.durationMin ? parseInt(w.durationMin) : null,
          activity: w.activity || null,
        }));

        const { error: wakeError } = await supabase
          .from('wake_windows')
          .insert(wakeInserts);

        if (wakeError) throw wakeError;
      }

      // Also save a summary signal entry
      const qualitySummary = sleepLogs
        .filter(l => l.quality)
        .map(l => l.quality)
        .join(', ') || 'logged';

      await supabase.from('signal_entries').insert({
        user_id: userId,
        child_id: childId,
        family_id: familyId,
        signal_type: 'sleep',
        description: `Sleep: ${qualitySummary}`,
      });

      toast({ title: 'Sleep data saved ✓' });
      onComplete();
    } catch (error) {
      console.error('Error saving sleep data:', error);
      toast({
        title: 'Could not save sleep data',
        description: 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Daily Sleep Log */}
      <Card className="p-4 border border-border bg-card">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Moon className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-foreground">Daily Sleep Log</h3>
            <p className="text-xs text-muted-foreground">Record each sleep session</p>
          </div>
        </div>

        <div className="space-y-4">
          {sleepLogs.map((log, i) => (
            <div key={i} className="p-3 rounded-lg bg-secondary/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">Session {i + 1}</span>
                {sleepLogs.length > 1 && (
                  <button onClick={() => removeSleepLog(i)} className="text-destructive/60 hover:text-destructive">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs text-muted-foreground">Started</Label>
                  <Input
                    type="time"
                    value={log.timeStarted}
                    onChange={e => updateSleepLog(i, 'timeStarted', e.target.value)}
                    className="h-9 text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Ended</Label>
                  <Input
                    type="time"
                    value={log.timeEnded}
                    onChange={e => updateSleepLog(i, 'timeEnded', e.target.value)}
                    className="h-9 text-sm"
                  />
                </div>
              </div>

              {(log.durationHrs || log.durationMin) && (
                <p className="text-xs text-muted-foreground">
                  Duration: {log.durationHrs || '0'}h {log.durationMin || '0'}m
                </p>
              )}

              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">Sleep Quality</Label>
                <RadioGroup
                  value={log.quality}
                  onValueChange={v => updateSleepLog(i, 'quality', v)}
                  className="flex gap-3"
                >
                  {(['deep', 'light', 'restless'] as const).map(q => (
                    <div key={q} className="flex items-center gap-1.5">
                      <RadioGroupItem value={q} id={`sleep-q-${i}-${q}`} />
                      <Label htmlFor={`sleep-q-${i}-${q}`} className="text-xs capitalize cursor-pointer">
                        {q}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          ))}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={addSleepLog}
          className="mt-3 text-primary hover:text-primary/80 w-full"
        >
          <Plus className="w-4 h-4 mr-1" /> Add session
        </Button>
      </Card>

      {/* Wake Windows */}
      <Card className="p-4 border border-border bg-card">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <Sun className="w-4 h-4 text-accent-foreground" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-foreground">Wake Windows</h3>
            <p className="text-xs text-muted-foreground">Track awake periods between sleep</p>
          </div>
        </div>

        <div className="space-y-4">
          {wakeWindows.map((ww, i) => (
            <div key={i} className="p-3 rounded-lg bg-secondary/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">Window {i + 1}</span>
                {wakeWindows.length > 1 && (
                  <button onClick={() => removeWakeWindow(i)} className="text-destructive/60 hover:text-destructive">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs text-muted-foreground">Started</Label>
                  <Input
                    type="time"
                    value={ww.timeStarted}
                    onChange={e => updateWakeWindow(i, 'timeStarted', e.target.value)}
                    className="h-9 text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Ended</Label>
                  <Input
                    type="time"
                    value={ww.timeEnded}
                    onChange={e => updateWakeWindow(i, 'timeEnded', e.target.value)}
                    className="h-9 text-sm"
                  />
                </div>
              </div>

              {ww.durationMin && (
                <p className="text-xs text-muted-foreground">
                  Duration: {ww.durationMin} min
                </p>
              )}

              <div>
                <Label className="text-xs text-muted-foreground">Activity during wake time</Label>
                <Input
                  type="text"
                  placeholder="e.g. Tummy time, feeding..."
                  value={ww.activity}
                  onChange={e => updateWakeWindow(i, 'activity', e.target.value)}
                  className="h-9 text-sm mt-1"
                />
              </div>
            </div>
          ))}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={addWakeWindow}
          className="mt-3 text-primary hover:text-primary/80 w-full"
        >
          <Plus className="w-4 h-4 mr-1" /> Add window
        </Button>
      </Card>

      {/* Save button */}
      <Button
        variant="ocean"
        size="lg"
        className="w-full"
        disabled={!canSave || isSaving}
        onClick={handleSave}
      >
        {isSaving && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
        Save sleep data
      </Button>
    </div>
  );
};
