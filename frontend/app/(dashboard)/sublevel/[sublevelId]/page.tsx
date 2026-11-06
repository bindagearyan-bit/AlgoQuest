'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { roadmapApi } from '@/lib/api/roadmap';
import { PixelCard } from '@/components/ui/PixelCard';
import { PixelButton } from '@/components/ui/PixelButton';
import { Check, Lock, Play, ArrowLeft, Zap, Sparkles } from 'lucide-react';

export default function SublevelOverviewPage() {
  const params = useParams();
  const router = useRouter();
  const sublevelId = parseInt(params.sublevelId as string, 10);

  const { data, isLoading } = useQuery({
    queryKey: ['sublevel', sublevelId],
    queryFn: () => roadmapApi.getSublevel(sublevelId),
    enabled: !isNaN(sublevelId),
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center font-pixel text-xs text-[#1A2744]">
        LOADING STAGE GAUNTLET...
      </div>
    );
  }

  const sublevel = data?.sublevel || { title: 'Asymptotic Analysis & Big-O' };
  const stages = data?.stages || [];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Top Navigation Back */}
      <div className="flex items-center justify-between">
        <Link
          href="/roadmap"
          className="inline-flex items-center gap-2 font-pixel text-[10px] text-slate-600 hover:text-[#1A2744]"
        >
          <ArrowLeft size={14} /> BACK TO ROADMAP
        </Link>

        <PixelButton
          variant="yellow"
          size="sm"
          onClick={() => router.push(`/sublevel/${sublevelId}/stage/7`)}
        >
          <Sparkles size={12} className="mr-1" /> TEST OUT (FAST TRACK)
        </PixelButton>
      </div>

      {/* Sublevel Header Card */}
      <PixelCard variant="blue">
        <span className="font-pixel text-[10px] text-[#8B7FD9] uppercase block mb-1">
          SUBLEVEL EXPEDITION
        </span>
        <h1 className="font-pixel text-base sm:text-xl text-[#1A2744] mb-2">
          {sublevel.title}
        </h1>
        <p className="font-body text-xs sm:text-sm text-[#1A2744]/70">
          Sequential progression is mandatory. Complete all 8 stages from conceptual foundations to the final dungeon boss fight.
        </p>
      </PixelCard>

      {/* 8-Stage Vertical Path */}
      <div className="relative space-y-4 pt-4">
        {/* Vertical connector line */}
        <div className="absolute left-6 top-8 bottom-8 w-1 bg-[#1A2744]/15 -z-0 rounded" />

        {stages.map((stage: any) => {
          const isCompleted = stage.status === 'COMPLETED';
          const isUnlocked = stage.status === 'UNLOCKED';
          const isLocked = stage.status === 'LOCKED';

          const stageCard = (
            <div
              className={`relative z-10 flex items-center justify-between p-4 sm:p-5 rounded-2xl border-2 transition-all ${
                isCompleted
                  ? 'bg-emerald-50/80 border-emerald-400'
                  : isUnlocked
                  ? 'bg-white border-[#7FFFD4] shadow-[0_4px_0_0_#7FFFD4] hover:-translate-y-0.5 cursor-pointer'
                  : 'bg-slate-100 border-slate-300 opacity-60 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Stage Number Circle */}
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-pixel text-xs border-2 shrink-0 ${
                    isCompleted
                      ? 'bg-emerald-500 text-white border-emerald-600'
                      : isUnlocked
                      ? 'bg-[#7FFFD4] text-[#1A2744] border-[#1A2744]'
                      : 'bg-slate-200 text-slate-400 border-slate-300'
                  }`}
                >
                  {isCompleted ? <Check size={16} strokeWidth={3} /> : stage.stageNumber}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-pixel text-[9px] text-[#8B7FD9] uppercase">
                      {stage.stageType.replace('_', ' ')}
                    </span>
                    <span className="font-pixel text-[8px] text-slate-400">
                      {isCompleted ? '• DONE' : isUnlocked ? '• READY' : '• LOCKED'}
                    </span>
                  </div>
                  <h3 className="font-pixel text-xs text-[#1A2744] line-clamp-1">
                    {stage.title}
                  </h3>
                </div>
              </div>

              <div>
                {isUnlocked && (
                  <PixelButton variant="mint" size="sm">
                    START <Play size={12} className="ml-1 fill-current" />
                  </PixelButton>
                )}
                {isCompleted && (
                  <PixelButton variant="outline" size="sm">
                    REVIEW
                  </PixelButton>
                )}
                {isLocked && <Lock size={16} className="text-slate-400 mr-2" />}
              </div>
            </div>
          );

          if (isLocked) {
            return <div key={stage.stageNumber}>{stageCard}</div>;
          }

          return (
            <Link
              key={stage.stageNumber}
              href={`/sublevel/${sublevelId}/stage/${stage.stageNumber}`}
            >
              {stageCard}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

