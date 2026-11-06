'use client';

import React, { useState } from 'react';
import { PixelCard } from '@/components/ui/PixelCard';
import { PixelButton } from '@/components/ui/PixelButton';
import { PixelInput } from '@/components/ui/PixelInput';
import { Users, UserPlus, Share2, ShieldAlert } from 'lucide-react';

export default function SquadPage() {
  const [copied, setCopied] = useState(false);
  const inviteCode = 'ALGO-QUEST-HERO-789';

  const copyCode = () => {
    navigator.clipboard?.writeText(inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="text-center space-y-2">
        <span className="font-pixel text-[10px] text-[#8B7FD9] uppercase">
          GUILD FELLOWSHIP
        </span>
        <h1 className="font-pixel text-lg sm:text-2xl text-[#1A2744]">
          YOUR ADVENTURE SQUAD
        </h1>
        <p className="font-body text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
          Form a party with fellow coders to earn shared gem rewards and conquer boss stages together.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Squad Invite Card */}
        <PixelCard variant="blue" className="md:col-span-1 space-y-4">
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-[#8B7FD9]" />
            <h3 className="font-pixel text-xs text-[#1A2744] uppercase">INVITE ALLIES</h3>
          </div>

          <p className="font-body text-xs text-slate-600 leading-relaxed">
            Share your guild invite code. When a friend joins, both of you earn 50 bonus gems!
          </p>

          <div className="p-3 bg-white rounded-xl border border-[#1A2744]/20 font-mono text-xs text-center text-[#8B7FD9] font-bold">
            {inviteCode}
          </div>

          <PixelButton variant="mint" size="md" fullWidth onClick={copyCode}>
            <Share2 size={14} className="mr-1.5" />
            {copied ? 'CODE COPIED!' : 'COPY INVITE'}
          </PixelButton>
        </PixelCard>

        {/* Squad Members */}
        <PixelCard variant="white" className="md:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#8B7FD9]" />
              <h3 className="font-pixel text-xs text-[#1A2744] uppercase">PARTY MEMBERS (3/5)</h3>
            </div>
            <span className="font-pixel text-[9px] text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-200">
              ACTIVE PARTY
            </span>
          </div>

          <div className="space-y-3">
            {[
              { name: 'PixelKnight (You)', role: 'Party Leader', level: 'Level 1.1', online: true },
              { name: 'BinaryMage', role: 'Algorithm Specialist', level: 'Level 2.4', online: true },
              { name: 'StackRogue', role: 'Speed Solver', level: 'Level 1.8', online: false },
            ].map((member, i) => (
              <div
                key={i}
                className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#8B7FD9] flex items-center justify-center text-white font-pixel text-xs">
                    {member.name.slice(0, 2)}
                  </div>
                  <div>
                    <h4 className="font-pixel text-xs text-[#1A2744]">{member.name}</h4>
                    <span className="font-body text-[11px] text-slate-500">{member.role} • {member.level}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      member.online ? 'bg-emerald-500' : 'bg-slate-400'
                    }`}
                  />
                  <span className="font-pixel text-[8px] text-slate-500">
                    {member.online ? 'ONLINE' : 'OFFLINE'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </PixelCard>
      </div>
    </div>
  );
}

