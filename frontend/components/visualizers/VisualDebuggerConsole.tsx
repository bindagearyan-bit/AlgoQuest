'use client';

import React from 'react';

interface VisualDebuggerConsoleProps {
  currentCodeLine?: string;
  activeIndices?: number[];
  values?: number[];
  pointerLeft?: number;
  pointerRight?: number;
  actionMessage?: string;
}

export const VisualDebuggerConsole: React.FC<VisualDebuggerConsoleProps> = ({
  currentCodeLine = 'int left = 0, right = arr.length - 1;',
  activeIndices = [0, 7],
  values = [12, 45, 68, 23, 89, 34, 91, 55],
  pointerLeft = 0,
  pointerRight = 7,
  actionMessage = 'Pointers inspecting array boundary elements',
}) => {
  return (
    <div className="w-full rounded-2xl bg-[#09081f] border-2 border-[#00F0FF]/40 shadow-[0_0_20px_rgba(0,240,255,0.15)] overflow-hidden">
      {/* Console Title Bar with 3 Mac Traffic Light Dots */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#120f38] border-b border-[#00F0FF]/30">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-[#FF5F56] inline-block shadow-sm" />
          <span className="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block shadow-sm" />
          <span className="w-3 h-3 rounded-full bg-[#27C93F] inline-block shadow-sm" />
        </div>
        <span className="font-pixel text-[10px] text-[#00F0FF] tracking-widest uppercase">
          VISUAL DEBUGGER CONSOLE
        </span>
        <span className="text-[10px] font-mono text-emerald-400">SYNCED_v1.0</span>
      </div>

      <div className="p-4 sm:p-6 space-y-4 font-mono text-xs">
        {/* Monospace Code Line */}
        <div className="p-3 bg-[#0d0a29] rounded-lg border border-[#00F0FF]/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[#FF2FD4] font-bold">{'>'}</span>
            <span className="text-emerald-300 font-mono">{currentCodeLine}</span>
          </div>
          <span className="text-[10px] font-pixel text-slate-400">ACTIVE_LINE</span>
        </div>

        {/* Synced Index Boxes */}
        <div>
          <div className="text-[10px] font-pixel text-[#00F0FF] mb-2 uppercase">
            RAM Buffer State:
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {values.map((val, idx) => {
              const isActive = activeIndices.includes(idx);
              const isLeft = pointerLeft === idx;
              const isRight = pointerRight === idx;

              return (
                <div
                  key={idx}
                  className={`flex flex-col items-center p-2 rounded-lg border-2 transition-all duration-300 ${
                    isActive
                      ? 'border-[#FF2FD4] bg-[#FF2FD4]/20 shadow-[0_0_12px_#FF2FD4]'
                      : 'border-[#00F0FF]/30 bg-[#161345]'
                  }`}
                >
                  <span className="text-[10px] text-slate-400">idx[{idx}]</span>
                  <span className="text-sm font-bold font-mono text-white my-1">
                    {val}
                  </span>
                  <span className="text-[9px] font-pixel">
                    {isLeft && <span className="text-[#00F0FF]">[L_PTR]</span>}
                    {isRight && <span className="text-[#FF2FD4]">[R_PTR]</span>}
                    {!isLeft && !isRight && (
                      <span className="text-slate-500">{isActive ? '[ACTIVE]' : '[TILE]'}</span>
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action log line */}
        <div className="pt-2 text-slate-300 flex items-center gap-2 text-xs">
          <span className="font-pixel text-[10px] text-amber-400">EVENT:</span>
          <span>{actionMessage}</span>
        </div>
      </div>
    </div>
  );
};

