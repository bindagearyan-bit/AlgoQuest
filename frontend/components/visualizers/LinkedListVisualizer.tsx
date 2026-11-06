'use client';

import React, { useState } from 'react';
import { VisualDebuggerConsole } from './VisualDebuggerConsole';
import { PixelButton } from '../ui/PixelButton';
import { ArrowRight, RotateCcw, Play, SkipForward } from 'lucide-react';

export const LinkedListVisualizer: React.FC = () => {
  const [currentNode, setCurrentNode] = useState(0);
  const nodes = [
    { val: 10, next: '0x1A' },
    { val: 20, next: '0x2B' },
    { val: 30, next: '0x3C' },
    { val: 40, next: 'NULL' },
  ];

  return (
    <div className="space-y-6 w-full max-w-5xl mx-auto">
      <div className="rounded-2xl bg-[#0d0b2e] border-4 border-[#00F0FF] p-8 shadow-[0_0_25px_rgba(0,240,255,0.3)]">
        <div className="flex justify-between items-center mb-6">
          <span className="font-pixel text-xs text-[#00F0FF]">LINKED LIST TRAVERSAL</span>
          <div className="flex gap-2">
            <PixelButton
              variant="outline"
              size="sm"
              onClick={() => setCurrentNode(0)}
            >
              <RotateCcw size={14} className="mr-1" /> RESET
            </PixelButton>
            <PixelButton
              variant="mint"
              size="sm"
              disabled={currentNode >= nodes.length - 1}
              onClick={() => setCurrentNode((p) => Math.min(nodes.length - 1, p + 1))}
            >
              NEXT NODE <SkipForward size={14} className="ml-1" />
            </PixelButton>
          </div>
        </div>

        <div className="flex items-center justify-center flex-wrap gap-4 py-8">
          {nodes.map((node, idx) => {
            const isCurrent = currentNode === idx;
            return (
              <React.Fragment key={idx}>
                <div
                  className={`flex rounded-xl overflow-hidden border-2 transition-all ${
                    isCurrent
                      ? 'border-[#FF2FD4] shadow-[0_0_20px_#FF2FD4] scale-105'
                      : 'border-[#00F0FF]/40 bg-[#161345]'
                  }`}
                >
                  <div className="px-4 py-3 bg-[#1A1744] text-white font-pixel text-sm border-r border-slate-600">
                    {node.val}
                  </div>
                  <div className="px-3 py-3 bg-[#0d0a29] text-[#00F0FF] font-mono text-xs">
                    {node.next}
                  </div>
                </div>
                {idx < nodes.length - 1 && (
                  <ArrowRight className="text-[#00F0FF] w-6 h-6 animate-pulse" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <VisualDebuggerConsole
        currentCodeLine="curr = curr.next;"
        activeIndices={[currentNode]}
        values={nodes.map((n) => n.val)}
        pointerLeft={currentNode}
        pointerRight={currentNode}
        actionMessage={`Pointer current is at node with val=${nodes[currentNode].val}`}
      />
    </div>
  );
};

