'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { gamificationApi } from '@/lib/api/gamification';
import { useUser } from '@/lib/hooks/useUser';
import { PixelCard } from '@/components/ui/PixelCard';
import { Flame, Trophy, Award, CheckCircle2, Zap } from 'lucide-react';

export default function GoalsPage() {
  const { user } = useUser();
  const { data: badges, isLoading } = useQuery({
    queryKey: ['badges'],
    queryFn: () => gamificationApi.getBadges(),
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div className="text-center space-y-2">
        <span className="font-pixel text-[10px] text-[#8B7FD9] uppercase">
          QUEST JOURNAL
        </span>
        <h1 className="font-pixel text-lg sm:text-2xl text-[#1A2744]">
          DAILY GOALS & ACHIEVEMENTS
        </h1>
        <p className="font-body text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
          Complete daily tasks to maintain your streak flame and collect legendary dungeon trophies.
        </p>
      </div>

      {/* Daily XP Target */}
      <PixelCard variant="blue">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center border-2 border-[#1A2744]">
            <Flame size={20} />
          </div>
          <div>
            <span className="font-pixel text-[9px] text-[#8B7FD9] uppercase">DAILY PROGRESS</span>
            <h2 className="font-pixel text-xs sm:text-sm text-[#1A2744]">50 XP DAILY TARGET</h2>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between font-pixel text-xs text-[#1A2744]">
            <span>TODAY'S HARVEST</span>
            <span>{Math.min(50, user?.xp || 0)} / 50 XP</span>
          </div>
          <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden border border-[#1A2744]/20">
            <div
              className="h-full bg-[#7FFFD4]"
              style={{ width: `${Math.min(100, ((user?.xp || 0) / 50) * 100)}%` }}
            />
          </div>
        </div>

        <p className="font-body text-xs text-slate-600">
          Complete any 2 theory stages or 1 problem stage to fill today's meter and extend your streak!
        </p>
      </PixelCard>

      {/* Achievements Roster */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          <h2 className="font-pixel text-xs sm:text-sm text-[#1A2744] uppercase">
            DUNGEON MEDALS & BADGES
          </h2>
        </div>

        {isLoading ? (
          <div className="py-8 text-center font-pixel text-xs text-[#1A2744]">
            FETCHING GUILD TROPHIES...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(badges || []).map((badge: any) => (
              <PixelCard
                key={badge.id}
                variant="white"
                className={`flex items-start gap-4 transition-all ${
                  badge.isUnlocked
                    ? 'border-amber-300 bg-amber-50/20'
                    : 'border-slate-200 opacity-50 bg-slate-50'
                }`}
              >
                <div className="text-3xl shrink-0 p-2 rounded-xl bg-white border border-slate-200 shadow-sm">
                  {badge.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-pixel text-xs text-[#1A2744]">{badge.title}</h3>
                    {badge.isUnlocked && (
                      <CheckCircle2 size={14} className="text-emerald-500" />
                    )}
                  </div>
                  <p className="font-body text-xs text-slate-600 leading-relaxed">
                    {badge.description}
                  </p>
                  <span className="font-pixel text-[8px] text-[#8B7FD9] block mt-2">
                    {badge.isUnlocked ? 'UNLOCKED' : 'LOCKED IN DUNGEON'}
                  </span>
                </div>
              </PixelCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

