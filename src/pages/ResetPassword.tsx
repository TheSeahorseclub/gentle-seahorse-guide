import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';

export const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isRecovery, setIsRecovery] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Listen for the PASSWORD_RECOVERY event
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setIsRecovery(true);
      }
    });

    // Check hash for recovery type
    const hash = window.location.hash;
    if (hash.includes('type=recovery')) {
      setIsRecovery(true);
    }

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      toast.error(error.message);
    } else {
      setDone(true);
      toast.success('Password updated successfully!');
      setTimeout(() => navigate('/home', { replace: true }), 2000);
    }
    setLoading(false);
  };

  if (done) {
    return (
      <div className="min-h-screen gradient-calm flex flex-col items-center justify-center px-6">
        <div className="text-center animate-fade-in">
          <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">Password updated</h2>
          <p className="text-muted-foreground">Redirecting you to the app...</p>
        </div>
      </div>
    );
  }

  if (!isRecovery) {
    return (
      <div className="min-h-screen gradient-calm flex flex-col items-center justify-center px-6">
        <div className="text-center animate-fade-in">
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">Invalid link</h2>
          <p className="text-muted-foreground mb-6">This password reset link is invalid or has expired.</p>
          <Button variant="ocean" onClick={() => navigate('/auth')}>
            Back to sign in
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-calm flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Set new password
          </h1>
          <p className="text-muted-foreground text-base">
            Choose a new password for your account
          </p>
        </div>

        <Card className="shadow-float animate-slide-up">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">New password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="pl-10"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    disabled={loading}
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="ocean"
                className="w-full h-12 text-base"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update password'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
