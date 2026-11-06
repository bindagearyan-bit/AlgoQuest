'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';

interface PixelCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'white' | 'blue' | 'pink' | 'dungeon';
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
    white: 'bg-white text-[#1A2744] border-2 border-[#1A2744]/20 shadow-[0_6px_0_0_rgba(27,42,74,0.08)]',
    blue: 'bg-[#EAF4FC] text-[#1A2744] border-2 border-[#8B7FD9]/30 shadow-[0_6px_0_0_rgba(139,127,217,0.1)]',
    pink: 'bg-[#FDEFF7] text-[#1A2744] border-2 border-[#FF6FA0]/30 shadow-[0_6px_0_0_rgba(255,111,160,0.1)]',
    dungeon: 'bg-[#1A1744] text-white border-2 border-[#00F0FF]/50 shadow-[0_0_15px_rgba(0,240,255,0.2)]',
  };

  return (
    <div
      className={cn(
        'relative rounded-[16px] p-6 transition-all',
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

