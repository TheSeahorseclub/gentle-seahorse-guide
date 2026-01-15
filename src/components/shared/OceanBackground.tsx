import React from 'react';

export const OceanBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Wave 1 - Bottom, slow sway */}
      <div 
        className="absolute bottom-0 left-0 right-0 opacity-20 animate-wave-slow"
      >
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[200%] h-24">
          <path 
            d="M0 60C120 40 240 80 360 60C480 40 600 80 720 60C840 40 960 80 1080 60C1200 40 1320 80 1440 60V120H0V60Z" 
            className="fill-primary/30"
          />
        </svg>
      </div>

      {/* Wave 2 - Middle, medium sway */}
      <div 
        className="absolute bottom-8 left-0 right-0 opacity-15 animate-wave-medium"
      >
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[200%] h-20">
          <path 
            d="M0 50C100 30 200 70 300 50C400 30 500 70 600 50C700 30 800 70 900 50C1000 30 1100 70 1200 50C1300 30 1400 70 1440 50V100H0V50Z" 
            className="fill-calm/35"
          />
        </svg>
      </div>

      {/* Wave 3 - Top wave, faster */}
      <div 
        className="absolute bottom-16 left-0 right-0 opacity-10 animate-wave-fast"
      >
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[200%] h-16">
          <path 
            d="M0 40C80 25 160 55 240 40C320 25 400 55 480 40C560 25 640 55 720 40C800 25 880 55 960 40C1040 25 1120 55 1200 40C1280 25 1360 55 1440 40V80H0V40Z" 
            className="fill-accent/25"
          />
        </svg>
      </div>

      {/* Floating bubbles */}
      <div className="absolute bottom-20 left-[10%] w-3 h-3 rounded-full bg-primary/20 animate-bubble-rise" style={{ animationDelay: '0s' }} />
      <div className="absolute bottom-16 left-[25%] w-2 h-2 rounded-full bg-calm/25 animate-bubble-rise" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-24 left-[40%] w-4 h-4 rounded-full bg-primary/15 animate-bubble-rise" style={{ animationDelay: '4s' }} />
      <div className="absolute bottom-20 left-[55%] w-2.5 h-2.5 rounded-full bg-accent/20 animate-bubble-rise" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-28 left-[70%] w-3 h-3 rounded-full bg-calm/20 animate-bubble-rise" style={{ animationDelay: '3s' }} />
      <div className="absolute bottom-16 left-[85%] w-2 h-2 rounded-full bg-primary/25 animate-bubble-rise" style={{ animationDelay: '5s' }} />

      {/* Soft light rays from top */}
      <div className="absolute top-0 left-[20%] w-32 h-64 bg-gradient-to-b from-primary/8 to-transparent rotate-12 blur-2xl animate-shimmer" />
      <div className="absolute top-0 left-[50%] w-24 h-48 bg-gradient-to-b from-calm/10 to-transparent -rotate-6 blur-xl animate-shimmer" style={{ animationDelay: '2s' }} />
      <div className="absolute top-0 right-[15%] w-28 h-56 bg-gradient-to-b from-accent/8 to-transparent rotate-6 blur-2xl animate-shimmer" style={{ animationDelay: '4s' }} />
    </div>
  );
};
