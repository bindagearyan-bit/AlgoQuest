'use client';

import React from 'react';
import { ArrayVisualizer } from '../visualizers/ArrayVisualizer';
import { SortingVisualizer } from '../visualizers/SortingVisualizer';
import { LinkedListVisualizer } from '../visualizers/LinkedListVisualizer';
import { StackQueueVisualizer } from '../visualizers/StackQueueVisualizer';
import { TreeVisualizer } from '../visualizers/TreeVisualizer';
import { GraphVisualizer } from '../visualizers/GraphVisualizer';
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
  const lowerTitle = (title || '').toLowerCase();

  const renderVisualizer = () => {
    if (lowerTitle.includes('sort')) {
      return <SortingVisualizer />;
    }
    if (lowerTitle.includes('linked') || lowerTitle.includes('list')) {
      return <LinkedListVisualizer />;
    }
    if (lowerTitle.includes('stack') || lowerTitle.includes('queue') || lowerTitle.includes('deque')) {
      return <StackQueueVisualizer />;
    }
    if (lowerTitle.includes('tree') || lowerTitle.includes('bst') || lowerTitle.includes('avl') || lowerTitle.includes('heap')) {
      return <TreeVisualizer />;
    }
    if (lowerTitle.includes('graph') || lowerTitle.includes('bfs') || lowerTitle.includes('dfs') || lowerTitle.includes('matrix')) {
      return <GraphVisualizer />;
    }
    return (
      <ArrayVisualizer
        initialArray={content.initialArray}
        steps={content.steps}
      />
    );
  };

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

      {renderVisualizer()}
    </div>
  );
};
