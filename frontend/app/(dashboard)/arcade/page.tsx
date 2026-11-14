'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { PixelCard } from '@/components/ui/PixelCard';
import { PixelButton } from '@/components/ui/PixelButton';
import { arcadeApi } from '@/lib/api/arcade';
import {
  Gamepad2,
  Trophy,
  Play,
  Clock,
  Award,
  Zap,
  Target,
  Flame,
  Star,
  Shield,
  ArrowRight,
} from 'lucide-react';

export default function ArcadeHubPage() {
  const [streakInfo, setStreakInfo] = useState<any>({ currentStreak: 0, longestStreak: 0 });
  const [todayData, setTodayData] = useState<any>(null);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    Promise.all([
      arcadeApi.getUserStreakInfo(),
      arcadeApi.getTodayDungeon(),
      arcadeApi.getDailyLeaderboard(undefined, false, 3),
    ])
      .then(([streakRes, todayRes, lbRes]) => {
        if (streakRes) setStreakInfo(streakRes);
        if (todayRes) setTodayData(todayRes);
        if (lbRes) setLeaderboard(lbRes);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const formatCountdown = (secs: number) => {
    if (!secs) return '00h 00m';
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    return `${h}h ${m}m`;
  };

  const formatTime = (seconds: number) => {
    if (!seconds) return '--:--';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 select-none">
      {/* Header Banner */}
      <div className="relative rounded-2xl border-[3px] border-[#00F0FF] bg-gradient-to-r from-[#0D0B2E] via-[#1A1744] to-[#0D0B2E] shadow-[0_0_30px_rgba(0,240,255,0.2)] overflow-hidden p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00F0FF]/20 border border-[#00F0FF] text-[9px] font-pixel text-[#00F0FF]">
            <Gamepad2 size={12} className="text-[#00F0FF]" />
            <span>ALGOQUEST ARCADE DUNGEON</span>
          </div>

          <h1 className="font-pixel text-lg sm:text-2xl text-white drop-shadow-[2px_2px_0_#000]">
            HERO'S BREAK CORNER
          </h1>

          <p className="font-body text-xs sm:text-sm text-slate-200 max-w-lg leading-relaxed">
            Need a quick break from syllabus stages? Test your wits in our 10-room Daily Algorithm Escape Room. Procedural daily resets, zero typing, pure visual logic.
          </p>
        </div>

        {/* Streak Pill */}
        <div className="bg-[#120F38] border-[3px] border-[#FFD700] p-4 rounded-xl shadow-[0_0_20px_rgba(255,215,0,0.3)] text-center min-w-[200px] z-10">
          <span className="font-pixel text-[8px] text-slate-400 block uppercase mb-1">
            DAILY ESCAPE STREAK
          </span>
          <div className="flex items-center justify-center gap-1.5 text-amber-400">
            <Flame size={20} className="fill-current animate-bounce" />
            <span className="font-pixel text-2xl text-[#FFD700] font-bold">
              {streakInfo.currentStreak || 0}
            </span>
          </div>
          <span className="font-pixel text-[8px] text-[#7FFFD4] bg-[#7FFFD4]/10 px-2 py-0.5 border border-[#7FFFD4]/30 inline-block mt-1 rounded">
            DAYS SURVIVED
          </span>
        </div>
      </div>

      {/* Main Grid: Flagship Daily Escape Card + Top 3 Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Flagship Daily Escape Room Card */}
        <div className="lg:col-span-2 space-y-6">
          <PixelCard variant="parchment">
            <div className="flex items-center justify-between mb-4 border-b border-[#3E2723]/20 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">🏰</span>
                <span className="font-pixel text-xs sm:text-sm text-[#1A2744]">
                  DAILY ALGORITHM ESCAPE ROOM
                </span>
              </div>
              <span className="font-pixel text-[8px] sm:text-[9px] bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-300">
                FLAGSHIP DAILY GAME
              </span>
            </div>

            {/* Game Visual Banner */}
            <div className="relative rounded-xl border-2 border-[#1B2A4A] bg-gradient-to-r from-[#0D0B2E] via-[#1A1744] to-[#2E1F3D] p-6 mb-6 overflow-hidden flex flex-col items-center justify-center text-center shadow-inner min-h-[180px]">
              {/* 3 Floating Room Preview Tiles */}
              <div className="flex gap-2.5 sm:gap-4 mb-4 select-none">
                <div className="w-14 h-14 bg-[#120F38] border-2 border-[#00F0FF] shadow-[2px_2px_0_#000] flex flex-col items-center justify-center p-1 rotate-[-3deg]">
                  <span className="font-pixel text-[7px] text-[#00F0FF]">ROOM 1</span>
                  <span className="text-lg">🗝️</span>
                  <span className="font-pixel text-[6px] text-white">ARRAY</span>
                </div>
                <div className="w-14 h-14 bg-[#120F38] border-2 border-[#FF2FD4] shadow-[2px_2px_0_#000] flex flex-col items-center justify-center p-1 rotate-[2deg]">
                  <span className="font-pixel text-[7px] text-[#FF2FD4]">ROOM 3</span>
                  <span className="text-lg">🔴</span>
                  <span className="font-pixel text-[6px] text-white">STACK</span>
                </div>
                <div className="w-14 h-14 bg-[#120F38] border-2 border-[#7FFFD4] shadow-[2px_2px_0_#000] flex flex-col items-center justify-center p-1 rotate-[-2deg]">
                  <span className="font-pixel text-[7px] text-[#7FFFD4]">ROOM 5</span>
                  <span className="text-lg">⚔️</span>
                  <span className="font-pixel text-[6px] text-white">QUEUE</span>
                </div>
              </div>

              <span className="font-pixel text-xs sm:text-sm text-[#FFD700] drop-shadow-[2px_2px_0_#000]">
                "A NEW DUNGEON AWAITS EVERY DAY. CAN YOU ESCAPE?"
              </span>
            </div>

            {/* Game Attributes / Badges */}
            <div className="flex flex-wrap gap-2 mb-4 font-pixel text-[9px]">
              <span className="flex items-center gap-1 bg-[#FFF9E6] border border-[#FFD93D] px-2.5 py-1 text-amber-900 rounded">
                <Clock size={12} className="text-amber-600" /> ~3 MINUTES (180s)
              </span>
              <span className="flex items-center gap-1 bg-emerald-50 border border-emerald-300 px-2.5 py-1 text-emerald-800 rounded">
                <Target size={12} className="text-emerald-600" /> 1-2 TAP INTERACTION
              </span>
              <span className="flex items-center gap-1 bg-cyan-50 border border-cyan-300 px-2.5 py-1 text-cyan-800 rounded">
                <Zap size={12} className="text-cyan-600" /> +50 TO +200 XP
              </span>
              <span className="flex items-center gap-1 bg-purple-50 border border-purple-300 px-2.5 py-1 text-purple-800 rounded">
                <Award size={12} className="text-purple-600" /> EXCLUSIVE DAILY BADGES
              </span>
            </div>

            {/* Description */}
            <p className="font-body text-xs sm:text-sm text-slate-700 leading-relaxed mb-6">
              Survive 10 rapid procedural rooms: Array Indexing, Boundary Spike Pit, Stack Rune Pillar, Stack Overflow Trap, Queue FIFO Checkpoint, Loop Counter Bridge, If-Else Gate, Linked List Chain, Recursion Portal, and the Final Logic Vault. Zero code typing — test your DSA instincts!
            </p>

            {/* Action Row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-200">
              <div className="flex items-center gap-4 text-xs font-pixel text-[#1A2744]">
                <div>
                  <span className="text-slate-500 block text-[8px] uppercase">TODAY'S DUNGEON</span>
                  <span className="font-bold text-[#E65100] text-xs sm:text-sm">
                    {todayData?.formattedDate || 'TODAY'}
                  </span>
                </div>
                {todayData?.expiresInSeconds && (
                  <div>
                    <span className="text-slate-500 block text-[8px] uppercase">EXPIRES IN</span>
                    <span className="font-bold text-slate-700 text-xs sm:text-sm">
                      {formatCountdown(todayData.expiresInSeconds)}
                    </span>
                  </div>
                )}
              </div>

              <Link href="/arcade/escape-room">
                <PixelButton variant="mint" size="lg" className="px-8 py-3 text-xs sm:text-sm">
                  <Play size={16} className="mr-2 fill-current" />
                  {todayData?.hasPlayedToday ? 'PRACTICE DUNGEON' : 'PLAY TODAY’S DUNGEON'}
                </PixelButton>
              </Link>
            </div>
          </PixelCard>
        </div>

        {/* Right Column: Today's Leaderboard Preview */}
        <div className="space-y-6">
          <PixelCard variant="parchment">
            <div className="flex items-center justify-between mb-4 border-b border-[#3E2723]/20 pb-3">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500" />
                <h3 className="font-pixel text-xs text-[#1A2744] uppercase">
                  DAILY LEADERBOARD
                </h3>
              </div>
              <Link href="/arcade/escape-room" className="font-pixel text-[8px] text-[#2E7D32] underline">
                VIEW TOP 100 →
              </Link>
            </div>

            {loading ? (
              <div className="py-8 text-center font-pixel text-[9px] text-slate-400">
                LOADING CHAMPIONS...
              </div>
            ) : leaderboard.length === 0 ? (
              <div className="py-8 text-center font-pixel text-[9px] text-slate-500">
                NO ESCAPES YET TODAY. ENTER FIRST!
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
                      <span className="text-[#00F0FF] font-bold">
                        {formatTime(entry.timeElapsed)}
                      </span>
                      <span className="text-slate-500 text-[8px]">
                        ({entry.livesRemaining}❤️)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-slate-200">
              <Link href="/arcade/escape-room" className="block w-full">
                <PixelButton variant="outline" size="sm" className="w-full text-[9px]">
                  OPEN ESCAPE CALENDAR & STATS
                </PixelButton>
              </Link>
            </div>
          </PixelCard>
        </div>
      </div>
    </div>
  );
}
