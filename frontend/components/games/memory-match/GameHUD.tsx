'use client';

import React from 'react';
import Link from 'next/link';
import { Volume2, VolumeX, ArrowLeft, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface GameHUDProps {
  timeElapsed: number;
  moves: number;
  score: number;
  isMuted: boolean;
  onToggleSound: () => void;
  onRestart: () => void;
  gameStatus: 'idle' | 'countdown' | 'playing' | 'won';
}

export const GameHUD: React.FC<GameHUDProps> = ({
  timeElapsed,
  moves,
  score,
  isMuted,
  onToggleSound,
  onRestart,
  gameStatus,
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-3 px-3">
      {/* Top Banner Row */}
      <div className="bg-[#FFFDF5] border-[3px] border-[#1B2A4A] shadow-[4px_4px_0_#1B2A4A] px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2">
        <Link
          href="/arcade"
          className="flex items-center gap-1.5 font-pixel text-[9px] sm:text-[10px] text-[#1B2A4A] bg-[#EAF4FC] hover:bg-[#D7EBF8] px-2.5 py-1.5 border-2 border-[#1B2A4A] shadow-[2px_2px_0_#1B2A4A] active:translate-y-0.5 transition-all"
        >
          <ArrowLeft size={13} />
          <span className="hidden sm:inline">BACK TO HUB</span>
          <span className="sm:hidden">HUB</span>
        </Link>

        {/* Title & Subtitle */}
        <div className="text-center">
          <h1 className="font-pixel text-xs sm:text-lg md:text-xl text-[#1A2744] drop-shadow-[2px_2px_0_#7FFFD4] tracking-wide">
            MEMORY MATCH
          </h1>
          <span className="font-pixel text-[8px] sm:text-xs text-[#8B7FD9] uppercase tracking-wider block">
            DS ICONS ARCADE
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {gameStatus === 'playing' && (
            <button
              onClick={onRestart}
              title="Restart Game"
              className="p-1.5 sm:px-2 sm:py-1.5 font-pixel text-[9px] text-[#1B2A4A] bg-[#FFF9E6] hover:bg-[#FFE082] border-2 border-[#1B2A4A] shadow-[2px_2px_0_#1B2A4A] active:translate-y-0.5 transition-all flex items-center gap-1"
            >
              <RotateCcw size={13} />
              <span className="hidden md:inline">RESTART</span>
            </button>
          )}

          <button
            onClick={onToggleSound}
            aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            className={cn(
              'px-2.5 py-1.5 font-pixel text-[9px] sm:text-[10px] border-2 border-[#1B2A4A] shadow-[2px_2px_0_#1B2A4A] active:translate-y-0.5 transition-all flex items-center gap-1.5',
              isMuted
                ? 'bg-rose-100 text-rose-800'
                : 'bg-[#7FFFD4]/50 text-[#1B2A4A]'
            )}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            <span className="hidden sm:inline">{isMuted ? 'MUTED' : 'SOUND ON'}</span>
          </button>
        </div>
      </div>

      {/* Stats Counter HUD */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 bg-[#1B2A4A] border-[3px] border-[#1B2A4A] shadow-[4px_4px_0_rgba(27,42,74,0.3)] p-2 sm:p-3 text-center">
        {/* Timer */}
        <div className="bg-[#FFFDF5] border-2 border-[#1B2A4A] py-1.5 px-2 shadow-[2px_2px_0_#0E1626]">
          <span className="font-pixel text-[7px] sm:text-[9px] text-slate-500 block uppercase">
            ⏱️ TIME
          </span>
          <span className="font-pixel text-[10px] sm:text-sm text-[#1A2744] font-bold">
            {formatTime(timeElapsed)}
          </span>
        </div>

        {/* Moves */}
        <div className="bg-[#FFFDF5] border-2 border-[#1B2A4A] py-1.5 px-2 shadow-[2px_2px_0_#0E1626]">
          <span className="font-pixel text-[7px] sm:text-[9px] text-slate-500 block uppercase">
            🎯 MOVES
          </span>
          <span className="font-pixel text-[10px] sm:text-sm text-[#1A2744] font-bold">
            {moves}
          </span>
        </div>

        {/* Score */}
        <div className="bg-[#FFFDF5] border-2 border-[#1B2A4A] py-1.5 px-2 shadow-[2px_2px_0_#0E1626]">
          <span className="font-pixel text-[7px] sm:text-[9px] text-slate-500 block uppercase">
            ⭐ SCORE
          </span>
          <span className="font-pixel text-[10px] sm:text-sm text-[#E65100] font-bold">
            {score}
          </span>
        </div>
      </div>
    </div>
  );
};
