'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { userApi } from '@/lib/api/user';
import { badgeApi, BadgeItem } from '@/lib/api/badge';
import { PixelCard } from '@/components/ui/PixelCard';
import { PixelButton } from '@/components/ui/PixelButton';
import { PixelModal } from '@/components/ui/PixelModal';
import { PixelInput } from '@/components/ui/PixelInput';
import { PixelBadge } from '@/components/ui/PixelBadge';
import { PIXEL_BADGE_CATALOG, getPixelBadgeBySublevelId } from '@/lib/data/pixelBadgeCatalog';
import {
  Flame,
  Zap,
  Heart,
  Trophy,
  Edit3,
  Shield,
  Medal,
  Award,
  Share2,
  Check,
  Download,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export default function ProfilePage() {
  const { data: stats, refetch: refetchUser } = useQuery({
    queryKey: ['userStats'],
    queryFn: () => userApi.getStats(),
  });

  const { data: fetchedBadges = [] } = useQuery({
    queryKey: ['allBadges'],
    queryFn: () => badgeApi.getAllBadges(),
  });

  const badgesList: BadgeItem[] =
    fetchedBadges.length > 0
      ? fetchedBadges.map((b) => {
          const px = getPixelBadgeBySublevelId(b.sublevelId || b.id);
          return {
            ...b,
            title: px?.title || b.title,
            description: px?.description || b.description,
            iconSvg: px?.iconSvg || b.iconSvg,
            tier: px?.tier || b.tier,
          };
        })
      : PIXEL_BADGE_CATALOG.map((px) => ({
          id: px.sublevelId,
          sublevelId: px.sublevelId,
          levelId: Math.floor((px.sublevelId - 1) / 10) + 1,
          title: px.title,
          description: px.description,
          iconSvg: px.iconSvg,
          xpReward: px.xpReward,
          tier: px.tier,
          isEarned: false,
          earnedAt: null,
        }));

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const [badgeFilter, setBadgeFilter] = useState<'ALL' | 'EARNED' | 'LOCKED'>('ALL');
  const [selectedBadge, setSelectedBadge] = useState<BadgeItem | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSaveProfile = async () => {
    if (!newUsername.trim()) return;
    setIsSaving(true);
    try {
      await userApi.updateProfile({ username: newUsername });
      refetchUser();
      setIsEditOpen(false);
    } catch {}
    setIsSaving(false);
  };

  const user = stats || {
    username: 'aryan',
    xp: 250,
    hearts: 5,
    streakCount: 3,
    longestStreak: 7,
    currentLeague: 'BRONZE',
    completionPercentage: 12,
  };

  const filteredBadges = badgesList.filter((b) => {
    if (badgeFilter === 'EARNED') return b.isEarned;
    if (badgeFilter === 'LOCKED') return !b.isEarned;
    return true;
  });

  const earnedCount = badgesList.filter((b) => b.isEarned).length;

  const handleShareCert = () => {
    if (!selectedBadge) return;
    const certCode = `AQ-${selectedBadge.id}-${Date.now().toString(36).toUpperCase()}`;
    const text = `I conquered "${selectedBadge.title}" on AlgoQuest! Certificate verification: ${certCode}`;
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
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
          <Medal className="w-5 h-5 text-emerald-500 mx-auto mb-2" />
          <span className="font-pixel text-base text-[#1A2744] block mb-1">
            {earnedCount} / {badgesList.length || 54}
          </span>
          <span className="font-pixel text-[8px] text-slate-500 uppercase">BADGES WON</span>
        </PixelCard>
      </div>

      {/* Badges Showcase Grid */}
      <PixelCard variant="white">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 border-b pb-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#FFB300]" />
            <div>
              <h2 className="font-pixel text-xs text-[#1A2744] uppercase">
                ALGORITHMIC MEDALS OF HONOR
              </h2>
              <span className="font-body text-xs text-slate-500">
                Awarded upon completing each curriculum sector. Click any earned medal to view certificate!
              </span>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-300">
            {(['ALL', 'EARNED', 'LOCKED'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setBadgeFilter(f)}
                className={`font-pixel text-[8px] sm:text-[9px] px-3 py-1.5 rounded-lg transition-all ${
                  badgeFilter === f
                    ? 'bg-[#1B2A4A] text-[#FFD54F] shadow-sm'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f === 'ALL' ? 'ALL (54)' : f === 'EARNED' ? `EARNED (${earnedCount})` : `LOCKED (${54 - earnedCount})`}
              </button>
            ))}
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-items-center py-2">
          {filteredBadges.map((badge) => (
            <PixelBadge
              key={badge.id}
              title={badge.title}
              description={badge.description}
              iconSvg={badge.iconSvg}
              tier={badge.tier}
              isEarned={badge.isEarned}
              xpReward={badge.xpReward}
              onClick={() => {
                if (badge.isEarned) setSelectedBadge(badge);
              }}
            />
          ))}
        </div>
      </PixelCard>

      {/* Certificate Viewer Modal */}
      {selectedBadge && (
        <PixelModal
          isOpen={!!selectedBadge}
          onClose={() => setSelectedBadge(null)}
          title="EXPEDITION CERTIFICATE OF MASTERY"
        >
          <div className="space-y-6 text-center">
            {/* Certificate Frame */}
            <div className="relative border-4 border-[#FFD54F] bg-[#0A1026] rounded-2xl p-6 sm:p-8 shadow-[0_0_25px_rgba(255,213,79,0.25)] text-center overflow-hidden">
              <div className="absolute top-2 left-2 text-[#FFD54F] text-xs">❖</div>
              <div className="absolute top-2 right-2 text-[#FFD54F] text-xs">❖</div>
              <div className="absolute bottom-2 left-2 text-[#FFD54F] text-xs">❖</div>
              <div className="absolute bottom-2 right-2 text-[#FFD54F] text-xs">❖</div>

              <span className="font-pixel text-[8px] text-[#7FFFD4] tracking-widest uppercase block mb-1">
                ALGOQUEST GUILD ACADEMY
              </span>

              <h3 className="font-pixel text-sm sm:text-base text-[#FFD54F] mb-3">
                CERTIFICATE OF MASTERY
              </h3>

              <p className="font-body text-xs text-slate-300 mb-4">
                This document certifies that
              </p>

              <div className="font-pixel text-base sm:text-lg text-white border-b-2 border-dashed border-[#FFD54F]/50 pb-2 mb-4 mx-auto max-w-xs">
                {user.username.toUpperCase()}
              </div>

              <p className="font-body text-xs text-slate-300 mb-6">
                has successfully conquered all progression stages of{' '}
                <span className="text-[#7FFFD4] font-semibold">{selectedBadge.title}</span>, demonstrating rigorous algorithmic proficiency in data structures and algorithmic complexity.
              </p>

              <div className="flex justify-center mb-4">
                <PixelBadge
                  title={selectedBadge.title}
                  description={selectedBadge.description}
                  iconSvg={selectedBadge.iconSvg}
                  tier={selectedBadge.tier}
                  isEarned={true}
                  size="md"
                  xpReward={selectedBadge.xpReward}
                />
              </div>

              <div className="border-t border-slate-700 pt-3 flex items-center justify-between text-[8px] font-pixel text-slate-400">
                <span>SEAL: VERIFIED</span>
                <span>CODE: AQ-{selectedBadge.id}-{Date.now().toString(36).substring(0, 6).toUpperCase()}</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <PixelButton
                variant="gold"
                size="md"
                onClick={handleShareCert}
              >
                {copied ? <Check size={14} className="mr-1.5" /> : <Share2 size={14} className="mr-1.5" />}
                {copied ? 'CERTIFICATE LINK COPIED!' : 'SHARE TO PORTFOLIO'}
              </PixelButton>

              <PixelButton
                variant="outline"
                size="md"
                onClick={() => setSelectedBadge(null)}
              >
                CLOSE
              </PixelButton>
            </div>
          </div>
        </PixelModal>
      )}

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
