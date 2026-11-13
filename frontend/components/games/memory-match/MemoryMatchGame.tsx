'use client';

import React, { useState, useEffect } from 'react';
import { useMemoryMatch } from '@/lib/hooks/useMemoryMatch';
import { GameHUD } from './GameHUD';
import { GameBoard } from './GameBoard';
import { StartScreen } from './StartScreen';
import { VictoryModal } from './VictoryModal';
import { arcadeApi } from '@/lib/api/arcade';
import { useUserStore } from '@/lib/store/userStore';

export const MemoryMatchGame: React.FC = () => {
  const {
    cards,
    flippedIndices,
    matchedPairIds,
    moves,
    timeElapsed,
    gameStatus,
    countdown,
    score,
    lastResult,
    isMuted,
    startGame,
    handleCardClick,
    toggleSound,
  } = useMemoryMatch();

  const [unlockedBadge, setUnlockedBadge] = useState<any>(null);
  const [personalBest, setPersonalBest] = useState<number>(0);
  const [hasSaved, setHasSaved] = useState<boolean>(false);

  // Load user's initial stats
  useEffect(() => {
    arcadeApi
      .getMemoryMatchStats()
      .then((stats) => {
        if (stats?.bestScore) {
          setPersonalBest(stats.bestScore);
        }
      })
      .catch(() => {});
  }, []);

  // When game is won, report results to backend & award XP in store
  useEffect(() => {
    if (gameStatus === 'won' && lastResult && !hasSaved) {
      setHasSaved(true);

      // Instantly update local Zustand store for responsive HUD XP
      const { xp, user } = useUserStore.getState();
      useUserStore.setState({
        xp: (xp || 0) + lastResult.xpEarned,
        user: user ? { ...user, xp: (user.xp || 0) + lastResult.xpEarned } : user,
      });

      arcadeApi
        .saveMemoryMatchSession({
          score: lastResult.score,
          timeElapsed: lastResult.timeElapsed,
          moves: lastResult.moves,
        })
        .then((resp) => {
          if (resp?.newBadgeUnlocked || resp?.badge) {
            setUnlockedBadge(resp.newBadgeUnlocked || resp.badge);
          }
          if (resp?.stats?.bestScore) {
            setPersonalBest(resp.stats.bestScore);
          }
        })
        .catch(() => {
          // Offline resilient fallback
        });
    }

    if (gameStatus === 'playing') {
      setHasSaved(false);
      setUnlockedBadge(null);
    }
  }, [gameStatus, lastResult, hasSaved]);

  return (
    <div
      style={{
        background: 'linear-gradient(180deg, #CDE3F7 0%, #D9BEEA 50%, #F2A9C9 100%)',
      }}
      className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden flex flex-col justify-between py-6 px-3 sm:px-6"
    >
      {/* Drifting Pixel Clouds Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        <div
          className="absolute top-10 left-[-150px] w-48 h-12 bg-white/50 rounded-none shadow-[4px_4px_0_rgba(255,255,255,0.7)] animate-pulse"
          style={{
            animation: 'drift 45s linear infinite',
            imageRendering: 'pixelated',
          }}
        />
        <div
          className="absolute top-28 left-[-100px] w-64 h-16 bg-white/40 rounded-none shadow-[4px_4px_0_rgba(255,255,255,0.6)]"
          style={{
            animation: 'drift 65s linear infinite 15s',
            imageRendering: 'pixelated',
          }}
        />
        <div
          className="absolute top-64 left-[-120px] w-52 h-14 bg-white/45 rounded-none shadow-[4px_4px_0_rgba(255,255,255,0.5)]"
          style={{
            animation: 'drift 55s linear infinite 30s',
            imageRendering: 'pixelated',
          }}
        />
      </div>

      <style jsx>{`
        @keyframes drift {
          0% {
            transform: translateX(-200px);
          }
          100% {
            transform: translateX(110vw);
          }
        }
      `}</style>

      {/* Top HUD */}
      <div className="relative z-10 w-full mb-4">
        <GameHUD
          timeElapsed={timeElapsed}
          moves={moves}
          score={score}
          isMuted={isMuted}
          onToggleSound={toggleSound}
          onRestart={startGame}
          gameStatus={gameStatus}
        />
      </div>

      {/* Main Play Area */}
      <main className="relative z-10 flex-1 flex items-center justify-center py-2">
        {gameStatus === 'idle' || (gameStatus === 'countdown' && cards.length === 0) ? (
          <StartScreen
            onStart={startGame}
            countdown={countdown}
            gameStatus={gameStatus}
            bestScore={personalBest}
          />
        ) : (
          <GameBoard
            cards={cards}
            flippedIndices={flippedIndices}
            matchedPairIds={matchedPairIds}
            onCardClick={handleCardClick}
          />
        )}
      </main>

      {/* Bottom Motivational Footer */}
      <footer className="relative z-10 text-center text-[9px] font-pixel text-[#1B2A4A]/70 uppercase tracking-widest pt-4">
        Press [Tab] & [Enter] to flip with keyboard • Match all 6 pairs to claim your glory!
      </footer>

      {/* Victory Celebration Modal */}
      {gameStatus === 'won' && lastResult && (
        <VictoryModal
          result={lastResult}
          onPlayAgain={startGame}
          unlockedBadge={unlockedBadge}
        />
      )}
    </div>
  );
};
