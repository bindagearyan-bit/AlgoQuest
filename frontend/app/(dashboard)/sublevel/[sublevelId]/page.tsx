'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { roadmapApi } from '@/lib/api/roadmap';
import { BiomeBackground } from '@/components/layout/BiomeBackground';
import { PixelCard } from '@/components/ui/PixelCard';
import { PixelButton } from '@/components/ui/PixelButton';
import { PixelBadge } from '@/components/ui/PixelBadge';
import { getPixelBadgeBySublevelId } from '@/lib/data/pixelBadgeCatalog';
import { Check, Lock, Play, ArrowLeft, Sparkles, MapPin } from 'lucide-react';

export default function SublevelOverviewPage() {
  const params = useParams();
  const router = useRouter();
  const sublevelId = parseInt(params.sublevelId as string, 10);
  const biomeLevel = Math.max(1, Math.min(6, Math.floor((sublevelId - 1) / 10) + 1));

  const { data, isLoading } = useQuery({
    queryKey: ['sublevel', sublevelId],
    queryFn: () => roadmapApi.getSublevel(sublevelId),
    enabled: !isNaN(sublevelId),
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center font-pixel text-xs text-[#1A2744]">
        CALIBRATING STAGE TRAIL...
      </div>
    );
  }

  const sublevel = data?.sublevel || { title: 'Asymptotic Analysis & Big-O' };
  const stages = data?.stages || [];
  const pixelBadge = getPixelBadgeBySublevelId(sublevelId);
  const isAllConquered = stages.length > 0 && stages.every((s: any) => s.status === 'COMPLETED');

  return (
    <BiomeBackground biome={biomeLevel}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between">
          <Link
            href="/roadmap"
            className="inline-flex items-center gap-2 font-pixel text-[10px] text-[#1B2A4A] bg-white/80 px-3 py-1.5 rounded-full border-2 border-[#1B2A4A] shadow-[2px_2px_0_#1B2A4A] hover:bg-white transition-colors"
          >
            <ArrowLeft size={14} /> BACK TO WORLD MAP
          </Link>

          <PixelButton
            variant="gold"
            size="sm"
            onClick={() => router.push(`/sublevel/${sublevelId}/stage/7`)}
          >
            <Sparkles size={12} className="mr-1" /> TEST OUT TRIAL
          </PixelButton>
        </div>

        {/* Sublevel Header Card */}
        <PixelCard variant="parchment">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-[#2E7D32]" />
                  <span className="font-pixel text-[9px] text-[#2E7D32] uppercase">
                    ISLAND SECTOR EXPEDITION
                  </span>
                </div>
                {sublevel.tier && (
                  <span className={`font-pixel text-[8px] px-2 py-0.5 rounded border ${
                    sublevel.tier === 'ADVANCED'
                      ? 'bg-rose-100 text-rose-800 border-rose-300'
                      : sublevel.tier === 'INTERMEDIATE'
                      ? 'bg-amber-100 text-amber-800 border-amber-300'
                      : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  }`}>
                    {sublevel.tier === 'ADVANCED' ? '🔴 ADVANCED' : sublevel.tier === 'INTERMEDIATE' ? '🟡 INTERMEDIATE' : '🟢 BEGINNER'}
                  </span>
                )}
              </div>
              <h1 className="font-pixel text-sm sm:text-lg text-[#1A2744] mb-2">
                {sublevel.title}
              </h1>
              <p className="font-body text-xs sm:text-sm text-slate-700 leading-relaxed">
                Sequential progression is mandatory. Step through all {stages.length} stages from conceptual fundamentals to completion.
              </p>
            </div>

            {pixelBadge && (
              <div className="shrink-0 flex items-center justify-center sm:pl-4 sm:border-l border-slate-300/60">
                <PixelBadge
                  size="md"
                  title={pixelBadge.title}
                  tier={pixelBadge.tier}
                  isEarned={isAllConquered}
                  iconSvg={pixelBadge.iconSvg}
                  xpReward={pixelBadge.xpReward}
                  showDetails={true}
                />
              </div>
            )}
          </div>
        </PixelCard>

        {/* 8-Stage Trail */}
        <div className="relative space-y-4 pt-2">
          {/* Vertical Golden Connecting Dotted Line */}
          <div className="absolute left-6 top-6 bottom-6 w-1 border-l-2 border-dashed border-[#FFB300] -z-0" />

          {stages.map((stage: any) => {
            const isCompleted = stage.status === 'COMPLETED';
            const isUnlocked = stage.status === 'UNLOCKED';
            const isLocked = stage.status === 'LOCKED';

            const stageCard = (
              <div
                className={`relative z-10 flex items-center justify-between p-4 sm:p-5 rounded-2xl border-[3px] transition-all ${
                  isCompleted
                    ? 'bg-emerald-50/90 border-emerald-500 shadow-sm'
                    : isUnlocked
                    ? 'bg-white border-[#FFB300] shadow-[4px_4px_0_#1B2A4A] hover:-translate-y-0.5 cursor-pointer'
                    : 'bg-slate-100/90 border-slate-300 opacity-60 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Glowing Node Coin */}
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-pixel text-xs border-[3px] shrink-0 ${
                      isCompleted
                        ? 'bg-emerald-500 text-white border-emerald-600'
                        : isUnlocked
                        ? 'bg-[#FFD54F] text-[#1A2744] border-[#FFB300] shadow-goldGlow animate-pulse-gold'
                        : 'bg-slate-300 text-slate-500 border-slate-400'
                    }`}
                  >
                    {isCompleted ? <Check size={16} strokeWidth={3} /> : stage.stageNumber}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-pixel text-[9px] text-[#2E7D32] uppercase">
                        {stage.stageType.replace('_', ' ')}
                      </span>
                      <span className="font-pixel text-[8px] text-slate-500">
                        {isCompleted ? '• CONQUERED' : isUnlocked ? '• CURRENT QUEST' : '• SEALED'}
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
                      ENTER <Play size={10} className="ml-1 fill-current" />
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
    </BiomeBackground>
  );
}
