'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';

interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'mint' | 'purple' | 'pink' | 'outline' | 'yellow';
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
    mint: 'bg-[#7FFFD4] text-[#1A2744] hover:bg-[#6eecd0] border-2 border-[#1A2744] shadow-[0_4px_0_0_#1A2744] active:translate-y-1 active:shadow-none',
    purple: 'bg-[#8B7FD9] text-white hover:bg-[#7a6ec8] border-2 border-[#1A2744] shadow-[0_4px_0_0_#1A2744] active:translate-y-1 active:shadow-none',
    pink: 'bg-[#FF6FA0] text-white hover:bg-[#ee5e90] border-2 border-[#1A2744] shadow-[0_4px_0_0_#1A2744] active:translate-y-1 active:shadow-none',
    yellow: 'bg-[#FFD93D] text-[#1A2744] hover:bg-[#f0c82a] border-2 border-[#1A2744] shadow-[0_4px_0_0_#1A2744] active:translate-y-1 active:shadow-none',
    outline: 'bg-white text-[#1A2744] hover:bg-slate-50 border-2 border-[#1A2744] shadow-[0_4px_0_0_#1A2744] active:translate-y-1 active:shadow-none',
  };

  const sizeStyles = {
    sm: 'text-[10px] px-3 py-1.5 rounded-full',
    md: 'text-xs px-5 py-2.5 rounded-full',
    lg: 'text-sm px-7 py-3.5 rounded-full',
  };

  return (
    <button
      disabled={disabled}
      className={cn(
        'font-pixel tracking-wider inline-flex items-center justify-center transition-all cursor-pointer select-none',
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        disabled && 'opacity-50 cursor-not-allowed active:translate-y-0 active:shadow-[0_4px_0_0_#1A2744]',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

