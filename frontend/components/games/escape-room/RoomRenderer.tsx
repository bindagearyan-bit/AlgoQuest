'use client';

import React, { useState, useEffect } from 'react';
import { dungeonAudio } from '@/lib/audio/dungeonAudio';
import { ShieldCheck, Flame, AlertTriangle, ArrowRight, CornerDownRight } from 'lucide-react';

interface RoomData {
  roomNumber: number;
  title: string;
  topic: string;
  prompt: string;
  visualType: string;
  visualData: any;
  options: any[];
  correctAnswer: any;
  isCheckpoint?: boolean;
  explanation: string;
}

interface RoomRendererProps {
  room: RoomData;
  onCorrect: () => void;
  onWrong: () => void;
  disabled?: boolean;
}

export const RoomRenderer: React.FC<RoomRendererProps> = ({
  room,
  onCorrect,
  onWrong,
  disabled = false,
}) => {
  const [feedback, setFeedback] = useState<'IDLE' | 'CORRECT' | 'WRONG'>('IDLE');
  const [selectedId, setSelectedId] = useState<any>(null);

  // Room 3 State: Stack Rune Pillar interactive pops
  const [stackState, setStackState] = useState<any[]>(room.visualData?.initialStack || []);
  const [popsDone, setPopsDone] = useState(0);

  // Room 10 State: Vault Keys insertion sequence
  const [vaultInserted, setVaultInserted] = useState<string[]>([]);

  useEffect(() => {
    setFeedback('IDLE');
    setSelectedId(null);
    if (room.roomNumber === 3) {
      setStackState(room.visualData?.initialStack || []);
      setPopsDone(0);
    }
    if (room.roomNumber === 10) {
      setVaultInserted([]);
    }
  }, [room]);

  const handleSelectOption = (optionValue: any) => {
    if (disabled || feedback !== 'IDLE') return;

    dungeonAudio.playTick();
    setSelectedId(optionValue);

    const isMatch = optionValue === room.correctAnswer;
    if (isMatch) {
      setFeedback('CORRECT');
      dungeonAudio.playCorrect();
      setTimeout(() => {
        dungeonAudio.playDoorOpen();
        onCorrect();
      }, 700);
    } else {
      setFeedback('WRONG');
      dungeonAudio.playWrong();
      setTimeout(() => {
        setFeedback('IDLE');
        setSelectedId(null);
        onWrong();
      }, 800);
    }
  };

  // Handler for Room 3 (Stack Rune Pillar)
  const handlePopRune = () => {
    if (disabled || feedback !== 'IDLE' || stackState.length <= 1) return;
    dungeonAudio.playTick();

    const newStack = [...stackState];
    newStack.pop();
    setStackState(newStack);
    const newPops = popsDone + 1;
    setPopsDone(newPops);

    const currentTop = newStack[newStack.length - 1];
    if (currentTop?.name === room.visualData?.targetRune) {
      setFeedback('CORRECT');
      dungeonAudio.playCorrect();
      setTimeout(() => {
        dungeonAudio.playDoorOpen();
        onCorrect();
      }, 700);
    }
  };

  // Handler for Room 10 (Logic Vault Key Sequence)
  const handleInsertVaultKey = (keyId: string) => {
    if (disabled || feedback !== 'IDLE' || vaultInserted.includes(keyId)) return;
    dungeonAudio.playTick();

    const newSeq = [...vaultInserted, keyId];
    setVaultInserted(newSeq);

    const targetSeq: string[] = room.correctAnswer || [];
    const currentStep = newSeq.length - 1;

    // Check if the newly tapped key is correct for this step
    if (newSeq[currentStep] !== targetSeq[currentStep]) {
      setFeedback('WRONG');
      dungeonAudio.playWrong();
      setTimeout(() => {
        setFeedback('IDLE');
        setVaultInserted([]);
        onWrong();
      }, 800);
      return;
    }

    // If all 3 keys inserted correctly!
    if (newSeq.length === targetSeq.length) {
      setFeedback('CORRECT');
      dungeonAudio.playCorrect();
      setTimeout(() => {
        dungeonAudio.playVictory();
        onCorrect();
      }, 800);
    }
  };

  return (
    <div
      className={`relative w-full max-w-4xl mx-auto rounded-2xl border-4 p-4 sm:p-8 transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.6)] ${
        feedback === 'CORRECT'
          ? 'border-[#7FFFD4] bg-[#07241F] shadow-[0_0_40px_rgba(127,255,212,0.4)]'
          : feedback === 'WRONG'
          ? 'border-[#FF2FD4] bg-[#2E0B1A] animate-shake shadow-[0_0_40px_rgba(255,47,212,0.4)]'
          : 'border-[#00F0FF]/40 bg-gradient-to-b from-[#120F38] via-[#0D0B2E] to-[#1A1744]'
      }`}
    >
      {/* Room Header with Topic & Checkpoint Flag */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#00F0FF]/20 pb-4 mb-6">
        <div>
          <span className="font-pixel text-[9px] text-[#00F0FF] uppercase tracking-wider block">
            ROOM {room.roomNumber} : {room.topic}
          </span>
          <h2 className="font-pixel text-base sm:text-xl text-white mt-1 drop-shadow-[2px_2px_0_#000]">
            {room.title}
          </h2>
        </div>

        {room.isCheckpoint && (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#7FFFD4]/20 border border-[#7FFFD4] text-[#7FFFD4] font-pixel text-[9px] rounded-lg shadow-[0_0_10px_rgba(127,255,212,0.3)]">
            <ShieldCheck size={14} />
            <span>DUNGEON CHECKPOINT</span>
          </div>
        )}
      </div>

      {/* Dynamic Prompt Banner */}
      <div className="p-4 rounded-xl bg-black/40 border border-[#00F0FF]/30 mb-6">
        <p className="font-pixel text-xs sm:text-sm text-[#FFD93D] leading-relaxed drop-shadow-[1px_1px_0_#000]">
          {room.prompt}
        </p>
      </div>

      {/* ==================================================================== */}
      {/* ROOM 1: ARRAY INDEXING HALL */}
      {/* ==================================================================== */}
      {room.visualType === 'ARRAY_TILES' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {room.visualData?.items?.map((item: any) => (
              <button
                key={item.index}
                disabled={disabled || feedback !== 'IDLE'}
                onClick={() => handleSelectOption(item.index)}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all transform active:scale-95 shadow-[3px_3px_0_#000] min-h-[110px] ${
                  selectedId === item.index
                    ? feedback === 'CORRECT'
                      ? 'border-[#7FFFD4] bg-[#7FFFD4]/20'
                      : 'border-[#FF2FD4] bg-[#FF2FD4]/20'
                    : 'border-[#00F0FF]/40 bg-[#1A1744] hover:border-[#00F0FF] hover:bg-[#252060]'
                }`}
              >
                <span className="font-pixel text-xs text-[#00F0FF] mb-1">[{item.index}]</span>
                <span className="text-3xl sm:text-4xl my-1">{item.icon}</span>
                <span className="font-pixel text-[9px] text-white uppercase">{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* ROOM 2: BOUNDARY SPIKE PIT */}
      {/* ==================================================================== */}
      {room.visualType === 'SPIKE_PIT' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-[#09081f] border border-rose-500/30 flex items-center justify-between text-center">
            <span className="font-pixel text-[10px] text-slate-300">
              ALLOCATED INDICES: <span className="text-[#7FFFD4]">0 ... {room.visualData.arrayLength - 1}</span>
            </span>
            <span className="font-pixel text-[10px] text-rose-400">
              PIT HAZARD: <span className="text-rose-300">OUT OF BOUNDS</span>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {room.options.map((opt: any) => (
              <button
                key={opt.value}
                disabled={disabled || feedback !== 'IDLE'}
                onClick={() => handleSelectOption(opt.value)}
                className={`p-4 rounded-xl border-2 font-pixel text-xs transition-all active:scale-95 shadow-[3px_3px_0_#000] min-h-[80px] flex items-center justify-center ${
                  selectedId === opt.value
                    ? feedback === 'CORRECT'
                      ? 'border-[#7FFFD4] bg-[#7FFFD4]/20 text-[#7FFFD4]'
                      : 'border-[#FF2FD4] bg-[#FF2FD4]/20 text-[#FF2FD4]'
                    : 'border-[#00F0FF]/40 bg-[#1A1744] text-white hover:border-[#00F0FF] hover:bg-[#252060]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* ROOM 3: STACK RUNE PILLAR (LIFO) */}
      {/* ==================================================================== */}
      {room.visualType === 'STACK_PILLAR' && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-2">
          {/* Vertical Stack Pillar */}
          <div className="w-48 p-4 bg-[#09081f] border-2 border-[#00F0FF]/40 rounded-xl flex flex-col-reverse gap-2 shadow-[0_0_20px_rgba(0,240,255,0.15)]">
            <div className="text-center font-pixel text-[8px] text-slate-500 border-t border-slate-700 pt-1">
              ▼ STACK BOTTOM
            </div>
            {stackState.map((r: any, idx: number) => {
              const isTop = idx === stackState.length - 1;
              return (
                <div
                  key={idx}
                  className={`p-2.5 rounded-lg border-2 flex items-center justify-between font-pixel text-xs transition-all ${
                    isTop
                      ? 'border-white bg-white/10 shadow-[0_0_12px_rgba(255,255,255,0.4)]'
                      : 'border-slate-700 bg-slate-900/60 opacity-80'
                  }`}
                  style={{ borderColor: r.hex }}
                >
                  <span className="text-base">{r.icon}</span>
                  <span className="text-white text-[10px]">{r.name} Rune</span>
                  {isTop && <span className="font-pixel text-[8px] text-[#7FFFD4]">TOP</span>}
                </div>
              );
            })}
          </div>

          {/* Action Button: Pop Rune */}
          <div className="flex flex-col items-center gap-3">
            <span className="font-pixel text-[10px] text-slate-300">
              TARGET: <span className="text-[#FFD700] font-bold">{room.visualData?.targetRune} Rune</span>
            </span>

            <button
              disabled={disabled || feedback !== 'IDLE'}
              onClick={handlePopRune}
              className="px-6 py-4 rounded-xl border-3 border-[#FF2FD4] bg-[#FF2FD4] text-white font-pixel text-xs sm:text-sm hover:brightness-110 active:scale-95 shadow-[4px_4px_0_#000] transition-transform"
            >
              [POP TOP RUNE]
            </button>

            <span className="font-pixel text-[8px] text-slate-400">
              POPS EXECUTED: {popsDone}
            </span>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* ROOM 4: STACK OVERFLOW / UNDERFLOW TRAP */}
      {/* ==================================================================== */}
      {room.visualType === 'STACK_TRAP' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-[#09081f] border border-amber-500/30 flex items-center justify-around text-center">
            <div className="flex items-center gap-2">
              <AlertTriangle className="text-amber-400" size={18} />
              <span className="font-pixel text-xs text-amber-300 uppercase">
                CAPACITY: {room.visualData.currentCount} / {room.visualData.capacity} BRICKS
              </span>
            </div>
            <span className="font-pixel text-[10px] text-[#7FFFD4]">
              STATUS: {room.visualData.mode} DANGER
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {room.options.map((opt: any) => (
              <button
                key={opt.value}
                disabled={disabled || feedback !== 'IDLE'}
                onClick={() => handleSelectOption(opt.value)}
                className={`p-5 rounded-xl border-3 font-pixel text-xs sm:text-sm transition-all active:scale-95 shadow-[4px_4px_0_#000] flex items-center justify-center ${
                  selectedId === opt.value
                    ? feedback === 'CORRECT'
                      ? 'border-[#7FFFD4] bg-[#7FFFD4]/20 text-[#7FFFD4]'
                      : 'border-[#FF2FD4] bg-[#FF2FD4]/20 text-[#FF2FD4]'
                    : opt.value === 'POP'
                    ? 'border-[#FF6FA0] bg-[#1A1744] text-[#FF6FA0] hover:bg-[#FF6FA0]/10'
                    : 'border-[#7FFFD4] bg-[#1A1744] text-[#7FFFD4] hover:bg-[#7FFFD4]/10'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* ROOM 5: QUEUE DUNGEON GATE (FIFO) — CHECKPOINT */}
      {/* ==================================================================== */}
      {room.visualType === 'QUEUE_LINE' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {room.visualData?.queue?.map((member: any) => (
              <button
                key={member.role}
                disabled={disabled || feedback !== 'IDLE'}
                onClick={() => handleSelectOption(member.role)}
                className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all active:scale-95 shadow-[3px_3px_0_#000] ${
                  selectedId === member.role
                    ? feedback === 'CORRECT'
                      ? 'border-[#7FFFD4] bg-[#7FFFD4]/20 text-[#7FFFD4]'
                      : 'border-[#FF2FD4] bg-[#FF2FD4]/20 text-[#FF2FD4]'
                    : 'border-[#00F0FF]/40 bg-[#1A1744] text-white hover:border-[#00F0FF] hover:bg-[#252060]'
                }`}
              >
                <span className="font-pixel text-[8px] text-[#00F0FF] px-2 py-0.5 rounded bg-black/40">
                  {member.position} of Queue
                </span>
                <span className="text-4xl my-1">{member.icon}</span>
                <span className="font-pixel text-xs text-white">{member.role}</span>
                <span className="font-pixel text-[8px] text-slate-400">{member.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* ROOM 6: LOOP COUNTER BRIDGE */}
      {/* ==================================================================== */}
      {room.visualType === 'LOOP_BRIDGE' && (
        <div className="space-y-6">
          {/* Code snippet inside pixel frame */}
          <div className="p-4 rounded-xl bg-[#09081f] border-2 border-[#00F0FF]/30 font-mono text-xs sm:text-sm text-cyan-300 shadow-inner">
            <pre className="overflow-x-auto whitespace-pre font-mono">
              {room.visualData.code}
            </pre>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {room.options.map((opt: any) => (
              <button
                key={opt.value}
                disabled={disabled || feedback !== 'IDLE'}
                onClick={() => handleSelectOption(opt.value)}
                className={`p-4 rounded-xl border-2 font-pixel text-xs sm:text-sm transition-all active:scale-95 shadow-[3px_3px_0_#000] flex items-center justify-center ${
                  selectedId === opt.value
                    ? feedback === 'CORRECT'
                      ? 'border-[#7FFFD4] bg-[#7FFFD4]/20 text-[#7FFFD4]'
                      : 'border-[#FF2FD4] bg-[#FF2FD4]/20 text-[#FF2FD4]'
                    : 'border-[#00F0FF]/40 bg-[#1A1744] text-white hover:border-[#00F0FF] hover:bg-[#252060]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* ROOM 7: IF-ELSE GATE */}
      {/* ==================================================================== */}
      {room.visualType === 'IF_ELSE_DOORS' && (
        <div className="space-y-6">
          {/* Code sign */}
          <div className="p-3 sm:p-4 rounded-xl bg-[#09081f] border-2 border-[#FFD93D]/40 font-mono text-xs sm:text-sm text-amber-200">
            <pre className="overflow-x-auto whitespace-pre font-mono">
              {room.visualData.code}
            </pre>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {room.options.map((opt: any) => (
              <button
                key={opt.value}
                disabled={disabled || feedback !== 'IDLE'}
                onClick={() => handleSelectOption(opt.value)}
                className={`p-6 rounded-2xl border-4 font-pixel text-sm sm:text-base transition-all active:scale-95 shadow-[4px_4px_0_#000] flex flex-col items-center justify-center gap-2 min-h-[120px] ${
                  opt.value === 'RED'
                    ? 'border-rose-500 bg-rose-950/40 text-rose-300 hover:bg-rose-900/40'
                    : 'border-emerald-500 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/40'
                } ${
                  selectedId === opt.value
                    ? feedback === 'CORRECT'
                      ? 'border-[#7FFFD4] ring-4 ring-[#7FFFD4]/50'
                      : 'border-[#FF2FD4] ring-4 ring-[#FF2FD4]/50'
                    : ''
                }`}
              >
                <span className="text-3xl">{opt.value === 'RED' ? '🚪 🔴' : '🚪 🟢'}</span>
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* ROOM 8: LINKED LIST CHAIN */}
      {/* ==================================================================== */}
      {room.visualType === 'LINKED_LIST' && (
        <div className="space-y-6">
          {/* Linked List visual chain */}
          <div className="p-4 rounded-xl bg-[#09081f] border-2 border-[#00F0FF]/30 flex flex-wrap items-center justify-center gap-2 sm:gap-4 overflow-x-auto py-6">
            {room.visualData?.nodes?.map((val: number, idx: number) => (
              <React.Fragment key={idx}>
                <div className="w-16 h-16 rounded-xl border-2 border-[#7FFFD4] bg-[#1A1744] flex flex-col items-center justify-center shadow-[2px_2px_0_#000]">
                  <span className="font-pixel text-[8px] text-slate-400">Node</span>
                  <span className="font-pixel text-sm text-[#7FFFD4]">{val}</span>
                </div>
                <ArrowRight size={20} className="text-[#00F0FF]" />
              </React.Fragment>
            ))}
            <div className="w-16 h-16 rounded-xl border-2 border-dashed border-[#FFD93D] bg-[#FFD93D]/10 flex items-center justify-center font-pixel text-sm text-[#FFD93D]">
              ?
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {room.options.map((opt: any) => (
              <button
                key={opt.value}
                disabled={disabled || feedback !== 'IDLE'}
                onClick={() => handleSelectOption(opt.value)}
                className={`p-4 rounded-xl border-2 font-pixel text-xs sm:text-sm transition-all active:scale-95 shadow-[3px_3px_0_#000] flex items-center justify-center ${
                  selectedId === opt.value
                    ? feedback === 'CORRECT'
                      ? 'border-[#7FFFD4] bg-[#7FFFD4]/20 text-[#7FFFD4]'
                      : 'border-[#FF2FD4] bg-[#FF2FD4]/20 text-[#FF2FD4]'
                    : 'border-[#00F0FF]/40 bg-[#1A1744] text-white hover:border-[#00F0FF] hover:bg-[#252060]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* ROOM 9: RECURSION PORTAL */}
      {/* ==================================================================== */}
      {room.visualType === 'RECURSION_PORTAL' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {room.options.map((opt: any) => (
              <button
                key={opt.id}
                disabled={disabled || feedback !== 'IDLE'}
                onClick={() => handleSelectOption(opt.value)}
                className={`p-5 rounded-2xl border-3 flex flex-col items-center justify-center gap-3 transition-all active:scale-95 shadow-[4px_4px_0_#000] min-h-[130px] ${
                  selectedId === opt.value
                    ? feedback === 'CORRECT'
                      ? 'border-[#7FFFD4] bg-[#7FFFD4]/20 text-[#7FFFD4]'
                      : 'border-[#FF2FD4] bg-[#FF2FD4]/20 text-[#FF2FD4]'
                    : 'border-[#00F0FF]/40 bg-[#1A1744] text-white hover:border-[#00F0FF] hover:bg-[#252060]'
                }`}
              >
                <span className="text-3xl">🌀</span>
                <span className="font-pixel text-[9px] text-[#00F0FF]">PORTAL {opt.id + 1}</span>
                <code className="font-mono text-xs text-amber-300 bg-black/60 px-2 py-1 rounded border border-amber-500/20">
                  {opt.label}
                </code>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* ROOM 10: FINAL BOSS: THE LOGIC VAULT */}
      {/* ==================================================================== */}
      {room.visualType === 'LOGIC_VAULT' && (
        <div className="space-y-6">
          {/* Required Vault Sequence Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#2E1F3D] via-[#1A1744] to-[#2E1F3D] border-2 border-[#FFD700] text-center">
            <span className="font-pixel text-[9px] text-[#FFD700] uppercase block mb-2">
              VAULT SEAL COMBINATION:
            </span>
            <div className="flex items-center justify-center gap-3">
              {room.visualData?.requiredSequence?.map((key: any, idx: number) => {
                const isInserted = vaultInserted.length > idx;
                return (
                  <React.Fragment key={key.id}>
                    <div
                      className={`px-3 py-2 rounded-lg border-2 flex items-center gap-2 font-pixel text-xs transition-all ${
                        isInserted
                          ? 'border-[#7FFFD4] bg-[#7FFFD4]/20 text-[#7FFFD4] shadow-[0_0_10px_#7FFFD4]'
                          : 'border-[#FFD700] bg-black/50 text-[#FFD700]'
                      }`}
                    >
                      <span>{key.icon}</span>
                      <span className="hidden sm:inline">{key.name}</span>
                    </div>
                    {idx < room.visualData.requiredSequence.length - 1 && (
                      <span className="text-[#00F0FF] font-pixel text-xs">➔</span>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Key Tap Targets */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {room.options.map((key: any) => {
              const alreadyUsed = vaultInserted.includes(key.value);
              return (
                <button
                  key={key.value}
                  disabled={disabled || feedback !== 'IDLE' || alreadyUsed}
                  onClick={() => handleInsertVaultKey(key.value)}
                  className={`p-5 rounded-2xl border-3 font-pixel text-xs sm:text-sm flex flex-col items-center justify-center gap-2 transition-all active:scale-95 shadow-[4px_4px_0_#000] min-h-[100px] ${
                    alreadyUsed
                      ? 'border-slate-800 bg-slate-900/60 text-slate-500 opacity-40 cursor-not-allowed'
                      : 'border-[#FFD700] bg-[#1A1744] text-[#FFD700] hover:bg-[#FFD700]/10 hover:border-white'
                  }`}
                >
                  <span className="text-3xl">{key.label.split(' ')[0]}</span>
                  <span>{key.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Explanation on Feedback */}
      {feedback !== 'IDLE' && (
        <div
          className={`mt-6 p-4 rounded-xl border text-xs sm:text-sm font-body leading-relaxed flex items-center gap-3 ${
            feedback === 'CORRECT'
              ? 'border-emerald-500/50 bg-emerald-950/40 text-emerald-200'
              : 'border-rose-500/50 bg-rose-950/40 text-rose-200'
          }`}
        >
          <span className="font-pixel text-sm">
            {feedback === 'CORRECT' ? '🎉' : '💥'}
          </span>
          <p>{room.explanation}</p>
        </div>
      )}
    </div>
  );
};
