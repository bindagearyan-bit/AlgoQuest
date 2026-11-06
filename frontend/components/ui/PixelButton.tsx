'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';

interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'mint' | 'purple' | 'pink' | 'outline' | 'yellow' | 'gold' | 'wood';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const PixelButton: React.FC<PixelButtonProps> = ({
  children,
  className,
  variant = 'mint',
  size = 'md',
  fullWidth = false,
  disabled,
  ...props
}) => {
  const variantStyles = {
    mint: 'bg-[#7FFFD4] text-[#1A2744] hover:bg-[#6efcd1] border-[3px] border-[#1B2A4A] shadow-[0_4px_0_#1B2A4A] active:translate-y-1 active:shadow-none',
    purple: 'bg-[#8B7FD9] text-white hover:bg-[#7b6ec7] border-[3px] border-[#1B2A4A] shadow-[0_4px_0_#1B2A4A] active:translate-y-1 active:shadow-none',
    pink: 'bg-[#FF6FA0] text-white hover:bg-[#ee5e8f] border-[3px] border-[#1B2A4A] shadow-[0_4px_0_#1B2A4A] active:translate-y-1 active:shadow-none',
    yellow: 'bg-[#FFD93D] text-[#1A2744] hover:bg-[#f0c82a] border-[3px] border-[#1B2A4A] shadow-[0_4px_0_#1B2A4A] active:translate-y-1 active:shadow-none',
    gold: 'bg-[#FFD54F] text-[#1A2744] hover:bg-[#ffca28] border-[3px] border-[#FFB300] shadow-[0_4px_0_#FFB300] active:translate-y-1 active:shadow-none',
    wood: 'bg-[#5D4037] text-white hover:bg-[#4E342E] border-[3px] border-[#271815] shadow-[0_4px_0_#271815] active:translate-y-1 active:shadow-none',
    outline: 'bg-white text-[#1A2744] hover:bg-slate-50 border-[3px] border-[#1B2A4A] shadow-[0_4px_0_#1B2A4A] active:translate-y-1 active:shadow-none',
  };

  const sizeStyles = {
    sm: 'text-[10px] px-3.5 py-1.5 rounded-full',
    md: 'text-xs px-5 py-2.5 rounded-full',
    lg: 'text-sm px-7 py-3 rounded-full',
  };

  return (
    <button
      disabled={disabled}
      className={cn(
        'font-pixel tracking-wider inline-flex items-center justify-center transition-all cursor-pointer select-none',
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        disabled && 'opacity-50 cursor-not-allowed active:translate-y-0 active:shadow-[0_4px_0_#1B2A4A]',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
