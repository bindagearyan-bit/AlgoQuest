'use client';

import React, { useState } from 'react';
import { PixelButton } from '../ui/PixelButton';
import { VisualDebuggerConsole } from './VisualDebuggerConsole';

export const StackQueueVisualizer: React.FC = () => {
  const [stack, setStack] = useState<number[]>([15, 30, 45]);
  const [actionLog, setActionLog] = useState('Stack initialized with 3 elements');

  const pushItem = () => {
    if (stack.length >= 6) return;
    const val = Math.floor(Math.random() * 90) + 10;
    setStack([val, ...stack]);
    setActionLog(`PUSH(${val}) added element to top of stack`);
  };

  const popItem = () => {
    if (stack.length === 0) return;
    const removed = stack[0];
    setStack(stack.slice(1));
    setActionLog(`POP() removed ${removed} from top of stack`);
  };

  return (
    <div className="space-y-6 w-full max-w-5xl mx-auto">
      <div className="rounded-2xl bg-[#0d0b2e] border-4 border-[#00F0FF] p-8 shadow-[0_0_25px_rgba(0,240,255,0.3)]">
        <div className="flex justify-between items-center mb-6">
          <span className="font-pixel text-xs text-[#00F0FF]">LIFO STACK DUNGEON TOWER</span>
          <div className="flex gap-2">
            <PixelButton variant="mint" size="sm" onClick={pushItem} disabled={stack.length >= 6}>
              + PUSH ITEM
            </PixelButton>
            <PixelButton variant="pink" size="sm" onClick={popItem} disabled={stack.length === 0}>
              - POP ITEM
            </PixelButton>
          </div>
        </div>

        <div className="flex flex-col items-center justify-end h-64 border-b-4 border-x-4 border-[#00F0FF] w-48 mx-auto p-2 gap-2 bg-[#120f38] rounded-b-xl">
          {stack.map((item, idx) => (
            <div
              key={idx}
              className={`w-full py-2.5 rounded text-center font-pixel text-xs border-2 ${
                idx === 0
                  ? 'bg-[#FF2FD4]/20 border-[#FF2FD4] text-white shadow-[0_0_10px_#FF2FD4]'
                  : 'bg-[#1A1744] border-[#00F0FF]/50 text-[#00F0FF]'
              }`}
            >
              {item} {idx === 0 && <span className="text-[9px] text-[#FF2FD4]">(TOP)</span>}
            </div>
          ))}
          {stack.length === 0 && (
            <span className="text-slate-500 font-pixel text-[10px] my-auto">STACK EMPTY</span>
          )}
        </div>
      </div>

      <VisualDebuggerConsole
        currentCodeLine="stack.push(val); // O(1) time"
        activeIndices={[0]}
        values={stack}
        pointerLeft={0}
        pointerRight={0}
        actionMessage={actionLog}
      />
    </div>
  );
};

