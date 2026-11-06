'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';

interface PixelCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'parchment' | 'navy' | 'dungeon' | 'gold' | 'white' | 'blue' | 'pink' | 'mint';
  showDots?: boolean;
}

export const PixelCard: React.FC<PixelCardProps> = ({
  children,
  className,
  variant = 'parchment',
  showDots = true,
  ...props
}) => {
  // Translucent RPG HUD styles that let the floating island pixel art show through!
  const variantStyles = {
    // Semi-transparent warm parchment HUD with dual navy/gold pixel borders
    parchment:
      'bg-[rgba(255,252,240,0.85)] backdrop-blur-md text-[#1A2744] border-[3px] border-[#1B2A4A] ring-2 ring-[#FFD93D] shadow-[4px_4px_0px_#1B2A4A]',
    // Dark navy glass HUD for high-contrast stats
    navy:
      'bg-[rgba(27,42,74,0.88)] backdrop-blur-md text-white border-[3px] border-[#1B2A4A] ring-2 ring-[#00F0FF] shadow-[4px_4px_0px_#1B2A4A]',
    // Blue glass HUD
    blue:
      'bg-[rgba(27,42,74,0.88)] backdrop-blur-md text-white border-[3px] border-[#1B2A4A] ring-2 ring-[#00F0FF] shadow-[4px_4px_0px_#1B2A4A]',
    // Pink radiant glass HUD
    pink:
      'bg-[rgba(255,240,245,0.88)] backdrop-blur-md text-[#1A2744] border-[3px] border-[#FF6FA0] ring-2 ring-[#FFD93D] shadow-[4px_4px_0px_#FF6FA0]',
    // Mint fresh glass HUD
    mint:
      'bg-[rgba(240,255,250,0.88)] backdrop-blur-md text-[#1A2744] border-[3px] border-[#7FFFD4] ring-2 ring-[#2E7D32] shadow-[4px_4px_0px_#2E7D32]',
    // Translucent white glass
    white:
      'bg-[rgba(255,255,255,0.85)] backdrop-blur-md text-[#1A2744] border-[3px] border-[#1B2A4A] ring-2 ring-[#FFD93D] shadow-[4px_4px_0px_#1B2A4A]',
    // Translucent dungeon debugger HUD with neon cyan/magenta
    dungeon:
      'bg-[rgba(13,11,46,0.92)] backdrop-blur-md text-white border-[3px] border-[#00F0FF] ring-2 ring-[#FF2FD4] shadow-[0_0_20px_rgba(0,240,255,0.3)]',
    // Golden reward HUD
    gold:
      'bg-[rgba(255,249,230,0.9)] backdrop-blur-md text-[#1A2744] border-[3px] border-[#FFB300] ring-2 ring-[#FFD54F] shadow-[4px_4px_0px_#FFB300]',
  };

  return (
    <div
      className={cn(
        'relative rounded-[12px] p-5 sm:p-6 transition-all',
        variantStyles[variant] || variantStyles.parchment,
        className
      )}
      {...props}
    >
      {/* 4 Gold Corner Rivets / Brackets */}
      {showDots && (
        <>
          <div className="absolute top-2 right-2 flex space-x-1 select-none opacity-60">
            <span className="w-1.5 h-1.5 bg-[#FFB300] rounded-sm block border border-[#1B2A4A]" />
            <span className="w-1.5 h-1.5 bg-[#FFB300] rounded-sm block border border-[#1B2A4A]" />
            <span className="w-1.5 h-1.5 bg-[#FFB300] rounded-sm block border border-[#1B2A4A]" />
          </div>
          <div className="absolute top-2 left-2 w-1.5 h-1.5 bg-[#FFB300] rounded-sm border border-[#1B2A4A] opacity-60" />
          <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-[#FFB300] rounded-sm border border-[#1B2A4A] opacity-60" />
          <div className="absolute bottom-2 right-2 w-1.5 h-1.5 bg-[#FFB300] rounded-sm border border-[#1B2A4A] opacity-60" />
        </>
      )}
      {children}
    </div>
  );
};
