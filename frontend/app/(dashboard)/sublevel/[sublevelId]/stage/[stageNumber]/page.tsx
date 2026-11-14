'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useQueryClient } from '@tanstack/react-query';
import { useStage } from '@/lib/hooks/useStage';
import { useUserStore } from '@/lib/store/userStore';
import { BiomeBackground } from '@/components/layout/BiomeBackground';
import { TheoryStage } from '@/components/stages/TheoryStage';
import { VisualizationStage } from '@/components/stages/VisualizationStage';
import { DryRunStage } from '@/components/stages/DryRunStage';
import { GuidedCodeStage } from '@/components/stages/GuidedCodeStage';
import { ProblemStage } from '@/components/stages/ProblemStage';
import { QuizStage } from '@/components/stages/QuizStage';
import { LevelUpModal } from '@/components/gamification/LevelUpModal';
import { BadgeCelebrationModal } from '@/components/gamification/BadgeCelebrationModal';
import { TierPromotionModal, TierPromotedData } from '@/components/gamification/TierPromotionModal';
import { getPixelBadgeBySublevelId } from '@/lib/data/pixelBadgeCatalog';
import { ArrowLeft } from 'lucide-react';

export default function DynamicStagePage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, setUser } = useUserStore();

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
  const [badgeAward, setBadgeAward] = useState<any>(null);
  const [xpAwarded, setXpAwarded] = useState(10);
  const [tierPromotion, setTierPromotion] = useState<TierPromotedData | null>(null);
  const [showTierModal, setShowTierModal] = useState(false);

  const sublevelType = stage?.sublevel?.sublevelType || 'CODE_BASED';
  const maxStage = sublevelType === 'THEORETICAL' ? 3 : sublevelType === 'HYBRID' ? 5 : 8;

  const handleStageComplete = async () => {
    try {
      const res = await completeStage();
      const earnedXp = res?.xpGained || 10;
      setXpAwarded(earnedXp);

      if (user) {
        setUser({
          ...user,
          xp: res?.totalXp !== undefined ? res.totalXp : (user.xp || 0) + earnedXp,
          selectedLevel: res?.tierPromoted ? res.tierPromoted.toTier : user.selectedLevel,
          gems: (user.gems || 0) + (res?.tierPromoted?.bonusGems || 0),
        });
      }

      if (res?.tierPromoted) {
        setTierPromotion(res.tierPromoted);
        queryClient.invalidateQueries({ queryKey: ['levels'] });
        queryClient.invalidateQueries({ queryKey: ['userProgress'] });
        queryClient.invalidateQueries({ queryKey: ['me'] });
      }

      if (res?.badgeAwarded || res?.isSublevelCompleted || stageNumber >= maxStage) {
        const catalogBadge = getPixelBadgeBySublevelId(sublevelId);
        setBadgeAward(res?.badgeAwarded || catalogBadge || {
          title: 'Sector Pioneer',
          description: `Successfully conquered ${stage?.sublevel?.title || 'this sector'} across all adaptive stages.`,
          xpReward: res?.bonusXp || 500,
          tier: stage?.sublevel?.tier || 'BEGINNER',
        });
      }
      setShowCelebration(true);
    } catch {
      setXpAwarded(10);
      setShowCelebration(true);
    }
  };

  const handleCelebrationContinue = () => {
    setShowCelebration(false);
    if (tierPromotion) {
      setShowTierModal(true);
      return;
    }

    if (stageNumber < maxStage) {
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
          STAGE {stageNumber} OF {maxStage}
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

        {(stageData.stageType === 'QUIZ' || stageData.stageType === 'MINI_BOSS') && (
          <QuizStage
            title={stageData.title}
            content={stageData.contentJson}
            onComplete={handleStageComplete}
            isCompleting={isCompleting}
          />
        )}
      </div>

      {/* Victory Celebration Modal */}
      {badgeAward ? (
        <BadgeCelebrationModal
          isOpen={showCelebration}
          badge={badgeAward}
          sublevelTitle={stage?.sublevel?.title || 'This Sector'}
          onContinue={handleCelebrationContinue}
        />
      ) : (
        <LevelUpModal
          isOpen={showCelebration}
          onClose={handleCelebrationContinue}
          xpGained={xpAwarded}
          newLevelTitle={`Stage ${stageNumber} Conquered!`}
        />
      )}

      {/* Tier Promotion Celebration Modal */}
      <TierPromotionModal
        isOpen={showTierModal}
        data={tierPromotion}
        onClose={() => {
          setShowTierModal(false);
          router.push('/roadmap');
        }}
      />
    </BiomeBackground>
  );
}
