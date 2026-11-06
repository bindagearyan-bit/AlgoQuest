'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUserStore } from '@/lib/store/userStore';
import { useUser } from '@/lib/hooks/useUser';
import { authApi } from '@/lib/api/auth';
import { Flame, Heart, Zap, Gem, LogOut, User as UserIcon } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export const TopNavBar: React.FC = () => {
  const pathname = usePathname();
  useUser(); // Hydrates user store
  const { xp, hearts, gems, streakCount, user } = useUserStore();

  const navLinks = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Skill Tree', href: '/roadmap' },
    { label: 'Leaderboard', href: '/leaderboard' },
    { label: 'Squad', href: '/squad' },
    { label: 'Goals', href: '/goals' },
    { label: 'Discuss', href: '/discussion' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b-2 border-[#1A2744]/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-[#8B7FD9] flex items-center justify-center border-2 border-[#1A2744] shadow-[0_2px_0_0_#1A2744]">
            <span className="text-white text-sm font-pixel">A</span>
          </div>
          <span className="font-pixel text-sm sm:text-base text-[#1A2744] tracking-wider group-hover:text-[#8B7FD9] transition-colors">
            AlgoQuest
          </span>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-4">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'font-pixel text-[11px] px-3 py-1.5 rounded-lg transition-colors',
                  isActive
                    ? 'text-[#8B7FD9] bg-[#8B7FD9]/10 border border-[#8B7FD9]/30'
                    : 'text-[#1A2744]/70 hover:text-[#1A2744] hover:bg-slate-100'
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Live Widgets & Profile */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Streak */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200" title="Daily Streak">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
            <span className="font-pixel text-[11px] text-[#1A2744]">{streakCount}</span>
          </div>

          {/* Hearts (5 pixel hearts) */}
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-rose-50 border border-rose-200" title="Hearts Remaining">
            {Array.from({ length: 5 }).map((_, i) => (
              <Heart
                key={i}
                className={cn(
                  'w-3.5 h-3.5 transition-colors',
                  i < hearts
                    ? 'text-rose-500 fill-rose-500'
                    : 'text-slate-300 fill-slate-300'
                )}
              />
            ))}
          </div>

          {/* XP */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-200" title="Total XP">
            <Zap className="w-3.5 h-3.5 text-[#8B7FD9] fill-[#8B7FD9]" />
            <span className="font-pixel text-[11px] text-[#8B7FD9]">{xp} XP</span>
          </div>

          {/* Gems */}
          <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan-50 border border-cyan-200" title="Gems">
            <Gem className="w-3.5 h-3.5 text-cyan-600 fill-cyan-400" />
            <span className="font-pixel text-[11px] text-cyan-700">{gems}</span>
          </div>

          {/* Avatar / Profile */}
          <Link
            href="/profile"
            className="flex items-center gap-2 p-1.5 rounded-full hover:bg-slate-100 border border-slate-200 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-[#FF6FA0] flex items-center justify-center text-white border border-[#1A2744]/20 font-pixel text-[10px]">
              {user?.username ? user.username.slice(0, 2).toUpperCase() : 'AQ'}
            </div>
          </Link>

          {/* Logout */}
          <button
            onClick={() => authApi.logout()}
            title="Log out"
            className="text-slate-400 hover:text-rose-500 p-1.5 transition-colors"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
};

