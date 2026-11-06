'use client';

import React from 'react';
import { Flame } from 'lucide-react';
import { motion } from 'framer-motion';

export const StreakFlame: React.FC<{ count: number; className?: string }> = ({ count, className = '' }) => {
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border-2 border-amber-300 ${className}`}>
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [-4, 4, -4] }}
        transition={{ repeat: Infinity, duration: 1.2 }}
      >
        <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
      </motion.div>
      <span className="font-pixel text-xs text-[#1A2744] font-bold">{count} DAYS</span>
    </div>
  );
};

