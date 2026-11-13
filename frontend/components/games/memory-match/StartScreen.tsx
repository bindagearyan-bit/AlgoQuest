'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PixelButton } from '@/components/ui/PixelButton';
import { Play, Sparkles, Brain, Award, Clock } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
  countdown: number | string;
  gameStatus: 'idle' | 'countdown';
  bestScore?: number;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  onStart,
  countdown,
  gameStatus,
  bestScore = 0,
}) => {
  return (
    <div className="relative max-w-xl mx-auto p-4">
      {/* 16-Bit Arcade Cabinet Screen Container */}
      <div
        style={{
          boxShadow: '0 12px 0 #1B2A4A, 0 20px 30px rgba(0,0,0,0.35)',
        }}
        className="relative bg-[#FFFDF5] border-[4px] border-[#1B2A4A] p-6 sm:p-8 text-center space-y-6"
      >
        {/* Tabletop Inner Bevel Highlight */}
        <div className="absolute inset-0 border-t-[3px] border-l-[3px] border-white border-b-[3px] border-r-[3px] border-[#D9D4C7] pointer-events-none" />

        {/* Decorative Badge Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1B2A4A] text-[#7FFFD4] border-2 border-[#7FFFD4] font-pixel text-[8px] sm:text-[9px] shadow-[2px_2px_0_#0E1626]">
          <Sparkles size={11} className="text-[#FFD93D]" />
          <span>ALGOQUEST ARCADE • NO-CODE MINI-GAME</span>
        </div>

        {/* Arcade Title */}
        <div className="space-y-2">
          <h1 className="font-pixel text-xl sm:text-2xl md:text-3xl text-[#1A2744] drop-shadow-[3px_3px_0_#7FFFD4] tracking-wide">
            MEMORY MATCH
          </h1>
          <p className="font-pixel text-xs sm:text-sm text-[#8B7FD9] uppercase tracking-wider">
            DS ICONS EDITION
          </p>
        </div>

        {/* Game Rules / Mission Briefing */}
        <div className="bg-[#EAF4FC] border-2 border-[#1B2A4A] p-4 text-left space-y-2.5 shadow-[3px_3px_0_#1B2A4A]">
          <div className="flex items-center gap-2 font-pixel text-[9px] sm:text-[10px] text-[#1A2744] border-b border-[#1B2A4A]/20 pb-1.5">
            <Brain size={14} className="text-[#8B7FD9]" />
            <span>HOW TO PLAY:</span>
          </div>

          <p className="font-body text-xs sm:text-sm text-[#1A2744] leading-relaxed">
            Flip 12 pixel cards to match 6 core Data Structure icons with their official syllabus names:
            <strong className="block mt-1 font-pixel text-[9px] text-[#0D47A1]">
              ARRAY • STACK • QUEUE • LINKED LIST • TREE • GRAPH
            </strong>
          </p>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1B2A4A]/10 text-[9px] font-pixel">
            <div className="flex items-center gap-1.5 text-emerald-800 bg-emerald-50 p-1.5 border border-emerald-300">
              <Clock size={12} className="text-emerald-600 shrink-0" />
              <span>&lt;60s: +25 XP</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-800 bg-amber-50 p-1.5 border border-amber-300">
              <Award size={12} className="text-amber-600 shrink-0" />
              <span>&le;12 MOVES: BADGE</span>
            </div>
          </div>
        </div>

        {bestScore > 0 && (
          <div className="font-pixel text-[9px] text-[#1A2744] bg-[#FFF9E6] border border-[#FFD93D] py-1.5 px-3">
            👑 YOUR PERSONAL BEST: <span className="text-amber-600 font-bold">{bestScore} PTS</span>
          </div>
        )}

        {/* Action Button / Countdown Overlay */}
        {gameStatus === 'countdown' ? (
          <div className="py-6 flex flex-col items-center justify-center space-y-2">
            <span className="font-pixel text-xs text-slate-500 uppercase tracking-widest">
              GET READY HERO...
            </span>
            <motion.div
              key={String(countdown)}
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="font-pixel text-4xl sm:text-5xl text-[#1B2A4A] drop-shadow-[4px_4px_0_#FFD93D]"
            >
              {countdown}
            </motion.div>
          </div>
        ) : (
          <div className="pt-2">
            <PixelButton
              variant="mint"
              size="lg"
              onClick={onStart}
              className="w-full sm:w-auto text-xs sm:text-sm px-8 py-3.5 animate-pulse"
            >
              <Play size={16} className="mr-2 fill-current" /> PRESS START
            </PixelButton>
          </div>
        )}
      </div>
    </div>
  );
};

