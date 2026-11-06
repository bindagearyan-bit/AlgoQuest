'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useStage } from '@/lib/hooks/useStage';
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

  const {
    stage,
    isLoading,
    isError,
    completeStage,
    isCompleting,
    completionResult,
  } = useStage(sublevelId, stageNumber);

  const [showCelebration, setShowCelebration] = useState(false);
  const [xpAwarded, setXpAwarded] = useState(10);

  const handleStageComplete = async () => {
    try {
      const res = await completeStage();
      setXpAwarded(res?.xpGained || 10);
      setShowCelebration(true);
    } catch {
      // Offline fallback
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
        INITIALIZING DUNGEON TRIAL...
      </div>
    );
  }

  const stageData = stage || {
    title: `Stage ${stageNumber}: Fundamental Mechanics`,
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

  const isDungeonTheme =
    stageData.stageType === 'VISUALIZATION' ||
    stageData.stageType === 'BOSS';

  return (
    <div
      className={`min-h-[calc(100vh-64px)] py-8 px-4 sm:px-6 transition-colors ${
        isDungeonTheme ? 'bg-[#0D0B2E] text-white' : 'bg-[#F8FAFC]'
      }`}
    >
      {/* Top Breadcrumb */}
      <div className="max-w-5xl mx-auto mb-6 flex items-center justify-between">
        <Link
          href={`/sublevel/${sublevelId}`}
          className={`inline-flex items-center gap-2 font-pixel text-[10px] transition-colors ${
            isDungeonTheme
              ? 'text-[#00F0FF] hover:text-white'
              : 'text-slate-600 hover:text-[#1A2744]'
          }`}
        >
          <ArrowLeft size={14} /> SUBLEVEL OVERVIEW
        </Link>

        <span
          className={`font-pixel text-[10px] ${
            isDungeonTheme ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          STAGE {stageNumber} OF 8
        </span>
      </div>

      {/* Render Component based on stageType */}
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

      {/* Victory Celebration Modal */}
      <LevelUpModal
        isOpen={showCelebration}
        onClose={handleCelebrationContinue}
        xpGained={xpAwarded}
        newLevelTitle={`Stage ${stageNumber} Conquered!`}
      />
    </div>
  );
}

