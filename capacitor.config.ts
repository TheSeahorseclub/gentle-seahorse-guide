import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.seahorseclub.app',
  appName: 'The Seahorse Club',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    allowNavigation: [
      '*.supabase.co',
      '*.cloudflarestream.com',
      '*.googleapis.com',
    ],
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#5bb5a6',
      showSpinner: false,
      androidScaleType: 'CENTER_CROP',
    },
    StatusBar: {
      style: 'Light',
      backgroundColor: '#5bb5a6',
      overlaysWebView: false,
    },
    Keyboard: {
      resize: 'body',
      resizeOnFullScreen: true,
    },

  },
};

export default config;
