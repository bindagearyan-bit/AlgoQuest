'use client';

import React, { useState } from 'react';
import { PixelButton } from '../ui/PixelButton';
import { VisualDebuggerConsole } from './VisualDebuggerConsole';

export const GraphVisualizer: React.FC = () => {
  const [visited, setVisited] = useState<string[]>(['A']);
  const nodes = ['A', 'B', 'C', 'D'];

  const stepBfs = () => {
    if (visited.length < nodes.length) {
      setVisited((v) => [...v, nodes[v.length]]);
    }
  };

  return (
    <div className="space-y-6 w-full max-w-5xl mx-auto">
      <div className="rounded-2xl bg-[#0d0b2e] border-4 border-[#00F0FF] p-8 shadow-[0_0_25px_rgba(0,240,255,0.3)]">
        <div className="flex justify-between items-center mb-6">
          <span className="font-pixel text-xs text-[#00F0FF]">BFS GRAPH EXPLORATION</span>
          <div className="flex gap-2">
            <PixelButton variant="outline" size="sm" onClick={() => setVisited(['A'])}>
              RESET
            </PixelButton>
            <PixelButton variant="mint" size="sm" onClick={stepBfs} disabled={visited.length >= nodes.length}>
              EXPLORE ADJACENT
            </PixelButton>
          </div>
        </div>

        <div className="flex justify-center items-center gap-12 py-8">
          {nodes.map((node, idx) => {
            const isDiscovered = visited.includes(node);
            return (
              <div
                key={node}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center font-pixel text-sm border-2 transition-all ${
                  isDiscovered
                    ? 'border-[#FF2FD4] bg-[#FF2FD4]/20 shadow-[0_0_20px_#FF2FD4] text-white scale-110'
                    : 'border-[#00F0FF]/40 bg-[#161345] text-[#00F0FF]'
                }`}
              >
                {node}
              </div>
            );
          })}
        </div>
      </div>

      <VisualDebuggerConsole
        currentCodeLine="queue.push(neighbor); visited.add(neighbor);"
        activeIndices={[visited.length - 1]}
        values={[1, 2, 3, 4]}
        pointerLeft={0}
        pointerRight={visited.length - 1}
        actionMessage={`Visited nodes: [${visited.join(', ')}]`}
      />
    </div>
  );
};

