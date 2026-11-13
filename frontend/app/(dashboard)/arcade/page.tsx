'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { PixelCard } from '@/components/ui/PixelCard';
import { PixelButton } from '@/components/ui/PixelButton';
import { arcadeApi } from '@/lib/api/arcade';
import {
  Gamepad2,
  Trophy,
  Sparkles,
  Play,
  Clock,
  Award,
  Zap,
  Target,
  Flame,
  Crown,
} from 'lucide-react';

export default function ArcadeHubPage() {
  const [stats, setStats] = useState<any>({
    bestScore: 0,
    bestTime: 0,
    bestMoves: 0,
    timesPlayed: 0,
  });
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    Promise.all([
      arcadeApi.getMemoryMatchStats(),
      arcadeApi.getMemoryMatchLeaderboard(10),
    ])
      .then(([statsData, lbData]) => {
        if (statsData) setStats(statsData);
        if (lbData) setLeaderboard(lbData);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const formatTime = (seconds: number) => {
    if (!seconds) return '--:--';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header Banner */}
      <div className="relative rounded-2xl border-[3px] border-[#1B2A4A] bg-gradient-to-r from-[#1B2A4A] via-[#2A3B66] to-[#1B2A4A] shadow-[4px_4px_0_#1B2A4A] overflow-hidden p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7FFFD4]/20 border border-[#7FFFD4] text-[9px] font-pixel text-[#7FFFD4]">
            <Gamepad2 size={12} className="text-[#7FFFD4]" />
            <span>ALGOQUEST ARCADE TAVERN</span>
          </div>

          <h1 className="font-pixel text-lg sm:text-2xl text-white drop-shadow-[2px_2px_0_#000]">
            HERO'S BREAK CORNER
          </h1>

          <p className="font-body text-xs sm:text-sm text-slate-200 max-w-lg leading-relaxed">
            Need a quick break from coding stages? Play lightweight, 60-second retro mini-games to sharpen your Data Structure vocabulary and earn bonus XP!
          </p>
        </div>

        {/* Arcade Stats Pill */}
        <div className="bg-[#FFFDF5] border-[3px] border-[#1B2A4A] p-4 shadow-[4px_4px_0_#1B2A4A] text-center min-w-[200px] z-10">
          <span className="font-pixel text-[8px] text-slate-500 block uppercase mb-1">
            ARCADE CLEARANCES
          </span>
          <span className="font-pixel text-2xl text-[#1A2744] block font-bold">
            {stats.timesPlayed}
          </span>
          <span className="font-pixel text-[8px] text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-300 inline-block mt-1">
            GAMES CLEARED
          </span>
        </div>
      </div>

      {/* Main Grid: Featured Game + Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Featured Game Card */}
        <div className="lg:col-span-2 space-y-6">
          <PixelCard variant="parchment">
            <div className="flex items-center justify-between mb-4 border-b border-[#3E2723]/20 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">🃏</span>
                <span className="font-pixel text-xs sm:text-sm text-[#1A2744]">
                  MEMORY MATCH: DS ICONS
                </span>
              </div>
              <span className="font-pixel text-[8px] sm:text-[9px] bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-300">
                ACTIVE MINI-GAME
              </span>
            </div>

            {/* Game Preview Banner */}
            <div
              style={{
                background: 'linear-gradient(180deg, #CDE3F7 0%, #D9BEEA 50%, #F2A9C9 100%)',
              }}
              className="relative rounded-xl border-2 border-[#1B2A4A] p-6 mb-6 overflow-hidden flex flex-col items-center justify-center text-center shadow-inner min-h-[180px]"
            >
              {/* Sample Mini Cards Display */}
              <div className="flex gap-2.5 sm:gap-4 mb-4 select-none">
                {/* Array Icon Mini Card */}
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white border-2 border-[#7FFFD4] shadow-[2px_2px_0_#1B2A4A] flex items-center justify-center p-1 rotate-[-3deg]">
                  <span className="font-pixel text-[9px] text-[#1B2A4A] font-bold">ARRAY</span>
                </div>
                {/* Stack Icon Mini Card */}
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#1B2A4A] border-2 border-[#1B2A4A] shadow-[2px_2px_0_#1B2A4A] flex items-center justify-center rotate-[2deg]">
                  <span className="font-pixel text-xs text-[#7FFFD4] drop-shadow-[0_0_4px_#7FFFD4]">?</span>
                </div>
                {/* Tree Icon Mini Card */}
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#FDEFF7] border-2 border-[#8B7FD9] shadow-[2px_2px_0_#1B2A4A] flex items-center justify-center rotate-[-2deg]">
                  <span className="font-pixel text-[9px] text-[#8B7FD9] font-bold">TREE</span>
                </div>
              </div>

              <span className="font-pixel text-xs sm:text-sm text-[#1A2744] drop-shadow-[1px_1px_0_#FFF]">
                FLIP • RECOGNIZE • MATCH
              </span>
            </div>

            {/* Badges / Game Attributes */}
            <div className="flex flex-wrap gap-2 mb-4 font-pixel text-[9px]">
              <span className="flex items-center gap-1 bg-[#FFF9E6] border border-[#FFD93D] px-2.5 py-1 text-amber-900">
                <Clock size={12} className="text-amber-600" /> ~1 MINUTE
              </span>
              <span className="flex items-center gap-1 bg-emerald-50 border border-emerald-300 px-2.5 py-1 text-emerald-800">
                <Target size={12} className="text-emerald-600" /> BEGINNER FRIENDLY
              </span>
              <span className="flex items-center gap-1 bg-cyan-50 border border-cyan-300 px-2.5 py-1 text-cyan-800">
                <Zap size={12} className="text-cyan-600" /> +25 XP BONUS
              </span>
              <span className="flex items-center gap-1 bg-purple-50 border border-purple-300 px-2.5 py-1 text-purple-800">
                <Award size={12} className="text-purple-600" /> MEMORY MAESTRO BADGE
              </span>
            </div>

            {/* Description */}
            <p className="font-body text-xs sm:text-sm text-slate-700 leading-relaxed mb-6">
              Test your cognitive recall! Flip 12 retro pixel cards to match 6 core Data Structures (Array, Stack, Queue, Linked List, Tree, Graph) with their visual architectural representations. Zero code required — completely stress-free!
            </p>

            {/* Action Row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-200">
              <div className="flex items-center gap-4 text-xs font-pixel text-[#1A2744]">
                <div>
                  <span className="text-slate-500 block text-[8px] uppercase">YOUR BEST SCORE</span>
                  <span className="font-bold text-[#E65100] text-sm">
                    {stats.bestScore > 0 ? `${stats.bestScore} PTS` : 'NO ATTEMPTS YET'}
                  </span>
                </div>
                {stats.bestTime > 0 && (
                  <div>
                    <span className="text-slate-500 block text-[8px] uppercase">BEST TIME</span>
                    <span className="font-bold text-slate-700 text-sm">
                      {formatTime(stats.bestTime)}
                    </span>
                  </div>
                )}
              </div>

              <Link href="/arcade/memory-match">
                <PixelButton variant="mint" size="lg" className="px-8 py-3 text-xs sm:text-sm">
                  <Play size={16} className="mr-2 fill-current" /> PLAY NOW
                </PixelButton>
              </Link>
            </div>
          </PixelCard>

          {/* Upcoming Teasers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <PixelCard variant="white">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🧱</span>
                <h3 className="font-pixel text-[11px] text-[#1A2744]">STACK SLINGER</h3>
                <span className="font-pixel text-[7px] bg-slate-100 text-slate-500 px-2 py-0.5 border border-slate-300 ml-auto">
                  COMING SOON
                </span>
              </div>
              <p className="font-body text-xs text-slate-500">
                Push and pop moving data blocks to balance an unstable pixel tower.
              </p>
            </PixelCard>

            <PixelCard variant="white">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🎯</span>
                <h3 className="font-pixel text-[11px] text-[#1A2744]">SEARCH SNIPER</h3>
                <span className="font-pixel text-[7px] bg-slate-100 text-slate-500 px-2 py-0.5 border border-slate-300 ml-auto">
                  COMING SOON
                </span>
              </div>
              <p className="font-body text-xs text-slate-500">
                Binary search target guessing: find the secret element in O(log N) shots.
              </p>
            </PixelCard>
          </div>
        </div>

        {/* Right Column: Arcade Leaderboard */}
        <div className="space-y-6">
          <PixelCard variant="parchment">
            <div className="flex items-center justify-between mb-4 border-b border-[#3E2723]/20 pb-3">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500" />
                <h3 className="font-pixel text-xs text-[#1A2744] uppercase">
                  MEMORY LEADERBOARD
                </h3>
              </div>
              <span className="font-pixel text-[8px] text-slate-500">TOP 10</span>
            </div>

            {loading ? (
              <div className="py-8 text-center font-pixel text-[9px] text-slate-400">
                LOADING SCORES...
              </div>
            ) : leaderboard.length === 0 ? (
              <div className="py-8 text-center font-pixel text-[9px] text-slate-500">
                NO SCORES RECORDED YET. BE THE FIRST CHAMPION!
              </div>
            ) : (
              <div className="space-y-2">
                {leaderboard.map((entry, idx) => (
                  <div
                    key={entry.id || idx}
                    className={`flex items-center justify-between p-2 rounded-lg border text-xs font-pixel ${
                      idx === 0
                        ? 'bg-[#FFF9E6] border-[#FFD93D] shadow-sm'
                        : idx === 1
                        ? 'bg-slate-50 border-slate-300'
                        : idx === 2
                        ? 'bg-amber-50/50 border-amber-200'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 text-center font-bold text-[#1B2A4A]">
                        {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `${idx + 1}.`}
                      </span>
                      <span className="truncate max-w-[100px] text-[#1A2744]">
                        {entry.username || 'Hero'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[10px]">
                      <span className="text-[#E65100] font-bold">{entry.score} pts</span>
                      <span className="text-slate-400 text-[8px]">
                        ({entry.moves}m/{entry.timeElapsed}s)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </PixelCard>
        </div>
      </div>
    </div>
  );
}

