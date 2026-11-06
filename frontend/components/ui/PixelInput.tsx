'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';

interface PixelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const PixelInput = React.forwardRef<HTMLInputElement, PixelInputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-[11px] font-pixel text-[#1A2744] mb-2 uppercase">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full px-4 py-3 font-body text-sm text-[#1A2744] bg-white rounded-xl border-2 border-[#1A2744]/30 shadow-[0_3px_0_0_#1A2744/10] outline-none transition-all placeholder:text-slate-400 focus:border-[#8B7FD9] focus:shadow-[0_0_0_3px_rgba(139,127,217,0.3)]',
            error && 'border-[#EB5757] focus:border-[#EB5757] focus:shadow-[0_0_0_3px_rgba(235,87,87,0.2)]',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-[10px] font-pixel text-[#EB5757]">{error}</p>
        )}
      </div>
    );
  }
);

PixelInput.displayName = 'PixelInput';

