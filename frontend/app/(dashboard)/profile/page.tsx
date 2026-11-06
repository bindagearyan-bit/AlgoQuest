'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { userApi } from '@/lib/api/user';
import { PixelCard } from '@/components/ui/PixelCard';
import { PixelButton } from '@/components/ui/PixelButton';
import { PixelModal } from '@/components/ui/PixelModal';
import { PixelInput } from '@/components/ui/PixelInput';
import { Flame, Zap, Heart, Trophy, Edit3, Shield, Swords, Compass } from 'lucide-react';

export default function ProfilePage() {
  const { data: stats, isLoading, refetch } = useQuery({
    queryKey: ['userStats'],
    queryFn: () => userApi.getStats(),
  });

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProfile = async () => {
    if (!newUsername.trim()) return;
    setIsSaving(true);
    try {
      await userApi.updateProfile({ username: newUsername });
      refetch();
      setIsEditOpen(false);
    } catch {}
    setIsSaving(false);
  };

  const user = stats || {
    username: 'PixelKnight',
    xp: 250,
    hearts: 5,
    streakCount: 3,
    longestStreak: 7,
    currentLeague: 'BRONZE',
    completionPercentage: 12,
  };

  const biomeGear = [
    { name: 'Wooden Training Sword', biome: 'Foundations Island', icon: '🗡️', equipped: true },
    { name: 'Citadel Iron Shield', biome: 'Central Citadel', icon: '🛡️', equipped: user.xp >= 100 },
    { name: 'Windmill Feather Boots', biome: 'Sky Isles', icon: '🥾', equipped: user.xp >= 200 },
    { name: 'Glacier Crystal Ring', biome: 'Glacier Fortress', icon: '💍', equipped: user.xp >= 350 },
    { name: 'Obsidian Fire Amulet', biome: 'Inferno Keep', icon: '📿', equipped: user.xp >= 500 },
    { name: 'Dragon Crown', biome: 'Skyward Sanctuary', icon: '👑', equipped: user.xp >= 800 },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Hero Character Sheet Banner */}
      <PixelCard variant="parchment" className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          {/* Animated Pixel Knight Avatar */}
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-[#4CAF50] border-4 border-[#1B2A4A] flex items-center justify-center text-white text-3xl font-pixel shadow-[4px_4px_0_#1B2A4A]">
              🧙‍♂️
            </div>
            <span className="absolute -bottom-2 -right-2 bg-[#FFD54F] text-[#1B2A4A] text-[8px] font-pixel px-1.5 py-0.5 rounded border border-[#1B2A4A]">
              LVL {Math.floor((user.streakCount || 1) / 3) + 1}
            </span>
          </div>

          <div>
            <span className="font-pixel text-[9px] text-[#2E7D32] uppercase block mb-1">
              FOUNDATIONS OVERWORLD KNIGHT
            </span>
            <h1 className="font-pixel text-lg sm:text-xl text-[#1A2744]">
              {user.username}
            </h1>
            <p className="font-body text-xs text-slate-600 mt-1">
              Active in <span className="font-pixel text-[9px] text-amber-700">{user.currentLeague} GUILD</span> • {user.streakCount} Day Quest Streak
            </p>
          </div>
        </div>

        <PixelButton
          variant="wood"
          size="sm"
          onClick={() => {
            setNewUsername(user.username);
            setIsEditOpen(true);
          }}
        >
          <Edit3 size={14} className="mr-1.5" /> EDIT NAME
        </PixelButton>
      </PixelCard>

      {/* Hero Stats Quad */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <PixelCard variant="white" className="text-center p-4">
          <Zap className="w-5 h-5 text-amber-500 fill-amber-400 mx-auto mb-2" />
          <span className="font-pixel text-base text-[#1A2744] block mb-1">{user.xp}</span>
          <span className="font-pixel text-[8px] text-slate-500 uppercase">GOLD XP</span>
        </PixelCard>

        <PixelCard variant="white" className="text-center p-4">
          <Flame className="w-5 h-5 text-orange-500 fill-orange-500 mx-auto mb-2" />
          <span className="font-pixel text-base text-[#1A2744] block mb-1">{user.streakCount}</span>
          <span className="font-pixel text-[8px] text-slate-500 uppercase">STREAK (DAYS)</span>
        </PixelCard>

        <PixelCard variant="white" className="text-center p-4">
          <Heart className="w-5 h-5 text-rose-500 fill-rose-500 mx-auto mb-2" />
          <span className="font-pixel text-base text-[#1A2744] block mb-1">{user.hearts} / 5</span>
          <span className="font-pixel text-[8px] text-slate-500 uppercase">HERO HEARTS</span>
        </PixelCard>

        <PixelCard variant="white" className="text-center p-4">
          <Trophy className="w-5 h-5 text-emerald-500 mx-auto mb-2" />
          <span className="font-pixel text-base text-[#1A2744] block mb-1">{user.completionPercentage}%</span>
          <span className="font-pixel text-[8px] text-slate-500 uppercase">WORLD CLEARED</span>
        </PixelCard>
      </div>

      {/* Biome Equipment & Relics Collected */}
      <PixelCard variant="white">
        <div className="flex items-center gap-2 mb-4 border-b pb-3">
          <Shield className="w-5 h-5 text-[#2E7D32]" />
          <h2 className="font-pixel text-xs text-[#1A2744] uppercase">
            BIOME RELICS & COLLECTED GEAR
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {biomeGear.map((item, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border-2 flex items-center gap-3 transition-all ${
                item.equipped
                  ? 'bg-emerald-50/70 border-emerald-400 shadow-sm'
                  : 'bg-slate-50 border-slate-200 opacity-40'
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              <div>
                <h4 className="font-pixel text-[9px] text-[#1A2744]">{item.name}</h4>
                <span className="font-body text-[10px] text-slate-500 block">{item.biome}</span>
                <span className={`font-pixel text-[7px] mt-1 inline-block ${item.equipped ? 'text-emerald-700' : 'text-slate-400'}`}>
                  {item.equipped ? 'EQUIPPED' : 'LOCKED BIOME'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </PixelCard>

      {/* Edit Profile Modal */}
      <PixelModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="MODIFY KNIGHT ALIAS"
      >
        <div className="space-y-4">
          <PixelInput
            label="Hero Username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />

          <PixelButton
            variant="mint"
            size="md"
            fullWidth
            onClick={handleSaveProfile}
            disabled={isSaving}
          >
            {isSaving ? 'UPDATING GUILD SCROLL...' : 'SAVE ALIAS'}
          </PixelButton>
        </div>
      </PixelModal>
    </div>
  );
}
