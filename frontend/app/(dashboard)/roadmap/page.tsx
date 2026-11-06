'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { roadmapApi } from '@/lib/api/roadmap';
import { PixelCard } from '@/components/ui/PixelCard';
import { PixelButton } from '@/components/ui/PixelButton';
import { InteractiveOverworldMap } from '@/components/world/InteractiveOverworldMap';
import { Check, Lock, ChevronDown, ChevronRight, Map, List, Compass, Play, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RoadmapPage() {
  const router = useRouter();
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
          <InteractiveOverworldMap
            onSelectLevel={(lvl) => {
              router.push(`/sublevel/${lvl.sublevelId}`);
            }}
          />
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
