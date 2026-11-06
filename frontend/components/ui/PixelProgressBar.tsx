'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';

interface PixelProgressBarProps {
  current: number;
  total: number;
  className?: string;
  showLabel?: boolean;
}

export const PixelProgressBar: React.FC<PixelProgressBarProps> = ({
  current,
  total,
  className,
  showLabel = false,
}) => {
  const safeTotal = Math.max(1, total);
  const segments = 10;
  const activeSegments = Math.min(segments, Math.round((current / safeTotal) * segments));

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1 text-[10px] font-pixel text-[#1A2744]">
          <span>PROGRESS</span>
          <span>{current} / {total}</span>
        </div>
      )}
      <div className="flex gap-1.5 p-1 bg-slate-200/80 rounded-md border-2 border-[#1A2744]/20">
        {Array.from({ length: segments }).map((_, idx) => (
          <div
            key={idx}
            className={cn(
              'h-3.5 flex-1 rounded-sm transition-all',
              idx < activeSegments
                ? 'bg-[#7FFFD4] border-b-2 border-[#5adbb0] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]'
                : 'bg-slate-300/60'
            )}
          />
        ))}
      </div>
    </div>
  );
};

