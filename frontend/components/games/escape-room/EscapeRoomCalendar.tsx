'use client';

import React from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Star, Check, X, Lock } from 'lucide-react';

interface DayItem {
  day: number;
  dateString: string;
  status: 'FLAWLESS' | 'CLEARED' | 'MISSED' | 'TODAY_PENDING' | 'FUTURE_LOCKED';
  run?: {
    timeElapsed: number;
    livesRemaining: number;
    isFlawless: boolean;
  } | null;
}

interface EscapeRoomCalendarProps {
  days: DayItem[];
  year: number;
  month: number;
  onSelectPracticeDate: (dateString: string) => void;
  onPrevMonth?: () => void;
  onNextMonth?: () => void;
}

export const EscapeRoomCalendar: React.FC<EscapeRoomCalendarProps> = ({
  days,
  year,
  month,
  onSelectPracticeDate,
  onPrevMonth,
  onNextMonth,
}) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthName = months[month - 1] || 'Current Month';

  return (
    <div className="w-full rounded-2xl bg-[#09081f] border-2 border-[#00F0FF]/30 p-4 sm:p-6 shadow-[0_0_20px_rgba(0,240,255,0.1)]">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4 border-b border-[#00F0FF]/20 pb-3">
        <div className="flex items-center gap-2">
          <CalendarIcon size={16} className="text-[#00F0FF]" />
          <h3 className="font-pixel text-xs sm:text-sm text-white">
            {monthName.toUpperCase()} {year}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {onPrevMonth && (
            <button
              onClick={onPrevMonth}
              className="p-1 rounded bg-[#1A1744] border border-[#00F0FF]/40 text-[#00F0FF] hover:bg-[#00F0FF]/20"
            >
              <ChevronLeft size={14} />
            </button>
          )}
          {onNextMonth && (
            <button
              onClick={onNextMonth}
              className="p-1 rounded bg-[#1A1744] border border-[#00F0FF]/40 text-[#00F0FF] hover:bg-[#00F0FF]/20"
            >
              <ChevronRight size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2 mb-2 text-center">
        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((w, idx) => (
          <span key={idx} className="font-pixel text-[8px] text-slate-500">
            {w}
          </span>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
        {days.map((item) => {
          const isClickableForPractice = item.status === 'MISSED' || item.status === 'CLEARED' || item.status === 'FLAWLESS';

          return (
            <button
              key={item.day}
              disabled={!isClickableForPractice}
              onClick={() => isClickableForPractice && onSelectPracticeDate(item.dateString)}
              className={`relative aspect-square rounded-lg border flex flex-col items-center justify-center p-1 transition-all text-center select-none ${
                item.status === 'FLAWLESS'
                  ? 'border-[#FFD700] bg-[#FFD700]/20 text-[#FFD700] hover:scale-105 shadow-[0_0_8px_#FFD700]'
                  : item.status === 'CLEARED'
                  ? 'border-[#7FFFD4] bg-[#7FFFD4]/20 text-[#7FFFD4] hover:scale-105 shadow-[0_0_8px_#7FFFD4]'
                  : item.status === 'TODAY_PENDING'
                  ? 'border-[#00F0FF] bg-[#00F0FF]/10 text-[#00F0FF] animate-pulse ring-2 ring-[#00F0FF]/40'
                  : item.status === 'MISSED'
                  ? 'border-slate-700 bg-slate-900/60 text-slate-400 hover:border-slate-500'
                  : 'border-slate-900 bg-black/40 text-slate-700 cursor-not-allowed opacity-50'
              }`}
              title={
                item.status === 'FLAWLESS'
                  ? `${item.dateString}: Flawless Escape (5/5 Lives)`
                  : item.status === 'CLEARED'
                  ? `${item.dateString}: Cleared (${item.run?.timeElapsed}s)`
                  : item.status === 'TODAY_PENDING'
                  ? `${item.dateString}: Today's Dungeon Ready!`
                  : item.status === 'MISSED'
                  ? `${item.dateString}: Missed — Tap for Practice Mode`
                  : `${item.dateString}: Future locked`
              }
            >
              <span className="font-pixel text-[9px] sm:text-[11px] font-bold">{item.day}</span>

              {/* Status Icons */}
              <div className="mt-0.5">
                {item.status === 'FLAWLESS' && <Star size={10} className="fill-current text-[#FFD700]" />}
                {item.status === 'CLEARED' && <Check size={10} className="text-[#7FFFD4]" />}
                {item.status === 'TODAY_PENDING' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] block" />
                )}
                {item.status === 'MISSED' && <X size={9} className="text-slate-600" />}
                {item.status === 'FUTURE_LOCKED' && <Lock size={8} className="text-slate-800" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Calendar Legend */}
      <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[8px] font-pixel text-slate-400">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#FFD700]" />
          <span>FLAWLESS</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#7FFFD4]" />
          <span>CLEARED</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
          <span>TODAY</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-slate-600" />
          <span>PRACTICEABLE</span>
        </div>
      </div>
    </div>
  );
};
