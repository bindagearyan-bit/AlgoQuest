'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { roadmapApi } from '@/lib/api/roadmap';
import { PixelCard } from '@/components/ui/PixelCard';
import { PixelButton } from '@/components/ui/PixelButton';
import { Check, Lock, ChevronDown, ChevronRight, Map, List, Compass, Play, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RoadmapPage() {
  const { data: levels, isLoading } = useQuery({
    queryKey: ['levels'],
    queryFn: () => roadmapApi.getLevels(),
  });

  const [viewMode, setViewMode] = useState<'MAP' | 'LIST'>('MAP');
  const [selectedSublevel, setSelectedSublevel] = useState<any | null>(null);

  // Default levels fallback if loading or offline
  const activeLevels = levels || [
    {
      id: 1,
      title: 'Foundations Island (Beginner Village)',
      orderIndex: 1,
      icon: '🏡',
      sublevels: [
        { id: 1, title: 'Complexity & Big-O', status: 'UNLOCKED', currentStage: 2, stagesCount: 8 },
        { id: 2, title: 'Static & Dynamic Arrays', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 3, title: 'Dual Pointers Mechanics', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      ],
    },
    {
      id: 2,
      title: 'Linear Structures Citadel (Castle)',
      orderIndex: 2,
      icon: '🏰',
      sublevels: [
        { id: 11, title: 'Singly Linked Lists', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 12, title: 'Stack & Monotonic Stack', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      ],
    },
    {
      id: 3,
      title: 'Non-Linear Floating Isles (Windmills)',
      orderIndex: 3,
      icon: '🍃',
      sublevels: [
        { id: 21, title: 'Binary Trees & Traversals', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 22, title: 'BST & AVL Rotations', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      ],
    },
    {
      id: 4,
      title: 'Graph Glacier Fortress (Snow Mountain)',
      orderIndex: 4,
      icon: '❄️',
      sublevels: [
        { id: 31, title: 'Graph BFS & DFS Traversal', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 32, title: 'Dijkstra Shortest Paths', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      ],
    },
    {
      id: 5,
      title: 'Inferno Volcano Keep (Lava Realm)',
      orderIndex: 5,
      icon: '🌋',
      sublevels: [
        { id: 41, title: 'Dynamic Programming Memoization', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 42, title: '2D Grid & Knapsack DP', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      ],
    },
    {
      id: 6,
      title: 'Skyward Sanctuary (Celestial Spire)',
      orderIndex: 6,
      icon: '👑',
      sublevels: [
        { id: 51, title: 'KMP & String Matching', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 52, title: 'Final Dungeon Grandmaster', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      ],
    },
  ];

  // Coordinates on the 16-bit isometric floating island overworld (in percentages)
  const BIOME_COORDINATES = [
    { levelIndex: 1, x: 20, y: 72, name: 'Level 1: Beginner Village', biome: 'VILLAGE', color: '#4CAF50' },
    { levelIndex: 2, x: 48, y: 64, name: 'Level 2: Central Citadel', biome: 'CASTLE', color: '#0288D1' },
    { levelIndex: 3, x: 78, y: 55, name: 'Level 3: Sky Windmills', biome: 'WINDMILL', color: '#81C784' },
    { levelIndex: 4, x: 26, y: 38, name: 'Level 4: Glacier Fortress', biome: 'GLACIER', color: '#4A6FA5' },
    { levelIndex: 5, x: 55, y: 28, name: 'Level 5: Inferno Volcano', biome: 'VOLCANO', color: '#D32F2F' },
    { levelIndex: 6, x: 80, y: 16, name: 'Level 6: Skyward Sanctuary', biome: 'CELESTIAL', color: '#7E57C2' },
  ];

  return (
    <div className="relative min-h-[calc(100vh-64px)] w-full bg-gradient-to-b from-[#F3C8DD] via-[#C7D3F5] to-[#FCE4C8] flex flex-col justify-between overflow-x-hidden">
      {/* Upper Control Bar: Mode Toggle & Legend */}
      <div className="relative z-30 max-w-7xl mx-auto w-full px-4 sm:px-6 pt-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="font-pixel text-[9px] text-[#2E7D32] uppercase block mb-1">
            WORLD EXPEDITION SYSTEM
          </span>
          <h1 className="font-pixel text-sm sm:text-lg text-[#1A2744]">
            RETRO FLOATING ISLAND OVERWORLD
          </h1>
        </div>

        {/* View Mode Toggle Button */}
        <div className="flex items-center gap-2 bg-white/90 p-1.5 rounded-full border-2 border-[#1B2A4A] shadow-[2px_2px_0_#1B2A4A]">
          <button
            onClick={() => setViewMode('MAP')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-pixel text-[10px] transition-all ${
              viewMode === 'MAP'
                ? 'bg-[#FFD54F] text-[#1A2744] shadow-sm font-bold'
                : 'text-slate-600 hover:text-[#1A2744]'
            }`}
          >
            <Map size={13} /> OVERWORLD MAP
          </button>
          <button
            onClick={() => setViewMode('LIST')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-pixel text-[10px] transition-all ${
              viewMode === 'LIST'
                ? 'bg-[#FFD54F] text-[#1A2744] shadow-sm font-bold'
                : 'text-slate-600 hover:text-[#1A2744]'
            }`}
          >
            <List size={13} /> LIST VIEW
          </button>
        </div>
      </div>

      {/* VIEW MODE 1: Interactive 16-Bit Isometric Floating Island World Map */}
      {viewMode === 'MAP' && (
        <div className="relative z-20 w-full max-w-6xl mx-auto px-4 py-8 flex-1 flex flex-col justify-center">
          <div className="relative w-full h-[620px] rounded-2xl border-[3px] border-[#1B2A4A] bg-gradient-to-b from-[#F3C8DD]/60 via-[#C7D3F5]/60 to-[#FCE4C8]/80 shadow-[4px_4px_0_#1B2A4A] overflow-hidden">
            {/* SVG Connecting Golden Dotted Trails & Waterfalls */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
              <defs>
                <linearGradient id="goldPathGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFD54F" />
                  <stop offset="100%" stopColor="#FFB300" />
                </linearGradient>
                <filter id="goldGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Dotted Golden Trails connecting the 6 floating islands */}
              {/* Island 1 -> Island 2 */}
              <path
                d="M 220 460 Q 340 450 490 410"
                stroke="#FFD54F"
                strokeWidth="5"
                strokeDasharray="8 8"
                fill="none"
                filter="url(#goldGlowFilter)"
              />
              {/* Island 2 -> Island 3 */}
              <path
                d="M 520 410 Q 640 400 780 350"
                stroke="#FFD54F"
                strokeWidth="5"
                strokeDasharray="8 8"
                fill="none"
                filter="url(#goldGlowFilter)"
              />
              {/* Island 3 -> Island 4 (Cross-sky path) */}
              <path
                d="M 780 340 Q 520 280 280 250"
                stroke="#FFD54F"
                strokeWidth="5"
                strokeDasharray="8 8"
                fill="none"
                filter="url(#goldGlowFilter)"
              />
              {/* Island 4 -> Island 5 */}
              <path
                d="M 280 240 Q 420 210 560 180"
                stroke="#FFD54F"
                strokeWidth="5"
                strokeDasharray="8 8"
                fill="none"
                filter="url(#goldGlowFilter)"
              />
              {/* Island 5 -> Island 6 (Ascent to Celestial Spire) */}
              <path
                d="M 580 180 Q 690 140 800 110"
                stroke="#FFD54F"
                strokeWidth="5"
                strokeDasharray="8 8"
                fill="none"
                filter="url(#goldGlowFilter)"
              />
            </svg>

            {/* Render 6 Floating Island Biomes */}
            {/* 1. Beginner Village Island (Meadows + Cottages) */}
            <div
              className="absolute z-20 cursor-pointer group"
              style={{ left: '12%', top: '65%' }}
              onClick={() => setSelectedSublevel(activeLevels[0]?.sublevels[0] || null)}
            >
              <div className="relative flex flex-col items-center">
                {/* Island Landmass SVG with Cascading Waterfall */}
                <svg width="190" height="120" viewBox="0 0 190 120" fill="none" className="group-hover:scale-105 transition-transform">
                  {/* Floating Rock Body */}
                  <path d="M15,40 Q95,15 175,40 L155,90 Q95,110 35,90 Z" fill="#2E7D32" stroke="#1B2A4A" strokeWidth="3" />
                  <rect x="25" y="32" width="140" height="12" rx="6" fill="#4CAF50" />
                  {/* Cascading Waterfall pouring off the edge */}
                  <rect x="90" y="38" width="10" height="60" fill="#00E5FF" opacity="0.9" />
                  <rect x="93" y="38" width="4" height="60" fill="#E0F7FA" />
                  {/* Village Cottages */}
                  <rect x="40" y="20" width="22" height="15" fill="#8D6E63" stroke="#1B2A4A" strokeWidth="2" />
                  <polygon points="36,20 51,8 66,20" fill="#FBC02D" stroke="#1B2A4A" strokeWidth="2" />
                  {/* Pine Trees */}
                  <polygon points="120,32 126,10 132,32" fill="#1B5E20" stroke="#1B2A4A" strokeWidth="1.5" />
                  <polygon points="134,32 140,14 146,32" fill="#2E7D32" stroke="#1B2A4A" strokeWidth="1.5" />
                </svg>

                {/* Golden Path Node on Village (Active Hero Position!) */}
                <div className="absolute top-4 left-24 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  {/* Pixel Knight Sprite Standing on Active Node */}
                  <motion.div
                    animate={{ y: [-4, 0, -4] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                    className="font-pixel text-xs flex flex-col items-center mb-1"
                  >
                    <span className="text-xl">🧙‍♂️</span>
                    <span className="bg-[#1B2A4A] text-white px-1.5 py-0.5 rounded text-[8px] font-pixel border border-[#FFD54F]">
                      HERO
                    </span>
                  </motion.div>

                  {/* Pulsing Golden Coin Node */}
                  <div className="w-10 h-10 rounded-full bg-[#FFD54F] border-[3px] border-[#FFB300] shadow-goldGlow flex items-center justify-center font-pixel text-xs text-[#1A2744] font-bold animate-pulse-gold">
                    1.1
                  </div>
                </div>

                <span className="mt-1 font-pixel text-[9px] bg-white/90 text-[#1A2744] px-2 py-0.5 rounded-full border border-[#1B2A4A] shadow-sm">
                  1. Village Meadows
                </span>
              </div>
            </div>

            {/* 2. Central Citadel Castle Island (Blue Spires, Moats & Arch Bridges) */}
            <div
              className="absolute z-20 cursor-pointer group"
              style={{ left: '40%', top: '54%' }}
              onClick={() => setSelectedSublevel(activeLevels[1]?.sublevels[0] || null)}
            >
              <div className="relative flex flex-col items-center">
                <svg width="200" height="130" viewBox="0 0 200 130" fill="none" className="group-hover:scale-105 transition-transform">
                  <path d="M20,45 Q100,20 180,45 L160,95 Q100,115 40,95 Z" fill="#37474F" stroke="#1B2A4A" strokeWidth="3" />
                  <rect x="30" y="38" width="140" height="12" rx="6" fill="#78909C" />
                  {/* Castle Walls & Blue Spires */}
                  <rect x="65" y="15" width="70" height="30" fill="#B0BEC5" stroke="#1B2A4A" strokeWidth="2" />
                  <polygon points="60,15 70, -2 80,15" fill="#0288D1" stroke="#1B2A4A" strokeWidth="2" />
                  <polygon points="120,15 130, -2 140,15" fill="#0288D1" stroke="#1B2A4A" strokeWidth="2" />
                  <rect x="90" y="28" width="18" height="17" rx="9" fill="#1B2A4A" />
                  {/* Waterfall pouring */}
                  <rect x="45" y="45" width="8" height="50" fill="#00E5FF" opacity="0.85" />
                </svg>

                {/* Node */}
                <div className="absolute top-8 left-24 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-9 h-9 rounded-full bg-slate-300 border-[3px] border-slate-500 shadow-sm flex items-center justify-center font-pixel text-slate-600">
                    <Lock size={14} />
                  </div>
                </div>

                <span className="mt-1 font-pixel text-[9px] bg-white/90 text-[#1A2744] px-2 py-0.5 rounded-full border border-[#1B2A4A]">
                  2. Castle Citadel
                </span>
              </div>
            </div>

            {/* 3. Non-Linear Floating Isles (Windmills & Oak Trees) */}
            <div
              className="absolute z-20 cursor-pointer group"
              style={{ left: '68%', top: '44%' }}
              onClick={() => setSelectedSublevel(activeLevels[2]?.sublevels[0] || null)}
            >
              <div className="relative flex flex-col items-center">
                <svg width="180" height="110" viewBox="0 0 180 110" fill="none" className="group-hover:scale-105 transition-transform">
                  <path d="M15,35 Q90,15 165,35 L145,85 Q90,105 35,85 Z" fill="#2E7D32" stroke="#1B2A4A" strokeWidth="3" />
                  <rect x="25" y="28" width="130" height="10" rx="5" fill="#81C784" />
                  {/* Windmill */}
                  <polygon points="60,30 65,10 75,10 80,30" fill="#D7CCC8" stroke="#1B2A4A" strokeWidth="1.5" />
                  <line x1="70" y1="12" x2="55" y2="0" stroke="#5D4037" strokeWidth="2.5" />
                  <line x1="70" y1="12" x2="85" y2="24" stroke="#5D4037" strokeWidth="2.5" />
                  {/* Oak Tree */}
                  <circle cx="120" cy="18" r="14" fill="#388E3C" stroke="#1B2A4A" strokeWidth="2" />
                </svg>

                <div className="absolute top-6 left-24 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-9 h-9 rounded-full bg-slate-300 border-[3px] border-slate-500 shadow-sm flex items-center justify-center font-pixel text-slate-600">
                    <Lock size={14} />
                  </div>
                </div>

                <span className="mt-1 font-pixel text-[9px] bg-white/90 text-[#1A2744] px-2 py-0.5 rounded-full border border-[#1B2A4A]">
                  3. Sky Windmills
                </span>
              </div>
            </div>

            {/* 4. Graph Glacier Fortress (Snow Peaks & Frozen Falls) */}
            <div
              className="absolute z-20 cursor-pointer group"
              style={{ left: '18%', top: '26%' }}
              onClick={() => setSelectedSublevel(activeLevels[3]?.sublevels[0] || null)}
            >
              <div className="relative flex flex-col items-center">
                <svg width="190" height="120" viewBox="0 0 190 120" fill="none" className="group-hover:scale-105 transition-transform">
                  <path d="M20,40 Q95,20 170,40 L150,85 Q95,105 40,85 Z" fill="#455A64" stroke="#1B2A4A" strokeWidth="3" />
                  <rect x="30" y="32" width="130" height="10" rx="5" fill="#90CAF9" />
                  {/* Icy Mountain Peaks */}
                  <polygon points="50,34 75,6 100,34" fill="#90CAF9" stroke="#1B2A4A" strokeWidth="2" />
                  <polygon points="68,16 75,6 82,16" fill="#FFFFFF" />
                  <polygon points="90,34 115,12 140,34" fill="#64B5F6" stroke="#1B2A4A" strokeWidth="2" />
                  <polygon points="107,20 115,12 123,20" fill="#FFFFFF" />
                  {/* Frozen Waterfall */}
                  <rect x="135" y="38" width="6" height="40" fill="#E0F7FA" />
                </svg>

                <div className="absolute top-6 left-24 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-9 h-9 rounded-full bg-slate-300 border-[3px] border-slate-500 shadow-sm flex items-center justify-center font-pixel text-slate-600">
                    <Lock size={14} />
                  </div>
                </div>

                <span className="mt-1 font-pixel text-[9px] bg-white/90 text-[#1A2744] px-2 py-0.5 rounded-full border border-[#1B2A4A]">
                  4. Glacier Fortress
                </span>
              </div>
            </div>

            {/* 5. Inferno Volcano Keep (Lava & Obsidian) */}
            <div
              className="absolute z-20 cursor-pointer group"
              style={{ left: '46%', top: '16%' }}
              onClick={() => setSelectedSublevel(activeLevels[4]?.sublevels[0] || null)}
            >
              <div className="relative flex flex-col items-center">
                <svg width="190" height="120" viewBox="0 0 190 120" fill="none" className="group-hover:scale-105 transition-transform">
                  <path d="M20,40 Q95,20 170,40 L150,85 Q95,105 40,85 Z" fill="#212121" stroke="#1B2A4A" strokeWidth="3" />
                  <rect x="30" y="32" width="130" height="10" rx="5" fill="#4E342E" />
                  {/* Volcano Cone */}
                  <polygon points="55,34 85,8 105,8 135,34" fill="#3E2723" stroke="#1B2A4A" strokeWidth="2" />
                  {/* Lava Crater & River */}
                  <rect x="85" y="6" width="20" height="5" fill="#FF5722" />
                  <path d="M95,11 Q105,22 92,34" stroke="#FF9800" strokeWidth="3" fill="none" />
                </svg>

                <div className="absolute top-6 left-24 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-9 h-9 rounded-full bg-slate-300 border-[3px] border-slate-500 shadow-sm flex items-center justify-center font-pixel text-slate-600">
                    <Lock size={14} />
                  </div>
                </div>

                <span className="mt-1 font-pixel text-[9px] bg-white/90 text-[#1A2744] px-2 py-0.5 rounded-full border border-[#1B2A4A]">
                  5. Inferno Keep
                </span>
              </div>
            </div>

            {/* 6. Skyward Sanctuary (Celestial Towers & Dragon) */}
            <div
              className="absolute z-20 cursor-pointer group"
              style={{ left: '72%', top: '4%' }}
              onClick={() => setSelectedSublevel(activeLevels[5]?.sublevels[0] || null)}
            >
              <div className="relative flex flex-col items-center">
                <svg width="190" height="120" viewBox="0 0 190 120" fill="none" className="group-hover:scale-105 transition-transform">
                  <path d="M20,40 Q95,20 170,40 L150,85 Q95,105 40,85 Z" fill="#4A148C" stroke="#1B2A4A" strokeWidth="3" />
                  <rect x="30" y="32" width="130" height="10" rx="5" fill="#BA68C8" />
                  {/* Celestial Golden Spire */}
                  <rect x="80" y="8" width="22" height="26" fill="#EDE7F6" stroke="#1B2A4A" strokeWidth="2" />
                  <polygon points="75,8 91,-8 107,8" fill="#FFD54F" stroke="#FFB300" strokeWidth="2" />
                  {/* Flying Blue Pixel Dragon */}
                  <path d="M125,12 Q145,-2 160,15 Q140,22 125,12" fill="#00E5FF" stroke="#0288D1" strokeWidth="1.5" />
                </svg>

                <div className="absolute top-6 left-24 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-9 h-9 rounded-full bg-slate-300 border-[3px] border-slate-500 shadow-sm flex items-center justify-center font-pixel text-slate-600">
                    <Lock size={14} />
                  </div>
                </div>

                <span className="mt-1 font-pixel text-[9px] bg-white/90 text-[#1A2744] px-2 py-0.5 rounded-full border border-[#1B2A4A]">
                  6. Skyward Sanctuary
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODE 2: List / Grid Progression */}
      {viewMode === 'LIST' && (
        <div className="max-w-5xl mx-auto w-full px-4 py-8 space-y-6">
          {activeLevels.map((lvl: any) => (
            <PixelCard key={lvl.id} variant="white">
              <div className="flex items-center justify-between mb-4 border-b pb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{lvl.icon}</span>
                  <div>
                    <span className="font-pixel text-[9px] text-[#2E7D32] uppercase">
                      BIOME LEVEL {lvl.orderIndex}
                    </span>
                    <h2 className="font-pixel text-xs sm:text-sm text-[#1A2744]">
                      {lvl.title}
                    </h2>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {(lvl.sublevels || []).map((sub: any) => {
                  const isUnlocked = sub.status === 'UNLOCKED';
                  const isCompleted = sub.status === 'COMPLETED';

                  return (
                    <div
                      key={sub.id}
                      className={`p-3.5 rounded-xl border-2 transition-all ${
                        isCompleted
                          ? 'bg-emerald-50 border-emerald-400'
                          : isUnlocked
                          ? 'bg-white border-[#FFD54F] shadow-pixel hover:-translate-y-0.5'
                          : 'bg-slate-100 border-slate-300 opacity-60'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-pixel text-[8px] text-slate-500">
                          {isCompleted ? 'COMPLETED' : isUnlocked ? 'ACTIVE' : 'LOCKED'}
                        </span>
                        {isUnlocked && <span className="w-2 h-2 rounded-full bg-[#FFD54F] animate-ping" />}
                      </div>
                      <h4 className="font-pixel text-[10px] text-[#1A2744] line-clamp-1 mb-3">
                        {sub.title}
                      </h4>
                      {isUnlocked ? (
                        <Link href={`/sublevel/${sub.id}`}>
                          <PixelButton variant="mint" size="sm" fullWidth>
                            ENTER <Play size={10} className="ml-1 fill-current" />
                          </PixelButton>
                        </Link>
                      ) : (
                        <span className="text-[10px] font-pixel text-slate-400 flex items-center justify-center gap-1 py-1">
                          <Lock size={12} /> LOCKED
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </PixelCard>
          ))}
        </div>
      )}

      {/* Selected Node Details Drawer / Modal */}
      {selectedSublevel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white rounded-2xl border-[3px] border-[#1B2A4A] shadow-[6px_6px_0_#1B2A4A] p-6 text-center space-y-4">
            <span className="font-pixel text-[9px] text-[#2E7D32] uppercase">
              ISLAND SUBLEVEL SECTOR
            </span>
            <h3 className="font-pixel text-sm text-[#1A2744]">
              {selectedSublevel.title}
            </h3>
            <p className="font-body text-xs text-slate-600 leading-relaxed">
              Step into the 8-stage gauntlet from theoretical analysis to interactive dungeon debugging and code challenges.
            </p>
            <div className="flex gap-3 pt-2">
              <PixelButton
                variant="outline"
                size="md"
                className="flex-1"
                onClick={() => setSelectedSublevel(null)}
              >
                CLOSE
              </PixelButton>
              <Link href={`/sublevel/${selectedSublevel.id}`} className="flex-1">
                <PixelButton variant="mint" size="md" fullWidth>
                  EXPEDITION <Play size={12} className="ml-1 fill-current" />
                </PixelButton>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Pastel Cloud Edge Bottom */}
      <div className="relative w-full h-16 pointer-events-none select-none">
        <svg viewBox="0 0 1200 60" className="w-full h-full preserve-3d" preserveAspectRatio="none">
          <path
            d="M0,60 L0,30 Q90,5 180,30 Q270,55 360,25 Q450,5 540,30 Q630,55 720,25 Q810,5 900,30 Q1050,55 1200,30 L1200,60 Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>
    </div>
  );
}
