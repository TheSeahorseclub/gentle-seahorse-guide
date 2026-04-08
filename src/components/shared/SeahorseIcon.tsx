import React from 'react';
import { cn } from '@/lib/utils';

interface SeahorseIconProps {
  className?: string;
  animated?: boolean;
}

export const SeahorseIcon: React.FC<SeahorseIconProps> = ({ 
  className,
  animated = false 
}) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={cn(
        "w-16 h-16",
        animated && "animate-float",
        className
      )}
      fill="none"
    >
      {/* Stylized seahorse shape */}
      <defs>
        <linearGradient id="seahorseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(205, 70%, 65%)" />
          <stop offset="100%" stopColor="hsl(200, 60%, 72%)" />
        </linearGradient>
      </defs>
      
      {/* Body */}
      <path 
        d="M55 15 Q70 25 65 40 Q62 50 58 55 Q52 62 50 75 Q48 85 45 90 Q42 92 40 88 Q38 82 42 72 Q45 62 42 55 Q38 48 35 42 Q32 35 35 28 Q38 20 48 18 Q52 17 55 15"
        fill="url(#seahorseGradient)"
        opacity="0.9"
      />
      
      {/* Snout */}
      <path 
        d="M35 28 Q28 26 22 30 Q25 32 30 31 Q33 30 35 28"
        fill="url(#seahorseGradient)"
        opacity="0.85"
      />
      
      {/* Crown/crest */}
      <path 
        d="M48 18 Q50 12 55 10 Q52 8 48 10 Q44 12 45 16 Q46 17 48 18"
        fill="url(#seahorseGradient)"
        opacity="0.8"
      />
      
      {/* Eye */}
      <circle cx="40" cy="30" r="3" fill="hsl(200, 25%, 20%)" />
      <circle cx="41" cy="29" r="1" fill="white" opacity="0.8" />
      
      {/* Belly ridges */}
      <path 
        d="M45 50 Q42 50 40 52 M46 56 Q43 56 41 58 M47 62 Q44 62 42 64 M46 68 Q44 68 43 70"
        stroke="hsl(174, 30%, 45%)"
        strokeWidth="1"
        fill="none"
        opacity="0.6"
      />
      
      {/* Fin */}
      <path 
        d="M58 45 Q68 44 72 48 Q68 50 60 48"
        fill="url(#seahorseGradient)"
        opacity="0.7"
      />
    </svg>
  );
};
