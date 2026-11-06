'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { userApi } from '@/lib/api/user';
import { PixelCard } from '@/components/ui/PixelCard';
import { PixelButton } from '@/components/ui/PixelButton';
import { PixelModal } from '@/components/ui/PixelModal';
import { PixelInput } from '@/components/ui/PixelInput';
import { User, Flame, Zap, Heart, Trophy, Edit3, CheckCircle2 } from 'lucide-react';

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

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center font-pixel text-xs text-[#1A2744]">
        LOADING HERO STATISTICS...
      </div>
    );
  }

  const user = stats || {
    username: 'PixelKnight',
    xp: 250,
    hearts: 5,
    streakCount: 3,
    longestStreak: 7,
    currentLeague: 'BRONZE',
    completionPercentage: 12,
    badgesCount: 2,
    achievements: [],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header Profile Card */}
      <PixelCard variant="blue" className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <div className="w-20 h-20 rounded-2xl bg-[#FF6FA0] border-4 border-[#1A2744] flex items-center justify-center text-white text-2xl font-pixel shadow-[0_4px_0_0_#1A2744]">
            {user.username.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <span className="font-pixel text-[9px] text-[#8B7FD9] uppercase block mb-1">
              LEVEL 1 GUILD ADVENTURER
            </span>
            <h1 className="font-pixel text-lg sm:text-xl text-[#1A2744]">
              {user.username}
            </h1>
            <p className="font-body text-xs text-slate-600 mt-1">
              Ranked in <span className="font-pixel text-[10px] text-amber-600">{user.currentLeague} LEAGUE</span>
            </p>
          </div>
        </div>

        <PixelButton
          variant="outline"
          size="sm"
          onClick={() => {
            setNewUsername(user.username);
            setIsEditOpen(true);
          }}
        >
          <Edit3 size={14} className="mr-1.5" /> EDIT HERO
        </PixelButton>
      </PixelCard>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <PixelCard variant="white" className="text-center p-4">
          <Zap className="w-5 h-5 text-[#8B7FD9] mx-auto mb-2" />
          <span className="font-pixel text-base text-[#1A2744] block mb-1">{user.xp}</span>
          <span className="font-pixel text-[8px] text-slate-500 uppercase">TOTAL XP</span>
        </PixelCard>

        <PixelCard variant="white" className="text-center p-4">
          <Flame className="w-5 h-5 text-orange-500 mx-auto mb-2" />
          <span className="font-pixel text-base text-[#1A2744] block mb-1">{user.streakCount}</span>
          <span className="font-pixel text-[8px] text-slate-500 uppercase">STREAK (DAYS)</span>
        </PixelCard>

        <PixelCard variant="white" className="text-center p-4">
          <Heart className="w-5 h-5 text-rose-500 mx-auto mb-2" />
          <span className="font-pixel text-base text-[#1A2744] block mb-1">{user.hearts} / 5</span>
          <span className="font-pixel text-[8px] text-slate-500 uppercase">HEARTS</span>
        </PixelCard>

        <PixelCard variant="white" className="text-center p-4">
          <Trophy className="w-5 h-5 text-amber-500 mx-auto mb-2" />
          <span className="font-pixel text-base text-[#1A2744] block mb-1">{user.completionPercentage}%</span>
          <span className="font-pixel text-[8px] text-slate-500 uppercase">COMPLETION</span>
        </PixelCard>
      </div>

      {/* Edit Profile Modal */}
      <PixelModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="MODIFY HERO PROFILE"
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
            {isSaving ? 'SAVING...' : 'SAVE CHANGES'}
          </PixelButton>
        </div>
      </PixelModal>
    </div>
  );
}

