'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { SkylineBackground } from '@/components/layout/SkylineBackground';
import { PixelButton } from '@/components/ui/PixelButton';
import { PixelCard } from '@/components/ui/PixelCard';
import { Swords, Trophy, Sparkles, Terminal } from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('access_token');
    if (token) {
      router.replace('/dashboard');
    }
  }, [router]);

  return (
    <SkylineBackground>
      {/* Header Bar */}
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-[#8B7FD9] flex items-center justify-center text-white border-2 border-[#1A2744] shadow-[0_3px_0_0_#1A2744]">
            <span className="font-pixel text-base">A</span>
          </div>
          <span className="font-pixel text-base sm:text-lg text-[#1A2744] tracking-wider">
            AlgoQuest
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/login">
            <PixelButton variant="outline" size="sm">
              LOG IN
            </PixelButton>
          </Link>
          <Link href="/signup">
            <PixelButton variant="mint" size="sm">
              GET STARTED
            </PixelButton>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto px-6 pt-12 pb-20 text-center flex flex-col items-center">
        {/* Pixel Hero Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border-2 border-[#1A2744]/20 shadow-sm mb-6">
          <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
          <span className="font-pixel text-[10px] text-[#1A2744]">
            RETRO PIXEL-ART DSA LEARNING PLATFORM
          </span>
        </div>

        {/* Title */}
        <h1 className="font-pixel text-2xl sm:text-4xl text-[#1A2744] leading-relaxed mb-6">
          Master DSA Through Quests
        </h1>

        <p className="font-body text-base sm:text-xl text-[#1A2744]/80 max-w-2xl mb-10 leading-relaxed">
          Level up your programming skills in an 8-bit algorithmic dungeon. Visual debuggers,
          code execution benchmarks, heart stakes, and daily streaks.
        </p>

        {/* Hero CTA */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Link href="/signup">
            <PixelButton variant="mint" size="lg">
              START LEARNING FOR FREE
            </PixelButton>
          </Link>
          <Link href="/login">
            <PixelButton variant="purple" size="lg">
              RESUME SAVED QUEST
            </PixelButton>
          </Link>
        </div>

        {/* 16-Bit Floating Island Overworld Showcase Banner */}
        <div className="w-full max-w-4xl rounded-2xl border-4 border-[#3b4261] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5),0_0_20px_rgba(80,120,255,0.25)] mb-14 relative aspect-[16/9] group">
          <Image
            src="/map.png"
            alt="AlgoQuest Overworld Map"
            fill
            priority
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            style={{ imageRendering: 'pixelated' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between p-6">
            <div className="text-left">
              <span className="font-pixel text-[9px] text-[#FFD54F] bg-[#1A2744]/90 px-2.5 py-1 rounded border border-[#FFD54F] mb-1 inline-block">
                OVERWORLD MAP ENGINE
              </span>
              <h3 className="font-pixel text-xs sm:text-sm text-white drop-shadow-[2px_2px_0_#000]">
                Explore 6 Floating Island Biomes
              </h3>
            </div>
            <Link href="/signup">
              <PixelButton variant="gold" size="sm">
                JOIN EXPEDITION ⚔️
              </PixelButton>
            </Link>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left w-full">
          <PixelCard variant="white">
            <div className="w-10 h-10 rounded-xl bg-[#8B7FD9] flex items-center justify-center text-white border-2 border-[#1A2744] mb-3">
              <Swords size={20} />
            </div>
            <h3 className="font-pixel text-xs text-[#1A2744] mb-2 uppercase">8-Stage Gauntlet</h3>
            <p className="font-body text-xs text-[#1A2744]/70 leading-relaxed">
              From ELI5 theory and dynamic array visualizers to LeetCode-style boss battles.
            </p>
          </PixelCard>

          <PixelCard variant="blue">
            <div className="w-10 h-10 rounded-xl bg-[#7FFFD4] flex items-center justify-center text-[#1A2744] border-2 border-[#1A2744] mb-3">
              <Terminal size={20} />
            </div>
            <h3 className="font-pixel text-xs text-[#1A2744] mb-2 uppercase">Monaco + Judge0</h3>
            <p className="font-body text-xs text-[#1A2744]/70 leading-relaxed">
              Write solutions in C, C++, Java, or Python with real-time test bench compilation.
            </p>
          </PixelCard>

          <PixelCard variant="pink">
            <div className="w-10 h-10 rounded-xl bg-[#FF6FA0] flex items-center justify-center text-white border-2 border-[#1A2744] mb-3">
              <Trophy size={20} />
            </div>
            <h3 className="font-pixel text-xs text-[#1A2744] mb-2 uppercase">Ranked Leagues</h3>
            <p className="font-body text-xs text-[#1A2744]/70 leading-relaxed">
              Earn XP, build 5-heart streaks, unlock retro badges, and climb Bronze to Diamond.
            </p>
          </PixelCard>
        </div>
      </main>
    </SkylineBackground>
  );
}

