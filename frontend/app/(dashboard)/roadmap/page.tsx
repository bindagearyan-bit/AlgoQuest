'use client';

import React from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { roadmapApi } from '@/lib/api/roadmap';
import { PixelCard } from '@/components/ui/PixelCard';
import { PixelButton } from '@/components/ui/PixelButton';
import { Lock, Play, Compass, CheckCircle2, ChevronRight, Swords, Sparkles } from 'lucide-react';

export default function RoadmapPage() {
  const { data: levels, isLoading } = useQuery({
    queryKey: ['levels'],
    queryFn: () => roadmapApi.getLevels(),
  });

  // Default levels fallback if loading or offline
  const activeLevels = levels || [
    {
      id: 1,
      title: 'Level 1: Foundations Island (Beginner Village)',
      orderIndex: 1,
      icon: '🏡',
      description: 'Foundations of computational efficiency, array bounds, two-pointer convergence, and recursion dynamics.',
      sublevels: [
        { id: 1, title: 'Complexity & Big-O Invariants', status: 'UNLOCKED', currentStage: 2, stagesCount: 8 },
        { id: 2, title: 'Static & Dynamic Arrays', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 3, title: 'Dual Pointers Mechanics', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 4, title: 'Sliding Window Patterns', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 5, title: 'Prefix Sum & Difference Arrays', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 6, title: 'String Manipulation & Parsing', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      ],
    },
    {
      id: 2,
      title: 'Level 2: Linear Structures Citadel (Central Castle)',
      orderIndex: 2,
      icon: '🏰',
      description: 'Pointer node linking, sentinel head/tail nodes, LIFO stacks, FIFO queues, and monotonic structures.',
      sublevels: [
        { id: 11, title: 'Singly Linked Lists Protocol', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 12, title: 'Doubly Linked Lists & Sentinels', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 13, title: 'Stack & Monotonic Stacks', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 14, title: 'Queue & Circular Ring Buffers', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 15, title: 'Hash Map Collision Resolution', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 16, title: 'Priority Queues & Binary Heaps', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      ],
    },
    {
      id: 3,
      title: 'Level 3: Non-Linear Floating Isles (Sky Windmills)',
      orderIndex: 3,
      icon: '🍃',
      description: 'Hierarchical tree traversals, self-balancing AVL rotations, prefix tries, and disjoint sets.',
      sublevels: [
        { id: 21, title: 'Binary Trees & Invariants', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 22, title: 'Binary Search Trees (BST)', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 23, title: 'AVL Trees & Self-Balancing Rotations', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 24, title: 'Trie (Prefix Trees)', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 25, title: 'Disjoint Set Union (Union-Find)', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 26, title: 'Segment Trees & Lazy Propagation', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      ],
    },
    {
      id: 4,
      title: 'Level 4: Graph Glacier Fortress (Snow Mountain)',
      orderIndex: 4,
      icon: '❄️',
      description: 'Adjacency lists, shortest path algorithms, cycle detection, topological DAG sorting, and MST.',
      sublevels: [
        { id: 31, title: 'Graph BFS & DFS Traversals', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 32, title: 'Topological Sort & Kahn’s Algorithm', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 33, title: 'Dijkstra’s Shortest Path', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 34, title: 'Bellman-Ford & Negative Cycles', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 35, title: 'Minimum Spanning Trees (Kruskal & Prim)', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      ],
    },
    {
      id: 5,
      title: 'Level 5: Inferno Volcano Keep (Lava Realm)',
      orderIndex: 5,
      icon: '🌋',
      description: 'Optimal substructure, overlapping subproblems, memoization caches, and 2D grid dynamic programming.',
      sublevels: [
        { id: 41, title: 'Divide & Conquer & Binary Search', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 42, title: 'Greedy Choice Property', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 43, title: 'Backtracking & Pruning Trees', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 44, title: '1D Dynamic Programming', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 45, title: '2D Grid & Matrix DP', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 46, title: 'Knapsack Variants & Subset Sum', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      ],
    },
    {
      id: 6,
      title: 'Level 6: Skyward Sanctuary (Celestial Spire)',
      orderIndex: 6,
      icon: '👑',
      description: 'Advanced string algorithms, network max-flow, bitmask DP, and the Grandmaster final boss battle.',
      sublevels: [
        { id: 51, title: 'KMP & Z-Algorithm Pattern Matching', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 52, title: 'Rabin-Karp Rolling Hash', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 53, title: 'Network Flow (Edmonds-Karp & Dinic)', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 54, title: 'Bitmask DP on Graphs', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 55, title: 'Final Dungeon Grandmaster Boss', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      ],
    },
  ];

  return (
    <div className="relative min-h-[calc(100vh-64px)] w-full bg-gradient-to-b from-[#F3C8DD] via-[#C7D3F5] to-[#FCE4C8] flex flex-col justify-between overflow-x-hidden">
      {/* Upper Control Bar */}
      <div className="relative z-30 max-w-5xl mx-auto w-full px-4 sm:px-6 pt-8 pb-4 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border-2 border-[#1B2A4A] text-[9px] font-pixel text-[#2E7D32] mb-2">
            <Compass size={12} className="text-emerald-700" />
            <span>WORLD EXPEDITION SYSTEM</span>
          </div>
          <h1 className="font-pixel text-lg sm:text-2xl text-[#1A2744] tracking-wide">
            WORLD MAP
          </h1>
          <p className="font-body text-xs sm:text-sm text-slate-700 mt-1 max-w-xl">
            Sequential algorithmic curriculum across all 6 biomes. Conquer every 8-stage sector to ascend to the Skyward Sanctuary.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <PixelButton variant="outline" size="sm">
              MY DASHBOARD
            </PixelButton>
          </Link>
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1B2A4A] text-[#FFD54F] font-pixel text-[10px] border border-[#FFD54F]">
            <Sparkles size={12} /> 6 BIOMES ACTIVE
          </div>
        </div>
      </div>

      {/* Main List / Grid Progression across all 6 Biome Levels */}
      <div className="relative z-20 max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 space-y-8 flex-1">
        {activeLevels.map((lvl: any) => (
          <PixelCard key={lvl.id} variant="white" className="space-y-4">
            {/* Biome Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1B2A4A]/15 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#EAF4FC] border-2 border-[#1B2A4A] flex items-center justify-center text-2xl shadow-sm shrink-0">
                  {lvl.icon}
                </div>
                <div>
                  <span className="font-pixel text-[9px] text-[#2E7D32] uppercase tracking-wider">
                    SECTOR LEVEL {lvl.orderIndex} OF 6
                  </span>
                  <h2 className="font-pixel text-xs sm:text-sm text-[#1A2744] mt-0.5">
                    {lvl.title}
                  </h2>
                  {lvl.description && (
                    <p className="font-body text-xs text-slate-600 mt-0.5 max-w-2xl line-clamp-1">
                      {lvl.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="self-end sm:self-center font-pixel text-[9px] text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-300">
                {(lvl.sublevels || []).length} SUBLEVELS
              </div>
            </div>

            {/* Sublevels Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
              {(lvl.sublevels || []).map((sub: any) => {
                const isUnlocked = sub.status === 'UNLOCKED';
                const isCompleted = sub.status === 'COMPLETED';

                return (
                  <div
                    key={sub.id}
                    className={`p-4 rounded-xl border-2 transition-all flex flex-col justify-between ${
                      isCompleted
                        ? 'bg-emerald-50/90 border-emerald-400 shadow-sm'
                        : isUnlocked
                        ? 'bg-white border-[#FFD54F] shadow-[3px_3px_0_#1B2A4A] hover:-translate-y-0.5 ring-2 ring-[#FFD54F]/40'
                        : 'bg-slate-100/80 border-slate-300 opacity-60'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <span
                          className={`font-pixel text-[8px] uppercase ${
                            isCompleted
                              ? 'text-emerald-700 font-bold'
                              : isUnlocked
                              ? 'text-amber-700 font-bold'
                              : 'text-slate-400'
                          }`}
                        >
                          {isCompleted ? '✓ CONQUERED' : isUnlocked ? '★ CURRENT EXPEDITION' : '🔒 SEALED'}
                        </span>
                        {isUnlocked && (
                          <span className="w-2 h-2 rounded-full bg-[#FFD54F] animate-ping" />
                        )}
                      </div>

                      <h3 className="font-pixel text-[10px] sm:text-[11px] text-[#1A2744] leading-snug mb-3">
                        {sub.title}
                      </h3>
                    </div>

                    <div className="pt-2">
                      {isUnlocked ? (
                        <Link href={`/sublevel/${sub.id}`}>
                          <PixelButton variant="mint" size="sm" fullWidth>
                            ENTER QUEST <Play size={10} className="ml-1 fill-current" />
                          </PixelButton>
                        </Link>
                      ) : isCompleted ? (
                        <Link href={`/sublevel/${sub.id}`}>
                          <PixelButton variant="outline" size="sm" fullWidth>
                            REVIEW EXPEDITION
                          </PixelButton>
                        </Link>
                      ) : (
                        <div className="w-full py-2 text-center text-[9px] font-pixel text-slate-400 bg-slate-200/60 rounded-lg flex items-center justify-center gap-1.5 border border-slate-300/60">
                          <Lock size={12} /> SEALED
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </PixelCard>
        ))}
      </div>

      {/* Cloud Bank Decorative Bottom Footer */}
      <div className="relative w-full h-16 pointer-events-none select-none mt-8">
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
