'use client';

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SkylineBackground } from '@/components/layout/SkylineBackground';
import { PixelCard } from '@/components/ui/PixelCard';
import { PixelButton } from '@/components/ui/PixelButton';
import { ConfettiEffect } from '@/components/gamification/ConfettiEffect';
import { Trophy, ArrowRight } from 'lucide-react';

function PlacementResultContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const score = searchParams.get('score') || '8';
  const total = searchParams.get('total') || '10';
  const level = searchParams.get('level') || 'INTERMEDIATE';

  const levelTitles: Record<string, string> = {
    BEGINNER: 'Level 1: Foundations & Core Mechanics',
    INTERMEDIATE: 'Level 2: Linear Data Structures',
    ADVANCED: 'Level 4: Graph Traversal & Network Flow',
  };

  const placedTitle = levelTitles[level] || 'Level 1: Foundations & Core Mechanics';

  return (
    <div className="min-h-screen max-w-xl mx-auto px-4 py-16 flex flex-col justify-center items-center text-center">
      <PixelCard variant="white" className="w-full">
        {/* Trophy Icon */}
        <div className="w-20 h-20 rounded-2xl bg-[#FFD93D] border-4 border-[#1A2744] mx-auto flex items-center justify-center text-[#1A2744] shadow-[0_4px_0_0_#1A2744] mb-6">
          <Trophy size={40} />
        </div>

        <span className="font-pixel text-[10px] text-[#8B7FD9] uppercase block mb-2">
          CALIBRATION COMPLETE
        </span>

        <h1 className="font-pixel text-lg sm:text-xl text-[#1A2744] mb-4">
          YOU SCORED {score} / {total}!
        </h1>

        <div className="p-4 bg-[#EAF4FC] rounded-2xl border-2 border-[#8B7FD9]/30 mb-6">
          <span className="font-pixel text-[10px] text-slate-500 uppercase block mb-1">
            ASSIGNED STARTING DUNGEON:
          </span>
          <p className="font-pixel text-xs sm:text-sm text-[#1A2744]">
            {placedTitle}
          </p>
        </div>

        <p className="font-body text-sm text-[#1A2744]/70 mb-8 leading-relaxed">
          Your foundational knowledge has unlocked advanced quests. All prerequisite stages have been marked completed.
        </p>

        <PixelButton
          variant="mint"
          size="lg"
          fullWidth
          onClick={() => router.push('/dashboard')}
        >
          ENTER DASHBOARD <ArrowRight size={16} className="ml-2" />
        </PixelButton>
      </PixelCard>
    </div>
  );
}

export default function PlacementResultPage() {
  return (
    <SkylineBackground>
      <ConfettiEffect />
      <Suspense fallback={<div className="p-12 text-center font-pixel text-xs text-[#1A2744]">CALCULATING PLACEMENT...</div>}>
        <PlacementResultContent />
      </Suspense>
    </SkylineBackground>
  );
}
