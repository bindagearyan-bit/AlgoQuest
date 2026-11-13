'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUserStore } from '@/lib/store/userStore';
import { useUser } from '@/lib/hooks/useUser';
import { authApi } from '@/lib/api/auth';
import { Flame, Heart, Zap, Gem, LogOut, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export const TopNavBar: React.FC = () => {
  const pathname = usePathname();
  useUser();
  const { xp, hearts, gems, streakCount, user } = useUserStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'World Map', href: '/roadmap' },
    { label: 'Guild Hall', href: '/leaderboard' },
    { label: 'Squad', href: '/squad' },
    { label: 'Quests', href: '/goals' },
    { label: 'Tavern', href: '/discussion' },
    { label: 'Arcade', href: '/arcade' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full max-w-full bg-gradient-to-r from-[#F3C8DD]/95 via-[#C7D3F5]/95 to-[#FCE4C8]/95 backdrop-blur-md border-b-[3px] border-[#1B2A4A] shadow-[0_4px_0_rgba(27,42,74,0.15)]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2">
        {/* Logo with 16-bit retro icon */}
        <Link href="/dashboard" className="flex items-center gap-2 group shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#FFD54F] flex items-center justify-center text-[#1B2A4A] border-2 border-[#1B2A4A] shadow-[0_2px_0_#1B2A4A] group-hover:scale-105 transition-transform">
            <span className="text-sm sm:text-base font-pixel">🏰</span>
          </div>
          <span className="font-pixel text-[11px] sm:text-base text-[#1B2A4A] tracking-wide group-hover:text-[#2E7D32] transition-colors">
            AlgoQuest
          </span>
        </Link>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden lg:flex items-center space-x-2">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'font-pixel text-[10px] px-3 py-1.5 rounded-lg border-2 transition-all whitespace-nowrap',
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
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* 🔥 Streak */}
          <div
            className="flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-white/85 border-2 border-[#1B2A4A] shadow-[2px_2px_0_#1B2A4A]"
            title="Daily Quest Streak"
          >
            <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500 fill-orange-500" />
            <span className="font-pixel text-[9px] sm:text-[10px] text-[#1B2A4A]">{streakCount}d</span>
          </div>

          {/* ❤️ Compact Heart counter on small screens */}
          <div
            className="flex sm:hidden items-center gap-1 px-2 py-0.5 rounded-full bg-white/85 border-2 border-[#1B2A4A] shadow-[2px_2px_0_#1B2A4A]"
            title="Hero Vitality Hearts"
          >
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span className="font-pixel text-[9px] text-[#1B2A4A]">{hearts}</span>
          </div>

          {/* ❤️ Full 5 pixel hearts on sm+ screens */}
          <div
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/85 border-2 border-[#1B2A4A] shadow-[2px_2px_0_#1B2A4A]"
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
            className="flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-[#FFF9E6] border-2 border-[#FFB300] shadow-[2px_2px_0_#FFB300]"
            title="Total Gold XP"
          >
            <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FFB300] fill-[#FFD54F]" />
            <span className="font-pixel text-[9px] sm:text-[10px] text-[#3E2723]">
              {xp}
              <span className="hidden xs:inline sm:inline"> XP</span>
            </span>
          </div>

          {/* 💎 Gems (Cyan Glowing Sprite) */}
          <div
            className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#E0F7FA] border-2 border-[#00E5FF] shadow-[2px_2px_0_#00E5FF]"
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
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#4CAF50] flex items-center justify-center text-white border-2 border-[#1B2A4A] shadow-[2px_2px_0_#1B2A4A] font-pixel text-[9px] sm:text-[10px]">
              {user?.username ? user.username.slice(0, 2).toUpperCase() : 'AQ'}
            </div>
          </Link>

          {/* Desktop Logout */}
          <button
            onClick={() => authApi.logout()}
            title="Log out of guild"
            className="hidden sm:block text-slate-600 hover:text-rose-600 p-1.5 transition-colors"
          >
            <LogOut size={16} />
          </button>

          {/* Mobile Hamburger Menu Button */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle Navigation"
            className="lg:hidden p-1.5 rounded-lg bg-white/85 border-2 border-[#1B2A4A] text-[#1B2A4A] shadow-[2px_2px_0_#1B2A4A] active:translate-y-0.5 transition-all"
          >
            {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t-2 border-[#1B2A4A] bg-[#FFFDF5]/95 backdrop-blur-md px-4 py-3 space-y-2 shadow-lg">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'font-pixel text-[10px] px-3 py-2.5 rounded-xl border-2 text-center transition-all',
                    isActive
                      ? 'bg-[#7FFFD4] text-[#1B2A4A] border-[#1B2A4A] shadow-[2px_2px_0_#1B2A4A]'
                      : 'bg-white text-[#1B2A4A] border-[#1B2A4A]/30 hover:border-[#1B2A4A]'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-200">
            <div className="flex items-center gap-2">
              <Gem className="w-4 h-4 text-cyan-600 fill-cyan-400" />
              <span className="font-pixel text-[10px] text-cyan-800">{gems} GEMS</span>
            </div>
            <button
              onClick={() => authApi.logout()}
              className="flex items-center gap-1.5 font-pixel text-[9px] text-rose-600 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-300"
            >
              <LogOut size={13} /> LOGOUT
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
