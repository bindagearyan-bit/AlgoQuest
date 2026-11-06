'use client';

import React from 'react';
import Link from 'next/link';
import { useProgress } from '@/lib/hooks/useProgress';
import { useUser } from '@/lib/hooks/useUser';
import { PixelCard } from '@/components/ui/PixelCard';
import { PixelButton } from '@/components/ui/PixelButton';
import { PixelProgressBar } from '@/components/ui/PixelProgressBar';
import { Swords, Flame, Trophy, Play, CheckCircle2, Award } from 'lucide-react';

export default function MainDashboardPage() {
  const { user } = useUser();
  const { activeProgress, isLoading } = useProgress();

  const sublevelId = activeProgress?.sublevelId || 1;
  const currentStage = activeProgress?.currentStage || 1;
  const sublevelTitle = activeProgress?.sublevel?.title || 'Asymptotic Analysis & Big-O';
  const levelTitle = activeProgress?.sublevel?.level?.title || 'Level 1: Foundations & Core Mechanics';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#EAF4FC] via-[#FDEFF7] to-[#F8FAFC] border-2 border-[#1A2744]/15">
        <div>
          <span className="font-pixel text-[10px] text-[#8B7FD9] uppercase block mb-1">
            CURRENT ADVENTURER
          </span>
          <h1 className="font-pixel text-base sm:text-xl text-[#1A2744]">
            GREETINGS, {user?.username || 'KNIGHT'}!
          </h1>
          <p className="font-body text-xs sm:text-sm text-[#1A2744]/70 mt-1">
            Current League: <span className="font-pixel text-[10px] text-[#8B7FD9]">{user?.currentLeague || 'BRONZE'}</span> | Streak: {user?.streakCount || 0} Days
          </p>
        </div>

        <Link href={`/sublevel/${sublevelId}/stage/${currentStage}`}>
          <PixelButton variant="mint" size="lg">
            <Play size={16} className="mr-2 fill-current" /> RESUME QUEST
          </PixelButton>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Column: Continue Quest Card & Active Level Map */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Quest Card */}
          <PixelCard variant="white">
            <div className="flex items-center justify-between mb-4">
              <span className="font-pixel text-[10px] text-[#8B7FD9] uppercase">
                ACTIVE CAMPAIGN
              </span>
              <span className="font-pixel text-[10px] text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                STAGE {currentStage} / 8
              </span>
            </div>

            <h2 className="font-pixel text-sm sm:text-base text-[#1A2744] mb-1">
              {sublevelTitle}
            </h2>
            <p className="font-body text-xs text-slate-500 mb-6">{levelTitle}</p>

            {/* Stage Progress Bar */}
            <div className="mb-6">
              <PixelProgressBar current={currentStage} total={8} showLabel />
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href={`/sublevel/${sublevelId}/stage/${currentStage}`}>
                <PixelButton variant="mint" size="md">
                  CONTINUE STAGE {currentStage}
                </PixelButton>
              </Link>
              <Link href={`/sublevel/${sublevelId}`}>
                <PixelButton variant="outline" size="md">
                  VIEW STAGES
                </PixelButton>
              </Link>
            </div>
          </PixelCard>

          {/* Quick Access Roadmap Preview */}
          <PixelCard variant="blue">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-pixel text-xs text-[#1A2744] uppercase">
                DUNGEON ROADMAP PROGRESSION
              </h3>
              <Link href="/roadmap" className="font-pixel text-[10px] text-[#8B7FD9] underline">
                FULL SKILL TREE →
              </Link>
            </div>

            <div className="space-y-3">
              {[
                { title: 'Level 1: Foundations & Core Mechanics', status: 'IN_PROGRESS', icon: '⚔️' },
                { title: 'Level 2: Linear Data Structures', status: 'LOCKED', icon: '🛡️' },
                { title: 'Level 3: Non-Linear Trees & Heaps', status: 'LOCKED', icon: '🌲' },
                { title: 'Level 4: Graph Algorithms & Flow', status: 'LOCKED', icon: '🗺️' },
              ].map((lvl, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-white rounded-xl border border-[#1A2744]/15 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{lvl.icon}</span>
                    <span className="font-pixel text-xs text-[#1A2744]">{lvl.title}</span>
                  </div>
                  <span
                    className={`font-pixel text-[9px] px-2.5 py-1 rounded-full border ${
                      lvl.status === 'IN_PROGRESS'
                        ? 'bg-[#7FFFD4]/30 text-emerald-800 border-[#7FFFD4]'
                        : 'bg-slate-100 text-slate-500 border-slate-200'
                    }`}
                  >
                    {lvl.status === 'IN_PROGRESS' ? 'ACTIVE' : 'LOCKED'}
                  </span>
                </div>
              ))}
            </div>
          </PixelCard>
        </div>

        {/* Right Sidebar: Daily Goals & Achievements */}
        <div className="space-y-6">
          {/* Daily Goals Card */}
          <PixelCard variant="pink">
            <div className="flex items-center gap-2 mb-4">
              <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
              <h3 className="font-pixel text-xs text-[#1A2744] uppercase">DAILY QUESTS</h3>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-pixel mb-1 text-[#1A2744]">
                  <span>EARN 50 XP TODAY</span>
                  <span>{Math.min(50, user?.xp || 0)} / 50</span>
                </div>
                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden border border-[#1A2744]/20">
                  <div
                    className="h-full bg-[#7FFFD4]"
                    style={{ width: `${Math.min(100, ((user?.xp || 0) / 50) * 100)}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-pixel mb-1 text-[#1A2744]">
                  <span>COMPLETE 1 STAGE</span>
                  <span>{currentStage > 1 ? '1 / 1' : '0 / 1'}</span>
                </div>
                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden border border-[#1A2744]/20">
                  <div
                    className="h-full bg-[#FF6FA0]"
                    style={{ width: currentStage > 1 ? '100%' : '0%' }}
                  />
                </div>
              </div>
            </div>
          </PixelCard>

          {/* Badges / Achievements Carousel */}
          <PixelCard variant="white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500" />
                <h3 className="font-pixel text-xs text-[#1A2744] uppercase">ACHIEVEMENTS</h3>
              </div>
              <Link href="/goals" className="font-pixel text-[9px] text-[#8B7FD9] underline">
                VIEW ALL
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { title: 'First Quest', icon: '🌱', unlocked: true },
                { title: 'On Fire', icon: '🔥', unlocked: (user?.streakCount || 0) >= 3 },
                { title: 'Boss Slayer', icon: '⚔️', unlocked: false },
              ].map((b, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-xl border text-center flex flex-col items-center justify-center ${
                    b.unlocked
                      ? 'bg-amber-50/60 border-amber-300'
                      : 'bg-slate-50 border-slate-200 opacity-40'
                  }`}
                >
                  <span className="text-2xl mb-1">{b.icon}</span>
                  <span className="font-pixel text-[8px] text-[#1A2744]">{b.title}</span>
                </div>
              ))}
            </div>
          </PixelCard>
        </div>
      </div>
    </div>
  );
}

