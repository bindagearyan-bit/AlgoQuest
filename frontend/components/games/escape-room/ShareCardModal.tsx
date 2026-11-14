'use client';

import React, { useRef, useState } from 'react';
import { PixelModal } from '@/components/ui/PixelModal';
import { PixelButton } from '@/components/ui/PixelButton';
import { Download, Copy, Check, Share2 } from 'lucide-react';

interface ShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    username: string;
    date: string;
    timeElapsed: number;
    livesRemaining: number;
    isFlawless: boolean;
    roomsCleared: number;
    streak: number;
  } | null;
}

export const ShareCardModal: React.FC<ShareCardModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  if (!data) return null;

  const minutes = Math.floor(data.timeElapsed / 60);
  const seconds = data.timeElapsed % 60;
  const timeFormatted = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const shareText = `⚔️ I escaped today's Daily Algorithm Escape Room on AlgoQuest in ${timeFormatted} with ${data.livesRemaining}/5 lives! ${
    data.isFlawless ? '⭐ FLAWLESS RUN!' : ''
  } Streak: ${data.streak} Days 🔥\nCan you beat my dungeon time? Play at: https://algoquest-dsa.vercel.app/arcade/escape-room\n#AlgoQuestDaily #DSA`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    // Generate Canvas representation of Share Card
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 360;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = '#0D0B2E';
    ctx.fillRect(0, 0, 600, 360);

    // Border
    ctx.lineWidth = 6;
    ctx.strokeStyle = data.isFlawless ? '#FFD700' : '#00F0FF';
    ctx.strokeRect(10, 10, 580, 340);

    // Inner Brick Gradient Header
    ctx.fillStyle = '#1A1744';
    ctx.fillRect(16, 16, 568, 60);

    // Title
    ctx.fillStyle = data.isFlawless ? '#FFD700' : '#00F0FF';
    ctx.font = 'bold 18px "Courier New", monospace';
    ctx.fillText('ALGOQUEST : DAILY ALGORITHM ESCAPE', 30, 52);

    // Subtitle
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '14px "Courier New", monospace';
    ctx.fillText(`HERO: ${data.username.toUpperCase()} | DATE: ${data.date}`, 30, 110);

    // Stats
    ctx.fillStyle = '#7FFFD4';
    ctx.font = 'bold 20px "Courier New", monospace';
    ctx.fillText(`TIME: ${timeFormatted}`, 30, 155);

    ctx.fillStyle = '#FF2FD4';
    ctx.fillText(`LIVES: ${data.livesRemaining}/5 HEARTS`, 30, 195);

    ctx.fillStyle = '#FFD93D';
    ctx.fillText(`STREAK: ${data.streak} DAYS SURVIVED 🔥`, 30, 235);

    if (data.isFlawless) {
      ctx.fillStyle = '#FFD700';
      ctx.font = 'bold 16px "Courier New", monospace';
      ctx.fillText('⭐ FLAWLESS ESCAPE — 10/10 ROOMS ZERO HEARTS LOST ⭐', 30, 275);
    }

    // Hashtag & Footer
    ctx.fillStyle = '#94A3B8';
    ctx.font = '12px "Courier New", monospace';
    ctx.fillText('#AlgoQuestDaily • algoquest-dsa.vercel.app', 30, 320);

    // Trigger download
    const link = document.createElement('a');
    link.download = `AlgoQuest-DailyEscape-${data.date}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <PixelModal isOpen={isOpen} onClose={onClose} title="DUNGEON RUN SHARE CARD">
      <div className="space-y-6 text-center select-none">
        {/* Visual Share Card Box */}
        <div
          ref={cardRef}
          className={`p-6 rounded-2xl border-4 text-left shadow-[0_0_30px_rgba(0,0,0,0.8)] ${
            data.isFlawless
              ? 'border-[#FFD700] bg-gradient-to-b from-[#1A1744] via-[#2E1F3D] to-[#0D0B2E]'
              : 'border-[#00F0FF] bg-gradient-to-b from-[#120F38] via-[#0D0B2E] to-[#1A1744]'
          }`}
        >
          <div className="flex items-center justify-between border-b border-white/20 pb-3 mb-4">
            <div>
              <span className="font-pixel text-[8px] text-[#00F0FF] uppercase tracking-wider block">
                ALGOQUEST ARCADE
              </span>
              <h3 className="font-pixel text-xs sm:text-sm text-white mt-0.5">
                DAILY ESCAPE ROOM
              </h3>
            </div>
            <span className="font-pixel text-[8px] px-2 py-0.5 rounded bg-black/60 border border-white/20 text-[#FFD93D]">
              {data.date}
            </span>
          </div>

          <div className="space-y-2 font-pixel text-xs">
            <div className="text-white">
              HERO: <span className="text-[#00F0FF]">{data.username}</span>
            </div>
            <div className="text-white">
              TIME: <span className="text-[#7FFFD4]">{timeFormatted}</span>
            </div>
            <div className="text-white">
              LIVES: <span className="text-[#FF2FD4]">{data.livesRemaining} / 5</span>
            </div>
            <div className="text-white">
              STREAK: <span className="text-[#FFD93D]">{data.streak} DAYS 🔥</span>
            </div>
            {data.isFlawless && (
              <div className="text-[#FFD700] text-[10px] pt-1">
                ⭐ FLAWLESS ESCAPE BADGE UNLOCKED!
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[9px] font-pixel text-slate-400">
            <span>#AlgoQuestDaily</span>
            <span>algoquest-dsa.vercel.app</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <PixelButton
            variant="mint"
            size="md"
            className="flex-1 text-xs"
            onClick={handleDownload}
          >
            <Download size={14} className="mr-2" /> DOWNLOAD PNG
          </PixelButton>

          <PixelButton
            variant="outline"
            size="md"
            className="flex-1 text-xs"
            onClick={handleCopy}
          >
            {copied ? <Check size={14} className="mr-2 text-emerald-400" /> : <Copy size={14} className="mr-2" />}
            {copied ? 'COPIED TO CLIPBOARD!' : 'COPY TEXT LINK'}
          </PixelButton>
        </div>
      </div>
    </PixelModal>
  );
};
