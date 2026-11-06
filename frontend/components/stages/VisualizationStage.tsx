'use client';

import React from 'react';
import { ArrayVisualizer } from '../visualizers/ArrayVisualizer';
import { PixelButton } from '../ui/PixelButton';

interface VisualizationStageProps {
  title: string;
  content: {
    initialArray?: number[];
    steps?: any[];
  };
  onComplete: () => void;
  isCompleting?: boolean;
}

export const VisualizationStage: React.FC<VisualizationStageProps> = ({
  title,
  content,
  onComplete,
  isCompleting = false,
}) => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <span className="font-pixel text-[10px] text-[#00F0FF]">STAGE 2: VISUALIZATION</span>
          <h2 className="font-pixel text-sm sm:text-base text-white mt-1">{title}</h2>
        </div>

        <PixelButton
          variant="mint"
          size="md"
          onClick={onComplete}
          disabled={isCompleting}
        >
          {isCompleting ? 'SAVING...' : 'COMPLETE STAGE (+10 XP)'}
        </PixelButton>
      </div>

      <ArrayVisualizer
        initialArray={content.initialArray}
        steps={content.steps}
      />
    </div>
  );
};

