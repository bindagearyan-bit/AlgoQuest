'use client';

import React from 'react';
import Image from 'next/image';
import { PixelModal } from '../ui/PixelModal';
import { PixelButton } from '../ui/PixelButton';
import { ConfettiEffect } from './ConfettiEffect';
import { Zap } from 'lucide-react';

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
          {/* Glowing 16-Bit Pixel Treasure Chest */}
          <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-4 border-[#FFD93D] shadow-[0_6px_0_#1A2744,0_0_20px_rgba(255,217,61,0.5)]">
            <Image
              src="/images/victory-chest.png"
              alt="Victory Treasure Chest"
              fill
              className="object-cover"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>

          <h2 className="font-pixel text-base text-[#1A2744] uppercase">
            QUEST COMPLETED!
          </h2>

          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border-2 border-emerald-400 rounded-full font-pixel text-xs text-emerald-800 shadow-sm">
            <Zap className="w-4 h-4 text-emerald-600 fill-emerald-600" />
            <span>+{xpGained} XP EARNED</span>
          </div>

          <p className="font-body text-xs text-[#1A2744]/80 max-w-sm leading-relaxed">
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

