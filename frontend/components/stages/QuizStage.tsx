'use client';

import React, { useState } from 'react';
import { PixelCard } from '../ui/PixelCard';
import { PixelButton } from '../ui/PixelButton';
import { gamificationApi } from '@/lib/api/gamification';
import { useUserStore } from '@/lib/store/userStore';
import {
  HelpCircle,
  HeartCrack,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Flame,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface QuizStageProps {
  title: string;
  content: {
    questions?: QuizQuestion[];
  };
  onComplete: () => void;
  isCompleting?: boolean;
}

// Generates dynamic question explanations if not explicitly bundled in the dataset
function getExplanation(question: string, correctIdx: number, options: string[]) {
  const correctText = options[correctIdx] || '';
  return `Correct Choice: "${correctText}". This adheres strictly to fundamental data structure invariants and ensures optimal memory safety and algorithmic runtime.`;
}

export const QuizStage: React.FC<QuizStageProps> = ({
  title,
  content,
  onComplete,
  isCompleting = false,
}) => {
  const { hearts, updateHearts } = useUserStore();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answerState, setAnswerState] = useState<'IDLE' | 'CORRECT' | 'WRONG'>('IDLE');
  const [shatterHeart, setShatterHeart] = useState(false);
  const [streak, setStreak] = useState(0);

  const rawQuestions: QuizQuestion[] = content.questions || [
    {
      id: 1,
      question: 'What is the primary difference between an ADT and a Data Structure?',
      options: [
        'An ADT defines WHAT operations can be performed; a Data Structure defines HOW they are executed in memory.',
        'An ADT is only used in web browsers; Data Structures are only used in hardware.',
        'They are exact synonyms with zero mathematical differences.',
        'Data Structures can only store raw text.',
      ],
      correctAnswer: 0,
      explanation: 'An Abstract Data Type is an interface contract (WHAT), while a Data Structure is the physical memory implementation (HOW).',
    },
    {
      id: 2,
      question: 'Why do we need data structures in modern computational systems?',
      options: [
        'To organize data in memory so operations execute with predictable O(1) or O(log N) efficiency.',
        'To force computers to consume more energy and RAM.',
        'To eliminate the need for CPU processors.',
        'To prevent software from being installed on hard drives.',
      ],
      correctAnswer: 0,
      explanation: 'Organized spatial relationships allow algorithms to locate and manipulate data without brute-force sequential delays.',
    },
  ];

  const questions = rawQuestions;
  const currentQ = questions[currentIdx];

  const handleSelect = (idx: number) => {
    if (answerState !== 'IDLE') return;
    setSelectedOption(idx);
  };

  const checkAnswer = async () => {
    if (selectedOption === null || answerState !== 'IDLE') return;

    if (selectedOption === currentQ.correctAnswer) {
      setAnswerState('CORRECT');
      setStreak((s) => s + 1);
    } else {
      setAnswerState('WRONG');
      setStreak(0);
      setShatterHeart(true);
      try {
        const res = await gamificationApi.consumeHeart();
        if (res?.hearts !== undefined) {
          updateHearts(res.hearts);
        }
      } catch {
        updateHearts(Math.max(0, hearts - 1));
      }
      setTimeout(() => setShatterHeart(false), 1600);
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((p) => p + 1);
      setSelectedOption(null);
      setAnswerState('IDLE');
    } else {
      onComplete();
    }
  };

  const optionRunes = ['A', 'B', 'C', 'D'];
  const explanation = currentQ.explanation || getExplanation(currentQ.question, currentQ.correctAnswer, currentQ.options);

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Heart shatter alert banner */}
      <AnimatePresence>
        {shatterHeart && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="p-3 bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 text-white rounded-2xl font-pixel text-xs flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(244,63,94,0.5)] border-2 border-white"
          >
            <HeartCrack className="w-5 h-5 animate-bounce text-white" />
            <span>INCORRECT TRIAL ANSWER! -1 HEART CONSUMED</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Illuminated Quiz Card */}
      <PixelCard variant="codex" className="overflow-hidden">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#2A375E] gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#8B7FD9] to-[#6366F1] flex items-center justify-center text-white border-2 border-white shadow-[2px_2px_0_#1B2A4A] shrink-0">
              <HelpCircle size={22} className="text-white drop-shadow-md" />
            </div>
            <div>
              <span className="font-pixel text-[9px] text-[#38BDF8] tracking-wider uppercase">
                ARCANE ORACLE TRIAL
              </span>
              <h2 className="font-pixel text-xs sm:text-sm text-[#FFD54F] mt-0.5">
                QUESTION {currentIdx + 1} OF {questions.length}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            {streak > 1 && (
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 font-pixel text-[8px] animate-pulse">
                <Flame size={12} className="text-amber-400 fill-amber-400" />
                <span>{streak}X STREAK!</span>
              </div>
            )}

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#131D38] border border-[#2B3B66] text-rose-400 font-pixel text-[9px]">
              <span>❤️</span>
              <span>{hearts} HEARTS</span>
            </div>
          </div>
        </div>

        {/* Question Text Box */}
        <div className="my-5 p-5 sm:p-6 rounded-2xl bg-[#121B35] border-2 border-[#38BDF8]/40 shadow-inner">
          <div className="flex items-center gap-2 mb-2 text-[#38BDF8]">
            <Zap size={14} className="animate-spin" />
            <span className="font-pixel text-[9px] uppercase tracking-wider">
              TRIAL CHALLENGE PROMPT:
            </span>
          </div>
          <p className="font-pixel text-xs sm:text-sm text-[#F8FAFC] leading-relaxed tracking-wide">
            {currentQ.question}
          </p>
        </div>

        {/* Interactive Options Grid */}
        <div className="space-y-3 mb-6">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQ.correctAnswer;

            let cardTheme =
              'bg-[#101930] border-[#233258] hover:border-[#38BDF8] text-[#E2E8F0] hover:bg-[#14203D]';

            if (answerState === 'CORRECT' && isCorrect) {
              cardTheme =
                'bg-emerald-950/40 border-2 border-emerald-400 text-emerald-200 font-bold shadow-[0_0_20px_rgba(52,211,153,0.3)]';
            } else if (answerState === 'WRONG' && isSelected) {
              cardTheme =
                'bg-rose-950/40 border-2 border-rose-500 text-rose-200 font-bold shadow-[0_0_20px_rgba(244,63,94,0.3)]';
            } else if (isSelected) {
              cardTheme =
                'bg-[#38BDF8]/15 border-2 border-[#38BDF8] text-white font-bold shadow-[0_0_15px_rgba(56,189,248,0.3)]';
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={answerState !== 'IDLE'}
                className={`w-full p-4 rounded-xl border transition-all text-left flex items-start gap-3.5 ${cardTheme}`}
              >
                <div
                  className={`w-7 h-7 rounded-lg font-pixel text-[10px] flex items-center justify-center shrink-0 border ${
                    isSelected
                      ? 'bg-[#38BDF8] text-[#080E1E] border-white font-bold'
                      : 'bg-[#182444] text-[#38BDF8] border-[#2C3E6E]'
                  }`}
                >
                  {optionRunes[idx]}
                </div>
                <span className="font-body text-xs sm:text-sm pt-0.5 leading-relaxed">
                  {option}
                </span>
              </button>
            );
          })}
        </div>

        {/* Explanatory Feedback Banner */}
        <AnimatePresence>
          {answerState !== 'IDLE' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`p-4 rounded-2xl border-2 mb-6 ${
                answerState === 'CORRECT'
                  ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
                  : 'bg-rose-950/30 border-rose-500/50 text-rose-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5 font-pixel text-[10px]">
                {answerState === 'CORRECT' ? (
                  <>
                    <CheckCircle2 size={16} className="text-emerald-400" />
                    <span className="text-emerald-400 uppercase tracking-wider">
                      MAGICAL INSIGHT VERIFIED!
                    </span>
                  </>
                ) : (
                  <>
                    <AlertTriangle size={16} className="text-rose-400" />
                    <span className="text-rose-400 uppercase tracking-wider">
                      ARCHITECTURAL MISTAKE EXPLAINED:
                    </span>
                  </>
                )}
              </div>
              <p className="font-body text-xs sm:text-sm leading-relaxed text-[#F1F5F9]">
                {explanation}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Action Footer */}
        <div className="pt-4 border-t border-[#2A375E] flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-pixel text-[9px] text-slate-400">
            {answerState === 'IDLE'
              ? 'Select an option and confirm your verdict'
              : answerState === 'CORRECT'
              ? '✨ Well done! Proceed to the next trial'
              : 'Review explanation above and proceed'}
          </span>

          <div className="w-full sm:w-auto">
            {answerState === 'IDLE' ? (
              <PixelButton
                variant="gold"
                size="md"
                onClick={checkAnswer}
                disabled={selectedOption === null}
                className="w-full sm:w-auto"
              >
                VERIFY ANSWER ▶
              </PixelButton>
            ) : (
              <PixelButton
                variant="mint"
                size="md"
                onClick={handleNext}
                disabled={isCompleting}
                className="w-full sm:w-auto flex items-center justify-center gap-2"
              >
                {currentIdx < questions.length - 1 ? (
                  <>
                    NEXT QUESTION <ArrowRight size={14} />
                  </>
                ) : (
                  <>
                    <Sparkles size={14} />
                    {isCompleting ? 'SAVING...' : 'COMPLETE QUIZ (+25 XP)'}
                  </>
                )}
              </PixelButton>
            )}
          </div>
        </div>
      </PixelCard>
    </div>
  );
};
