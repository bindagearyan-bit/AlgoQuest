'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { authApi } from '@/lib/api/auth';
import { SkylineBackground } from '@/components/layout/SkylineBackground';
import { PixelCard } from '@/components/ui/PixelCard';
import { PixelButton } from '@/components/ui/PixelButton';
import { PixelInput } from '@/components/ui/PixelInput';
import { Shield, Compass, Flame } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTier, setSelectedTier] = useState<'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'>('BEGINNER');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setServerError(null);
    try {
      await authApi.login({
        email: data.email,
        password: data.password,
        selectedLevel: selectedTier,
      });
      router.push('/dashboard');
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Invalid credentials. Please verify and retry.';
      const cleanMsg =
        msg.includes('prisma') || msg.includes('database') || msg.includes('5432')
          ? 'Guild registry temporarily offline. Connecting to offline hero cache...'
          : msg;
      setServerError(cleanMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SkylineBackground>
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo link */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-[#8B7FD9] flex items-center justify-center text-white border-2 border-[#1A2744]">
                <span className="font-pixel text-base">A</span>
              </div>
              <span className="font-pixel text-lg text-[#1A2744] tracking-wider">
                AlgoQuest
              </span>
            </Link>
          </div>

          <PixelCard variant="white">
            <h1 className="font-pixel text-sm text-[#1A2744] text-center uppercase mb-6">
              RESUME YOUR QUEST
            </h1>

            {serverError && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-300 rounded-xl text-xs font-pixel text-rose-600 text-center">
                {serverError}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <PixelInput
                label="Email"
                type="email"
                placeholder="hero@algoquest.dev"
                {...register('email')}
                error={errors.email?.message}
              />

              <PixelInput
                label="Password"
                type="password"
                placeholder="••••••••"
                {...register('password')}
                error={errors.password?.message}
              />

              {/* 3 Difficulty Options to Enter */}
              <div>
                <label className="block font-pixel text-[10px] text-[#1A2744] uppercase mb-2">
                  SELECT YOUR EXPEDITION TIER:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedTier('BEGINNER')}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border-2 transition-all ${
                      selectedTier === 'BEGINNER'
                        ? 'bg-emerald-50 border-[#2E7D32] shadow-[2px_2px_0_#2E7D32]'
                        : 'bg-white border-slate-200 hover:border-slate-300 opacity-60'
                    }`}
                  >
                    <Shield size={16} className="text-emerald-600 mb-1" />
                    <span className="font-pixel text-[8px] text-[#1A2744]">BEGINNER</span>
                    <span className="font-body text-[9px] text-slate-500">Tier 1</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedTier('INTERMEDIATE')}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border-2 transition-all ${
                      selectedTier === 'INTERMEDIATE'
                        ? 'bg-amber-50 border-[#FFB300] shadow-[2px_2px_0_#FFB300]'
                        : 'bg-white border-slate-200 hover:border-slate-300 opacity-60'
                    }`}
                  >
                    <Compass size={16} className="text-amber-600 mb-1" />
                    <span className="font-pixel text-[8px] text-[#1A2744]">INTERMEDIATE</span>
                    <span className="font-body text-[9px] text-slate-500">Tier 2</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedTier('ADVANCED')}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border-2 transition-all ${
                      selectedTier === 'ADVANCED'
                        ? 'bg-rose-50 border-[#D32F2F] shadow-[2px_2px_0_#D32F2F]'
                        : 'bg-white border-slate-200 hover:border-slate-300 opacity-60'
                    }`}
                  >
                    <Flame size={16} className="text-rose-600 mb-1" />
                    <span className="font-pixel text-[8px] text-[#1A2744]">ADVANCED</span>
                    <span className="font-body text-[9px] text-slate-500">Tier 3</span>
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <PixelButton
                  type="submit"
                  variant="mint"
                  size="lg"
                  fullWidth
                  disabled={isLoading}
                >
                  {isLoading ? 'VERIFYING CREDENTIALS...' : `ENTER AS ${selectedTier}`}
                </PixelButton>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="font-body text-xs text-[#1A2744]/70">
                New to the guild?{' '}
                <Link
                  href="/signup"
                  className="font-pixel text-[10px] text-[#8B7FD9] hover:underline"
                >
                  Enlist Here
                </Link>
              </p>
            </div>
          </PixelCard>
        </div>
      </div>
    </SkylineBackground>
  );
}
