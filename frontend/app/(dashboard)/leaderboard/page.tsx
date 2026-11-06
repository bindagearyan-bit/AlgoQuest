'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { gamificationApi } from '@/lib/api/gamification';
import { PixelCard } from '@/components/ui/PixelCard';
import { Trophy, Medal, Zap, Flame } from 'lucide-react';

export default function LeaderboardPage() {
  const [league, setLeague] = useState<'BRONZE' | 'SILVER' | 'GOLD' | 'DIAMOND'>('BRONZE');

  const { data: leaderboard, isLoading } = useQuery({
    queryKey: ['leaderboard', league],
    queryFn: () => gamificationApi.getLeaderboard(league),
  });

  const leagues = [
    { id: 'BRONZE', label: 'Bronze' },
    { id: 'SILVER', label: 'Silver' },
    { id: 'GOLD', label: 'Gold' },
    { id: 'DIAMOND', label: 'Diamond' },
  ] as const;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Title */}
      <div className="text-center space-y-2">
        <span className="font-pixel text-[10px] text-[#8B7FD9] uppercase">
          GLOBAL GUILD RANKINGS
        </span>
        <h1 className="font-pixel text-lg sm:text-2xl text-[#1A2744]">
          HALL OF FAME
        </h1>
        <p className="font-body text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
          Top performers in each division advance to higher leagues every Sunday at midnight.
        </p>
      </div>

      {/* League Selection Tabs */}
      <div className="flex justify-center gap-2 p-1 bg-slate-200/80 rounded-2xl max-w-md mx-auto">
        {leagues.map((l) => (
          <button
            key={l.id}
            onClick={() => setLeague(l.id)}
            className={`flex-1 py-2 rounded-xl font-pixel text-[10px] transition-all uppercase ${
              league === l.id
                ? 'bg-white text-[#1A2744] shadow-sm font-bold border border-[#1A2744]/15'
                : 'text-slate-500 hover:text-[#1A2744]'
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>

      {/* Leaderboard Table Card */}
      <PixelCard variant="white" className="p-0 overflow-hidden">
        {isLoading ? (
          <div className="py-12 text-center font-pixel text-xs text-[#1A2744]">
            RETRIEVING LEAGUE HEROES...
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {(leaderboard || []).map((user: any, idx: number) => {
              const isTop3 = idx < 3;
              const rankColor =
                idx === 0
                  ? 'text-amber-500'
                  : idx === 1
                  ? 'text-slate-400'
                  : idx === 2
                  ? 'text-amber-700'
                  : 'text-slate-500';

              return (
                <div
                  key={user.id || idx}
                  className={`flex items-center justify-between p-4 sm:px-6 transition-colors ${
                    isTop3 ? 'bg-amber-50/20' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div className="w-8 text-center font-pixel text-xs sm:text-sm font-bold">
                      <span className={rankColor}>#{idx + 1}</span>
                    </div>

                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-xl bg-[#8B7FD9] flex items-center justify-center text-white font-pixel text-xs border border-[#1A2744]/20">
                      {user.username.slice(0, 2).toUpperCase()}
                    </div>

                    {/* Username */}
                    <div>
                      <h3 className="font-pixel text-xs sm:text-sm text-[#1A2744]">
                        {user.username}
                      </h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="font-pixel text-[8px] text-slate-400">
                          {user.currentLeague}
                        </span>
                        <span className="text-[10px] text-slate-500 flex items-center gap-1">
                          <Flame size={12} className="text-orange-500 fill-orange-500" />
                          {user.streakCount || 0}d streak
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* XP */}
                  <div className="flex items-center gap-1.5 font-pixel text-xs sm:text-sm text-[#8B7FD9]">
                    <Zap size={16} className="fill-current" />
                    <span>{user.xp} XP</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </PixelCard>
    </div>
  );
}

