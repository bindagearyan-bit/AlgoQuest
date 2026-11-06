'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface FloatingIslandWorldProps {
  interactiveNodes?: boolean;
  onNodeClick?: (sublevelId: number, title: string, levelIndex: number) => void;
  activeLevel?: number;
  className?: string;
  showDragon?: boolean;
}

export const FloatingIslandWorld: React.FC<FloatingIslandWorldProps> = ({
  interactiveNodes = false,
  onNodeClick,
  activeLevel = 1,
  className = '',
  showDragon = true,
}) => {
  return (
    <div className={`relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-[#F3C8DD] via-[#C7D3F5] to-[#FCE4C8] ${className}`}>
      {/* 1. SKY CANVAS & DRIFTING PIXEL CLOUDS */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Sun Glow Horizon */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#FFF59D]/40 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Flying Pixel Dragon with animated glide across the upper skies */}
        {showDragon && (
          <motion.div
            animate={{
              x: ['-10vw', '110vw'],
              y: ['12vh', '8vh', '15vh', '10vh'],
            }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute top-12 left-0 z-10 pointer-events-none opacity-85 select-none"
          >
            <div className="flex flex-col items-center">
              <svg width="70" height="40" viewBox="0 0 70 40" fill="none">
                {/* Dragon Body */}
                <path d="M10,20 Q25,12 45,18 L58,22 Q65,24 55,28 L38,26 Q20,30 10,20 Z" fill="#00E5FF" stroke="#0288D1" strokeWidth="2" />
                {/* Wings flapping */}
                <path d="M28,16 L38,2 L48,16 Z" fill="#E0F7FA" stroke="#00E5FF" strokeWidth="1.5" />
                <path d="M30,22 L42,36 L48,22 Z" fill="#0288D1" stroke="#1B2A4A" strokeWidth="1.5" />
                {/* Tail Fluke */}
                <polygon points="5,20 0,12 8,16" fill="#00E5FF" />
                {/* Glowing Eye */}
                <rect x="52" y="20" width="3" height="3" fill="#FFD54F" />
              </svg>
              <span className="font-pixel text-[6px] text-cyan-800 tracking-widest opacity-60">CELESTIAL WYRM</span>
            </div>
          </motion.div>
        )}

        {/* Floating Clouds Layer 1 (Slow top drift) */}
        <motion.div
          animate={{ x: [0, -200, 0] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-8 left-16 opacity-75"
        >
          <svg width="180" height="60" viewBox="0 0 180 60" fill="none">
            <rect x="30" y="15" width="120" height="30" rx="15" fill="#FFFFFF" fillOpacity="0.9" />
            <rect x="60" y="2" width="60" height="36" rx="18" fill="#FFFFFF" />
            <rect x="15" y="25" width="80" height="25" rx="12" fill="#FCE4C8" fillOpacity="0.75" />
          </svg>
        </motion.div>

        {/* Floating Clouds Layer 2 (Right mid drift) */}
        <motion.div
          animate={{ x: [0, 150, 0] }}
          transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-28 right-20 opacity-70"
        >
          <svg width="220" height="70" viewBox="0 0 220 70" fill="none">
            <rect x="40" y="18" width="140" height="35" rx="17" fill="#FFFFFF" fillOpacity="0.85" />
            <rect x="80" y="4" width="70" height="40" rx="20" fill="#FFFFFF" />
            <rect x="20" y="28" width="90" height="30" rx="15" fill="#D9CBEA" fillOpacity="0.8" />
          </svg>
        </motion.div>
      </div>

      {/* 2. FULL-BLEED 16-BIT ISOMETRIC FLOATING ARCHIPELAGO SVG & NODES */}
      <div className="relative w-full h-[880px] max-w-7xl mx-auto z-10 select-none">
        {/* GOLDEN CONNECTING PATH SYSTEM (SVG Curves with Inner Glow) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <defs>
            <filter id="worldGoldGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Golden Dotted Pathways Winding Across All Islands */}
          {/* Island 1 (Village) -> Island 2 (Citadel) */}
          <path
            d="M 230 650 Q 360 630 490 570"
            stroke="#FFD54F"
            strokeWidth="6"
            strokeDasharray="10 10"
            fill="none"
            filter="url(#worldGoldGlow)"
          />
          {/* Island 2 (Citadel) -> Island 3 (Windmill Isles) */}
          <path
            d="M 580 570 Q 720 540 860 480"
            stroke="#FFD54F"
            strokeWidth="6"
            strokeDasharray="10 10"
            fill="none"
            filter="url(#worldGoldGlow)"
          />
          {/* Island 3 (Windmills) -> Island 4 (Glacier Fortress) */}
          <path
            d="M 860 470 Q 560 380 290 340"
            stroke="#FFD54F"
            strokeWidth="6"
            strokeDasharray="10 10"
            fill="none"
            filter="url(#worldGoldGlow)"
          />
          {/* Island 4 (Glacier) -> Island 5 (Volcano Keep) */}
          <path
            d="M 290 330 Q 450 280 610 240"
            stroke="#FFD54F"
            strokeWidth="6"
            strokeDasharray="10 10"
            fill="none"
            filter="url(#worldGoldGlow)"
          />
          {/* Island 5 (Volcano) -> Island 6 (Celestial Sanctuary) */}
          <path
            d="M 640 230 Q 760 170 890 120"
            stroke="#FFD54F"
            strokeWidth="6"
            strokeDasharray="10 10"
            fill="none"
            filter="url(#worldGoldGlow)"
          />
        </svg>

        {/* ============================================================ */}
        {/* BIOME 1: BEGINNER VILLAGE ISLAND (Bottom Left) */}
        {/* ============================================================ */}
        <div
          className="absolute z-20 cursor-pointer group"
          style={{ left: '4%', top: '56%' }}
          onClick={() => onNodeClick && onNodeClick(1, 'Complexity & Arrays', 1)}
        >
          <div className="relative flex flex-col items-center">
            {/* Floating Island Mass with Waterfall */}
            <svg width="300" height="200" viewBox="0 0 300 200" fill="none" className="filter drop-shadow-[0_15px_10px_rgba(27,42,74,0.25)] group-hover:scale-105 transition-transform duration-300">
              {/* Island Rock Strata with Depth */}
              <path d="M25,65 Q150,25 275,65 L245,145 Q150,185 55,145 Z" fill="#2E7D32" stroke="#1B2A4A" strokeWidth="4" />
              <path d="M55,145 Q150,185 245,145 L215,185 Q150,210 85,185 Z" fill="#1B5E20" stroke="#1B2A4A" strokeWidth="3" />
              {/* Lush Meadow Grass Top */}
              <rect x="40" y="52" width="220" height="22" rx="11" fill="#4CAF50" stroke="#1B2A4A" strokeWidth="3" />
              <rect x="55" y="50" width="190" height="8" rx="4" fill="#81C784" />

              {/* Cascading Waterfall dropping from cliff into clouds */}
              <rect x="145" y="65" width="18" height="135" fill="#00E5FF" opacity="0.9" />
              <rect x="150" y="65" width="8" height="135" fill="#E0F7FA" />
              <ellipse cx="154" cy="195" rx="20" ry="6" fill="#FFFFFF" opacity="0.8" />

              {/* Thatched-Roof Village Cottage */}
              <rect x="70" y="30" width="40" height="26" fill="#8D6E63" stroke="#1B2A4A" strokeWidth="2.5" />
              <polygon points="62,30 90,8 118,30" fill="#FBC02D" stroke="#1B2A4A" strokeWidth="2.5" />
              <rect x="85" y="42" width="12" height="14" fill="#3E2723" />
              {/* Wooden Signpost & Fence */}
              <rect x="195" y="44" width="4" height="14" fill="#5D4037" />
              <rect x="190" y="40" width="16" height="8" fill="#D7CCC8" stroke="#1B2A4A" strokeWidth="1.5" />
              {/* Pine Trees */}
              <polygon points="215,55 225,20 235,55" fill="#1B5E20" stroke="#1B2A4A" strokeWidth="2" />
              <polygon points="230,55 240,26 250,55" fill="#2E7D32" stroke="#1B2A4A" strokeWidth="2" />
            </svg>

            {/* Active Gold Coin Node with Hero Avatar */}
            <div className="absolute top-10 left-36 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              {/* Animated Pixel Knight with Sword Idle Animation */}
              <motion.div
                animate={{ y: [-5, 0, -5] }}
                transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
                className="flex flex-col items-center mb-1 select-none"
              >
                <div className="text-2xl filter drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)]">
                  🧙‍♂️⚔️
                </div>
                <span className="font-pixel text-[8px] bg-[#1B2A4A] text-[#FFD54F] px-2 py-0.5 rounded-full border border-[#FFD54F] shadow-sm">
                  HERO
                </span>
              </motion.div>

              {/* Pulsing 3D Gold Ring Node */}
              <div className="w-12 h-12 rounded-full bg-[#FFD54F] border-[4px] border-[#FFB300] shadow-[0_0_20px_#FFD54F,0_4px_0_#B58A00] flex items-center justify-center font-pixel text-xs text-[#1A2744] font-bold animate-pulse-gold">
                1.1
              </div>
            </div>

            {/* Biome Label HUD Badge */}
            <div className="mt-2 px-3 py-1 bg-white/95 backdrop-blur-md rounded-full border-2 border-[#1B2A4A] shadow-[2px_2px_0_#1B2A4A] flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4CAF50] inline-block border border-[#1B2A4A]" />
              <span className="font-pixel text-[9px] text-[#1A2744]">1. BEGINNER VILLAGE</span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* BIOME 2: CENTRAL CASTLE CITADEL (Center Low) */}
        {/* ============================================================ */}
        <div
          className="absolute z-20 cursor-pointer group"
          style={{ left: '38%', top: '46%' }}
          onClick={() => onNodeClick && onNodeClick(11, 'Linear Citadel Castle', 2)}
        >
          <div className="relative flex flex-col items-center">
            <svg width="320" height="210" viewBox="0 0 320 210" fill="none" className="filter drop-shadow-[0_15px_10px_rgba(27,42,74,0.25)] group-hover:scale-105 transition-transform duration-300">
              {/* Massive Floating Fortress Island */}
              <path d="M30,70 Q160,30 290,70 L260,150 Q160,190 60,150 Z" fill="#37474F" stroke="#1B2A4A" strokeWidth="4" />
              <path d="M60,150 Q160,190 260,150 L230,190 Q160,215 90,190 Z" fill="#263238" stroke="#1B2A4A" strokeWidth="3" />
              {/* Stone Upper Terrace */}
              <rect x="45" y="58" width="230" height="20" rx="10" fill="#78909C" stroke="#1B2A4A" strokeWidth="3" />

              {/* Waterfall pouring from moat */}
              <rect x="220" y="70" width="14" height="135" fill="#00E5FF" opacity="0.9" />
              <rect x="224" y="70" width="6" height="135" fill="#E0F7FA" />

              {/* Grand Citadel Castle Walls & 4 Royal Blue Spires */}
              <rect x="90" y="24" width="140" height="42" fill="#B0BEC5" stroke="#1B2A4A" strokeWidth="3" />
              {/* Left Spire */}
              <rect x="85" y="10" width="22" height="30" fill="#90A4AE" stroke="#1B2A4A" strokeWidth="2" />
              <polygon points="78,10 96,-14 114,10" fill="#0288D1" stroke="#1B2A4A" strokeWidth="2.5" />
              {/* Right Spire */}
              <rect x="210" y="10" width="22" height="30" fill="#90A4AE" stroke="#1B2A4A" strokeWidth="2" />
              <polygon points="203,10 221,-14 239,10" fill="#0288D1" stroke="#1B2A4A" strokeWidth="2.5" />
              {/* Center High Spire */}
              <rect x="140" y="0" width="30" height="40" fill="#CFD8DC" stroke="#1B2A4A" strokeWidth="2.5" />
              <polygon points="130,0 155,-26 180,0" fill="#00E5FF" stroke="#0288D1" strokeWidth="2.5" />
              {/* Castle Portcullis Gate */}
              <rect x="145" y="40" width="20" height="24" rx="10" fill="#1B2A4A" />

              {/* Stone Arch Bridge */}
              <path d="M20,68 Q45,45 70,68" stroke="#90A4AE" strokeWidth="8" fill="none" />
            </svg>

            {/* Gold Node Ring */}
            <div className="absolute top-12 left-40 -translate-x-1/2 -translate-y-1/2">
              <div className="w-11 h-11 rounded-full bg-slate-200 border-[3px] border-slate-400 shadow-sm flex items-center justify-center font-pixel text-slate-600">
                <span className="text-sm">🔒</span>
              </div>
            </div>

            <div className="mt-2 px-3 py-1 bg-white/95 backdrop-blur-md rounded-full border-2 border-[#1B2A4A] shadow-[2px_2px_0_#1B2A4A] flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0288D1] inline-block border border-[#1B2A4A]" />
              <span className="font-pixel text-[9px] text-[#1A2744]">2. CENTRAL CITADEL</span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* BIOME 3: NON-LINEAR WINDMILL ISLES (Right Mid) */}
        {/* ============================================================ */}
        <div
          className="absolute z-20 cursor-pointer group"
          style={{ left: '68%', top: '36%' }}
          onClick={() => onNodeClick && onNodeClick(21, 'Trees & Windmills', 3)}
        >
          <div className="relative flex flex-col items-center">
            <svg width="280" height="180" viewBox="0 0 280 180" fill="none" className="filter drop-shadow-[0_15px_10px_rgba(27,42,74,0.25)] group-hover:scale-105 transition-transform duration-300">
              <path d="M25,55 Q140,25 255,55 L225,125 Q140,155 55,125 Z" fill="#2E7D32" stroke="#1B2A4A" strokeWidth="4" />
              <rect x="40" y="45" width="200" height="18" rx="9" fill="#81C784" stroke="#1B2A4A" strokeWidth="3" />

              {/* Windmill with rotating blades */}
              <polygon points="90,48 98,12 112,12 120,48" fill="#D7CCC8" stroke="#1B2A4A" strokeWidth="2" />
              <line x1="105" y1="16" x2="80" y2="-4" stroke="#5D4037" strokeWidth="3" />
              <line x1="105" y1="16" x2="130" y2="36" stroke="#5D4037" strokeWidth="3" />
              <line x1="105" y1="16" x2="85" y2="36" stroke="#5D4037" strokeWidth="3" />
              <line x1="105" y1="16" x2="125" y2="-4" stroke="#5D4037" strokeWidth="3" />
              {/* Giant Oak Tree */}
              <circle cx="180" cy="28" r="22" fill="#388E3C" stroke="#1B2A4A" strokeWidth="3" />
              <rect x="176" y="44" width="8" height="12" fill="#5D4037" />
            </svg>

            <div className="absolute top-10 left-36 -translate-x-1/2 -translate-y-1/2">
              <div className="w-11 h-11 rounded-full bg-slate-200 border-[3px] border-slate-400 shadow-sm flex items-center justify-center font-pixel text-slate-600">
                <span className="text-sm">🔒</span>
              </div>
            </div>

            <div className="mt-2 px-3 py-1 bg-white/95 backdrop-blur-md rounded-full border-2 border-[#1B2A4A] shadow-[2px_2px_0_#1B2A4A] flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#81C784] inline-block border border-[#1B2A4A]" />
              <span className="font-pixel text-[9px] text-[#1A2744]">3. SKY WINDMILLS</span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* BIOME 4: GRAPH GLACIER FORTRESS (Left Mid) */}
        {/* ============================================================ */}
        <div
          className="absolute z-20 cursor-pointer group"
          style={{ left: '10%', top: '22%' }}
          onClick={() => onNodeClick && onNodeClick(31, 'Glacier Graphs', 4)}
        >
          <div className="relative flex flex-col items-center">
            <svg width="290" height="190" viewBox="0 0 290 190" fill="none" className="filter drop-shadow-[0_15px_10px_rgba(27,42,74,0.25)] group-hover:scale-105 transition-transform duration-300">
              <path d="M25,60 Q145,25 265,60 L235,135 Q145,170 55,135 Z" fill="#455A64" stroke="#1B2A4A" strokeWidth="4" />
              <rect x="40" y="48" width="210" height="18" rx="9" fill="#90CAF9" stroke="#1B2A4A" strokeWidth="3" />

              {/* Snow Peaks & Frozen Cyan Caves */}
              <polygon points="65,50 100,10 135,50" fill="#90CAF9" stroke="#1B2A4A" strokeWidth="2.5" />
              <polygon points="90,24 100,10 110,24" fill="#FFFFFF" />
              <polygon points="120,50 155,0 190,50" fill="#64B5F6" stroke="#1B2A4A" strokeWidth="2.5" />
              <polygon points="144,14 155,0 166,14" fill="#FFFFFF" />
              {/* Cyan Crystal Cave Entrance */}
              <polygon points="195,50 205,32 215,50" fill="#00E5FF" stroke="#0288D1" strokeWidth="2" />
              {/* Frozen Waterfall */}
              <rect x="75" y="60" width="10" height="110" fill="#E0F7FA" opacity="0.9" />
            </svg>

            <div className="absolute top-10 left-36 -translate-x-1/2 -translate-y-1/2">
              <div className="w-11 h-11 rounded-full bg-slate-200 border-[3px] border-slate-400 shadow-sm flex items-center justify-center font-pixel text-slate-600">
                <span className="text-sm">🔒</span>
              </div>
            </div>

            <div className="mt-2 px-3 py-1 bg-white/95 backdrop-blur-md rounded-full border-2 border-[#1B2A4A] shadow-[2px_2px_0_#1B2A4A] flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4A6FA5] inline-block border border-[#1B2A4A]" />
              <span className="font-pixel text-[9px] text-[#1A2744]">4. GLACIER FORTRESS</span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* BIOME 5: INFERNO VOLCANO KEEP (Center High) */}
        {/* ============================================================ */}
        <div
          className="absolute z-20 cursor-pointer group"
          style={{ left: '44%', top: '12%' }}
          onClick={() => onNodeClick && onNodeClick(41, 'Inferno DP Keep', 5)}
        >
          <div className="relative flex flex-col items-center">
            <svg width="290" height="190" viewBox="0 0 290 190" fill="none" className="filter drop-shadow-[0_15px_10px_rgba(27,42,74,0.25)] group-hover:scale-105 transition-transform duration-300">
              <path d="M25,60 Q145,25 265,60 L235,135 Q145,170 55,135 Z" fill="#212121" stroke="#1B2A4A" strokeWidth="4" />
              <rect x="40" y="48" width="210" height="18" rx="9" fill="#3E2723" stroke="#1B2A4A" strokeWidth="3" />

              {/* Volcano Cone */}
              <polygon points="80,50 125,12 165,12 210,50" fill="#3E2723" stroke="#1B2A4A" strokeWidth="3" />
              {/* Boiling Lava Crater & Spilling River */}
              <rect x="125" y="8" width="40" height="8" fill="#FF5722" />
              <path d="M140,16 Q160,35 145,55 L135,120" stroke="#FF9800" strokeWidth="6" fill="none" />
              {/* Obsidian fortress walls */}
              <rect x="65" y="40" width="30" height="15" fill="#263238" stroke="#1B2A4A" strokeWidth="2" />
            </svg>

            <div className="absolute top-10 left-36 -translate-x-1/2 -translate-y-1/2">
              <div className="w-11 h-11 rounded-full bg-slate-200 border-[3px] border-slate-400 shadow-sm flex items-center justify-center font-pixel text-slate-600">
                <span className="text-sm">🔒</span>
              </div>
            </div>

            <div className="mt-2 px-3 py-1 bg-white/95 backdrop-blur-md rounded-full border-2 border-[#1B2A4A] shadow-[2px_2px_0_#1B2A4A] flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D32F2F] inline-block border border-[#1B2A4A]" />
              <span className="font-pixel text-[9px] text-[#1A2744]">5. INFERNO KEEP</span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* BIOME 6: SKYWARD SANCTUARY (Top Right Spire) */}
        {/* ============================================================ */}
        <div
          className="absolute z-20 cursor-pointer group"
          style={{ left: '70%', top: '2%' }}
          onClick={() => onNodeClick && onNodeClick(51, 'Skyward Sanctuary', 6)}
        >
          <div className="relative flex flex-col items-center">
            <svg width="280" height="180" viewBox="0 0 280 180" fill="none" className="filter drop-shadow-[0_15px_10px_rgba(27,42,74,0.25)] group-hover:scale-105 transition-transform duration-300">
              <path d="M25,50 Q140,20 255,50 L225,120 Q140,150 55,120 Z" fill="#4A148C" stroke="#1B2A4A" strokeWidth="4" />
              <rect x="40" y="42" width="200" height="16" rx="8" fill="#BA68C8" stroke="#1B2A4A" strokeWidth="3" />

              {/* Mythical Sky Spires & Golden Rings */}
              <rect x="110" y="10" width="30" height="36" fill="#EDE7F6" stroke="#1B2A4A" strokeWidth="2.5" />
              <polygon points="100,10 125,-18 150,10" fill="#FFD54F" stroke="#FFB300" strokeWidth="3" />
              {/* Floating Golden Rings in air */}
              <ellipse cx="65" cy="20" rx="16" ry="6" stroke="#FFD54F" strokeWidth="3" fill="none" />
              <ellipse cx="195" cy="15" rx="16" ry="6" stroke="#FFD54F" strokeWidth="3" fill="none" />
            </svg>

            <div className="absolute top-8 left-36 -translate-x-1/2 -translate-y-1/2">
              <div className="w-11 h-11 rounded-full bg-slate-200 border-[3px] border-slate-400 shadow-sm flex items-center justify-center font-pixel text-slate-600">
                <span className="text-sm">🔒</span>
              </div>
            </div>

            <div className="mt-2 px-3 py-1 bg-white/95 backdrop-blur-md rounded-full border-2 border-[#1B2A4A] shadow-[2px_2px_0_#1B2A4A] flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#7E57C2] inline-block border border-[#1B2A4A]" />
              <span className="font-pixel text-[9px] text-[#1A2744]">6. SKY SANCTUARY</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. FLUFFY PASTEL CLOUD BANK (Bottom of Canvas) */}
      <div className="relative w-full h-24 pointer-events-none select-none -mt-16 z-20">
        <svg viewBox="0 0 1200 90" className="w-full h-full preserve-3d" preserveAspectRatio="none">
          <path
            d="M0,90 L0,45 Q70,15 150,45 Q230,75 330,40 Q430,10 530,45 Q630,75 720,40 Q810,10 900,45 Q1020,75 1200,45 L1200,90 Z"
            fill="#D9CBEA"
            fillOpacity="0.75"
          />
          <path
            d="M0,90 L0,55 Q90,25 180,55 Q270,85 370,50 Q470,20 570,55 Q670,85 760,50 Q850,20 950,55 Q1070,85 1200,55 L1200,90 Z"
            fill="#FCE4C8"
            fillOpacity="0.8"
          />
          <path
            d="M0,90 L0,65 Q80,35 160,65 Q240,95 340,60 Q440,30 540,65 Q640,95 730,60 Q820,30 920,65 Q1040,95 1200,65 L1200,90 Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>
    </div>
  );
};

