'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface HeartsDisplayProps {
  hearts: number;
  maxHearts?: number;
  className?: string;
}

export const HeartsDisplay: React.FC<HeartsDisplayProps> = ({
  hearts,
  maxHearts = 5,
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {Array.from({ length: maxHearts }).map((_, index) => {
        const isFull = index < hearts;
        return (
          <motion.div
            key={index}
            initial={{ scale: 1 }}
            animate={{
              scale: isFull ? [1, 1.15, 1] : 1,
              rotate: isFull ? [0, -5, 5, 0] : 0,
            }}
            transition={{ duration: 0.4 }}
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isFull
                  ? 'text-rose-500 fill-rose-500 drop-shadow-[0_2px_4px_rgba(244,63,94,0.4)]'
                  : 'text-slate-300 fill-slate-300'
              }`}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

