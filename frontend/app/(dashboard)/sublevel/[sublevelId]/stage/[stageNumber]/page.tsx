'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useStage } from '@/lib/hooks/useStage';
import { BiomeBackground } from '@/components/layout/BiomeBackground';
import { TheoryStage } from '@/components/stages/TheoryStage';
import { VisualizationStage } from '@/components/stages/VisualizationStage';
import { DryRunStage } from '@/components/stages/DryRunStage';
import { GuidedCodeStage } from '@/components/stages/GuidedCodeStage';
import { ProblemStage } from '@/components/stages/ProblemStage';
import { QuizStage } from '@/components/stages/QuizStage';
import { LevelUpModal } from '@/components/gamification/LevelUpModal';
import { ArrowLeft } from 'lucide-react';

export default function DynamicStagePage() {
  const params = useParams();
  const router = useRouter();

  const sublevelId = parseInt(params.sublevelId as string, 10);
  const stageNumber = parseInt(params.stageNumber as string, 10);

  // Compute Biome Level (1 to 6) based on sublevelId
  const biomeLevel = Math.max(1, Math.min(6, Math.floor((sublevelId - 1) / 10) + 1));

  const {
    stage,
    isLoading,
    completeStage,
    isCompleting,
  } = useStage(sublevelId, stageNumber);

  const [showCelebration, setShowCelebration] = useState(false);
  const [xpAwarded, setXpAwarded] = useState(10);

  const handleStageComplete = async () => {
    try {
      const res = await completeStage();
      setXpAwarded(res?.xpGained || 10);
      setShowCelebration(true);
    } catch {
      setXpAwarded(10);
      setShowCelebration(true);
    }
  };

  const handleCelebrationContinue = () => {
    setShowCelebration(false);
    if (stageNumber < 8) {
      router.push(`/sublevel/${sublevelId}/stage/${stageNumber + 1}`);
    } else {
      router.push(`/sublevel/${sublevelId}`);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center font-pixel text-xs text-[#1A2744]">
        CALIBRATING BIOME TRIAL...
      </div>
    );
  }

  const stageData = stage || {
    title: `Stage ${stageNumber}: Fundamental Concepts`,
    stageType:
      stageNumber === 1
        ? 'THEORY'
        : stageNumber === 2
        ? 'VISUALIZATION'
        : stageNumber === 3
        ? 'DRY_RUN'
        : stageNumber === 4
        ? 'GUIDED_CODE'
        : stageNumber === 5
        ? 'EASY_PROBLEM'
        : stageNumber === 6
        ? 'MEDIUM_PROBLEM'
        : stageNumber === 7
        ? 'QUIZ'
        : 'BOSS',
    contentJson: {},
  };

  return (
    <BiomeBackground biome={biomeLevel}>
      {/* Top Breadcrumb Navigation */}
      <div className="max-w-5xl mx-auto mb-6 px-4 flex items-center justify-between">
        <Link
          href={`/sublevel/${sublevelId}`}
          className="inline-flex items-center gap-2 font-pixel text-[10px] text-[#1B2A4A] bg-white/80 px-3 py-1.5 rounded-full border-2 border-[#1B2A4A] shadow-[2px_2px_0_#1B2A4A] hover:bg-white transition-colors"
        >
          <ArrowLeft size={14} /> SUBLEVEL OVERVIEW
        </Link>

        <span className="font-pixel text-[10px] bg-white/80 text-[#1B2A4A] px-3 py-1.5 rounded-full border-2 border-[#1B2A4A]">
          STAGE {stageNumber} OF 8
        </span>
      </div>

      {/* Dynamic Stage Engine */}
      <div className="px-4">
        {stageData.stageType === 'THEORY' && (
          <TheoryStage
            title={stageData.title}
            content={stageData.contentJson}
            onComplete={handleStageComplete}
            isCompleting={isCompleting}
          />
        )}

        {stageData.stageType === 'VISUALIZATION' && (
          <VisualizationStage
            title={stageData.title}
            content={stageData.contentJson}
            onComplete={handleStageComplete}
            isCompleting={isCompleting}
          />
        )}

        {stageData.stageType === 'DRY_RUN' && (
          <DryRunStage
            title={stageData.title}
            content={stageData.contentJson}
            onComplete={handleStageComplete}
            isCompleting={isCompleting}
          />
        )}

        {stageData.stageType === 'GUIDED_CODE' && (
          <GuidedCodeStage
            title={stageData.title}
            content={stageData.contentJson}
            onComplete={handleStageComplete}
            isCompleting={isCompleting}
          />
        )}

        {(stageData.stageType === 'EASY_PROBLEM' ||
          stageData.stageType === 'MEDIUM_PROBLEM' ||
          stageData.stageType === 'BOSS') && (
          <ProblemStage
            title={stageData.title}
            stageType={stageData.stageType}
            content={stageData.contentJson}
            onComplete={handleStageComplete}
            isCompleting={isCompleting}
          />
        )}

        {stageData.stageType === 'QUIZ' && (
          <QuizStage
            title={stageData.title}
            content={stageData.contentJson}
            onComplete={handleStageComplete}
            isCompleting={isCompleting}
          />
        )}
      </div>

      {/* Victory Level Up Modal */}
      <LevelUpModal
        isOpen={showCelebration}
        onClose={handleCelebrationContinue}
        xpGained={xpAwarded}
        newLevelTitle={`Stage ${stageNumber} Conquered!`}
      />
    </BiomeBackground>
  );
}
