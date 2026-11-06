'use client';

import React, { useState } from 'react';
import { PixelCard } from '../ui/PixelCard';
import { PixelButton } from '../ui/PixelButton';
import { gamificationApi } from '@/lib/api/gamification';
import { useUserStore } from '@/lib/store/userStore';
import { HelpCircle, HeartCrack, CheckCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizStageProps {
  title: string;
  content: {
    questions?: QuizQuestion[];
  };
  onComplete: () => void;
  isCompleting?: boolean;
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

  const questions: QuizQuestion[] = content.questions || [
    {
      id: 1,
      question: 'What happens when two-pointer indices cross over (left > right)?',
      options: ['Loop terminates safely', 'Infinite recursion triggers', 'Memory segmentation fault occurs', 'Pointers reverse direction'],
      correctAnswer: 0,
    },
    {
      id: 2,
      question: 'What is the auxiliary space complexity of two-pointer array reversal?',
      options: ['O(N^2)', 'O(N)', 'O(1)', 'O(log N)'],
      correctAnswer: 2,
    },
  ];

  const currentQ = questions[currentIdx];

  const handleSelect = (idx: number) => {
    if (answerState !== 'IDLE') return;
    setSelectedOption(idx);
  };

  const checkAnswer = async () => {
    if (selectedOption === null || answerState !== 'IDLE') return;

    if (selectedOption === currentQ.correctAnswer) {
      setAnswerState('CORRECT');
    } else {
      setAnswerState('WRONG');
      setShatterHeart(true);
      try {
        const res = await gamificationApi.consumeHeart();
        if (res?.hearts !== undefined) {
          updateHearts(res.hearts);
        }
      } catch {
        updateHearts(Math.max(0, hearts - 1));
      }
      setTimeout(() => setShatterHeart(false), 1500);
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

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Heart shatter notification banner */}
      {shatterHeart && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          className="p-3 bg-rose-500 text-white rounded-xl font-pixel text-xs flex items-center justify-center gap-2 shadow-lg"
        >
          <HeartCrack className="w-5 h-5 animate-bounce" />
          <span>WRONG ANSWER! -1 HEART CONSUMED</span>
        </motion.div>
      )}

      <PixelCard variant="blue">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#8B7FD9] flex items-center justify-center text-white border-2 border-[#1A2744]">
              <HelpCircle size={20} />
            </div>
            <div>
              <span className="font-pixel text-[10px] text-[#8B7FD9]">STAGE 7: MASTERY QUIZ</span>
              <h2 className="font-pixel text-xs sm:text-sm text-[#1A2744] mt-0.5">
                QUESTION {currentIdx + 1} OF {questions.length}
              </h2>
            </div>
          </div>

          <span className="font-pixel text-[10px] text-rose-500 flex items-center gap-1">
            ❤️ {hearts} HEARTS REMAINING
          </span>
        </div>

        {/* Question Text */}
        <div className="p-4 bg-white rounded-xl border border-[#1A2744]/15 mb-6">
          <p className="font-pixel text-xs sm:text-sm text-[#1A2744] leading-relaxed">
            {currentQ.question}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQ.correctAnswer;

            let style = 'bg-white border-[#1A2744]/20 hover:border-[#8B7FD9] text-[#1A2744]';
            if (answerState === 'CORRECT' && isCorrect) {
              style = 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold';
            } else if (answerState === 'WRONG' && isSelected) {
              style = 'bg-rose-100 border-rose-500 text-rose-900 font-bold';
            } else if (isSelected) {
              style = 'bg-[#8B7FD9]/20 border-[#8B7FD9] text-[#1A2744] font-bold shadow-sm';
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`w-full p-4 rounded-xl border-2 text-left font-body text-sm transition-all flex items-center justify-between ${style}`}
              >
                <span>{option}</span>
                {answerState === 'CORRECT' && isCorrect && (
                  <CheckCircle className="text-emerald-600 w-5 h-5 shrink-0" />
                )}
                {answerState === 'WRONG' && isSelected && (
                  <AlertTriangle className="text-rose-600 w-5 h-5 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex justify-between items-center pt-4 border-t border-[#1A2744]/15">
          <span className="text-xs font-mono text-slate-500">
            {answerState === 'CORRECT' && '🎯 Excellent! You have conquered this concept.'}
            {answerState === 'WRONG' && '⚠️ Re-evaluate your algorithmic invariant.'}
          </span>

          {answerState === 'IDLE' ? (
            <PixelButton
              variant="mint"
              size="md"
              disabled={selectedOption === null}
              onClick={checkAnswer}
            >
              SUBMIT ANSWER
            </PixelButton>
          ) : (
            <PixelButton
              variant={answerState === 'CORRECT' ? 'mint' : 'outline'}
              size="md"
              onClick={handleNext}
              disabled={isCompleting}
            >
              {currentIdx < questions.length - 1 ? 'NEXT QUESTION →' : 'COMPLETE QUIZ (+25 XP)'}
            </PixelButton>
          )}
        </div>
      </PixelCard>
    </div>
  );
};

