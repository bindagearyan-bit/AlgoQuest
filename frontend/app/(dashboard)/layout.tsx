'use client';

import React from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { TopNavBar } from '@/components/layout/TopNavBar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth(true);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white font-pixel text-xs">
        INITIALIZING HERO PROFILE...
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col bg-gradient-to-b from-[#F3C8DD] via-[#C7D3F5] to-[#FCE4C8]">
      <TopNavBar />
      <main className="flex-1 w-full max-w-full overflow-x-hidden">{children}</main>
    </div>
  );
}

