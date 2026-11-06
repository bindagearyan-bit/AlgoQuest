'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const ConfettiEffect: React.FC = () => {
  const colors = ['#7FFFD4', '#8B7FD9', '#FF6FA0', '#FFD93D', '#00F0FF', '#FF2FD4'];
  const particles = Array.from({ length: 40 });

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((_, i) => {
        const color = colors[i % colors.length];
        const randomX = Math.random() * 100;
        const randomDelay = Math.random() * 0.5;
        const randomDuration = 1.5 + Math.random() * 1.5;

        return (
          <motion.div
            key={i}
            initial={{
              x: `${randomX}vw`,
              y: '-5vh',
              opacity: 1,
              scale: Math.random() * 0.8 + 0.4,
              rotate: 0,
            }}
            animate={{
              y: '105vh',
              opacity: [1, 1, 0],
              rotate: Math.random() * 720 - 360,
            }}
            transition={{
              duration: randomDuration,
              delay: randomDelay,
              ease: 'easeOut',
            }}
            className="absolute w-3 h-3 rounded-sm"
            style={{ backgroundColor: color }}
          />
        );
      })}
    </div>
  );
};

