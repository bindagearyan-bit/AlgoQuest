'use client';

import React, { useState } from 'react';
import { PixelBadge } from '../ui/PixelBadge';
import { ConfettiEffect } from './ConfettiEffect';
import { Sparkles, Trophy, Share2, Check, Shield, Download, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface BadgeAward {
  title: string;
  description: string;
  iconSvg?: string;
  xpReward: number;
  tier?: string;
  sublevelId?: number;
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
  const [isEquipped, setIsEquipped] = useState(false);

  if (!isOpen) return null;

  const defaultBadge: BadgeAward = {
    title: 'Foundations Initiate',
    description: 'Mastered the conceptual essence and real-world necessity of data organization.',
    xpReward: 500,
    tier: 'BEGINNER',
  };

  const activeBadge = badge || defaultBadge;
  const certId = `AQ-CERT-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

  const handleShare = () => {
    const url = typeof window !== 'undefined' ? `${window.location.origin}/verify/badge/${certId}` : '';
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(
        `🏆 I conquered "${sublevelTitle}" and unlocked the "${activeBadge.title}" Badge in AlgoQuest! Certificate: ${certId}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleEquip = () => {
    setIsEquipped(true);
    setTimeout(() => {
      onContinue();
    }, 900);
  };

  const tier = activeBadge.tier || 'BEGINNER';
  const tierColor =
    tier === 'ADVANCED'
      ? 'text-[#00F0FF] border-[#FF2FD4] bg-[#2E1F3D]'
      : tier === 'INTERMEDIATE'
      ? 'text-[#FFD93D] border-[#FF8F00] bg-[#3E2723]'
      : 'text-[#7FFFD4] border-[#2E7D32] bg-[#0A2618]';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Full-Screen Confetti Explosion */}
        {isOpen && <ConfettiEffect />}

        {/* Deep Navy Dimming Overlay (rgba(13, 11, 46, 0.9)) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#0D0B2E]/90 backdrop-blur-md"
          onClick={onContinue}
        />

        {/* Modal Container: Pixelated Thick Border (Outer #FFD93D Gold, Inner #1B2A4A Navy) */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl bg-[#0F1424] p-1 shadow-[0_0_50px_rgba(255,217,61,0.25)]"
          style={{
            border: '4px solid #FFD93D',
            boxShadow: '0 0 0 4px #1B2A4A, 0 10px 30px rgba(0,0,0,0.8)',
          }}
        >
          {/* Inner Dungeon Parchment Texture & Scanline Grid */}
          <div
            className="p-6 sm:p-8 rounded-xl bg-gradient-to-b from-[#141B30] via-[#0F1626] to-[#0A0E1A] relative"
            style={{
              backgroundImage:
                'radial-gradient(circle at 50% 20%, rgba(127,255,212,0.12) 0%, transparent 60%), repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.25) 3px, rgba(0,0,0,0.25) 6px)',
            }}
          >
            {/* Top Close Icon Button */}
            <button
              onClick={onContinue}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-[#1B2A4A] text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X size={16} />
            </button>

            {/* Header: "QUEST COMPLETE!" in Press Start 2P Glowing Mint Text */}
            <div className="text-center mb-6">
              <span
                className="font-pixel text-[8px] sm:text-[9px] uppercase tracking-widest text-[#FFD93D] block mb-1"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                ★ DUNGEON SECTOR CONQUERED ★
              </span>
              <h2
                className="font-pixel text-lg sm:text-2xl text-[#7FFFD4] uppercase tracking-wider"
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  textShadow: '0 0 12px #7FFFD4, 0 0 24px rgba(127,255,212,0.6)',
                }}
              >
                QUEST COMPLETE!
              </h2>
            </div>

            {/* The Badge: Floating in Direct Center with 8-Bit Particle Explosion */}
            <div className="relative flex items-center justify-center my-6 py-4">
              {/* 8-Bit Particle Explosion Rings */}
              <div
                className="absolute w-44 h-44 rounded-full pointer-events-none animate-pulse"
                style={{
                  background:
                    'radial-gradient(circle, rgba(255,217,61,0.25) 0%, rgba(127,255,212,0.15) 45%, transparent 70%)',
                }}
              />

              {/* Stepped 8-Bit Sparkle Squares */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-3 h-3 bg-[#FFD93D] absolute -top-2 left-1/4 animate-bounce" />
                <div className="w-2.5 h-2.5 bg-[#7FFFD4] absolute -bottom-1 right-1/4 animate-bounce delay-100" />
                <div className="w-2 h-2 bg-[#00F0FF] absolute top-1/2 -left-3 animate-ping" />
                <div className="w-2 h-2 bg-[#FF2FD4] absolute top-1/2 -right-3 animate-ping delay-200" />
              </div>

              {/* Floating Large Pixel Badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              >
                <PixelBadge
                  size="lg"
                  title={activeBadge.title}
                  tier={activeBadge.tier}
                  isEarned={true}
                  iconSvg={activeBadge.iconSvg}
                  xpReward={activeBadge.xpReward}
                  showDetails={false}
                />
              </motion.div>
            </div>

            {/* Stats Panel (Strictly using Pixelify Sans & Press Start 2P) */}
            <div
              className="p-4 rounded-xl bg-[#0B0F1C]/80 border-2 border-[#1B2A4A] space-y-2 mb-6"
              style={{ fontFamily: "'Pixelify Sans', sans-serif" }}
            >
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <span className="text-xs text-slate-400 uppercase tracking-wide">ITEM REWARD:</span>
                <span
                  className="font-pixel text-[11px] text-white"
                  style={{ fontFamily: "'Press Start 2P', monospace" }}
                >
                  {activeBadge.title}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <span className="text-xs text-slate-400 uppercase tracking-wide">EXPEDITION TIER:</span>
                <span
                  className={`font-pixel text-[9px] px-2.5 py-1 rounded border uppercase ${tierColor}`}
                  style={{ fontFamily: "'Press Start 2P', monospace" }}
                >
                  {tier}
                </span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-slate-400 uppercase tracking-wide">ACADEMIC MASTERY BONUS:</span>
                <span
                  className="font-pixel text-xs text-[#FFD93D] flex items-center gap-1.5"
                  style={{ fontFamily: "'Press Start 2P', monospace" }}
                >
                  <Sparkles size={14} className="text-[#FFD93D]" /> +{activeBadge.xpReward || 500} XP
                </span>
              </div>

              {activeBadge.description && (
                <p className="text-xs text-slate-300 italic pt-1 leading-relaxed border-t border-slate-800/80 mt-2">
                  "{activeBadge.description}"
                </p>
              )}
            </div>

            {/* Action Buttons: 3D Pill Buttons with AlgoQuest Shadows */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* [ EQUIP TO PROFILE ] (Mint #7FFFD4 button with #1B2A4A shadow) */}
              <button
                onClick={handleEquip}
                className="w-full py-3 px-4 rounded-xl font-pixel text-[10px] text-[#0B1224] bg-[#7FFFD4] border-2 border-[#0B1224] shadow-[0_4px_0_#1B2A4A] hover:translate-y-0.5 hover:shadow-[0_2px_0_#1B2A4A] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 font-bold uppercase"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                {isEquipped ? (
                  <>
                    <Check size={14} /> EQUIPPED!
                  </>
                ) : (
                  <>
                    <Shield size={14} /> EQUIP TO PROFILE
                  </>
                )}
              </button>

              {/* [ SHARE CERTIFICATE ] (Purple #8B7FD9 button with #1B2A4A shadow) */}
              <button
                onClick={handleShare}
                className="w-full py-3 px-4 rounded-xl font-pixel text-[10px] text-white bg-[#8B7FD9] border-2 border-[#1B2A4A] shadow-[0_4px_0_#1B2A4A] hover:translate-y-0.5 hover:shadow-[0_2px_0_#1B2A4A] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 font-bold uppercase"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                {copied ? (
                  <>
                    <Check size={14} /> COPIED!
                  </>
                ) : (
                  <>
                    <Share2 size={14} /> SHARE CERTIFICATE
                  </>
                )}
              </button>
            </div>

            {/* Continue Footer Link */}
            <div className="mt-4 text-center">
              <button
                onClick={onContinue}
                className="font-pixel text-[9px] text-slate-400 hover:text-white underline tracking-wider transition-colors"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                CONTINUE EXPEDITION ▶
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
