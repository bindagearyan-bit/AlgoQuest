'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PixelButton } from '@/components/ui/PixelButton';
import { MemoryMatchResult } from '@/lib/hooks/useMemoryMatch';
import { RotateCcw, Home, Sparkles, Award } from 'lucide-react';

interface VictoryModalProps {
  result: MemoryMatchResult;
  onPlayAgain: () => void;
  unlockedBadge?: {
    title: string;
    description: string;
    iconSvg?: string;
  } | null;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  result,
  onPlayAgain,
  unlockedBadge,
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="victory-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0D0B2E]/85 backdrop-blur-sm animate-in fade-in duration-200"
    >
      {/* 16-Bit Step Confetti Burst Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2.5 h-2.5 animate-bounce"
            style={{
              backgroundColor: ['#7FFFD4', '#FFD93D', '#FF2FD4', '#00F0FF', '#FFF'][i % 5],
              top: `${(i * 19) % 85}%`,
              left: `${(i * 13) % 95}%`,
              animationDelay: `${(i * 0.15).toFixed(2)}s`,
              animationDuration: `${1.2 + (i % 3) * 0.4}s`,
              boxShadow: '1px 1px 0 #1B2A4A',
            }}
          />
        ))}
      </div>

      {/* Modal Dialog Card */}
      <motion.div
        initial={{ scale: 0.8, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 18, stiffness: 220 }}
        style={{
          boxShadow: '0 16px 0 #1B2A4A, 0 25px 40px rgba(0,0,0,0.5)',
        }}
        className="relative w-full max-w-md bg-white border-[4px] border-[#FFD93D] p-5 sm:p-7 text-center space-y-5"
      >
        {/* Navy Inner Border */}
        <div className="absolute inset-1 border-[3px] border-[#1B2A4A] pointer-events-none" />

        {/* Header Title */}
        <div className="space-y-1 relative z-10">
          <div className="inline-flex items-center gap-1 text-[9px] font-pixel text-amber-600 bg-amber-50 px-2.5 py-0.5 border border-amber-300">
            <Sparkles size={11} className="text-amber-500 fill-amber-500" />
            <span>QUEST COMPLETE!</span>
          </div>

          <h2
            id="victory-modal-title"
            className="font-pixel text-lg sm:text-2xl text-[#1B2A4A] drop-shadow-[2px_2px_0_#7FFFD4] tracking-wide"
          >
            {result.isPerfectGame ? '🎉 PERFECT! 🎉' : '🏆 VICTORY! 🏆'}
          </h2>
        </div>

        {/* Pixel Trophy / Badge Art */}
        <div className="relative z-10 flex justify-center py-1">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#FFF9E6] border-[3px] border-[#1B2A4A] shadow-[4px_4px_0_#1B2A4A] flex items-center justify-center p-2">
            <svg
              viewBox="0 0 24 24"
              shapeRendering="crispEdges"
              className="w-full h-full drop-shadow-[0_0_8px_rgba(255,217,61,0.6)]"
            >
              {/* Gold Pixel Trophy */}
              <rect x="7" y="3" width="10" height="2" fill="#FFD93D" />
              <rect x="6" y="5" width="12" height="6" fill="#FFD93D" />
              <rect x="7" y="6" width="3" height="4" fill="#FFFFFF" />
              <rect x="8" y="11" width="8" height="2" fill="#FF8F00" />
              <rect x="9" y="13" width="6" height="2" fill="#FF8F00" />
              <rect x="11" y="15" width="2" height="3" fill="#824400" />
              <rect x="8" y="18" width="8" height="2" fill="#1B2A4A" />
              <rect x="6" y="20" width="12" height="2" fill="#FFD93D" />

              {/* Handles */}
              <rect x="4" y="6" width="2" height="4" fill="#FFD93D" />
              <rect x="18" y="6" width="2" height="4" fill="#FFD93D" />
            </svg>
          </div>
        </div>

        {/* Special Perfect Game Alert Banner */}
        {result.isPerfectGame && (
          <div className="relative z-10 bg-[#EAF4FC] border-2 border-[#1B2A4A] p-2.5 shadow-[2px_2px_0_#1B2A4A] flex items-center justify-center gap-2">
            <Award size={18} className="text-[#FF8F00]" />
            <div className="text-left">
              <span className="font-pixel text-[9px] text-[#0D47A1] block font-bold">
                MEMORY MAESTRO ACHIEVED!
              </span>
              <span className="font-body text-[11px] text-slate-600 block">
                Completed in &le;12 moves with flawless pattern memory!
              </span>
            </div>
          </div>
        )}

        {/* Stats Table Breakdown */}
        <div className="relative z-10 bg-[#FFFDF5] border-2 border-[#1B2A4A] p-3 text-left space-y-1.5 font-pixel text-[9px] sm:text-[10px] text-[#1A2744] shadow-[3px_3px_0_#1B2A4A]">
          <div className="flex justify-between border-b border-slate-200 pb-1">
            <span>⏱️ TIME ELAPSED:</span>
            <span className="font-bold">{formatTime(result.timeElapsed)}</span>
          </div>

          <div className="flex justify-between border-b border-slate-200 pb-1">
            <span>🎯 TOTAL MOVES:</span>
            <span className="font-bold">{result.moves}</span>
          </div>

          <div className="flex justify-between border-b border-slate-200 pb-1">
            <span>⭐ BASE + BONUSES:</span>
            <span>
              {result.baseScore} + {result.timeBonus + result.movesBonus + result.perfectBonus}
            </span>
          </div>

          <div className="flex justify-between border-b-2 border-[#1B2A4A] pb-1.5 pt-1 text-sm text-[#E65100]">
            <span>FINAL SCORE:</span>
            <span className="font-bold text-base text-[#E65100]">{result.score}</span>
          </div>

          <div className="flex justify-between pt-1 text-emerald-800">
            <span>✨ XP REWARD:</span>
            <span className="font-bold text-xs text-emerald-700">+{result.xpEarned} XP</span>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <PixelButton
            variant="mint"
            size="md"
            onClick={onPlayAgain}
            className="w-full sm:w-auto px-6 py-2.5 text-[10px] sm:text-xs"
          >
            <RotateCcw size={14} className="mr-1.5" /> PLAY AGAIN
          </PixelButton>

          <Link href="/arcade" className="w-full sm:w-auto">
            <PixelButton
              variant="purple"
              size="md"
              className="w-full sm:w-auto px-6 py-2.5 text-[10px] sm:text-xs text-white"
            >
              <Home size={14} className="mr-1.5" /> BACK TO HUB
            </PixelButton>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
