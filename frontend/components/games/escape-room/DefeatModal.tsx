'use client';

import React from 'react';
import { PixelModal } from '@/components/ui/PixelModal';
import { PixelButton } from '@/components/ui/PixelButton';
import { Skull, ShieldCheck, Clock, Zap } from 'lucide-react';

interface DefeatModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomsCleared: number;
  timeElapsed: number;
  hasCheckpoint: boolean;
  onRespawnCheckpoint: () => void;
  checkpointUsed: boolean;
}

export const DefeatModal: React.FC<DefeatModalProps> = ({
  isOpen,
  onClose,
  roomsCleared,
  timeElapsed,
  hasCheckpoint,
  onRespawnCheckpoint,
  checkpointUsed,
}) => {
  const canUseCheckpoint = hasCheckpoint && roomsCleared >= 5 && !checkpointUsed;

  const minutes = Math.floor(timeElapsed / 60);
  const seconds = timeElapsed % 60;
  const timeFormatted = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <PixelModal isOpen={isOpen} onClose={onClose} title="DUNGEON TRAP SPRUNG">
      <div className="space-y-6 text-center select-none">
        {/* Banner */}
        <div className="py-4 px-6 rounded-2xl bg-[#2E0B1A] border-3 border-[#FF2FD4] shadow-[0_0_25px_rgba(255,47,212,0.4)]">
          <span className="font-pixel text-2xl sm:text-3xl text-[#FF2FD4] block drop-shadow-[2px_2px_0_#000]">
            TRAPPED!
          </span>
          <p className="font-pixel text-[10px] text-rose-300 mt-1 uppercase">
            THE ANCIENT RUNES OVERWHELMED YOUR ADVENTURER
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-black/40 border border-slate-700">
            <span className="font-pixel text-[8px] text-slate-400 block uppercase">ROOMS CLEARED</span>
            <span className="font-pixel text-base text-white">{roomsCleared} / 10</span>
          </div>

          <div className="p-3 rounded-xl bg-black/40 border border-slate-700">
            <span className="font-pixel text-[8px] text-slate-400 block uppercase">SURVIVED FOR</span>
            <span className="font-pixel text-base text-white">{timeFormatted}</span>
          </div>
        </div>

        {/* Participation XP */}
        <div className="p-3 rounded-xl bg-[#09081f] border border-[#00F0FF]/30 font-pixel text-xs text-[#00F0FF] flex items-center justify-center gap-2">
          <Zap size={16} />
          <span>+15 PARTICIPATION XP AWARDED</span>
        </div>

        {/* Checkpoint Option */}
        {canUseCheckpoint ? (
          <div className="p-4 rounded-xl bg-[#07241F] border-2 border-[#7FFFD4] text-left space-y-2">
            <div className="flex items-center gap-2 text-[#7FFFD4] font-pixel text-xs">
              <ShieldCheck size={16} />
              <span>DUNGEON CHECKPOINT AVAILABLE!</span>
            </div>
            <p className="font-body text-xs text-slate-300">
              You cleared Room 5 earlier. You may respawn at Room 6 with 2 extra Room Lives and continue your run!
            </p>
            <PixelButton
              variant="mint"
              size="sm"
              className="w-full text-xs mt-2"
              onClick={onRespawnCheckpoint}
            >
              RESPAWN AT ROOM 6
            </PixelButton>
          </div>
        ) : (
          <p className="font-pixel text-[9px] text-slate-400">
            Today's scored attempt is recorded. You may hone your skills in <span className="text-[#FFD93D]">Practice Mode</span>, or return tomorrow at 00:00 UTC for a brand new dungeon!
          </p>
        )}

        {/* Close Button */}
        <PixelButton
          variant="outline"
          size="md"
          className="w-full text-xs"
          onClick={onClose}
        >
          RETURN TO ARCADE
        </PixelButton>
      </div>
    </PixelModal>
  );
};
