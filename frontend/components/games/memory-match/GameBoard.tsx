'use client';

import React from 'react';
import { PlayCard } from './cardData';
import { MemoryCard } from './MemoryCard';

interface GameBoardProps {
  cards: PlayCard[];
  flippedIndices: number[];
  matchedPairIds: Set<string>;
  onCardClick: (index: number) => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  cards,
  flippedIndices,
  matchedPairIds,
  onCardClick,
}) => {
  return (
    <div className="relative mx-auto flex items-center justify-center p-3 sm:p-6">
      {/* 16-Bit Wooden Pixel-Art Table / Platform Platform */}
      <div
        style={{
          boxShadow: '0 12px 0 #1B2A4A, 0 20px 30px rgba(0,0,0,0.35)',
        }}
        className="relative bg-[#D2A06E] border-[4px] border-[#1B2A4A] p-4 sm:p-6 md:p-8 rounded-none transition-all"
      >
        {/* Tabletop Inner Bevel Highlight & Wood Plank Lines */}
        <div className="absolute inset-0 border-t-[4px] border-l-[4px] border-[#E8C29A] border-b-[4px] border-r-[4px] border-[#8D5832] pointer-events-none" />

        {/* Corner Rivet Screws */}
        <div className="absolute top-2 left-2 w-2 h-2 bg-[#1B2A4A] shadow-[1px_1px_0_#FFF]" />
        <div className="absolute top-2 right-2 w-2 h-2 bg-[#1B2A4A] shadow-[1px_1px_0_#FFF]" />
        <div className="absolute bottom-2 left-2 w-2 h-2 bg-[#1B2A4A] shadow-[1px_1px_0_#FFF]" />
        <div className="absolute bottom-2 right-2 w-2 h-2 bg-[#1B2A4A] shadow-[1px_1px_0_#FFF]" />

        {/* Felt Mat Surface */}
        <div className="relative bg-[#284E3A] border-[3px] border-[#1B2A4A] p-3 sm:p-5 shadow-inner">
          <div className="absolute inset-0 bg-[radial-gradient(#396B50_1px,transparent_1px)] [background-size:12px_12px] opacity-40 pointer-events-none" />

          {/* Cards Grid: 3 cols on mobile (3x4), 4 cols on tablet/desktop (4x3) */}
          <div className="relative grid grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-4 place-items-center">
            {cards.map((card, index) => {
              const isFlipped = flippedIndices.includes(index);
              const isMatched = matchedPairIds.has(card.pairId);

              return (
                <MemoryCard
                  key={card.id || index}
                  card={card}
                  index={index}
                  isFlipped={isFlipped}
                  isMatched={isMatched}
                  onClick={onCardClick}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
