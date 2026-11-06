'use client';

import React from 'react';
import Link from 'next/link';
import { DungeonBackground } from '@/components/layout/DungeonBackground';
import { PixelButton } from '@/components/ui/PixelButton';
import { Compass, Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <DungeonBackground>
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-16">
        <div className="w-24 h-24 rounded-2xl bg-[#FF2FD4]/20 border-4 border-[#FF2FD4] flex items-center justify-center text-white mb-6 shadow-[0_0_25px_#FF2FD4]">
          <span className="font-pixel text-3xl text-[#00F0FF]">404</span>
        </div>

        <span className="font-pixel text-[10px] text-[#00F0FF] uppercase tracking-widest block mb-2">
          ERROR : MEMORY SEGFAULT
        </span>

        <h1 className="font-pixel text-xl sm:text-2xl text-white mb-4">
          LOST IN THE DUNGEON
        </h1>

        <p className="font-body text-sm sm:text-base text-slate-400 max-w-md mb-8 leading-relaxed">
          The algorithmic coordinate you attempted to dereference does not exist in this sector of the RAM dungeon.
        </p>

        <Link href="/dashboard">
          <PixelButton variant="mint" size="lg">
            <Home size={16} className="mr-2" /> RETURN TO SURFACE (HOME)
          </PixelButton>
        </Link>
      </div>
    </DungeonBackground>
  );
}

