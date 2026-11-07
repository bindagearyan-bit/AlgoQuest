'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { roadmapApi } from '@/lib/api/roadmap';
import { PixelCard } from '@/components/ui/PixelCard';
import { PixelButton } from '@/components/ui/PixelButton';
import { Lock, Play, Compass, CheckCircle2, ChevronRight, Swords, Sparkles, Filter, Layers } from 'lucide-react';

export default function RoadmapPage() {
  const { data: levels, isLoading } = useQuery({
    queryKey: ['levels'],
    queryFn: () => roadmapApi.getLevels(),
  });

  const [selectedTier, setSelectedTier] = useState<'ALL' | 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'>('ALL');

  // University Syllabus 6-Level / 54-Sublevel fallback
  const activeLevels = levels || [
    {
      id: 1,
      title: 'Level 1: Foundations Island (Beginner Village) — Basics of Data Structures',
      orderIndex: 1,
      icon: '🏡',
      description: 'Unit 1: Data structure fundamentals, ADTs, linear vs non-linear classifications, Big-O asymptotic analysis.',
      sublevels: [
        { id: 1, title: 'Concept & Need of Data Structures', tier: 'BEGINNER', status: 'UNLOCKED', currentStage: 1, stagesCount: 8 },
        { id: 2, title: 'Abstract Data Types (ADTs)', tier: 'BEGINNER', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 3, title: 'Types of Data Structures', tier: 'BEGINNER', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 4, title: 'Operations on Data Structures', tier: 'BEGINNER', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 5, title: 'Time Complexity & Big-O Notation', tier: 'INTERMEDIATE', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 6, title: 'Space Complexity Analysis', tier: 'INTERMEDIATE', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 7, title: 'BOSS: Foundations Guardian', tier: 'ADVANCED', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      ],
    },
    {
      id: 2,
      title: 'Level 2: Searching & Sorting Citadel (Central Castle) — Searching & Sorting',
      orderIndex: 2,
      icon: '🏰',
      description: 'Unit 2: Linear & Binary search, hashing collision resolution, O(N^2) comparison sorts, Merge Sort, Quick Sort, and Radix/Tim Sort.',
      sublevels: [
        { id: 11, title: 'Linear Search', tier: 'BEGINNER', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 12, title: 'Binary Search (Iterative & Recursive)', tier: 'BEGINNER', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 13, title: 'Sentinel Search & Fibonacci Search', tier: 'INTERMEDIATE', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 14, title: 'Hashing & Collision Resolution', tier: 'INTERMEDIATE', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 15, title: 'Bubble, Selection & Insertion Sort', tier: 'BEGINNER', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 16, title: 'Merge Sort', tier: 'INTERMEDIATE', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 17, title: 'Quick Sort', tier: 'INTERMEDIATE', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 18, title: 'Radix Sort, Tim Sort & Shell Sort', tier: 'ADVANCED', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 19, title: 'BOSS: Sort Master Trial', tier: 'ADVANCED', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      ],
    },
    {
      id: 3,
      title: 'Level 3: Stacks & Queues Sanctuary (Sky Windmills) — Stacks & Queues',
      orderIndex: 3,
      icon: '🍃',
      description: 'Unit 3: LIFO stacks, overflow/underflow, bracket balancing, infix to postfix shunting yard, FIFO queues, circular buffers, and priority queues.',
      sublevels: [
        { id: 21, title: 'Stack Definition & Array Representation', tier: 'BEGINNER', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 22, title: 'Stack ADT & Overflow/Underflow Conditions', tier: 'BEGINNER', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 23, title: 'Stack Applications: Reversing a List & Parentheses Matching', tier: 'INTERMEDIATE', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 24, title: 'Polish Notation: Infix to Postfix & Evaluation', tier: 'ADVANCED', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 25, title: 'Queue Definition & Array Representation', tier: 'BEGINNER', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 26, title: 'Queue ADT & Operations', tier: 'BEGINNER', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 27, title: 'Linear Queue vs Circular Queue', tier: 'INTERMEDIATE', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 28, title: 'Priority Queue & Deque (Double-Ended Queue)', tier: 'ADVANCED', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 29, title: 'BOSS: Fortress Keeper', tier: 'ADVANCED', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      ],
    },
    {
      id: 4,
      title: 'Level 4: Linked Structures Labyrinth (Stone Ruins) — Linked Lists',
      orderIndex: 4,
      icon: '⛓️',
      description: 'Unit 4: Dynamic node linking, singly/doubly/circular lists, dynamic storage allocation, XOR linked lists, unrolled lists, and skip lists.',
      sublevels: [
        { id: 31, title: 'Linked List Terminologies & Memory Structure', tier: 'BEGINNER', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 32, title: 'Singly Linked List: Insertion, Deletion & Traversal', tier: 'BEGINNER', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 33, title: 'Doubly Linked List Operations', tier: 'INTERMEDIATE', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 34, title: 'Circular Linked List Operations', tier: 'INTERMEDIATE', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 35, title: 'Linked Representation of Stack & Queue', tier: 'INTERMEDIATE', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 36, title: 'Dynamic Storage Management', tier: 'ADVANCED', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 37, title: 'Memory Efficient Doubly Linked List (XOR Linked List)', tier: 'ADVANCED', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 38, title: 'Unrolled Linked List', tier: 'ADVANCED', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 39, title: 'Skip List', tier: 'ADVANCED', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 40, title: 'BOSS: Chain Breaker', tier: 'ADVANCED', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      ],
    },
    {
      id: 5,
      title: 'Level 5: Arboretum of Trees (Ancient Canopy) — Trees',
      orderIndex: 5,
      icon: '🌲',
      description: 'Unit 5: Non-linear hierarchical trees, inorder/preorder/postorder traversals, BST operations, AVL balance factors, B/B+ trees, heaps, and heap sort.',
      sublevels: [
        { id: 41, title: 'Tree Terminologies & Traversals Concept', tier: 'BEGINNER', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 42, title: 'Types of Trees', tier: 'BEGINNER', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 43, title: 'Recursive Traversals: Inorder, Preorder, Postorder', tier: 'INTERMEDIATE', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 44, title: 'Binary Search Trees (BST): Insertion, Deletion, Search', tier: 'INTERMEDIATE', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 45, title: 'Expression Trees', tier: 'INTERMEDIATE', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 46, title: 'AVL Trees: Rotations & Balancing', tier: 'ADVANCED', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 47, title: 'B-Tree & B+ Tree Concepts', tier: 'ADVANCED', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 48, title: 'Heaps: Max-Heap & Min-Heap Operations', tier: 'ADVANCED', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 49, title: 'Heap Sort Algorithm', tier: 'ADVANCED', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 50, title: 'BOSS: Forest Ancient', tier: 'ADVANCED', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      ],
    },
    {
      id: 6,
      title: 'Level 6: Graph Glacier & Sparse Matrices (Frozen Peaks) — Graphs',
      orderIndex: 6,
      icon: '❄️',
      description: 'Unit 6: Graph theory, adjacency representations, BFS/DFS traversals, and memory-efficient sparse matrix representations and transpose.',
      sublevels: [
        { id: 51, title: 'Graph Theory Basics & Terminologies', tier: 'BEGINNER', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 52, title: 'Storage Representation: Adjacency Matrix & Adjacency List', tier: 'INTERMEDIATE', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 53, title: 'Basic Graph Manipulation: Add/Remove Vertex & Edge', tier: 'INTERMEDIATE', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 54, title: 'Breadth-First Search (BFS) Traversal', tier: 'ADVANCED', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 55, title: 'Depth-First Search (DFS) Traversal', tier: 'ADVANCED', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 56, title: 'Introduction to Sparse Matrix', tier: 'ADVANCED', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 57, title: 'Sparse Matrix Linked Representation', tier: 'ADVANCED', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 58, title: 'Transpose of Sparse Matrix', tier: 'ADVANCED', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
        { id: 59, title: 'BOSS: Glacier Oracle', tier: 'ADVANCED', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      ],
    },
  ];

  // Helper for tier badge color & label
  const renderTierBadge = (tier: string) => {
    switch (tier) {
      case 'BEGINNER':
        return (
          <span className="font-pixel text-[8px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
            🟢 BEGINNER
          </span>
        );
      case 'INTERMEDIATE':
        return (
          <span className="font-pixel text-[8px] px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">
            🟡 INTERMEDIATE
          </span>
        );
      case 'ADVANCED':
        return (
          <span className="font-pixel text-[8px] px-2 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-300">
            🔴 ADVANCED
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-64px)] w-full bg-gradient-to-b from-[#F3C8DD] via-[#C7D3F5] to-[#FCE4C8] flex flex-col justify-between overflow-x-hidden">
      {/* Upper Control Bar */}
      <div className="relative z-30 max-w-5xl mx-auto w-full px-4 sm:px-6 pt-8 pb-4 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border-2 border-[#1B2A4A] text-[9px] font-pixel text-[#2E7D32] mb-2 shadow-sm">
            <Compass size={12} className="text-emerald-700" />
            <span>SYLLABUS EXPEDITION SYSTEM</span>
          </div>
          <h1 className="font-pixel text-lg sm:text-2xl text-[#1A2744] tracking-wide">
            WORLD MAP
          </h1>
          <p className="font-body text-xs sm:text-sm text-slate-700 mt-1 max-w-xl">
            6 Academic Units • 54 Topic Sublevels • 432 Strict 8-Stage Progression Trials across all difficulty tiers.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Adaptive Tier Filter Pills */}
          <div className="flex items-center gap-1 bg-white/85 p-1 rounded-xl border-2 border-[#1B2A4A] shadow-sm">
            {(['ALL', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED'] as const).map((tier) => (
              <button
                key={tier}
                onClick={() => setSelectedTier(tier)}
                className={`font-pixel text-[8px] sm:text-[9px] px-2.5 py-1.5 rounded-lg transition-all ${
                  selectedTier === tier
                    ? 'bg-[#1B2A4A] text-[#FFD54F] shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {tier === 'ALL' ? 'ALL TIERS' : tier === 'BEGINNER' ? '🟢 BEG' : tier === 'INTERMEDIATE' ? '🟡 INT' : '🔴 ADV'}
              </button>
            ))}
          </div>

          <Link href="/dashboard">
            <PixelButton variant="outline" size="sm">
              MY DASHBOARD
            </PixelButton>
          </Link>
        </div>
      </div>

      {/* Main List Progression across all 6 Biome Levels */}
      <div className="relative z-20 max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 space-y-8 flex-1">
        {activeLevels.map((lvl: any) => {
          const filteredSublevels = (lvl.sublevels || []).filter((sub: any) => {
            if (selectedTier === 'ALL') return true;
            return sub.tier === selectedTier;
          });

          if (filteredSublevels.length === 0) return null;

          return (
            <PixelCard key={lvl.id} variant="white" className="space-y-4">
              {/* Biome Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1B2A4A]/15 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#EAF4FC] border-2 border-[#1B2A4A] flex items-center justify-center text-2xl shadow-sm shrink-0">
                    {lvl.icon}
                  </div>
                  <div>
                    <span className="font-pixel text-[9px] text-[#2E7D32] uppercase tracking-wider">
                      UNIT {lvl.orderIndex} OF 6
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

                <div className="self-end sm:self-center font-pixel text-[9px] text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-300">
                  {filteredSublevels.length} SUBLEVELS
                </div>
              </div>

              {/* Sublevels Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
                {filteredSublevels.map((sub: any) => {
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
                        {/* Header: Status + Tier Badge */}
                        <div className="flex justify-between items-center mb-2 gap-2">
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

                          {renderTierBadge(sub.tier)}
                        </div>

                        <h3 className="font-pixel text-[10px] sm:text-[11px] text-[#1A2744] leading-snug mb-3">
                          {sub.title}
                        </h3>

                        {/* 8-Stage Progress Meter */}
                        <div className="mb-3">
                          <div className="flex justify-between items-center text-[8px] font-pixel text-slate-500 mb-1">
                            <span>PROGRESS</span>
                            <span>{isCompleted ? '8/8' : isUnlocked ? `${sub.currentStage || 1}/8` : '0/8'}</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all duration-300 ${
                                isCompleted
                                  ? 'bg-emerald-500'
                                  : isUnlocked
                                  ? 'bg-[#FFD54F]'
                                  : 'bg-slate-300'
                              }`}
                              style={{
                                width: isCompleted
                                  ? '100%'
                                  : isUnlocked
                                  ? `${((sub.currentStage || 1) / 8) * 100}%`
                                  : '0%',
                              }}
                            />
                          </div>
                        </div>
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
          );
        })}
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
