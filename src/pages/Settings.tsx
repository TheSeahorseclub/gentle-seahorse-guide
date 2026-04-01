import React, { useState, useEffect } from 'react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useCurrentChild } from '@/hooks/useCurrentChild';
import { usePremiumAccess } from '@/hooks/usePremiumAccess';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import {
  User, Baby, Shield, Moon, Sun, ChevronLeft, Save, Users, Crown, LogOut, Loader2,
} from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

export const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { data: currentChild } = useCurrentChild();
  const { isPremium } = usePremiumAccess();
  const { theme, toggleTheme } = useTheme();
  const queryClient = useQueryClient();

  const [fullName, setFullName] = useState('');
  const [childName, setChildName] = useState('');
  const [saving, setSaving] = useState(false);
  const [caregivers, setCaregivers] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      supabase
        .from('profiles')
        .select('full_name')
        .eq('user_id', user.id)
        .maybeSingle()
        .then(({ data }) => {
          if (data) setFullName((data as any).full_name || '');
        });
    }
  }, [user]);

  useEffect(() => {
    if (currentChild) {
      setChildName(currentChild.name || '');
      // Load caregivers for this child
      supabase
        .from('child_caregivers')
        .select('id, user_id, role, created_at')
        .eq('child_id', currentChild.id)
        .then(({ data }) => {
          if (data) setCaregivers(data);
        });
    }
  }, [currentChild]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      // Update profile
      await supabase
        .from('profiles')
        .update({ full_name: fullName.trim() } as any)
        .eq('user_id', user.id);

      // Update child name
      if (currentChild) {
        await supabase
          .from('children')
          .update({ name: childName.trim() })
          .eq('id', currentChild.id);
      }

      queryClient.invalidateQueries({ queryKey: ['current-child'] });
      toast.success('Settings saved');
    } catch {
      toast.error('Failed to save settings');
    }
    setSaving(false);
  };

  return (
    <MobileLayout>
      <div className="px-6 pt-8 pb-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate('/home')}
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="font-display text-2xl font-bold text-foreground">Settings</h1>
        </div>

        <div className="space-y-4">
          {/* Profile */}
          <Card className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-5 h-5 text-primary" />
              <h2 className="font-display font-semibold text-foreground">Your profile</h2>
            </div>
            <div className="space-y-3">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={user?.email || ''} disabled className="mt-1 bg-muted/50" />
              </div>
              <div>
                <Label htmlFor="fullName">Full name</Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your name"
                  className="mt-1"
                  maxLength={100}
                />
              </div>
            </div>
          </Card>

          {/* Child details */}
          <Card className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <Baby className="w-5 h-5 text-primary" />
              <h2 className="font-display font-semibold text-foreground">Child details</h2>
            </div>
            <div className="space-y-3">
              <div>
                <Label htmlFor="childName">Name or nickname</Label>
                <Input
                  id="childName"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  placeholder="e.g. Leo"
                  className="mt-1"
                  maxLength={50}
                />
              </div>
              {currentChild && (
                <div className="bg-primary/5 rounded-xl p-3 border border-primary/10">
                  <p className="text-sm text-muted-foreground">
                    Age: {currentChild.ageMonths} {currentChild.ageMonths === 1 ? 'month' : 'months'}
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Caregivers */}
          <Card className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-5 h-5 text-primary" />
              <h2 className="font-display font-semibold text-foreground">Caregivers</h2>
            </div>
            {caregivers.length > 0 ? (
              <div className="space-y-2">
                {caregivers.map((cg) => (
                  <div key={cg.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">
                        {cg.user_id === user?.id ? 'You' : 'Caregiver'}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground capitalize">{cg.role}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No caregivers linked yet.</p>
            )}
            {isPremium && caregivers.length < 3 && (
              <Button
                variant="outline"
                size="sm"
                className="mt-3 w-full"
                onClick={() => navigate('/invite-caregiver')}
              >
                <Users className="w-4 h-4 mr-2" />
                Invite a caregiver
              </Button>
            )}
            {!isPremium && (
              <div className="mt-3 bg-primary/5 rounded-xl p-3 border border-primary/10 flex items-center gap-2">
                <Crown className="w-4 h-4 text-primary flex-shrink-0" />
                <p className="text-xs text-muted-foreground">
                  Multi-caregiver support is a Premium feature.{' '}
                  <button onClick={() => navigate('/upgrade')} className="text-primary hover:underline">Upgrade</button>
                </p>
              </div>
            )}
          </Card>

          {/* Appearance */}
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {theme === 'dark' ? (
                  <Moon className="w-5 h-5 text-primary" />
                ) : (
                  <Sun className="w-5 h-5 text-primary" />
                )}
                <div>
                  <h2 className="font-display font-semibold text-foreground">Appearance</h2>
                  <p className="text-xs text-muted-foreground">{theme === 'dark' ? 'Dark mode' : 'Light mode'}</p>
                </div>
              </div>
              <button
                onClick={toggleTheme}
                className="relative w-12 h-7 rounded-full bg-muted transition-colors"
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-primary transition-transform ${
                    theme === 'dark' ? 'translate-x-5' : ''
                  }`}
                />
              </button>
            </div>
          </Card>

          {/* Save */}
          <Button
            variant="ocean"
            size="lg"
            className="w-full"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? (
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
            ) : (
              <Save className="w-5 h-5 mr-2" />
            )}
            Save changes
          </Button>

          {/* Sign out */}
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={signOut}
          >
            <LogOut className="w-5 h-5 mr-2" />
            Sign out
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};
