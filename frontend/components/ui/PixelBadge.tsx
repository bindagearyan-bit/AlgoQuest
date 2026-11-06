'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';

interface PixelBadgeProps {
  children: React.ReactNode;
  variant?: 'mint' | 'purple' | 'pink' | 'yellow' | 'cyan' | 'gray';
  className?: string;
}

export const PixelBadge: React.FC<PixelBadgeProps> = ({
  children,
  variant = 'mint',
  className,
}) => {
  const variantStyles = {
    mint: 'bg-[#7FFFD4]/30 text-[#0c7a59] border-[#7FFFD4]',
    purple: 'bg-[#8B7FD9]/30 text-[#4c3fa3] border-[#8B7FD9]',
    pink: 'bg-[#FF6FA0]/30 text-[#a32752] border-[#FF6FA0]',
    yellow: 'bg-[#FFD93D]/30 text-[#856b00] border-[#FFD93D]',
    cyan: 'bg-[#00F0FF]/20 text-[#00F0FF] border-[#00F0FF] shadow-[0_0_8px_#00F0FF]',
    gray: 'bg-slate-200 text-slate-600 border-slate-300',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-pixel rounded-full border',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
};

