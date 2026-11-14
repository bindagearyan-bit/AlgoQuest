'use client';

import React from 'react';
import { PixelModal } from '@/components/ui/PixelModal';
import { PixelButton } from '@/components/ui/PixelButton';
import { Flame, Trophy, Award, Gift } from 'lucide-react';

interface MilestoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  milestone: {
    days: number;
    title: string;
    description: string;
    badgeTitle?: string;
    bonusXp?: number;
    bonusGems?: number;
  } | null;
}

export const MilestoneModal: React.FC<MilestoneModalProps> = ({
  isOpen,
  onClose,
  milestone,
}) => {
  if (!milestone) return null;

  return (
    <PixelModal isOpen={isOpen} onClose={onClose} title="STREAK MILESTONE ACHIEVED!">
      <div className="space-y-6 text-center select-none">
        <div className="py-4 px-6 rounded-2xl bg-gradient-to-r from-[#FF8F00] via-[#FFD700] to-[#FF8F00] text-[#1B2A4A] border-3 border-white shadow-[0_0_25px_rgba(255,215,0,0.5)]">
          <Flame size={32} className="mx-auto text-red-600 animate-bounce mb-1 fill-current" />
          <span className="font-pixel text-xl sm:text-2xl font-bold block drop-shadow">
            {milestone.title}
          </span>
          <p className="font-pixel text-[10px] uppercase tracking-wider mt-1">
            {milestone.days} CONSECUTIVE DAYS OF DUNGEON SURVIVAL!
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#09081f] border border-[#FFD700]/40 text-left space-y-2">
          <div className="flex items-center gap-2 text-[#FFD700] font-pixel text-xs">
            <Gift size={16} />
            <span>MILESTONE REWARDS CLAIMED:</span>
          </div>
          <p className="font-body text-sm text-slate-200">
            {milestone.description}
          </p>
        </div>

        <PixelButton
          variant="gold"
          size="md"
          className="w-full text-xs"
          onClick={onClose}
        >
          CLAIM & CONTINUE
        </PixelButton>
      </div>
    </PixelModal>
  );
};
