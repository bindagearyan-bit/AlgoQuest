'use client';

import React from 'react';
import { PixelModal } from '@/components/ui/PixelModal';
import { PixelButton } from '@/components/ui/PixelButton';
import { Sparkles, Gem, Zap } from 'lucide-react';

interface LuckyChestModalProps {
  isOpen: boolean;
  onClose: () => void;
  reward: {
    title: string;
    description: string;
    bonusXp: number;
    bonusGems: number;
  } | null;
}

export const LuckyChestModal: React.FC<LuckyChestModalProps> = ({
  isOpen,
  onClose,
  reward,
}) => {
  if (!reward) return null;

  return (
    <PixelModal isOpen={isOpen} onClose={onClose} title="LUCKY CHEST UNLOCKED!">
      <div className="space-y-6 text-center select-none">
        <div className="py-4 px-6 rounded-2xl bg-[#1A1744] border-3 border-[#FFD700] shadow-[0_0_25px_rgba(255,215,0,0.4)]">
          <span className="text-4xl block mb-2 animate-bounce">🎁</span>
          <span className="font-pixel text-xl sm:text-2xl text-[#FFD700] block drop-shadow-[2px_2px_0_#000]">
            {reward.title}
          </span>
          <p className="font-pixel text-[10px] text-slate-300 mt-1 uppercase">
            {reward.description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-black/40 border border-[#00F0FF]/40 text-center">
            <Zap size={20} className="text-[#00F0FF] mx-auto mb-1" />
            <span className="font-pixel text-[8px] text-slate-400 block uppercase">BONUS XP</span>
            <span className="font-pixel text-base text-[#00F0FF]">+{reward.bonusXp} XP</span>
          </div>

          <div className="p-3 rounded-xl bg-black/40 border border-[#FF2FD4]/40 text-center">
            <Gem size={20} className="text-[#FF2FD4] mx-auto mb-1" />
            <span className="font-pixel text-[8px] text-slate-400 block uppercase">BONUS GEMS</span>
            <span className="font-pixel text-base text-[#FF2FD4]">+{reward.bonusGems} GEMS</span>
          </div>
        </div>

        <PixelButton
          variant="gold"
          size="md"
          className="w-full text-xs"
          onClick={onClose}
        >
          CLAIM CHEST LOOT
        </PixelButton>
      </div>
    </PixelModal>
  );
};
