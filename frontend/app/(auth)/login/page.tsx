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

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
      });
      router.push('/dashboard');
    } catch (err: any) {
      setServerError(
        err.response?.data?.message || err.message || 'Invalid email or password.'
      );
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

              <div className="pt-2">
                <PixelButton
                  type="submit"
                  variant="mint"
                  size="lg"
                  fullWidth
                  disabled={isLoading}
                >
                  {isLoading ? 'VERIFYING CREDENTIALS...' : 'ENTER DUNGEON'}
                </PixelButton>
              </div>
            </form>

            <div className="mt-6 text-center text-xs font-body text-slate-600">
              New to AlgoQuest?{' '}
              <Link href="/signup" className="font-pixel text-[11px] text-[#8B7FD9] underline">
                Create Account
              </Link>
            </div>
          </PixelCard>
        </div>
      </div>
    </SkylineBackground>
  );
}

