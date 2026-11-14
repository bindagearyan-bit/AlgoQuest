'use client';

import React from 'react';
import { Trophy, Flame, Heart, Star, Clock } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  id: string;
  username: string;
  avatar: string;
  league: string;
  streak: number;
  timeElapsed: number;
  livesRemaining: number;
  isFlawless: boolean;
}

interface EscapeRoomLeaderboardProps {
  entries: LeaderboardEntry[];
  loading?: boolean;
  flawlessOnly: boolean;
  onToggleFlawless: () => void;
  dateFormatted?: string;
}

export const EscapeRoomLeaderboard: React.FC<EscapeRoomLeaderboardProps> = ({
  entries,
  loading = false,
  flawlessOnly,
  onToggleFlawless,
  dateFormatted,
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full rounded-2xl bg-[#09081f] border-2 border-[#00F0FF]/30 p-4 sm:p-6 shadow-[0_0_20px_rgba(0,240,255,0.1)]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#00F0FF]/20 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-[#FFD700]" />
          <div>
            <h3 className="font-pixel text-xs sm:text-sm text-white">
              DAILY GLOBAL LEADERBOARD
            </h3>
            {dateFormatted && (
              <span className="font-pixel text-[8px] text-slate-400 block">
                {dateFormatted} • RESETS AT 00:00 UTC
              </span>
            )}
          </div>
        </div>

        {/* Flawless Only Filter Toggle */}
        <button
          onClick={onToggleFlawless}
          className={`px-2.5 py-1 rounded-lg font-pixel text-[8px] sm:text-[9px] border transition-colors flex items-center gap-1 ${
            flawlessOnly
              ? 'bg-[#FFD700] text-[#09081f] border-[#FFD700] font-bold shadow-[0_0_8px_#FFD700]'
              : 'bg-[#1A1744] text-slate-400 border-slate-700 hover:text-white'
          }`}
        >
          <Star size={10} className={flawlessOnly ? 'fill-current' : ''} />
          <span>FLAWLESS ONLY (5/5 LIVES)</span>
        </button>
      </div>

      {/* Leaderboard Entries List */}
      {loading ? (
        <div className="py-12 text-center font-pixel text-[10px] text-slate-400 animate-pulse">
          CALIBRATING GLOBAL ESCAPIST ARCHIVES...
        </div>
      ) : entries.length === 0 ? (
        <div className="py-12 text-center font-pixel text-[9px] text-slate-500">
          NO ESCAPES RECORDED YET TODAY. BE THE FIRST CHAMPION TO ESCAPE!
        </div>
      ) : (
        <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
          {entries.map((runner) => (
            <div
              key={runner.id}
              className={`p-2.5 sm:p-3 rounded-xl border flex items-center justify-between transition-all ${
                runner.rank === 1
                  ? 'border-[#FFD700] bg-[#FFD700]/10 shadow-[0_0_10px_rgba(255,215,0,0.2)]'
                  : runner.rank === 2
                  ? 'border-slate-300 bg-slate-300/10'
                  : runner.rank === 3
                  ? 'border-amber-600 bg-amber-600/10'
                  : 'border-[#1A1744] bg-[#120F38]/60 hover:bg-[#1A1744]'
              }`}
            >
              {/* Rank & Username */}
              <div className="flex items-center gap-3">
                <span className="font-pixel text-xs sm:text-sm font-bold w-6 text-center text-white">
                  {runner.rank === 1 ? '🥇' : runner.rank === 2 ? '🥈' : runner.rank === 3 ? '🥉' : `${runner.rank}.`}
                </span>

                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-pixel text-[10px] sm:text-xs text-white truncate max-w-[120px] sm:max-w-[180px]">
                      {runner.username}
                    </span>
                    {runner.isFlawless && (
                      <span title="Flawless (5/5 Lives)">
                        <Star size={10} className="text-[#FFD700] fill-[#FFD700]" />
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-[8px] font-pixel text-slate-400 mt-0.5">
                    <span className="text-[#7FFFD4]">{runner.league}</span>
                    <span className="flex items-center text-amber-400">
                      <Flame size={9} className="mr-0.5 fill-current" /> {runner.streak}d
                    </span>
                  </div>
                </div>
              </div>

              {/* Time & Lives */}
              <div className="flex items-center gap-3 font-pixel text-[10px] text-right">
                <div className="flex items-center gap-1 text-[#FF2FD4]">
                  <Heart size={11} className="fill-current" />
                  <span>{runner.livesRemaining}</span>
                </div>
                <div className="flex items-center gap-1 text-[#00F0FF] font-bold">
                  <Clock size={11} />
                  <span>{formatTime(runner.timeElapsed)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
