'use client';

import React from 'react';
import { PixelCard } from '../ui/PixelCard';
import { PixelButton } from '../ui/PixelButton';
import { BookOpen, CheckCircle2, Clock, HardDrive } from 'lucide-react';

interface TheoryStageProps {
  title: string;
  content: {
    eli5?: string;
    keyTakeaways?: string[];
    codeSnippet?: string;
    timeComplexity?: string;
    spaceComplexity?: string;
  };
  onComplete: () => void;
  isCompleting?: boolean;
}

export const TheoryStage: React.FC<TheoryStageProps> = ({
  title,
  content,
  onComplete,
  isCompleting = false,
}) => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Overview Card */}
      <PixelCard variant="blue">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#8B7FD9] flex items-center justify-center text-white border-2 border-[#1A2744]">
            <BookOpen size={20} />
          </div>
          <div>
            <span className="font-pixel text-[10px] text-[#8B7FD9]">STAGE 1: THEORY FOUNDATIONS</span>
            <h2 className="font-pixel text-sm sm:text-base text-[#1A2744] mt-0.5">{title}</h2>
          </div>
        </div>

        {/* ELI5 Explanation */}
        <div className="bg-white/90 p-5 rounded-xl border border-[#1A2744]/15 mb-4">
          <span className="font-pixel text-[11px] text-[#8B7FD9] uppercase block mb-2">
            ELI5 Concept Explanation:
          </span>
          <p className="font-body text-sm sm:text-base text-[#1A2744] leading-relaxed">
            {content.eli5 || 'Welcome to this theory stage! We break down this core algorithmic technique step-by-step.'}
          </p>
        </div>

        {/* Complexity Badges */}
        <div className="flex gap-4 mb-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200">
            <Clock size={16} className="text-emerald-600" />
            <span className="font-pixel text-[10px] text-emerald-700">
              TIME: {content.timeComplexity || 'O(N)'}
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200">
            <HardDrive size={16} className="text-indigo-600" />
            <span className="font-pixel text-[10px] text-indigo-700">
              SPACE: {content.spaceComplexity || 'O(1)'}
            </span>
          </div>
        </div>

        {/* Key Takeaways */}
        {content.keyTakeaways && content.keyTakeaways.length > 0 && (
          <div className="mb-4">
            <span className="font-pixel text-[11px] text-[#1A2744] uppercase block mb-2">
              Dungeon Invariants & Rules:
            </span>
            <ul className="space-y-2">
              {content.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm font-body text-[#1A2744]">
                  <CheckCircle2 size={16} className="text-[#8B7FD9] mt-0.5 shrink-0" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Canonical Code */}
        {content.codeSnippet && (
          <div className="mt-4 p-4 rounded-xl bg-[#0d0a29] border border-slate-700 text-emerald-400 font-mono text-xs overflow-x-auto">
            <pre>{content.codeSnippet}</pre>
          </div>
        )}

        {/* Complete Action Button */}
        <div className="mt-6 pt-4 border-t border-[#1A2744]/15 flex justify-end">
          <PixelButton
            variant="mint"
            size="lg"
            onClick={onComplete}
            disabled={isCompleting}
          >
            {isCompleting ? 'SAVING PROGRESS...' : 'I UNDERSTAND — PROCEED (+10 XP)'}
          </PixelButton>
        </div>
      </PixelCard>
    </div>
  );
};

