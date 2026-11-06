'use client';

import React, { useState } from 'react';
import { PixelButton } from '../ui/PixelButton';
import { VisualDebuggerConsole } from './VisualDebuggerConsole';

export const TreeVisualizer: React.FC = () => {
  const [visited, setVisited] = useState<number[]>([1]);
  const [activeNode, setActiveNode] = useState(1);

  const traverseNext = () => {
    const sequence = [1, 2, 4, 5, 3, 6];
    const nextIdx = sequence.indexOf(activeNode) + 1;
    if (nextIdx < sequence.length) {
      const next = sequence[nextIdx];
      setActiveNode(next);
      setVisited((v) => [...v, next]);
    }
  };

  return (
    <div className="space-y-6 w-full max-w-5xl mx-auto">
      <div className="rounded-2xl bg-[#0d0b2e] border-4 border-[#00F0FF] p-8 shadow-[0_0_25px_rgba(0,240,255,0.3)]">
        <div className="flex justify-between items-center mb-6">
          <span className="font-pixel text-xs text-[#00F0FF]">BINARY TREE PRE-ORDER TRAVERSAL</span>
          <div className="flex gap-2">
            <PixelButton
              variant="outline"
              size="sm"
              onClick={() => {
                setActiveNode(1);
                setVisited([1]);
              }}
            >
              RESET
            </PixelButton>
            <PixelButton variant="mint" size="sm" onClick={traverseNext} disabled={activeNode === 6}>
              STEP TRAVERSAL
            </PixelButton>
          </div>
        </div>

        {/* Tree SVG Node Render */}
        <div className="flex flex-col items-center gap-6 py-4">
          {/* Level 0: Root */}
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center font-pixel text-xs border-2 transition-all ${
              activeNode === 1
                ? 'border-[#FF2FD4] bg-[#FF2FD4]/20 shadow-[0_0_15px_#FF2FD4] text-white'
                : 'border-[#00F0FF] bg-[#161345] text-[#00F0FF]'
            }`}
          >
            1
          </div>

          {/* Level 1 */}
          <div className="flex justify-center gap-24">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center font-pixel text-xs border-2 transition-all ${
                activeNode === 2
                  ? 'border-[#FF2FD4] bg-[#FF2FD4]/20 shadow-[0_0_15px_#FF2FD4] text-white'
                  : 'border-[#00F0FF] bg-[#161345] text-[#00F0FF]'
              }`}
            >
              2
            </div>
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center font-pixel text-xs border-2 transition-all ${
                activeNode === 3
                  ? 'border-[#FF2FD4] bg-[#FF2FD4]/20 shadow-[0_0_15px_#FF2FD4] text-white'
                  : 'border-[#00F0FF] bg-[#161345] text-[#00F0FF]'
              }`}
            >
              3
            </div>
          </div>

          {/* Level 2 */}
          <div className="flex justify-center gap-10">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-pixel text-xs border-2 transition-all ${
                activeNode === 4
                  ? 'border-[#FF2FD4] bg-[#FF2FD4]/20 shadow-[0_0_15px_#FF2FD4] text-white'
                  : 'border-[#00F0FF] bg-[#161345] text-[#00F0FF]'
              }`}
            >
              4
            </div>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-pixel text-xs border-2 transition-all ${
                activeNode === 5
                  ? 'border-[#FF2FD4] bg-[#FF2FD4]/20 shadow-[0_0_15px_#FF2FD4] text-white'
                  : 'border-[#00F0FF] bg-[#161345] text-[#00F0FF]'
              }`}
            >
              5
            </div>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-pixel text-xs border-2 transition-all ${
                activeNode === 6
                  ? 'border-[#FF2FD4] bg-[#FF2FD4]/20 shadow-[0_0_15px_#FF2FD4] text-white'
                  : 'border-[#00F0FF] bg-[#161345] text-[#00F0FF]'
              }`}
            >
              6
            </div>
          </div>
        </div>
      </div>

      <VisualDebuggerConsole
        currentCodeLine="void dfs(Node node) { if (!node) return; visit(node); dfs(node.left); dfs(node.right); }"
        activeIndices={[activeNode]}
        values={[1, 2, 3, 4, 5, 6]}
        pointerLeft={activeNode - 1}
        pointerRight={activeNode - 1}
        actionMessage={`Call stack traversing into Node(${activeNode})`}
      />
    </div>
  );
};

