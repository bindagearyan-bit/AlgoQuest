'use client';

import React from 'react';
import { Gem } from 'lucide-react';

export const GemsCounter: React.FC<{ count: number; className?: string }> = ({ count, className = '' }) => {
  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-50 border-2 border-cyan-300 ${className}`}>
      <Gem className="w-4 h-4 text-cyan-600 fill-cyan-400" />
      <span className="font-pixel text-xs text-cyan-800 font-bold">{count}</span>
    </div>
  );
};

