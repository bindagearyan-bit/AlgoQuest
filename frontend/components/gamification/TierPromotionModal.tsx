'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ConfettiEffect } from './ConfettiEffect';
import { PixelButton } from '../ui/PixelButton';
import { Trophy, Sparkles, ArrowRight, Compass, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export interface TierPromotedData {
  fromTier: string;
  toTier: string;
  title: string;
  message: string;
  bonusGems: number;
}

export interface TierPromotionModalProps {
  isOpen: boolean;
  data?: TierPromotedData | null;
  onClose?: () => void;
}

export const TierPromotionModal: React.FC<TierPromotionModalProps> = ({
  isOpen,
  data,
  onClose,
}) => {
  const router = useRouter();

  if (!isOpen || !data) return null;

  const handleProceed = () => {
    if (onClose) onClose();
    router.push('/roadmap');
  };

  const getTierPill = (tier: string) => {
    switch (tier) {
      case 'ADVANCED':
        return (
          <span className="font-pixel text-[9px] sm:text-[10px] px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/50">
            🔴 ADVANCED
          </span>
        );
      case 'INTERMEDIATE':
        return (
          <span className="font-pixel text-[9px] sm:text-[10px] px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/50">
            🟡 INTERMEDIATE
          </span>
        );
      case 'BEGINNER':
      default:
        return (
          <span className="font-pixel text-[9px] sm:text-[10px] px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/50">
            🟢 BEGINNER
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <ConfettiEffect />

      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0 }}
        className="relative w-full max-w-lg bg-[#0F1426] border-4 border-[#FFD54F] rounded-3xl p-6 sm:p-8 text-center shadow-[0_0_60px_rgba(255,213,79,0.4)] overflow-hidden"
      >
        {/* Glow ambient background rings */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1B2A4A] border-2 border-[#FFD54F] text-[#FFD54F] font-pixel text-[9px] sm:text-[10px] mb-4 shadow-sm">
          <Trophy size={14} className="text-amber-400 animate-bounce" />
          <span>EXPEDITION GRADUATION CONQUERED!</span>
        </div>

        {/* Icon Trophy Box */}
        <div className="my-3 flex justify-center">
          <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 border-4 border-white flex items-center justify-center shadow-[4px_4px_0_#1B2A4A]">
            <Trophy size={40} className="text-white drop-shadow-md" />
            <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white rounded-full p-1 border-2 border-white">
              <ShieldCheck size={16} />
            </div>
          </div>
        </div>

        {/* Main Title & Message */}
        <h2 className="font-pixel text-base sm:text-xl text-[#FFD54F] tracking-wide mt-2">
          {data.title}
        </h2>

        <p className="font-body text-xs sm:text-sm text-slate-300 mt-2 max-w-md mx-auto leading-relaxed">
          {data.message}
        </p>

        {/* Tier Transition Display */}
        <div className="my-5 p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center gap-3">
          {getTierPill(data.fromTier)}
          <ArrowRight size={16} className="text-amber-400 shrink-0" />
          {getTierPill(data.toTier)}
        </div>

        {/* Bonus Reward Callout */}
        <div className="mb-6 p-3 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-400/20 to-amber-500/10 border-2 border-amber-400/40 flex items-center justify-center gap-2.5">
          <Sparkles size={16} className="text-amber-400 animate-spin" />
          <span className="font-pixel text-[10px] sm:text-xs text-amber-300">
            +{data.bonusGems || 100} GEMS GRADUATION BONUS GRANTED! 💎
          </span>
        </div>

        {/* Action Button */}
        <div className="flex flex-col gap-2.5">
          <PixelButton
            variant="gold"
            size="lg"
            className="w-full text-xs sm:text-sm py-3.5 flex items-center justify-center gap-2"
            onClick={handleProceed}
          >
            <Compass size={16} />
            ENTER {data.toTier} WORLD MAP ▶
          </PixelButton>
        </div>
      </motion.div>
    </div>
  );
};
