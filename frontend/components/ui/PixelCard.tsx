'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';

interface PixelCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'white' | 'parchment' | 'blue' | 'pink' | 'dungeon' | 'wood';
  showDots?: boolean;
}

export const PixelCard: React.FC<PixelCardProps> = ({
  children,
  className,
  variant = 'white',
  showDots = true,
  ...props
}) => {
  const variantStyles = {
    white: 'bg-white text-[#1A2744] border-[3px] border-[#1B2A4A] shadow-[4px_4px_0px_#1B2A4A]',
    parchment: 'bg-[#FFF9E6] text-[#1A2744] border-[3px] border-[#3E2723] shadow-[4px_4px_0px_#3E2723]',
    blue: 'bg-[#EAF4FC] text-[#1A2744] border-[3px] border-[#1B2A4A] shadow-[4px_4px_0px_#1B2A4A]',
    pink: 'bg-[#FDEFF7] text-[#1A2744] border-[3px] border-[#1B2A4A] shadow-[4px_4px_0px_#1B2A4A]',
    wood: 'bg-[#4E342E] text-white border-[3px] border-[#271815] shadow-[4px_4px_0px_#1B2A4A]',
    dungeon: 'bg-[#1A1744] text-white border-[3px] border-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.3)]',
  };

  return (
    <div
      className={cn(
        'relative rounded-[12px] p-6 transition-all',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {showDots && (
        <div className="absolute top-4 right-4 flex space-x-1 select-none opacity-40">
          <span className="w-1.5 h-1.5 rounded-full bg-current block" />
          <span className="w-1.5 h-1.5 rounded-full bg-current block" />
          <span className="w-1.5 h-1.5 rounded-full bg-current block" />
        </div>
      )}
      {children}
    </div>
  );
};
