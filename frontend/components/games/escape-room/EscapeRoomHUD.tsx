'use client';

import React from 'react';
import { Volume2, VolumeX, Pause, Play, Heart, Key, ShieldCheck } from 'lucide-react';
import { dungeonAudio } from '@/lib/audio/dungeonAudio';

interface EscapeRoomHUDProps {
  timeRemaining: number;
  totalTime?: number;
  livesRemaining: number;
  maxLives?: number;
  currentRoom: number;
  totalRooms?: number;
  collectedKeys: string[];
  isPaused: boolean;
  onTogglePause: () => void;
  isPractice?: boolean;
  hasCheckpoint?: boolean;
}

export const EscapeRoomHUD: React.FC<EscapeRoomHUDProps> = ({
  timeRemaining,
  totalTime = 180,
  livesRemaining,
  maxLives = 5,
  currentRoom,
  totalRooms = 10,
  collectedKeys,
  isPaused,
  onTogglePause,
  isPractice = false,
  hasCheckpoint = false,
}) => {
  const [muted, setMuted] = React.useState(dungeonAudio.getMuted());

  const handleToggleMute = () => {
    const isNowMuted = dungeonAudio.toggleMute();
    setMuted(isNowMuted);
  };

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const timeFormatted = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const timePercent = Math.max(0, Math.min(100, (timeRemaining / totalTime) * 100));
  const isUrgent = timeRemaining <= 30;
  const isWarning = timeRemaining > 30 && timeRemaining <= 60;

  return (
    <div className="w-full bg-[#0D0B2E] border-b-2 border-[#00F0FF]/40 px-3 sm:px-6 py-2.5 shadow-[0_4px_20px_rgba(0,240,255,0.15)] select-none">
      <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Room Counter & Practice Tag */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 bg-[#1A1744] border-2 border-[#00F0FF] rounded-lg shadow-[2px_2px_0_#000]">
            <span className="font-pixel text-[10px] sm:text-xs text-[#00F0FF]">
              ROOM {currentRoom}/{totalRooms}
            </span>
          </div>

          {isPractice && (
            <span className="px-2 py-0.5 bg-amber-500/20 border border-amber-400 text-amber-300 font-pixel text-[8px] rounded">
              PRACTICE
            </span>
          )}

          {hasCheckpoint && currentRoom >= 5 && (
            <div className="flex items-center gap-1 px-2 py-0.5 bg-[#7FFFD4]/20 border border-[#7FFFD4] text-[#7FFFD4] font-pixel text-[8px] rounded">
              <ShieldCheck size={12} />
              <span className="hidden sm:inline">CHECKPOINT ACTIVE</span>
            </div>
          )}
        </div>

        {/* Center: Timer & Room Lives */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Room Lives (5 Hearts) */}
          <div className="flex items-center gap-1">
            {Array.from({ length: maxLives }).map((_, idx) => (
              <Heart
                key={idx}
                size={18}
                className={`transition-all duration-300 ${
                  idx < livesRemaining
                    ? 'text-[#FF2FD4] fill-[#FF2FD4] drop-shadow-[0_0_6px_#FF2FD4]'
                    : 'text-slate-600 fill-slate-800 opacity-40'
                }`}
              />
            ))}
          </div>

          {/* 180s Timer Bar with Countdown */}
          <div className="flex flex-col items-end min-w-[90px] sm:min-w-[120px]">
            <span
              className={`font-pixel text-xs sm:text-sm font-bold tracking-wider ${
                isUrgent
                  ? 'text-[#FF2FD4] animate-pulse drop-shadow-[0_0_8px_#FF2FD4]'
                  : isWarning
                  ? 'text-[#FFD93D]'
                  : 'text-[#7FFFD4]'
              }`}
            >
              ⏱️ {timeFormatted}
            </span>
            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-700 mt-1">
              <div
                className={`h-full transition-all duration-1000 ${
                  isUrgent ? 'bg-[#FF2FD4]' : isWarning ? 'bg-[#FFD93D]' : 'bg-[#7FFFD4]'
                }`}
                style={{ width: `${timePercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right: Collected Keys Tray & Controls */}
        <div className="flex items-center gap-3">
          {/* Keys Tray for Room 10 Vault Payoff */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#1A1744] border border-[#2E1F3D] rounded-lg">
            <span className="font-pixel text-[8px] text-slate-400 mr-1 hidden sm:inline">KEYS:</span>
            {[0, 1, 2].map((slotIdx) => {
              const keyName = collectedKeys[slotIdx];
              return (
                <div
                  key={slotIdx}
                  className={`w-6 h-6 rounded border flex items-center justify-center text-xs transition-all ${
                    keyName
                      ? 'border-[#FFD700] bg-[#FFD700]/20 shadow-[0_0_8px_#FFD700]'
                      : 'border-slate-800 bg-black/40 opacity-30'
                  }`}
                  title={keyName || 'Locked Key'}
                >
                  <Key size={12} className={keyName ? 'text-[#FFD700]' : 'text-slate-600'} />
                </div>
              );
            })}
          </div>

          {/* Pause Button */}
          <button
            onClick={onTogglePause}
            className="p-1.5 rounded-lg bg-[#1A1744] border border-[#00F0FF]/50 text-[#00F0FF] hover:bg-[#00F0FF]/20 transition-colors shadow-[1px_1px_0_#000]"
            title={isPaused ? 'Resume Run' : 'Pause Run'}
          >
            {isPaused ? <Play size={14} className="fill-current" /> : <Pause size={14} />}
          </button>

          {/* Mute Toggle */}
          <button
            onClick={handleToggleMute}
            className={`p-1.5 rounded-lg border transition-colors shadow-[1px_1px_0_#000] ${
              muted
                ? 'bg-rose-950/60 border-rose-500/50 text-rose-400'
                : 'bg-[#1A1744] border-[#00F0FF]/50 text-[#00F0FF] hover:bg-[#00F0FF]/20'
            }`}
            title={muted ? 'Unmute Chiptune Sound' : 'Mute Sound'}
          >
            {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        </div>
      </div>
    </div>
  );
};
