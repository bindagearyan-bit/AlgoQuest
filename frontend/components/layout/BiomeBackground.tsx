'use client';

import React from 'react';

export type BiomeType =
  | 'VILLAGE'      // Level 1: Foundations
  | 'CASTLE'       // Level 2: Linear Structures
  | 'WINDMILL'     // Level 3: Trees & Non-Linear
  | 'GLACIER'      // Level 4: Graphs
  | 'VOLCANO'      // Level 5: Paradigms & DP
  | 'CELESTIAL';   // Level 6: Advanced

interface BiomeBackgroundProps {
  biome?: BiomeType | number;
  children: React.ReactNode;
}

export const BiomeBackground: React.FC<BiomeBackgroundProps> = ({ biome = 'VILLAGE', children }) => {
  // Map level numbers 1-6 to biome types if numeric
  let normalizedBiome: BiomeType = 'VILLAGE';
  if (typeof biome === 'number') {
    if (biome === 1) normalizedBiome = 'VILLAGE';
    else if (biome === 2) normalizedBiome = 'CASTLE';
    else if (biome === 3) normalizedBiome = 'WINDMILL';
    else if (biome === 4) normalizedBiome = 'GLACIER';
    else if (biome === 5) normalizedBiome = 'VOLCANO';
    else if (biome === 6) normalizedBiome = 'CELESTIAL';
  } else {
    normalizedBiome = biome;
  }

  // Visual Configurations per Biome
  const biomeConfigs = {
    VILLAGE: {
      gradient: 'from-[#C5E1A5] via-[#E8F5E9] to-[#FCE4C8]',
      title: 'FOUNDATIONS VILLAGE BIOME',
      icon: '🏡',
      primaryColor: '#4CAF50',
      secondaryColor: '#2E7D32',
      detailsSvg: (
        /* Thatched cottages + green meadows + wooden fence */
        <g opacity="0.4">
          <rect x="60" y="40" width="40" height="25" fill="#8D6E63" />
          <polygon points="55,40 80,18 105,40" fill="#FBC02D" />
          <rect x="75" y="50" width="10" height="15" fill="#3E2723" />
          <polygon points="130,55 138,25 146,55" fill="#2E7D32" />
          <polygon points="150,55 158,20 166,55" fill="#388E3C" />
        </g>
      ),
    },
    CASTLE: {
      gradient: 'from-[#BBDEFB] via-[#E1F5FE] to-[#FCE4C8]',
      title: 'CITADEL CASTLE BIOME',
      icon: '🏰',
      primaryColor: '#0288D1',
      secondaryColor: '#00E5FF',
      detailsSvg: (
        /* Blue-spire castle + stone arch bridges */
        <g opacity="0.4">
          <rect x="50" y="25" width="50" height="40" fill="#78909C" />
          <polygon points="45,25 55,5 65,25" fill="#0288D1" />
          <polygon points="85,25 95,5 105,25" fill="#0288D1" />
          <rect x="70" y="45" width="12" height="20" rx="6" fill="#1B2A4A" />
          <path d="M120,55 Q145,35 170,55" stroke="#78909C" strokeWidth="6" fill="none" />
        </g>
      ),
    },
    WINDMILL: {
      gradient: 'from-[#E0F2F1] via-[#DCEDC8] to-[#FFF9C4]',
      title: 'FLOATING ISLES & WINDMILLS',
      icon: '🍃',
      primaryColor: '#81C784',
      secondaryColor: '#00796B',
      detailsSvg: (
        /* Windmill + oak trees */
        <g opacity="0.4">
          <polygon points="70,65 76,25 84,25 90,65" fill="#D7CCC8" />
          <line x1="80" y1="28" x2="60" y2="12" stroke="#5D4037" strokeWidth="3" />
          <line x1="80" y1="28" x2="100" y2="44" stroke="#5D4037" strokeWidth="3" />
          <circle cx="140" cy="40" r="18" fill="#4CAF50" />
        </g>
      ),
    },
    GLACIER: {
      gradient: 'from-[#E3F2FD] via-[#CFD8DC] to-[#E8F1F5]',
      title: 'GLACIER FORTRESS BIOME',
      icon: '❄️',
      primaryColor: '#4A6FA5',
      secondaryColor: '#90CAF9',
      detailsSvg: (
        /* Snow peaks + frozen crystal stalagmites */
        <g opacity="0.4">
          <polygon points="40,65 75,15 110,65" fill="#90CAF9" />
          <polygon points="65,28 75,15 85,28" fill="#FFFFFF" />
          <polygon points="100,65 130,22 160,65" fill="#64B5F6" />
          <polygon points="120,36 130,22 140,36" fill="#FFFFFF" />
        </g>
      ),
    },
    VOLCANO: {
      gradient: 'from-[#FFCCBC] via-[#FFE0B2] to-[#FFAB91]',
      title: 'INFERNO VOLCANO KEEP',
      icon: '🌋',
      primaryColor: '#D32F2F',
      secondaryColor: '#FF9800',
      detailsSvg: (
        /* Volcano with lava rivers */
        <g opacity="0.4">
          <polygon points="40,65 70,25 95,25 125,65" fill="#3E2723" />
          <rect x="75" y="24" width="15" height="4" fill="#FF5722" />
          <path d="M82,28 Q88,45 80,65" stroke="#FF9800" strokeWidth="4" fill="none" />
        </g>
      ),
    },
    CELESTIAL: {
      gradient: 'from-[#E1BEE7] via-[#D1C4E9] to-[#FFF8E1]',
      title: 'SKYWARD SANCTUARY BIOME',
      icon: '👑',
      primaryColor: '#7E57C2',
      secondaryColor: '#FFD54F',
      detailsSvg: (
        /* Celestial sky spire + blue dragon wing */
        <g opacity="0.4">
          <rect x="70" y="15" width="20" height="50" fill="#5E35B1" />
          <polygon points="65,15 80,0 95,15" fill="#FFD54F" />
          <circle cx="80" cy="35" r="12" stroke="#FFD54F" strokeWidth="3" fill="none" />
          <path d="M120,30 Q145,15 160,35 Q140,45 120,30" fill="#00E5FF" />
        </g>
      ),
    },
  };

  const currentCfg = biomeConfigs[normalizedBiome] || biomeConfigs.VILLAGE;

  return (
    <div className={`relative min-h-[calc(100vh-64px)] w-full bg-gradient-to-b ${currentCfg.gradient} overflow-x-hidden flex flex-col justify-between`}>
      {/* Upper Biome Decorative Silhouette */}
      <div className="absolute top-2 right-6 pointer-events-none select-none hidden sm:block">
        <svg width="180" height="75" viewBox="0 0 180 75" fill="none">
          {currentCfg.detailsSvg}
        </svg>
      </div>

      {/* Main Stage Content */}
      <div className="relative z-10 w-full flex-1 py-6">{children}</div>

      {/* Bottom Floating Island Cloud Edge */}
      <div className="relative w-full pointer-events-none select-none h-16 opacity-80">
        <svg viewBox="0 0 1200 60" className="w-full h-full preserve-3d" preserveAspectRatio="none">
          <path
            d="M0,60 L0,35 Q80,10 160,35 Q240,60 340,30 Q440,10 540,35 Q640,60 740,30 Q840,5 940,32 Q1060,60 1200,35 L1200,60 Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>
    </div>
  );
};

