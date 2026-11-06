'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { gamificationApi } from '@/lib/api/gamification';
import { PixelCard } from '@/components/ui/PixelCard';
import { Trophy, Medal, Zap, Flame, Crown, Shield } from 'lucide-react';

export default function LeaderboardPage() {
  const [league, setLeague] = useState<'BRONZE' | 'SILVER' | 'GOLD' | 'DIAMOND'>('BRONZE');

  const { data: leaderboard, isLoading } = useQuery({
    queryKey: ['leaderboard', league],
    queryFn: () => gamificationApi.getLeaderboard(league),
  });

  const leagues = [
    { id: 'BRONZE', label: 'Bronze Guild', color: '#CD7F32' },
    { id: 'SILVER', label: 'Silver League', color: '#C0C0C0' },
    { id: 'GOLD', label: 'Gold Champions', color: '#FFD54F' },
    { id: 'DIAMOND', label: 'Diamond Knights', color: '#00E5FF' },
  ] as const;

  const biomeBadges = ['🏡 Village Knight', '🏰 Citadel Lord', '🍃 Isles Mage', '❄️ Glacier Ranger', '🌋 Volcano Berserker', '👑 Sky Champion'];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Guild Hall Bulletin Header with 16-Bit Pixel Art Tavern Image */}
      <div className="relative rounded-2xl border-[3px] border-[#3E2723] overflow-hidden shadow-[4px_4px_0_#1B2A4A] p-6 text-center space-y-2 bg-[#1f1610]">
        <Image
          src="/images/guild-hall.png"
          alt="Adventurer Guild Hall"
          fill
          priority
          className="object-cover opacity-45 pointer-events-none"
          style={{ imageRendering: 'pixelated' }}
        />
        <div className="relative z-10 space-y-1">
          <span className="font-pixel text-[9px] text-[#FFD54F] uppercase bg-[#3E2723]/80 px-2 py-0.5 rounded border border-[#FFD54F]/40">
            TAVERN BULLETIN BOARD
          </span>
          <h1 className="font-pixel text-lg sm:text-2xl text-white drop-shadow-[2px_2px_0_#000]">
            GUILD HALL RANKINGS
          </h1>
          <p className="font-body text-xs sm:text-sm text-amber-100/90 max-w-md mx-auto leading-relaxed">
            Honored heroes across the 6 floating biomes. The top guild members receive weekly gem treasures.
          </p>
        </div>
      </div>

      {/* League Selection Tabs styled as Wooden Notice Signposts */}
      <div className="flex justify-center flex-wrap gap-2 p-1.5 bg-[#4E342E] rounded-2xl max-w-lg mx-auto border-[3px] border-[#271815] shadow-pixel">
        {leagues.map((l) => (
          <button
            key={l.id}
            onClick={() => setLeague(l.id)}
            className={`flex-1 min-w-[100px] py-2 px-3 rounded-xl font-pixel text-[9px] transition-all uppercase ${
              league === l.id
                ? 'bg-[#FFD54F] text-[#1A2744] shadow-sm font-bold border-2 border-[#FFB300]'
                : 'text-amber-100/70 hover:text-white hover:bg-white/10'
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>

      {/* Guild Hall Wooden Board Card */}
      <div className="rounded-2xl border-[4px] border-[#3E2723] bg-[#FFF9E6] shadow-[6px_6px_0px_#1B2A4A] overflow-hidden">
        {/* Gold Banner Heading */}
        <div className="bg-[#FFD54F] border-b-[3px] border-[#3E2723] px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-[#3E2723]" />
            <span className="font-pixel text-xs text-[#3E2723] uppercase">
              {league} DIVISION GUILD ROSTER
            </span>
          </div>
          <span className="font-pixel text-[9px] text-[#3E2723] opacity-80">
            RESET: SUNDAY MIDNIGHT
          </span>
        </div>

        {isLoading ? (
          <div className="py-12 text-center font-pixel text-xs text-[#1A2744]">
            RETRIEVING GUILD NOTICE BOARD...
          </div>
        ) : (
          <div className="divide-y divide-[#3E2723]/15">
            {(leaderboard || []).map((user: any, idx: number) => {
              const isTop3 = idx < 3;
              const rankColor =
                idx === 0
                  ? 'text-amber-600 font-bold'
                  : idx === 1
                  ? 'text-slate-600 font-bold'
                  : idx === 2
                  ? 'text-amber-800 font-bold'
                  : 'text-slate-500';

              return (
                <div
                  key={user.id || idx}
                  className={`flex items-center justify-between p-4 sm:px-6 transition-colors ${
                    isTop3 ? 'bg-[#FFF4D6]' : 'hover:bg-white/60'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Rank Number */}
                    <div className="w-8 text-center font-pixel text-xs sm:text-sm">
                      <span className={rankColor}>#{idx + 1}</span>
                    </div>

                    {/* Character Avatar */}
                    <div className="w-10 h-10 rounded-xl bg-[#4CAF50] flex items-center justify-center text-white font-pixel text-xs border-2 border-[#1B2A4A] shadow-[2px_2px_0_#1B2A4A]">
                      {user.username.slice(0, 2).toUpperCase()}
                    </div>

                    {/* Name & Biome Badge */}
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-pixel text-xs text-[#1A2744]">
                          {user.username}
                        </h3>
                        <span className="text-[9px] font-pixel text-[#2E7D32] bg-emerald-100/70 px-2 py-0.5 rounded border border-emerald-300">
                          {biomeBadges[idx % biomeBadges.length]}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-slate-500 flex items-center gap-1 font-body">
                          <Flame size={12} className="text-orange-500 fill-orange-500" />
                          {user.streakCount || 0}d streak
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Gold XP Total */}
                  <div className="flex items-center gap-1.5 font-pixel text-xs text-[#3E2723] bg-[#FFD54F]/30 px-3 py-1.5 rounded-full border border-[#FFD54F]">
                    <Zap size={14} className="text-amber-600 fill-amber-500" />
                    <span>{user.xp} XP</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
