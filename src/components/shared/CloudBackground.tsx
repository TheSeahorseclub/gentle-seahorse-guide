import React from 'react';

export const CloudBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Cloud 1 - Large, slow */}
      <div 
        className="absolute opacity-40 animate-cloud-drift-slow"
        style={{ top: '8%', left: '-20%' }}
      >
        <svg width="280" height="120" viewBox="0 0 280 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="140" cy="80" rx="100" ry="40" className="fill-primary/20" />
          <ellipse cx="90" cy="65" rx="60" ry="35" className="fill-primary/15" />
          <ellipse cx="180" cy="60" rx="70" ry="40" className="fill-primary/20" />
          <ellipse cx="130" cy="50" rx="55" ry="30" className="fill-primary/25" />
        </svg>
      </div>

      {/* Cloud 2 - Medium, medium speed */}
      <div 
        className="absolute opacity-30 animate-cloud-drift-medium"
        style={{ top: '22%', left: '-15%' }}
      >
        <svg width="200" height="90" viewBox="0 0 200 90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="100" cy="60" rx="75" ry="30" className="fill-calm/25" />
          <ellipse cx="65" cy="50" rx="45" ry="25" className="fill-calm/20" />
          <ellipse cx="130" cy="45" rx="50" ry="28" className="fill-calm/25" />
        </svg>
      </div>

      {/* Cloud 3 - Small, faster */}
      <div 
        className="absolute opacity-25 animate-cloud-drift-fast"
        style={{ top: '45%', left: '-10%' }}
      >
        <svg width="150" height="70" viewBox="0 0 150 70" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="75" cy="45" rx="55" ry="22" className="fill-accent/30" />
          <ellipse cx="50" cy="38" rx="35" ry="18" className="fill-accent/25" />
          <ellipse cx="95" cy="35" rx="40" ry="20" className="fill-accent/30" />
        </svg>
      </div>

      {/* Cloud 4 - Large, very slow, lower */}
      <div 
        className="absolute opacity-20 animate-cloud-drift-slower"
        style={{ top: '65%', left: '-25%' }}
      >
        <svg width="320" height="130" viewBox="0 0 320 130" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="160" cy="85" rx="120" ry="45" className="fill-lavender/30" />
          <ellipse cx="100" cy="70" rx="70" ry="38" className="fill-lavender/25" />
          <ellipse cx="210" cy="65" rx="80" ry="42" className="fill-lavender/30" />
          <ellipse cx="155" cy="55" rx="60" ry="32" className="fill-lavender/35" />
        </svg>
      </div>

      {/* Cloud 5 - Tiny accent cloud */}
      <div 
        className="absolute opacity-35 animate-cloud-drift-medium delay-1000"
        style={{ top: '35%', left: '-8%' }}
      >
        <svg width="100" height="50" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="50" cy="32" rx="40" ry="16" className="fill-primary/20" />
          <ellipse cx="35" cy="26" rx="25" ry="14" className="fill-primary/15" />
          <ellipse cx="62" cy="24" rx="28" ry="15" className="fill-primary/20" />
        </svg>
      </div>
    </div>
  );
};
