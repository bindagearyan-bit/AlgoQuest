'use client';

import React, { useState, useEffect, useRef } from 'react';
import { arcadeApi, EscapeRunResult } from '@/lib/api/arcade';
import { dungeonAudio } from '@/lib/audio/dungeonAudio';
import { EscapeRoomHUD } from './EscapeRoomHUD';
import { RoomRenderer } from './RoomRenderer';
import { VictoryModal } from './VictoryModal';
import { DefeatModal } from './DefeatModal';
import { MilestoneModal } from './MilestoneModal';
import { LuckyChestModal } from './LuckyChestModal';
import { ShareCardModal } from './ShareCardModal';
import { EscapeRoomCalendar } from './EscapeRoomCalendar';
import { EscapeRoomLeaderboard } from './EscapeRoomLeaderboard';
import { PixelButton } from '@/components/ui/PixelButton';
import { PixelCard } from '@/components/ui/PixelCard';
import { Flame, Play, Clock, Trophy, Calendar as CalendarIcon, Shield, RefreshCw } from 'lucide-react';

export const EscapeRoomGame: React.FC = () => {
  // Game States: 'LOBBY' | 'PLAYING' | 'PAUSED' | 'VICTORY' | 'DEFEAT'
  const [gameState, setGameState] = useState<'LOBBY' | 'PLAYING' | 'PAUSED' | 'VICTORY' | 'DEFEAT'>('LOBBY');
  const [isPractice, setIsPractice] = useState(false);
  const [practiceDate, setPracticeDate] = useState<string | null>(null);

  // Dungeon Data
  const [todayData, setTodayData] = useState<any>(null);
  const [activeDungeon, setActiveDungeon] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Gameplay Run State
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0); // 0 to 9
  const [timeRemaining, setTimeRemaining] = useState(180);
  const [livesRemaining, setLivesRemaining] = useState(5);
  const [collectedKeys, setCollectedKeys] = useState<string[]>([]);
  const [hasCheckpoint, setHasCheckpoint] = useState(false);
  const [checkpointUsed, setCheckpointUsed] = useState(false);

  // Leaderboard & Calendar State
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [flawlessOnly, setFlawlessOnly] = useState(false);
  const [calendarDays, setCalendarDays] = useState<any[]>([]);
  const [streakInfo, setStreakInfo] = useState<any>({ currentStreak: 0, longestStreak: 0 });
  const [activeLobbyTab, setActiveLobbyTab] = useState<'CALENDAR' | 'LEADERBOARD'>('CALENDAR');

  // Modals
  const [runResult, setRunResult] = useState<EscapeRunResult | null>(null);
  const [showVictory, setShowVictory] = useState(false);
  const [showDefeat, setShowDefeat] = useState(false);
  const [showMilestone, setShowMilestone] = useState(false);
  const [showLuckyChest, setShowLuckyChest] = useState(false);
  const [showShareCard, setShowShareCard] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Load Initial Data
  const loadInitialData = async () => {
    setLoading(true);
    try {
      const [todayRes, streakRes, lbRes, calRes] = await Promise.all([
        arcadeApi.getTodayDungeon(),
        arcadeApi.getUserStreakInfo(),
        arcadeApi.getDailyLeaderboard(undefined, false, 50),
        arcadeApi.getUserCalendar(),
      ]);

      if (todayRes) {
        setTodayData(todayRes);
        setActiveDungeon(todayRes.dungeon);
      }
      if (streakRes) setStreakInfo(streakRes);
      if (lbRes) setLeaderboard(lbRes);
      if (calRes?.days) setCalendarDays(calRes.days);
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  // Leaderboard Flawless toggle
  const handleToggleFlawless = async () => {
    const nextVal = !flawlessOnly;
    setFlawlessOnly(nextVal);
    try {
      const lb = await arcadeApi.getDailyLeaderboard(undefined, nextVal, 50);
      if (lb) setLeaderboard(lb);
    } catch {
      //
    }
  };

  // Timer Tick
  useEffect(() => {
    if (gameState === 'PLAYING') {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleTimeExpired();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState]);

  // Start Scored Dungeon Run
  const handleStartTodayRun = () => {
    if (!todayData?.dungeon) return;
    setIsPractice(false);
    setPracticeDate(null);
    setActiveDungeon(todayData.dungeon);
    setCurrentRoomIndex(0);
    setTimeRemaining(180);
    setLivesRemaining(5);
    setCollectedKeys([]);
    setHasCheckpoint(false);
    setCheckpointUsed(false);
    setGameState('PLAYING');
    dungeonAudio.playDoorOpen();
  };

  // Start Practice Run for Past Date
  const handleStartPractice = async (dateStr: string) => {
    try {
      const res = await arcadeApi.getPracticeDungeon(dateStr);
      if (res?.dungeon) {
        setIsPractice(true);
        setPracticeDate(dateStr);
        setActiveDungeon(res.dungeon);
        setCurrentRoomIndex(0);
        setTimeRemaining(180);
        setLivesRemaining(5);
        setCollectedKeys([]);
        setHasCheckpoint(false);
        setCheckpointUsed(false);
        setGameState('PLAYING');
        dungeonAudio.playDoorOpen();
      }
    } catch {
      //
    }
  };

  // Handle Room Correct Answer
  const handleRoomCorrect = async () => {
    const nextRoomIdx = currentRoomIndex + 1;

    // Award key in collected tray on Rooms 2, 5, 8
    if (currentRoomIndex === 1 && !collectedKeys.includes('KEY_1')) {
      setCollectedKeys((prev) => [...prev, 'KEY_1']);
    } else if (currentRoomIndex === 4 && !collectedKeys.includes('KEY_2')) {
      setCollectedKeys((prev) => [...prev, 'KEY_2']);
      setHasCheckpoint(true);
      dungeonAudio.playCheckpoint();
    } else if (currentRoomIndex === 7 && !collectedKeys.includes('KEY_3')) {
      setCollectedKeys((prev) => [...prev, 'KEY_3']);
    }

    // Check if Cleared Room 10 -> VICTORY!
    if (nextRoomIdx >= 10) {
      if (timerRef.current) clearInterval(timerRef.current);
      const elapsed = 180 - timeRemaining;
      await handleCompleteRun(elapsed, livesRemaining, 10);
      return;
    }

    setCurrentRoomIndex(nextRoomIdx);
  };

  // Handle Room Wrong Answer
  const handleRoomWrong = () => {
    const nextLives = livesRemaining - 1;
    setLivesRemaining(nextLives);

    if (nextLives <= 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      dungeonAudio.playDefeat();
      setGameState('DEFEAT');
      setShowDefeat(true);
    }
  };

  // Handle Timer Expiry
  const handleTimeExpired = () => {
    dungeonAudio.playDefeat();
    setGameState('DEFEAT');
    setShowDefeat(true);
  };

  // Respawn at Checkpoint (Room 6)
  const handleRespawnCheckpoint = () => {
    setShowDefeat(false);
    setCheckpointUsed(true);
    setCurrentRoomIndex(5); // Room 6
    setLivesRemaining(2); // 2 checkpoint bonus lives
    setGameState('PLAYING');
    dungeonAudio.playCheckpoint();
  };

  // Submit Scored/Practice Run Completion
  const handleCompleteRun = async (elapsed: number, lives: number, rooms: number) => {
    try {
      const res = await arcadeApi.submitEscapeRun({
        timeElapsed: elapsed,
        livesRemaining: lives,
        roomsCleared: rooms,
        isPractice,
        dateString: isPractice ? practiceDate || undefined : undefined,
      });

      setRunResult(res);
      setGameState('VICTORY');
      setShowVictory(true);

      if (!isPractice && res.isVictory) {
        // Trigger celebratory modals if milestones or lucky chest awarded
        if (res.milestoneUnlocked) {
          setTimeout(() => setShowMilestone(true), 1500);
        } else if (res.luckyChestReward) {
          setTimeout(() => setShowLuckyChest(true), 1500);
        }
      }

      // Refresh streak and leaderboard
      arcadeApi.getUserStreakInfo().then(setStreakInfo);
      arcadeApi.getDailyLeaderboard().then(setLeaderboard);
    } catch {
      // Fallback victory presentation
      setRunResult({
        success: true,
        isVictory: true,
        isFlawless: lives === 5,
        roomsCleared: 10,
        timeElapsed: elapsed,
        livesRemaining: lives,
        xpBreakdown: {
          baseXP: 50,
          timeBonus: (180 - elapsed) * 2,
          flawlessBonus: lives === 5 ? 150 : 0,
          speedrunnerBonus: elapsed <= 90 ? 75 : 0,
          totalXpEarned: 50 + (180 - elapsed) * 2 + (lives === 5 ? 150 : 0),
        },
        streak: { current: (streakInfo.currentStreak || 0) + 1, longest: (streakInfo.longestStreak || 0) + 1 },
      });
      setGameState('VICTORY');
      setShowVictory(true);
    }
  };

  const currentRoom = activeDungeon?.rooms?.[currentRoomIndex];

  // Expiration countdown format
  const formatCountdown = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    return `${h}h ${m}m`;
  };

  return (
    <div className="min-h-screen bg-[#07051F] text-white selection:bg-[#00F0FF] selection:text-black">
      {/* ==================================================================== */}
      {/* 1. PLAYING / PAUSED VIEW */}
      {/* ==================================================================== */}
      {gameState === 'PLAYING' || gameState === 'PAUSED' ? (
        <div className="flex flex-col min-h-screen">
          <EscapeRoomHUD
            timeRemaining={timeRemaining}
            livesRemaining={livesRemaining}
            currentRoom={currentRoomIndex + 1}
            totalRooms={10}
            collectedKeys={collectedKeys}
            isPaused={gameState === 'PAUSED'}
            onTogglePause={() => setGameState(gameState === 'PAUSED' ? 'PLAYING' : 'PAUSED')}
            isPractice={isPractice}
            hasCheckpoint={hasCheckpoint}
          />

          <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
            {gameState === 'PAUSED' ? (
              <div className="text-center p-8 rounded-2xl bg-[#09081f] border-4 border-[#00F0FF] shadow-[0_0_30px_#00F0FF] max-w-md w-full">
                <span className="font-pixel text-xl sm:text-2xl text-[#00F0FF] block mb-2">
                  RUN PAUSED
                </span>
                <p className="font-pixel text-xs text-slate-300 mb-6">
                  Take a breather, Adventurer. Your timer is on hold.
                </p>
                <PixelButton
                  variant="mint"
                  size="lg"
                  className="w-full text-xs"
                  onClick={() => setGameState('PLAYING')}
                >
                  RESUME DUNGEON
                </PixelButton>
              </div>
            ) : currentRoom ? (
              <RoomRenderer
                room={currentRoom}
                onCorrect={handleRoomCorrect}
                onWrong={handleRoomWrong}
                disabled={livesRemaining <= 0 || timeRemaining <= 0}
              />
            ) : (
              <div className="font-pixel text-xs text-[#00F0FF] animate-pulse">
                INITIALIZING DUNGEON ROOMS...
              </div>
            )}
          </div>
        </div>
      ) : (
        /* ==================================================================== */
        /* 2. LOBBY VIEW */
        /* ==================================================================== */
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
          {/* Hero Banner with Theme & Glowing Streak */}
          <div className="relative rounded-2xl border-4 border-[#00F0FF] bg-gradient-to-r from-[#0D0B2E] via-[#1A1744] to-[#0D0B2E] p-6 sm:p-8 shadow-[0_0_35px_rgba(0,240,255,0.25)] flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
            <div className="space-y-3 text-center md:text-left z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF] text-[9px] font-pixel text-[#00F0FF]">
                <span>⚔️ FLAGSHIP DAILY ARCADE DUNGEON</span>
              </div>

              <h1 className="font-pixel text-xl sm:text-3xl text-white drop-shadow-[3px_3px_0_#000]">
                DAILY ALGORITHM ESCAPE ROOM
              </h1>

              <p className="font-pixel text-xs sm:text-sm text-[#FFD93D] max-w-xl leading-relaxed">
                "A new dungeon awaits every day. Can you escape?"
              </p>

              <p className="font-body text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                10 rapid procedural rooms. 180 seconds. 5 lives. Zero typing — solve with visual logic. Global daily reset at 00:00 UTC.
              </p>
            </div>

            {/* Streak & Timer Card */}
            <div className="bg-[#120F38] border-3 border-[#FFD700] p-5 rounded-2xl shadow-[0_0_20px_rgba(255,215,0,0.3)] text-center min-w-[220px] z-10 flex flex-col items-center">
              <div className="flex items-center gap-1.5 text-amber-400 mb-1">
                <Flame size={24} className="animate-bounce fill-current" />
                <span className="font-pixel text-3xl font-bold">
                  {streakInfo.currentStreak || 0}
                </span>
              </div>
              <span className="font-pixel text-[9px] text-[#FFD700] uppercase block">
                DAYS SURVIVED
              </span>
              {todayData?.expiresInSeconds && (
                <span className="font-pixel text-[8px] text-slate-400 block mt-2">
                  EXPIRES IN: {formatCountdown(todayData.expiresInSeconds)}
                </span>
              )}
            </div>
          </div>

          {/* Primary Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-[#09081f] border-2 border-[#00F0FF]/40">
            <div>
              <span className="font-pixel text-[9px] text-[#00F0FF] uppercase block">
                TODAY'S DUNGEON : {todayData?.formattedDate || 'TODAY'}
              </span>
              <span className="font-pixel text-xs sm:text-sm text-white mt-0.5 block">
                {todayData?.hasPlayedToday
                  ? '✅ You have cleared today’s daily run! Practice available below.'
                  : '🔥 Fresh 10-Room Dungeon Ready Worldwide.'}
              </span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <PixelButton
                variant={todayData?.hasPlayedToday ? 'outline' : 'mint'}
                size="lg"
                className="w-full sm:w-auto px-8 py-3 text-xs sm:text-sm"
                onClick={handleStartTodayRun}
              >
                <Play size={16} className="mr-2 fill-current" />
                {todayData?.hasPlayedToday ? 'PRACTICE TODAY’S DUNGEON' : 'ENTER TODAY’S DUNGEON'}
              </PixelButton>
            </div>
          </div>

          {/* Tab Selector: Calendar vs Leaderboard */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            <button
              onClick={() => setActiveLobbyTab('CALENDAR')}
              className={`px-4 py-2 rounded-xl font-pixel text-xs transition-colors flex items-center gap-2 ${
                activeLobbyTab === 'CALENDAR'
                  ? 'bg-[#00F0FF] text-[#09081f] font-bold shadow-[0_0_10px_#00F0FF]'
                  : 'bg-[#120F38] text-slate-400 hover:text-white'
              }`}
            >
              <CalendarIcon size={14} />
              <span>ESCAPE CALENDAR & PRACTICE</span>
            </button>

            <button
              onClick={() => setActiveLobbyTab('LEADERBOARD')}
              className={`px-4 py-2 rounded-xl font-pixel text-xs transition-colors flex items-center gap-2 ${
                activeLobbyTab === 'LEADERBOARD'
                  ? 'bg-[#00F0FF] text-[#09081f] font-bold shadow-[0_0_10px_#00F0FF]'
                  : 'bg-[#120F38] text-slate-400 hover:text-white'
              }`}
            >
              <Trophy size={14} />
              <span>GLOBAL LEADERBOARD (TOP 100)</span>
            </button>
          </div>

          {/* Tab Content */}
          {activeLobbyTab === 'CALENDAR' ? (
            <div className="space-y-4">
              <p className="font-pixel text-[9px] text-slate-400">
                💡 <span className="text-[#00F0FF]">Practice Mode:</span> Tap any past day tile to replay that day’s deterministic dungeon freely (unscored).
              </p>
              <EscapeRoomCalendar
                days={calendarDays}
                year={2026}
                month={11}
                onSelectPracticeDate={handleStartPractice}
              />
            </div>
          ) : (
            <EscapeRoomLeaderboard
              entries={leaderboard}
              loading={loading}
              flawlessOnly={flawlessOnly}
              onToggleFlawless={handleToggleFlawless}
              dateFormatted={todayData?.formattedDate}
            />
          )}
        </div>
      )}

      {/* ==================================================================== */}
      {/* 3. MODALS */}
      {/* ==================================================================== */}
      <VictoryModal
        isOpen={showVictory}
        onClose={() => {
          setShowVictory(false);
          setGameState('LOBBY');
        }}
        result={runResult}
        onOpenShareCard={() => setShowShareCard(true)}
      />

      <DefeatModal
        isOpen={showDefeat}
        onClose={() => {
          setShowDefeat(false);
          setGameState('LOBBY');
        }}
        roomsCleared={currentRoomIndex}
        timeElapsed={180 - timeRemaining}
        hasCheckpoint={hasCheckpoint}
        onRespawnCheckpoint={handleRespawnCheckpoint}
        checkpointUsed={checkpointUsed}
      />

      <MilestoneModal
        isOpen={showMilestone}
        onClose={() => setShowMilestone(false)}
        milestone={runResult?.milestoneUnlocked || null}
      />

      <LuckyChestModal
        isOpen={showLuckyChest}
        onClose={() => setShowLuckyChest(false)}
        reward={runResult?.luckyChestReward || null}
      />

      <ShareCardModal
        isOpen={showShareCard}
        onClose={() => setShowShareCard(false)}
        data={runResult?.shareCard || null}
      />
    </div>
  );
};
