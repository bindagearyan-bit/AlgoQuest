'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUserStore } from '@/lib/store/userStore';
import { useUser } from '@/lib/hooks/useUser';
import { authApi } from '@/lib/api/auth';
import { Flame, Heart, Zap, Gem, LogOut, Compass } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export const TopNavBar: React.FC = () => {
  const pathname = usePathname();
  useUser();
  const { xp, hearts, gems, streakCount, user } = useUserStore();

  const navLinks = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'World Map', href: '/roadmap' },
    { label: 'Guild Hall', href: '/leaderboard' },
    { label: 'Squad', href: '/squad' },
    { label: 'Quests', href: '/goals' },
    { label: 'Tavern', href: '/discussion' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-gradient-to-r from-[#F3C8DD]/90 via-[#C7D3F5]/90 to-[#FCE4C8]/90 backdrop-blur-md border-b-[3px] border-[#1B2A4A] shadow-[0_4px_0_rgba(27,42,74,0.15)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo with 16-bit retro icon */}
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-[#FFD54F] flex items-center justify-center text-[#1B2A4A] border-2 border-[#1B2A4A] shadow-[0_2px_0_#1B2A4A] group-hover:scale-105 transition-transform">
            <span className="text-base font-pixel">🏰</span>
          </div>
          <span className="font-pixel text-sm sm:text-base text-[#1B2A4A] tracking-wider group-hover:text-[#2E7D32] transition-colors">
            AlgoQuest
          </span>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-3">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'font-pixel text-[10px] px-3 py-1.5 rounded-lg border-2 transition-all',
                  isActive
                    ? 'bg-white text-[#1B2A4A] border-[#1B2A4A] shadow-[2px_2px_0_#1B2A4A]'
                    : 'text-[#1B2A4A]/80 border-transparent hover:bg-white/50 hover:text-[#1B2A4A]'
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Live Widgets & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* 🔥 Streak */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 border-2 border-[#1B2A4A] shadow-[2px_2px_0_#1B2A4A]"
            title="Daily Quest Streak"
          >
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-bounce" />
            <span className="font-pixel text-[10px] text-[#1B2A4A]">{streakCount}d</span>
          </div>

          {/* ❤️ Hearts (5 pixel hearts) */}
          <div
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/80 border-2 border-[#1B2A4A] shadow-[2px_2px_0_#1B2A4A]"
            title="Hero Vitality Hearts"
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <Heart
                key={i}
                className={cn(
                  'w-3.5 h-3.5 transition-colors',
                  i < hearts
                    ? 'text-rose-500 fill-rose-500 drop-shadow-[0_1px_2px_rgba(244,63,94,0.5)]'
                    : 'text-slate-300 fill-slate-300'
                )}
              />
            ))}
          </div>

          {/* ⚡ XP (Gold Odometer) */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FFF9E6] border-2 border-[#FFB300] shadow-[2px_2px_0_#FFB300]"
            title="Total Gold XP"
          >
            <Zap className="w-3.5 h-3.5 text-[#FFB300] fill-[#FFD54F]" />
            <span className="font-pixel text-[10px] text-[#3E2723]">{xp} XP</span>
          </div>

          {/* 💎 Gems (Cyan Glowing Sprite) */}
          <div
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#E0F7FA] border-2 border-[#00E5FF] shadow-[2px_2px_0_#00E5FF]"
            title="Cyan Dungeon Gems"
          >
            <Gem className="w-3.5 h-3.5 text-cyan-600 fill-cyan-400" />
            <span className="font-pixel text-[10px] text-cyan-800">{gems}</span>
          </div>

          {/* Avatar / Profile */}
          <Link
            href="/profile"
            className="flex items-center p-0.5 rounded-full hover:scale-105 transition-transform"
            title="Hero Profile"
          >
            <div className="w-8 h-8 rounded-full bg-[#4CAF50] flex items-center justify-center text-white border-2 border-[#1B2A4A] shadow-[2px_2px_0_#1B2A4A] font-pixel text-[10px]">
              {user?.username ? user.username.slice(0, 2).toUpperCase() : 'AQ'}
            </div>
          </Link>

          {/* Logout */}
          <button
            onClick={() => authApi.logout()}
            title="Log out of guild"
            className="text-slate-600 hover:text-rose-600 p-1.5 transition-colors"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
};
