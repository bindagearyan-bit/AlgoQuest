'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { generateShuffledDeck, PlayCard } from '@/components/games/memory-match/cardData';
import { soundManager } from '@/lib/audio/soundManager';

export type GameStatus = 'idle' | 'countdown' | 'playing' | 'won';

export interface MemoryMatchResult {
  score: number;
  timeElapsed: number;
  moves: number;
  xpEarned: number;
  isPerfectGame: boolean;
  baseScore: number;
  timeBonus: number;
  movesBonus: number;
  perfectBonus: number;
}

export function useMemoryMatch() {
  const [cards, setCards] = useState<PlayCard[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedPairIds, setMatchedPairIds] = useState<Set<string>>(new Set());
  const [moves, setMoves] = useState<number>(0);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState<GameStatus>('idle');
  const [countdown, setCountdown] = useState<number | string>(3);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [lastResult, setLastResult] = useState<MemoryMatchResult | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize sound mute state
  useEffect(() => {
    setIsMuted(soundManager.isMuted());
  }, []);

  const toggleSound = useCallback(() => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  }, []);

  // Timer loop while playing
  useEffect(() => {
    if (gameStatus === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [gameStatus]);

  // Compute live score
  const calculateScoreBreakdown = useCallback(
    (currentMoves: number, currentTime: number, matchedCount: number): MemoryMatchResult => {
      const baseScore = matchedCount * 100;
      const timeBonus = Math.max(0, 300 - currentTime);
      const movesBonus = Math.max(0, (20 - currentMoves) * 10);
      const isPerfect = currentMoves <= 12 && matchedCount === 6;
      const perfectBonus = isPerfect ? 200 : 0;
      const totalScore = baseScore + timeBonus + movesBonus + perfectBonus;
      const xpEarned = currentTime < 60 ? 25 : 10;

      return {
        score: totalScore,
        timeElapsed: currentTime,
        moves: currentMoves,
        xpEarned,
        isPerfectGame: isPerfect,
        baseScore,
        timeBonus,
        movesBonus,
        perfectBonus,
      };
    },
    []
  );

  const currentScore = calculateScoreBreakdown(moves, timeElapsed, matchedPairIds.size).score;

  // Start Countdown Sequence
  const startGame = useCallback(() => {
    setCards(generateShuffledDeck());
    setFlippedIndices([]);
    setMatchedPairIds(new Set());
    setMoves(0);
    setTimeElapsed(0);
    setIsProcessing(false);
    setLastResult(null);
    setGameStatus('countdown');
    setCountdown(3);

    soundManager.play('countdown-beep');

    let count = 3;
    const interval = setInterval(() => {
      count -= 1;
      if (count > 0) {
        setCountdown(count);
        soundManager.play('countdown-beep');
      } else if (count === 0) {
        setCountdown('GO!');
        soundManager.play('countdown-beep');
      } else {
        clearInterval(interval);
        setGameStatus('playing');
      }
    }, 900);
  }, []);

  // Card click handler
  const handleCardClick = useCallback(
    (index: number) => {
      if (gameStatus !== 'playing') return;
      if (isProcessing) return;
      if (flippedIndices.length >= 2) return;
      if (flippedIndices.includes(index)) return; // Already flipped in current turn
      if (matchedPairIds.has(cards[index].pairId)) return; // Already solved

      soundManager.play('card-flip');

      const nextFlipped = [...flippedIndices, index];
      setFlippedIndices(nextFlipped);

      if (nextFlipped.length === 2) {
        setIsProcessing(true);
        const nextMoves = moves + 1;
        setMoves(nextMoves);

        const cardA = cards[nextFlipped[0]];
        const cardB = cards[nextFlipped[1]];

        // Wait 400ms before checking match per spec
        setTimeout(() => {
          if (cardA.pairId === cardB.pairId) {
            // MATCH!
            soundManager.play('match-chime');
            const updatedMatches = new Set(matchedPairIds);
            updatedMatches.add(cardA.pairId);
            setMatchedPairIds(updatedMatches);
            setFlippedIndices([]);
            setIsProcessing(false);

            // Check Win Condition (6 pairs)
            if (updatedMatches.size === 6) {
              setTimeout(() => {
                soundManager.play('victory-fanfare');
                setGameStatus('won');
                const finalBreakdown = calculateScoreBreakdown(nextMoves, timeElapsed, 6);
                setLastResult(finalBreakdown);
              }, 400);
            }
          } else {
            // NO MATCH!
            soundManager.play('no-match-buzz');
            // Wait 1.2 seconds before flipping back per spec
            setTimeout(() => {
              setFlippedIndices([]);
              setIsProcessing(false);
            }, 1200);
          }
        }, 400);
      }
    },
    [cards, flippedIndices, matchedPairIds, moves, timeElapsed, gameStatus, isProcessing, calculateScoreBreakdown]
  );

  return {
    cards,
    flippedIndices,
    matchedPairIds,
    moves,
    timeElapsed,
    gameStatus,
    countdown,
    score: currentScore,
    lastResult,
    isMuted,
    startGame,
    handleCardClick,
    toggleSound,
  };
}

