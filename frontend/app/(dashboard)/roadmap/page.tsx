'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { roadmapApi } from '@/lib/api/roadmap';
import { PixelCard } from '@/components/ui/PixelCard';
import { PixelBadge } from '@/components/ui/PixelBadge';
import { Check, Lock, ChevronDown, ChevronRight, Swords, Compass } from 'lucide-react';

export default function RoadmapPage() {
  const { data: levels, isLoading } = useQuery({
    queryKey: ['levels'],
    queryFn: () => roadmapApi.getLevels(),
  });

  const [expandedLevels, setExpandedLevels] = useState<Record<number, boolean>>({
    1: true,
    2: true,
  });

  const toggleLevel = (levelId: number) => {
    setExpandedLevels((prev) => ({ ...prev, [levelId]: !prev[levelId] }));
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 text-center font-pixel text-xs text-[#1A2744]">
        CALIBRATING DUNGEON SKILL TREE...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Page Title */}
      <div className="text-center space-y-2">
        <span className="font-pixel text-[10px] text-[#8B7FD9] uppercase">
          SKILL TREE EXPEDITION MAP
        </span>
        <h1 className="font-pixel text-lg sm:text-2xl text-[#1A2744]">
          ALGORITHMIC ROADMAP
        </h1>
        <p className="font-body text-xs sm:text-sm text-[#1A2744]/70 max-w-lg mx-auto">
          Progress through 6 grand algorithmic territories. Complete all 8 stages of each sublevel to unlock the next challenge.
        </p>
      </div>

      {/* Levels Accordion */}
      <div className="space-y-6">
        {(levels || []).map((lvl: any) => {
          const isExpanded = expandedLevels[lvl.id] ?? false;

          return (
            <div
              key={lvl.id}
              className="rounded-2xl border-2 border-[#1A2744]/20 bg-white overflow-hidden shadow-sm"
            >
              {/* Level Accordion Header */}
              <button
                onClick={() => toggleLevel(lvl.id)}
                className="w-full px-6 py-4 bg-[#EAF4FC] flex items-center justify-between border-b border-[#1A2744]/10 hover:bg-[#dfeefc] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{lvl.icon}</span>
                  <div className="text-left">
                    <span className="font-pixel text-[9px] text-[#8B7FD9] uppercase block">
                      LEVEL {lvl.orderIndex}
                    </span>
                    <h2 className="font-pixel text-xs sm:text-sm text-[#1A2744]">
                      {lvl.title}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-pixel text-[9px] text-slate-500">
                    {lvl.sublevels?.length || 0} SUBLEVELS
                  </span>
                  {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </div>
              </button>

              {/* Sublevels Grid */}
              {isExpanded && (
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-[#F8FAFC]">
                  {(lvl.sublevels || []).map((sub: any) => {
                    const isCompleted = sub.status === 'COMPLETED';
                    const isUnlocked = sub.status === 'UNLOCKED';
                    const isLocked = sub.status === 'LOCKED';

                    const cardContent = (
                      <div
                        className={`p-4 rounded-xl border-2 transition-all flex flex-col justify-between h-36 ${
                          isCompleted
                            ? 'bg-emerald-50/70 border-emerald-400 shadow-[0_4px_0_0_#6FCF97]'
                            : isUnlocked
                            ? 'bg-white border-[#00F0FF] shadow-[0_4px_0_0_#00F0FF] hover:-translate-y-1 cursor-pointer'
                            : 'bg-slate-100 border-slate-300 opacity-60 cursor-not-allowed'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <span className="font-pixel text-[8px] text-slate-500">
                            {lvl.orderIndex}.{sub.orderIndex}
                          </span>
                          {isCompleted && (
                            <span className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                              <Check size={12} strokeWidth={3} />
                            </span>
                          )}
                          {isUnlocked && (
                            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping" />
                          )}
                          {isLocked && <Lock size={14} className="text-slate-400" />}
                        </div>

                        <div>
                          <h3 className="font-pixel text-[11px] text-[#1A2744] line-clamp-2 mb-1">
                            {sub.title}
                          </h3>
                          <span className="font-pixel text-[8px] text-[#8B7FD9]">
                            {isCompleted ? 'COMPLETED' : isUnlocked ? `STAGE ${sub.currentStage || 1} / 8` : 'LOCKED'}
                          </span>
                        </div>
                      </div>
                    );

                    if (isLocked) {
                      return <div key={sub.id}>{cardContent}</div>;
                    }

                    return (
                      <Link key={sub.id} href={`/sublevel/${sub.id}`}>
                        {cardContent}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

