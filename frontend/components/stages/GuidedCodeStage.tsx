'use client';

import React, { useState } from 'react';
import { PixelCard } from '../ui/PixelCard';
import { PixelButton } from '../ui/PixelButton';
import { CodeEditor } from './CodeEditor';
import { Sparkles } from 'lucide-react';

interface GuidedCodeStageProps {
  title: string;
  content: {
    prompt?: string;
    starterCode?: any;
  };
  onComplete: () => void;
  isCompleting?: boolean;
}

export const GuidedCodeStage: React.FC<GuidedCodeStageProps> = ({
  title,
  content,
  onComplete,
  isCompleting = false,
}) => {
  const [hintRevealed, setHintRevealed] = useState(false);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PixelCard variant="white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#FF6FA0] flex items-center justify-center text-white border-2 border-[#1A2744]">
            <Sparkles size={20} />
          </div>
          <div>
            <span className="font-pixel text-[10px] text-[#FF6FA0]">STAGE 4: GUIDED IMPLEMENTATION</span>
            <h2 className="font-pixel text-sm sm:text-base text-[#1A2744] mt-0.5">{title}</h2>
          </div>
        </div>

        <p className="font-body text-sm sm:text-base text-[#1A2744] mb-4">
          {content.prompt || 'Complete the skeleton implementation below. Ensure pointer increments maintain the search invariant.'}
        </p>

        {hintRevealed ? (
          <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl text-xs font-mono text-amber-900 mb-4">
            💡 HINT: If target is greater than the sum, moving the left pointer increases the total value!
          </div>
        ) : (
          <button
            onClick={() => setHintRevealed(true)}
            className="text-[11px] font-pixel text-[#8B7FD9] underline mb-4 block"
          >
            Need a hint? Reveal dungeon clue
          </button>
        )}

        {/* Code Editor */}
        <CodeEditor
          onSubmit={onComplete}
          isRunning={isCompleting}
        />
      </PixelCard>
    </div>
  );
};

