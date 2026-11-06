'use client';

import React from 'react';
import { PixelModal } from '../ui/PixelModal';
import { PixelButton } from '../ui/PixelButton';
import { ConfettiEffect } from './ConfettiEffect';
import { Award, Zap } from 'lucide-react';

interface LevelUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  xpGained: number;
  newLevelTitle?: string;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({
  isOpen,
  onClose,
  xpGained,
  newLevelTitle = 'Mastery Milestone Reached!',
}) => {
  return (
    <>
      {isOpen && <ConfettiEffect />}
      <PixelModal isOpen={isOpen} onClose={onClose} title="VICTORY ACHIEVED!">
        <div className="flex flex-col items-center text-center space-y-4 py-2">
          <div className="w-16 h-16 rounded-full bg-[#FFD93D] border-4 border-[#1A2744] flex items-center justify-center shadow-[0_4px_0_0_#1A2744]">
            <Award className="w-8 h-8 text-[#1A2744]" />
          </div>

          <h2 className="font-pixel text-base text-[#1A2744] uppercase">
            QUEST COMPLETED!
          </h2>

          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full font-pixel text-sm text-emerald-700">
            <Zap className="w-4 h-4 text-emerald-600 fill-emerald-600" />
            <span>+{xpGained} XP EARNED</span>
          </div>

          <p className="font-body text-sm text-[#1A2744]/70 max-w-sm">
            {newLevelTitle} Your pixel hero grows stronger in the algorithmic dungeons.
          </p>

          <PixelButton variant="mint" size="lg" fullWidth onClick={onClose}>
            CONTINUE EXPEDITION
          </PixelButton>
        </div>
      </PixelModal>
    </>
  );
};

