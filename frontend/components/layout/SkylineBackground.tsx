'use client';

import React from 'react';

export const SkylineBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-[#F3C8DD] via-[#C7D3F5] to-[#FCE4C8] flex flex-col justify-between overflow-x-hidden">
      {/* Upper Floating Cloud Sprites */}
      <div className="absolute top-6 left-12 opacity-80 pointer-events-none select-none animate-float-island">
        <svg width="120" height="40" viewBox="0 0 120 40" fill="none">
          <rect x="20" y="10" width="80" height="20" rx="10" fill="white" fillOpacity="0.85" />
          <rect x="40" y="0" width="40" height="25" rx="12" fill="white" fillOpacity="0.9" />
          <rect x="70" y="8" width="45" height="18" rx="9" fill="#FFF4E6" fillOpacity="0.8" />
        </svg>
      </div>

      <div className="absolute top-16 right-16 opacity-75 pointer-events-none select-none" style={{ animation: 'floatSlow 5s ease-in-out infinite' }}>
        <svg width="160" height="50" viewBox="0 0 160 50" fill="none">
          <rect x="30" y="12" width="100" height="24" rx="12" fill="white" fillOpacity="0.85" />
          <rect x="60" y="2" width="50" height="30" rx="15" fill="#FFFFFF" />
          <rect x="15" y="18" width="60" height="20" rx="10" fill="#E8DEF8" fillOpacity="0.8" />
        </svg>
      </div>

      {/* Distant Floating Island Silhouette in Sky */}
      <div className="absolute top-36 right-8 opacity-40 pointer-events-none select-none hidden lg:block">
        <svg width="90" height="60" viewBox="0 0 90 60" fill="none">
          {/* Island Body */}
          <path d="M15 25 Q45 15 75 25 Q85 30 70 45 Q45 55 20 45 Z" fill="#7E57C2" />
          <rect x="25" y="22" width="40" height="6" rx="3" fill="#A5D6A7" />
          {/* Mini Castle Spire */}
          <rect x="42" y="10" width="6" height="15" fill="#1B2A4A" />
          <polygon points="40,10 45,2 50,10" fill="#00E5FF" />
          {/* Waterfall dropping */}
          <rect x="52" y="25" width="3" height="25" fill="#00E5FF" opacity="0.8" />
        </svg>
      </div>

      {/* Main Page Content */}
      <div className="relative z-10 flex-1">{children}</div>

      {/* Bottom Floating Island Landmass & Pastel Cloud Bank */}
      <div className="relative w-full pointer-events-none select-none overflow-hidden mt-12">
        {/* Layer 1: Cascading Waterfall from Floating Island */}
        <div className="relative w-full h-32 flex items-end justify-between px-10">
          {/* Floating Islet Left with Waterfall */}
          <div className="hidden sm:block opacity-90">
            <svg width="180" height="100" viewBox="0 0 180 100" fill="none">
              <path d="M10 30 Q90 10 170 30 L150 70 Q90 85 30 70 Z" fill="#2E7D32" />
              <rect x="25" y="25" width="130" height="8" rx="4" fill="#4CAF50" />
              {/* Waterfall pouring into clouds */}
              <rect x="85" y="30" width="8" height="70" fill="#00E5FF" opacity="0.9" />
              <rect x="87" y="30" width="4" height="70" fill="#E0F7FA" />
            </svg>
          </div>

          {/* Floating Islet Right with Pine Trees */}
          <div className="hidden md:block opacity-90">
            <svg width="160" height="90" viewBox="0 0 160 90" fill="none">
              <path d="M15 25 Q80 10 145 25 L130 65 Q80 80 30 65 Z" fill="#4E342E" />
              <rect x="25" y="20" width="110" height="8" rx="4" fill="#4CAF50" />
              {/* Pine trees */}
              <polygon points="40,22 45,5 50,22" fill="#1B5E20" />
              <polygon points="55,22 60,8 65,22" fill="#2E7D32" />
              <polygon points="105,22 110,6 115,22" fill="#1B5E20" />
            </svg>
          </div>
        </div>

        {/* Layer 2: Cloud Bank Bottom in White, #FCE4C8 and #D9CBEA */}
        <div className="relative w-full h-20 -mt-6">
          <svg viewBox="0 0 1200 80" className="w-full h-full preserve-3d" preserveAspectRatio="none">
            {/* Back Cloud Layer (Lavender Pastel #D9CBEA) */}
            <path
              d="M0,80 L0,45 Q60,25 120,45 Q180,65 240,45 Q320,15 400,40 Q480,60 560,35 Q640,10 720,40 Q800,65 880,35 Q960,10 1040,45 Q1120,70 1200,45 L1200,80 Z"
              fill="#D9CBEA"
              fillOpacity="0.75"
            />
            {/* Mid Cloud Layer (Warm Sunset #FCE4C8) */}
            <path
              d="M0,80 L0,50 Q80,20 160,50 Q240,75 340,45 Q440,20 540,50 Q640,75 740,45 Q840,15 940,48 Q1060,75 1200,50 L1200,80 Z"
              fill="#FCE4C8"
              fillOpacity="0.8"
            />
            {/* Front Cloud Layer (Fluffy White #FFFFFF) */}
            <path
              d="M0,80 L0,58 Q70,30 150,58 Q230,85 320,55 Q420,25 520,58 Q620,85 710,55 Q800,25 900,58 Q1020,85 1200,58 L1200,80 Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
