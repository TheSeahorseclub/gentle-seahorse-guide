import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { App } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import { Browser } from '@capacitor/browser';
import { supabase } from '@/integrations/supabase/client';

export const useDeepLink = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    const listenerPromise = App.addListener('appUrlOpen', async ({ url }) => {
      await Browser.close().catch(() => {});

      const hashIndex = url.indexOf('#');

      if (hashIndex === -1) {
        const path = url.replace(/^seahorseclub:\/\/[^/]*/, '');
        navigate(path || '/home', { replace: true });
        return;
      }

      const params = new URLSearchParams(url.slice(hashIndex + 1));
      const accessToken = params.get('access_token');
      const refreshToken = params.get('refresh_token');
      const type = params.get('type');

      if (accessToken && refreshToken) {
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        if (!error) {
          navigate(type === 'recovery' ? '/reset-password' : '/home', { replace: true });
        }
      }
    });

    return () => {
      listenerPromise.then((l) => l.remove());
    };
  }, [navigate]);
};
