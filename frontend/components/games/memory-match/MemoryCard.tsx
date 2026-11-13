'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PlayCard } from './cardData';
import { cn } from '@/lib/utils/cn';

interface MemoryCardProps {
  card: PlayCard;
  index: number;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: (index: number) => void;
}

export const MemoryCard: React.FC<MemoryCardProps> = ({
  card,
  index,
  isFlipped,
  isMatched,
  onClick,
}) => {
  const showFront = isFlipped || isMatched;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(index);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={
        showFront
          ? `Revealed ${card.type === 'icon' ? 'Icon' : 'Name'} Card: ${card.name}`
          : `Hidden Card number ${index + 1}`
      }
      onClick={() => onClick(index)}
      onKeyDown={handleKeyDown}
      className={cn(
        'relative select-none cursor-pointer outline-none transition-transform duration-200 focus-visible:scale-105 focus-visible:ring-2 focus-visible:ring-[#7FFFD4]',
        'w-[72px] h-[72px] sm:w-[92px] sm:h-[92px] md:w-[96px] md:h-[96px]',
        isMatched && 'cursor-default'
      )}
      style={{ perspective: 1000 }}
    >
      <motion.div
        animate={{ rotateY: showFront ? 180 : 0 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
        className={cn(
          'w-full h-full relative transition-all duration-300',
          !showFront && 'hover:-rotate-1 sm:hover:scale-[1.03]',
          isMatched && 'animate-pulse'
        )}
      >
        {/* ======================================================== */}
        {/* CARD BACK (Face-Down State)                              */}
        {/* ======================================================== */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            boxShadow: 'inset 3px 3px 0 #3E5A8A, inset -3px -3px 0 #0E1626, 4px 4px 0 #1B2A4A',
          }}
          className={cn(
            'absolute inset-0 bg-[#1B2A4A] border-[3px] border-[#1B2A4A]',
            'flex flex-col items-center justify-center p-2'
          )}
        >
          {/* Pixel-dot corner rivets */}
          <div className="absolute top-1 left-1.5 font-mono text-[7px] text-[#7FFFD4]/60 leading-none select-none">
            ⋮⋮
          </div>
          <div className="absolute top-1 right-1.5 font-mono text-[7px] text-[#7FFFD4]/60 leading-none select-none">
            ⋮⋮
          </div>
          <div className="absolute bottom-1 left-1.5 font-mono text-[7px] text-[#7FFFD4]/60 leading-none select-none">
            ⋮⋮
          </div>
          <div className="absolute bottom-1 right-1.5 font-mono text-[7px] text-[#7FFFD4]/60 leading-none select-none">
            ⋮⋮
          </div>

          {/* Centered Pixel Question Mark */}
          <div className="w-6 h-7 sm:w-8 sm:h-9 flex items-center justify-center">
            <svg
              viewBox="0 0 16 18"
              shapeRendering="crispEdges"
              className="w-full h-full drop-shadow-[0_0_6px_rgba(127,255,212,0.8)]"
            >
              <rect x="4" y="2" width="8" height="2" fill="#7FFFD4" />
              <rect x="10" y="4" width="3" height="4" fill="#7FFFD4" />
              <rect x="6" y="8" width="5" height="2" fill="#7FFFD4" />
              <rect x="6" y="10" width="3" height="3" fill="#7FFFD4" />
              <rect x="6" y="15" width="3" height="3" fill="#7FFFD4" />
            </svg>
          </div>
        </div>

        {/* ======================================================== */}
        {/* CARD FRONT (Face-Up Revealed State)                      */}
        {/* ======================================================== */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            boxShadow: isMatched
              ? '0 0 15px #7FFFD4, 0 0 30px rgba(127, 255, 212, 0.6), inset 3px 3px 0 #FFF, inset -3px -3px 0 rgba(0,0,0,0.15)'
              : 'inset 3px 3px 0 #FFF, inset -3px -3px 0 rgba(0,0,0,0.15), 4px 4px 0 #1B2A4A',
          }}
          className={cn(
            'absolute inset-0 flex flex-col items-center justify-center p-1.5 sm:p-2 border-[3px]',
            card.type === 'icon'
              ? 'bg-white border-[#7FFFD4]'
              : 'bg-[#FDEFF7] border-[#8B7FD9]'
          )}
        >
          {card.type === 'icon' ? (
            /* Icon Card Display */
            <div className="w-full h-full flex items-center justify-center p-1">
              {card.iconSvg ? (
                <div
                  className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center"
                  dangerouslySetInnerHTML={{ __html: card.iconSvg }}
                />
              ) : (
                <span className="font-pixel text-xs text-[#1A2744]">{card.name}</span>
              )}
            </div>
          ) : (
            /* Name Card Display */
            <div className="w-full h-full flex flex-col items-center justify-center text-center p-1">
              <span className="font-pixel text-[8px] sm:text-[10px] md:text-[11px] text-[#1A2744] font-bold leading-tight uppercase tracking-wider drop-shadow-sm">
                {card.name}
              </span>
              <div className="mt-1 w-6 sm:w-8 h-1 bg-[#8B7FD9]/40 rounded-none" />
            </div>
          )}

          {/* Matched Star Sparkle Tag */}
          {isMatched && (
            <div className="absolute top-1 right-1 font-pixel text-[8px] text-[#2E7D32] animate-bounce">
              ✓
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
