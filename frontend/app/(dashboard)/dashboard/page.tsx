'use client';

import React from 'react';
import Link from 'next/link';
import { useProgress } from '@/lib/hooks/useProgress';
import { useUser } from '@/lib/hooks/useUser';
import { PixelCard } from '@/components/ui/PixelCard';
import { PixelButton } from '@/components/ui/PixelButton';
import { PixelProgressBar } from '@/components/ui/PixelProgressBar';
import { Swords, Flame, Trophy, Play, CheckCircle2, Compass, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MainDashboardPage() {
  const { user } = useUser();
  const { activeProgress } = useProgress();

  const sublevelId = activeProgress?.sublevelId || 1;
  const currentStage = activeProgress?.currentStage || 1;
  const sublevelTitle = activeProgress?.sublevel?.title || 'Asymptotic Analysis & Big-O';
  const levelTitle = activeProgress?.sublevel?.level?.title || 'Level 1: Foundations Island (Beginner Village)';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Hero Panoramic Mini-Viewport of the Floating Island Overworld */}
      <div className="relative rounded-2xl border-[3px] border-[#1B2A4A] bg-gradient-to-r from-[#F3C8DD] via-[#C7D3F5] to-[#FCE4C8] shadow-[4px_4px_0_#1B2A4A] overflow-hidden p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border-2 border-[#1B2A4A] text-[9px] font-pixel text-[#2E7D32]">
            <MapPin size={12} className="text-emerald-600" />
            <span>CURRENT BIOME: BEGINNER VILLAGE MEADOWS</span>
          </div>

          <h1 className="font-pixel text-base sm:text-xl text-[#1A2744]">
            HERO {user?.username?.toUpperCase() || 'ADVENTURER'}
          </h1>

          <p className="font-body text-xs sm:text-sm text-[#1A2744]/80 max-w-lg leading-relaxed">
            Standing atop the floating isles. Your party is currently unsealing <span className="font-pixel text-[10px] text-[#2E7D32]">{sublevelTitle}</span> in the Foundations biome.
          </p>

          <div className="pt-2 flex flex-wrap gap-3 justify-center md:justify-start">
            <Link href={`/sublevel/${sublevelId}/stage/${currentStage}`}>
              <PixelButton variant="mint" size="lg">
                <Play size={14} className="mr-1.5 fill-current" /> CONTINUE STAGE {currentStage}
              </PixelButton>
            </Link>
            <Link href="/roadmap">
              <PixelButton variant="outline" size="lg">
                <Compass size={14} className="mr-1.5" /> OVERWORLD MAP
              </PixelButton>
            </Link>
          </div>
        </div>

        {/* Mini Panoramic Pixel Art Floating Island Graphic */}
        <div className="relative z-10 flex flex-col items-center shrink-0">
          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
          >
            <svg width="220" height="130" viewBox="0 0 220 130" fill="none">
              {/* Island Base with Waterfall */}
              <path d="M20,50 Q110,25 200,50 L175,100 Q110,120 45,100 Z" fill="#2E7D32" stroke="#1B2A4A" strokeWidth="3" />
              <rect x="30" y="42" width="160" height="14" rx="7" fill="#4CAF50" />
              <rect x="105" y="50" width="10" height="65" fill="#00E5FF" opacity="0.9" />
              <rect x="108" y="50" width="4" height="65" fill="#E0F7FA" />
              {/* Village Cottage & Trees */}
              <rect x="45" y="28" width="26" height="18" fill="#8D6E63" stroke="#1B2A4A" strokeWidth="2" />
              <polygon points="40,28 58,14 76,28" fill="#FBC02D" stroke="#1B2A4A" strokeWidth="2" />
              <polygon points="140,42 148,15 156,42" fill="#1B5E20" stroke="#1B2A4A" strokeWidth="1.5" />
            </svg>
          </motion.div>

          {/* Hero Avatar on Top */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <span className="text-2xl animate-bounce">🧙‍♂️</span>
            <span className="font-pixel text-[8px] bg-[#1B2A4A] text-[#FFD54F] px-1.5 py-0.5 rounded border border-[#FFD54F]">
              LVL {user?.streakCount ? Math.floor(user.streakCount / 3) + 1 : 1}
            </span>
          </div>
        </div>
      </div>

      {/* 3D Parchment Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Column: Active Quest & Stage Progression */}
        <div className="lg:col-span-2 space-y-6">
          <PixelCard variant="parchment">
            <div className="flex items-center justify-between mb-4 border-b border-[#3E2723]/20 pb-3">
              <span className="font-pixel text-[9px] text-[#2E7D32] uppercase">
                ACTIVE BIOME SECTOR
              </span>
              <span className="font-pixel text-[9px] bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-300">
                STAGE {currentStage} OF 8
              </span>
            </div>

            <h2 className="font-pixel text-sm sm:text-base text-[#1A2744] mb-1">
              {sublevelTitle}
            </h2>
            <p className="font-body text-xs text-slate-600 mb-6">{levelTitle}</p>

            <div className="mb-6">
              <PixelProgressBar current={currentStage} total={8} showLabel />
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href={`/sublevel/${sublevelId}/stage/${currentStage}`}>
                <PixelButton variant="mint" size="md">
                  ENTER STAGE {currentStage}
                </PixelButton>
              </Link>
              <Link href={`/sublevel/${sublevelId}`}>
                <PixelButton variant="outline" size="md">
                  VIEW ALL STAGES
                </PixelButton>
              </Link>
            </div>
          </PixelCard>

          {/* 6 Biomes Archipelago Overview */}
          <PixelCard variant="white">
            <div className="flex items-center justify-between mb-4 border-b pb-3">
              <h3 className="font-pixel text-xs text-[#1A2744] uppercase">
                FLOATING BIOMES CURRICULUM
              </h3>
              <Link href="/roadmap" className="font-pixel text-[9px] text-[#2E7D32] underline">
                OPEN MAP →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: '1. Foundations Village', icon: '🏡', active: true, tag: 'Meadow Realm' },
                { name: '2. Linear Citadel Castle', icon: '🏰', active: false, tag: 'Water Moats' },
                { name: '3. Sky Windmill Isles', icon: '🍃', active: false, tag: 'Archipelago' },
                { name: '4. Glacier Mountain', icon: '❄️', active: false, tag: 'Frozen Peaks' },
                { name: '5. Inferno Lava Keep', icon: '🌋', active: false, tag: 'Obsidian Realm' },
                { name: '6. Skyward Sanctuary', icon: '👑', active: false, tag: 'Dragon Spire' },
              ].map((biome, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border-2 flex items-center justify-between ${
                    biome.active
                      ? 'bg-emerald-50/70 border-[#4CAF50] shadow-sm'
                      : 'bg-slate-50 border-slate-200 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{biome.icon}</span>
                    <div>
                      <h4 className="font-pixel text-[10px] text-[#1A2744]">{biome.name}</h4>
                      <span className="font-body text-[10px] text-slate-500">{biome.tag}</span>
                    </div>
                  </div>
                  <span className={`font-pixel text-[8px] px-2 py-0.5 rounded ${biome.active ? 'bg-[#7FFFD4] text-[#1A2744]' : 'bg-slate-200 text-slate-500'}`}>
                    {biome.active ? 'ACTIVE' : 'LOCKED'}
                  </span>
                </div>
              ))}
            </div>
          </PixelCard>
        </div>

        {/* Right Sidebar: Daily Goals & Trophies */}
        <div className="space-y-6">
          <PixelCard variant="parchment">
            <div className="flex items-center gap-2 mb-4 border-b border-[#3E2723]/20 pb-3">
              <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
              <h3 className="font-pixel text-xs text-[#1A2744] uppercase">DAILY BOUNTIES</h3>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-pixel mb-1 text-[#1A2744]">
                  <span>50 XP HARVEST</span>
                  <span>{Math.min(50, user?.xp || 0)} / 50</span>
                </div>
                <div className="w-full h-3.5 bg-slate-200 rounded-full overflow-hidden border border-[#1A2744]/20">
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
                <div className="w-full h-3.5 bg-slate-200 rounded-full overflow-hidden border border-[#1A2744]/20">
                  <div
                    className="h-full bg-[#FFD54F]"
                    style={{ width: currentStage > 1 ? '100%' : '0%' }}
                  />
                </div>
              </div>
            </div>
          </PixelCard>

          <PixelCard variant="white">
            <div className="flex items-center justify-between mb-4 border-b pb-3">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500" />
                <h3 className="font-pixel text-xs text-[#1A2744] uppercase">TROPHIES</h3>
              </div>
              <Link href="/goals" className="font-pixel text-[9px] text-[#2E7D32] underline">
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
                  className={`p-2.5 rounded-xl border-2 text-center flex flex-col items-center justify-center ${
                    b.unlocked
                      ? 'bg-[#FFF9E6] border-[#FFB300] shadow-sm'
                      : 'bg-slate-50 border-slate-200 opacity-40'
                  }`}
                >
                  <span className="text-2xl mb-1">{b.icon}</span>
                  <span className="font-pixel text-[7px] text-[#1A2744]">{b.title}</span>
                </div>
              ))}
            </div>
          </PixelCard>
        </div>
      </div>
    </div>
  );
}
