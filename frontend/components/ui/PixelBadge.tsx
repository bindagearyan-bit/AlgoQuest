'use client';

import React from 'react';
import { Lock, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export interface PixelBadgeProps {
  title: string;
  description?: string;
  iconSvg?: string;
  tier?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | string;
  isEarned?: boolean;
  size?: 'sm' | 'md' | 'lg';
  earnedAt?: string | Date | null;
  xpReward?: number;
  onClick?: () => void;
}

export const PixelBadge: React.FC<PixelBadgeProps> = ({
  title,
  description,
  iconSvg,
  tier = 'BEGINNER',
  isEarned = false,
  size = 'md',
  earnedAt,
  xpReward = 500,
  onClick,
}) => {
  const sizeMap = {
    sm: 'w-16 h-18 text-[8px]',
    md: 'w-24 h-28 text-[9px]',
    lg: 'w-32 h-36 text-[10px]',
  };

  const iconSizeMap = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  const getTierColors = () => {
    switch (tier) {
      case 'ADVANCED':
        return {
          border: '#D32F2F',
          inner: '#FF6FA0',
          bg: 'from-[#3E2723] via-[#7F0000] to-[#210909]',
          glow: 'rgba(255, 111, 160, 0.4)',
          text: '#FF80AB',
        };
      case 'INTERMEDIATE':
        return {
          border: '#FF8F00',
          inner: '#FFD54F',
          bg: 'from-[#3E2723] via-[#824400] to-[#1F1300]',
          glow: 'rgba(255, 213, 79, 0.4)',
          text: '#FFE082',
        };
      case 'BEGINNER':
      default:
        return {
          border: '#2E7D32',
          inner: '#7FFFD4',
          bg: 'from-[#0A2618] via-[#1B4D2E] to-[#05140D]',
          glow: 'rgba(127, 255, 212, 0.4)',
          text: '#A5D6A7',
        };
    }
  };

  const colors = getTierColors();

  return (
    <motion.div
      whileHover={isEarned ? { scale: 1.05, y: -2 } : { scale: 1.01 }}
      whileTap={isEarned ? { scale: 0.98 } : {}}
      onClick={onClick}
      className={`group relative flex flex-col items-center justify-center cursor-pointer select-none ${
        onClick ? 'hover:cursor-pointer' : ''
      }`}
    >
      {/* Hexagonal Outer Container */}
      <div
        className={`relative flex items-center justify-center p-1 transition-all ${
          size === 'sm' ? 'w-14 h-16' : size === 'lg' ? 'w-28 h-32' : 'w-20 h-24'
        }`}
        style={{
          clipPath: 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)',
          backgroundColor: isEarned ? colors.inner : '#475569',
          boxShadow: isEarned ? `0 0 16px ${colors.glow}` : 'none',
        }}
      >
        {/* Hexagonal Inner Body */}
        <div
          className="w-full h-full flex flex-col items-center justify-center p-2 relative overflow-hidden"
          style={{
            clipPath: 'polygon(50% 1%, 94% 25%, 94% 75%, 50% 99%, 6% 75%, 6% 25%)',
            background: isEarned
              ? `linear-gradient(180deg, ${colors.bg})`
              : 'linear-gradient(180deg, #1e293b, #0f172a)',
          }}
        >
          {/* Subtle Scanline Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />

          {/* Icon or Lock */}
          {isEarned ? (
            <div className={`relative z-10 flex items-center justify-center ${iconSizeMap[size]}`}>
              {iconSvg ? (
                <div
                  className="w-full h-full [&>svg]:w-full [&>svg]:h-full [&>svg]:drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                  dangerouslySetInnerHTML={{ __html: iconSvg }}
                />
              ) : (
                <Sparkles className="text-[#FFD700] animate-pulse" size={24} />
              )}
            </div>
          ) : (
            <div className="relative z-10 flex flex-col items-center justify-center text-slate-500">
              <Lock size={size === 'sm' ? 14 : size === 'lg' ? 24 : 18} />
              <span className="font-pixel text-[7px] text-slate-500 mt-1">LOCKED</span>
            </div>
          )}
        </div>
      </div>

      {/* Badge Name Underneath */}
      <div className="mt-2 text-center max-w-[110px]">
        <h4
          className={`font-pixel text-[8px] sm:text-[9px] line-clamp-1 transition-colors ${
            isEarned ? 'text-white group-hover:text-[#FFD54F]' : 'text-slate-500'
          }`}
        >
          {title}
        </h4>
        <span
          className="font-pixel text-[7px] block mt-0.5"
          style={{ color: isEarned ? colors.text : '#64748b' }}
        >
          {isEarned ? `+${xpReward} XP` : 'LOCKED'}
        </span>
      </div>
    </motion.div>
  );
};
