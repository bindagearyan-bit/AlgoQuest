'use client';

import React, { useState } from 'react';
import { PixelBadge } from '../ui/PixelBadge';
import { PixelButton } from '../ui/PixelButton';
import { ConfettiEffect } from './ConfettiEffect';
import { Sparkles, Trophy, Share2, Check, Download, ExternalLink, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface BadgeAward {
  title: string;
  description: string;
  iconSvg?: string;
  xpReward: number;
  tier?: string;
}

export interface BadgeCelebrationModalProps {
  isOpen: boolean;
  badge?: BadgeAward | null;
  sublevelTitle: string;
  onContinue: () => void;
}

export const BadgeCelebrationModal: React.FC<BadgeCelebrationModalProps> = ({
  isOpen,
  badge,
  sublevelTitle,
  onContinue,
}) => {
  const [copied, setCopied] = useState(false);
  const [showCert, setShowCert] = useState(false);

  if (!isOpen) return null;

  const defaultBadge: BadgeAward = {
    title: 'Foundations Disciple',
    description: 'Mastered foundational data structure paradigms across all difficulty tiers.',
    xpReward: 500,
    tier: 'BEGINNER',
  };

  const activeBadge = badge || defaultBadge;
  const certId = `AQ-CERT-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

  const handleShare = () => {
    const url = typeof window !== 'undefined' ? `${window.location.origin}/verify/badge/${certId}` : '';
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(`I just unlocked the "${activeBadge.title}" Badge in AlgoQuest! Check my certificate: ${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <ConfettiEffect />

      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0 }}
        className="relative w-full max-w-lg bg-[#0d0b2e] border-4 border-[#FFD54F] rounded-3xl p-6 sm:p-8 text-center shadow-[0_0_50px_rgba(255,213,79,0.35)] overflow-hidden"
      >
        {/* Glow ambient background rings */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#FFD54F]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#7FFFD4]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header Ribbon */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1B2A4A] border-2 border-[#FFD54F] text-[#FFD54F] font-pixel text-[10px] mb-4 shadow-sm">
          <Trophy size={14} className="text-[#FFD54F]" />
          <span>EXPEDITION CONQUERED!</span>
        </div>

        <h2 className="font-pixel text-base sm:text-xl text-white mb-1 drop-shadow-[2px_2px_0_#000]">
          BADGE UNLOCKED!
        </h2>
        <p className="font-body text-xs sm:text-sm text-slate-300 mb-6">
          You have mastered all stages of <span className="text-[#7FFFD4] font-semibold">{sublevelTitle}</span>!
        </p>

        {/* Center Hexagonal Badge Display */}
        <div className="flex justify-center mb-6 py-2">
          <div className="relative">
            <div className="absolute inset-0 bg-[#FFD54F]/25 rounded-full blur-2xl animate-pulse" />
            <PixelBadge
              title={activeBadge.title}
              description={activeBadge.description}
              iconSvg={activeBadge.iconSvg}
              tier={activeBadge.tier}
              isEarned={true}
              size="lg"
              xpReward={activeBadge.xpReward}
            />
          </div>
        </div>

        {/* Badge Description Box */}
        <div className="bg-[#161245] border-2 border-[#3b4261] rounded-2xl p-4 mb-6 text-left">
          <div className="flex items-center justify-between mb-1">
            <span className="font-pixel text-[9px] text-[#FFD54F] uppercase tracking-wider">
              {activeBadge.title}
            </span>
            <span className="font-pixel text-[9px] text-[#7FFFD4]">
              +{activeBadge.xpReward} BONUS XP
            </span>
          </div>
          <p className="font-body text-xs text-slate-300 leading-relaxed">
            {activeBadge.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <PixelButton
            variant="gold"
            size="md"
            onClick={handleShare}
            className="w-full sm:w-auto"
          >
            {copied ? (
              <>
                <Check size={14} className="mr-1.5" /> CERTIFICATE LINK COPIED!
              </>
            ) : (
              <>
                <Share2 size={14} className="mr-1.5" /> SHARE CERTIFICATE
              </>
            )}
          </PixelButton>

          <PixelButton
            variant="mint"
            size="md"
            onClick={onContinue}
            className="w-full sm:w-auto"
          >
            CONTINUE EXPEDITION ▶
          </PixelButton>
        </div>
      </motion.div>
    </div>
  );
};

