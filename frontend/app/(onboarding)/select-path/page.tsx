'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { userApi } from '@/lib/api/user';
import { SkylineBackground } from '@/components/layout/SkylineBackground';
import { PixelCard } from '@/components/ui/PixelCard';
import { PixelButton } from '@/components/ui/PixelButton';
import { Shield, Compass, Flame } from 'lucide-react';

export default function SelectPathPage() {
  const router = useRouter();
  const [loadingPath, setLoadingPath] = useState<string | null>(null);

  const handleSelect = async (level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED') => {
    setLoadingPath(level);
    try {
      if (level === 'BEGINNER') {
        await userApi.updateProfile({ selectedLevel: 'BEGINNER' });
        router.push('/dashboard');
      } else {
        router.push(`/placement-quiz?level=${level}`);
      }
    } catch {
      router.push(level === 'BEGINNER' ? '/dashboard' : '/placement-quiz');
    }
  };

  return (
    <SkylineBackground>
      <div className="min-h-screen max-w-4xl mx-auto px-6 py-16 flex flex-col justify-center items-center text-center">
        <span className="font-pixel text-[10px] text-[#8B7FD9] uppercase mb-2">
          NEW HERO ONBOARDING
        </span>
        <h1 className="font-pixel text-xl sm:text-2xl text-[#1A2744] mb-3">
          CHOOSE YOUR QUEST PATH
        </h1>
        <p className="font-body text-sm sm:text-base text-[#1A2744]/70 max-w-lg mb-12">
          Select your prior experience in Data Structures & Algorithms. You can calibrate through a placement quiz or start fresh from Level 1.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
          {/* Beginner Card */}
          <PixelCard variant="blue" className="flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#7FFFD4] border-2 border-[#1A2744] flex items-center justify-center text-[#1A2744] mb-4 shadow-[0_2px_0_0_#1A2744]">
                <Shield size={24} />
              </div>
              <span className="font-pixel text-[9px] text-emerald-700 uppercase">NO PREREQUISITES</span>
              <h3 className="font-pixel text-sm text-[#1A2744] mt-1 mb-3">BEGINNER</h3>
              <p className="font-body text-xs text-[#1A2744]/70 leading-relaxed mb-6">
                Start from foundational complexity theory, two-pointers, arrays, and standard loops.
              </p>
            </div>
            <PixelButton
              variant="mint"
              size="md"
              fullWidth
              onClick={() => handleSelect('BEGINNER')}
              disabled={Boolean(loadingPath)}
            >
              {loadingPath === 'BEGINNER' ? 'ENLISTING...' : 'START LEVEL 1'}
            </PixelButton>
          </PixelCard>

          {/* Intermediate Card */}
          <PixelCard variant="white" className="flex flex-col justify-between border-2 border-[#8B7FD9]">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#8B7FD9] border-2 border-[#1A2744] flex items-center justify-center text-white mb-4 shadow-[0_2px_0_0_#1A2744]">
                <Compass size={24} />
              </div>
              <span className="font-pixel text-[9px] text-[#8B7FD9] uppercase">SKILL CALIBRATION</span>
              <h3 className="font-pixel text-sm text-[#1A2744] mt-1 mb-3">INTERMEDIATE</h3>
              <p className="font-body text-xs text-[#1A2744]/70 leading-relaxed mb-6">
                You know basic arrays and loops. Take a 10-question placement quiz to skip beginner levels.
              </p>
            </div>
            <PixelButton
              variant="purple"
              size="md"
              fullWidth
              onClick={() => handleSelect('INTERMEDIATE')}
              disabled={Boolean(loadingPath)}
            >
              {loadingPath === 'INTERMEDIATE' ? 'PREPARING...' : 'TAKE QUIZ'}
            </PixelButton>
          </PixelCard>

          {/* Advanced Card */}
          <PixelCard variant="pink" className="flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#FF6FA0] border-2 border-[#1A2744] flex items-center justify-center text-white mb-4 shadow-[0_2px_0_0_#1A2744]">
                <Flame size={24} />
              </div>
              <span className="font-pixel text-[9px] text-[#FF6FA0] uppercase">DUNGEON MASTER</span>
              <h3 className="font-pixel text-sm text-[#1A2744] mt-1 mb-3">ADVANCED</h3>
              <p className="font-body text-xs text-[#1A2744]/70 leading-relaxed mb-6">
                You solve medium/hard problems on LeetCode. Fast-track straight into Tree and Graph dungeons.
              </p>
            </div>
            <PixelButton
              variant="pink"
              size="md"
              fullWidth
              onClick={() => handleSelect('ADVANCED')}
              disabled={Boolean(loadingPath)}
            >
              {loadingPath === 'ADVANCED' ? 'PREPARING...' : 'PROVE SKILL'}
            </PixelButton>
          </PixelCard>
        </div>
      </div>
    </SkylineBackground>
  );
}

