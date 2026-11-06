'use client';

import React from 'react';

export const SkylineBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-[#CDE3F7] via-[#D9BEEA] to-[#F2A9C9] flex flex-col justify-between overflow-x-hidden">
      {/* Pixel Clouds */}
      <div className="absolute top-8 left-10 opacity-60 pointer-events-none select-none">
        <div className="flex flex-col items-center">
          <div className="w-20 h-4 bg-white/80 rounded-full" />
          <div className="w-32 h-6 bg-white/90 rounded-full -mt-2" />
        </div>
      </div>
      <div className="absolute top-20 right-20 opacity-50 pointer-events-none select-none">
        <div className="flex flex-col items-center">
          <div className="w-28 h-5 bg-white/80 rounded-full" />
          <div className="w-40 h-8 bg-white/90 rounded-full -mt-3" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1">{children}</div>

      {/* Retro Pixel Skyline at bottom */}
      <div className="relative w-full h-24 sm:h-32 pointer-events-none select-none flex items-end justify-center overflow-hidden opacity-90">
        <svg
          viewBox="0 0 1200 120"
          className="w-full h-full text-[#1B2A4A] fill-current preserve-3d"
          preserveAspectRatio="none"
        >
          {/* Skyline Buildings silhouette */}
          <path d="M0,120 L0,80 L40,80 L40,50 L70,50 L70,90 L110,90 L110,40 L160,40 L160,70 L200,70 L200,30 L250,30 L250,85 L290,85 L290,55 L340,55 L340,90 L390,90 L390,35 L450,35 L450,75 L500,75 L500,45 L560,45 L560,95 L620,95 L620,25 L680,25 L680,70 L730,70 L730,40 L790,40 L790,85 L840,85 L840,50 L900,50 L900,90 L960,90 L960,30 L1020,30 L1020,75 L1080,75 L1080,45 L1140,45 L1140,80 L1200,80 L1200,120 Z" />
          {/* Yellow Pixel Windows */}
          <rect x="50" y="60" width="8" height="8" fill="#FFD93D" opacity="0.8" />
          <rect x="130" y="50" width="8" height="8" fill="#FFD93D" opacity="0.8" />
          <rect x="220" y="40" width="8" height="8" fill="#FFD93D" opacity="0.8" />
          <rect x="410" y="45" width="8" height="8" fill="#FFD93D" opacity="0.8" />
          <rect x="640" y="35" width="8" height="8" fill="#FFD93D" opacity="0.8" />
          <rect x="750" y="50" width="8" height="8" fill="#FFD93D" opacity="0.8" />
          <rect x="980" y="40" width="8" height="8" fill="#FFD93D" opacity="0.8" />
          <rect x="1100" y="55" width="8" height="8" fill="#FFD93D" opacity="0.8" />
        </svg>
      </div>
    </div>
  );
};

