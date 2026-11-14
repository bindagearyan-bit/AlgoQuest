'use client';

import React from 'react';
import { PixelModal } from '@/components/ui/PixelModal';
import { PixelButton } from '@/components/ui/PixelButton';
import { Trophy, Flame, Zap, Clock, Heart, Award, Share2 } from 'lucide-react';

interface VictoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: any;
  onOpenShareCard: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  isOpen,
  onClose,
  result,
  onOpenShareCard,
}) => {
  if (!result) return null;

  const {
    timeElapsed = 0,
    livesRemaining = 5,
    isFlawless = false,
    xpBreakdown = {},
    streak = {},
    dailyBadge,
  } = result;

  const minutes = Math.floor(timeElapsed / 60);
  const seconds = timeElapsed % 60;
  const timeFormatted = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <PixelModal isOpen={isOpen} onClose={onClose} title="DUNGEON CLEARED!">
      <div className="space-y-6 text-center select-none">
        {/* Giant Pixel Headline Banner */}
        <div className="relative py-4 px-6 rounded-2xl bg-gradient-to-r from-[#1A1744] via-[#2E1F3D] to-[#1A1744] border-3 border-[#7FFFD4] shadow-[0_0_25px_rgba(127,255,212,0.4)]">
          <span className="font-pixel text-2xl sm:text-3xl text-[#7FFFD4] block drop-shadow-[2px_2px_0_#000]">
            ESCAPED!
          </span>
          <p className="font-pixel text-[10px] text-[#FFD93D] mt-1 uppercase">
            {isFlawless ? '⭐ FLAWLESS ESCAPE — ZERO HEARTS LOST! ⭐' : 'YOU CONQUERED ALL 10 DUNGEON ROOMS!'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-black/40 border border-[#00F0FF]/30">
            <Clock size={16} className="text-[#00F0FF] mx-auto mb-1" />
            <span className="font-pixel text-[8px] text-slate-400 block uppercase">TIME</span>
            <span className="font-pixel text-xs sm:text-sm text-white font-bold">{timeFormatted}</span>
          </div>

          <div className="p-3 rounded-xl bg-black/40 border border-[#FF2FD4]/30">
            <Heart size={16} className="text-[#FF2FD4] fill-[#FF2FD4] mx-auto mb-1" />
            <span className="font-pixel text-[8px] text-slate-400 block uppercase">LIVES</span>
            <span className="font-pixel text-xs sm:text-sm text-white font-bold">{livesRemaining} / 5</span>
          </div>

          <div className="p-3 rounded-xl bg-black/40 border border-[#FFD700]/30">
            <Flame size={16} className="text-amber-500 fill-amber-500 mx-auto mb-1 animate-pulse" />
            <span className="font-pixel text-[8px] text-slate-400 block uppercase">STREAK</span>
            <span className="font-pixel text-xs sm:text-sm text-amber-300 font-bold">{streak.current || 1} DAYS</span>
          </div>
        </div>

        {/* XP Breakdown Box */}
        <div className="p-4 rounded-xl bg-[#09081f] border border-[#00F0FF]/30 font-pixel text-[10px] space-y-2 text-left">
          <div className="flex justify-between text-slate-300">
            <span>Base Victory XP:</span>
            <span className="text-[#7FFFD4]">+{xpBreakdown.baseXP || 50} XP</span>
          </div>
          {xpBreakdown.timeBonus > 0 && (
            <div className="flex justify-between text-slate-300">
              <span>Time Bonus (Speed):</span>
              <span className="text-[#7FFFD4]">+{xpBreakdown.timeBonus} XP</span>
            </div>
          )}
          {xpBreakdown.flawlessBonus > 0 && (
            <div className="flex justify-between text-[#FFD700]">
              <span>Flawless 5/5 Hearts Bonus:</span>
              <span>+{xpBreakdown.flawlessBonus} XP</span>
            </div>
          )}
          {xpBreakdown.speedrunnerBonus > 0 && (
            <div className="flex justify-between text-[#FF2FD4]">
              <span>Sub-90s Speedrunner Bonus:</span>
              <span>+{xpBreakdown.speedrunnerBonus} XP</span>
            </div>
          )}
          <div className="border-t border-slate-700 pt-2 flex justify-between text-xs font-bold text-white">
            <span>TOTAL XP EARNED:</span>
            <span className="text-[#00F0FF]">+{xpBreakdown.totalXpEarned || 50} XP</span>
          </div>
        </div>

        {/* Date-Stamped Daily Badge Award */}
        {dailyBadge && (
          <div className="p-3 rounded-xl bg-gradient-to-r from-[#1A1744] via-[#2E1F3D] to-[#1A1744] border-2 border-[#FFD700] flex items-center gap-3 text-left">
            <div
              className="w-12 h-12 flex-shrink-0"
              dangerouslySetInnerHTML={{ __html: dailyBadge.iconSvg }}
            />
            <div>
              <span className="font-pixel text-[8px] text-[#FFD700] uppercase block">
                EXCLUSIVE DAILY BADGE UNLOCKED!
              </span>
              <span className="font-pixel text-xs text-white block mt-0.5">{dailyBadge.title}</span>
              <span className="font-body text-[10px] text-slate-300 line-clamp-1">
                {dailyBadge.description}
              </span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <PixelButton
            variant="gold"
            size="md"
            className="flex-1 text-xs"
            onClick={onOpenShareCard}
          >
            <Share2 size={14} className="mr-2" /> SHARE RUN
          </PixelButton>

          <PixelButton
            variant="mint"
            size="md"
            className="flex-1 text-xs"
            onClick={onClose}
          >
            RETURN TO ARCADE
          </PixelButton>
        </div>
      </div>
    </PixelModal>
  );
};
