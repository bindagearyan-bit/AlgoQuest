'use client';

import React, { useState, useEffect } from 'react';
import { VisualDebuggerConsole } from './VisualDebuggerConsole';
import { PixelButton } from '../ui/PixelButton';
import { Play, Pause, SkipForward, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

interface VisualizerStep {
  activeIndices: number[];
  pointerLeft: number;
  pointerRight: number;
  action: string;
  codeLine: string;
}

interface ArrayVisualizerProps {
  initialArray?: number[];
  steps?: VisualizerStep[];
}

const DEFAULT_ARRAY = [12, 45, 68, 23, 89, 34, 91, 55];
const DEFAULT_STEPS: VisualizerStep[] = [
  { activeIndices: [0, 7], pointerLeft: 0, pointerRight: 7, action: 'Initialize pointers at array boundaries', codeLine: 'int left = 0, right = arr.length - 1;' },
  { activeIndices: [0, 7], pointerLeft: 0, pointerRight: 7, action: 'Comparing values arr[0]=12 with arr[7]=55', codeLine: 'if (arr[left] + arr[right] == target)' },
  { activeIndices: [1, 7], pointerLeft: 1, pointerRight: 7, action: 'Sum too small -> Advance left pointer to index 1', codeLine: 'left++;' },
  { activeIndices: [1, 6], pointerLeft: 1, pointerRight: 6, action: 'Comparing arr[1]=45 with arr[6]=91', codeLine: 'if (arr[left] + arr[right] > target)' },
  { activeIndices: [1, 5], pointerLeft: 1, pointerRight: 5, action: 'Sum too high -> Decrement right pointer to index 5', codeLine: 'right--;' },
  { activeIndices: [2, 5], pointerLeft: 2, pointerRight: 5, action: 'Target match discovered at indices 2 and 5!', codeLine: 'return new int[] {left, right};' },
];

export const ArrayVisualizer: React.FC<ArrayVisualizerProps> = ({
  initialArray = DEFAULT_ARRAY,
  steps = DEFAULT_STEPS,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentStep = steps[currentStepIndex] || steps[0];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1500);
    }
    return () => clearInterval(timer);
  }, [isPlaying, steps.length]);

  return (
    <div className="space-y-6 w-full max-w-5xl mx-auto">
      {/* TOP: Pixel-Art Dungeon Game Scene */}
      <div className="relative rounded-2xl bg-[#0d0b2e] border-4 border-[#00F0FF] p-6 sm:p-10 shadow-[0_0_25px_rgba(0,240,255,0.3)] overflow-hidden">
        {/* Dungeon Brick Background Grid */}
        <div className="absolute inset-0 bg-[#161245]/50 flex flex-col justify-between p-4 pointer-events-none opacity-30">
          <div className="w-full h-2 bg-[#2E1F3D]" />
          <div className="w-full h-2 bg-[#2E1F3D]" />
          <div className="w-full h-2 bg-[#2E1F3D]" />
        </div>

        {/* Scene Header */}
        <div className="relative z-10 flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#00F0FF] animate-ping" />
            <span className="font-pixel text-xs text-[#00F0FF] tracking-widest">
              DUNGEON ARENA : STEP {currentStepIndex + 1} / {steps.length}
            </span>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center gap-2">
            <PixelButton
              variant="outline"
              size="sm"
              onClick={() => {
                setIsPlaying(false);
                setCurrentStepIndex(0);
              }}
            >
              <RotateCcw size={14} className="mr-1" /> RESET
            </PixelButton>

            <PixelButton
              variant="mint"
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause size={14} className="mr-1" /> : <Play size={14} className="mr-1" />}
              {isPlaying ? 'PAUSE' : 'PLAY'}
            </PixelButton>

            <PixelButton
              variant="purple"
              size="sm"
              disabled={currentStepIndex >= steps.length - 1}
              onClick={() => {
                setIsPlaying(false);
                setCurrentStepIndex((prev) => Math.min(steps.length - 1, prev + 1));
              }}
            >
              NEXT <SkipForward size={14} className="ml-1" />
            </PixelButton>
          </div>
        </div>

        {/* Tiles Platform with Pixel Hero & Glowing Numbers */}
        <div className="relative z-10 py-10 flex flex-wrap justify-center items-end gap-3 sm:gap-4">
          {initialArray.map((num, idx) => {
            const isActive = currentStep.activeIndices.includes(idx);
            const isLeft = currentStep.pointerLeft === idx;
            const isRight = currentStep.pointerRight === idx;

            return (
              <div key={idx} className="flex flex-col items-center">
                {/* Character Sprite hovering above active pointer */}
                <div className="h-10 flex items-center justify-center">
                  {isLeft && (
                    <motion.div
                      initial={{ y: -6 }}
                      animate={{ y: 0 }}
                      transition={{ repeat: Infinity, repeatType: 'reverse', duration: 0.5 }}
                      className="font-pixel text-[10px] text-[#00F0FF] flex flex-col items-center"
                    >
                      <span className="text-lg">🧙‍♂️</span>
                      <span>L</span>
                    </motion.div>
                  )}
                  {isRight && (
                    <motion.div
                      initial={{ y: -6 }}
                      animate={{ y: 0 }}
                      transition={{ repeat: Infinity, repeatType: 'reverse', duration: 0.5 }}
                      className="font-pixel text-[10px] text-[#FF2FD4] flex flex-col items-center"
                    >
                      <span className="text-lg">🧝‍♀️</span>
                      <span>R</span>
                    </motion.div>
                  )}
                </div>

                {/* Numbered Tile Box */}
                <motion.div
                  animate={{
                    scale: isActive ? 1.08 : 1,
                    boxShadow: isActive
                      ? '0 0 20px #FF2FD4, 0 0 35px #FF2FD4'
                      : '0 0 10px #00F0FF',
                  }}
                  className={`w-12 h-14 sm:w-16 sm:h-18 rounded-xl flex flex-col items-center justify-center border-2 transition-all ${
                    isActive
                      ? 'bg-[#FF2FD4]/20 border-[#FF2FD4] text-white'
                      : 'bg-[#1A1744] border-[#00F0FF] text-[#00F0FF]'
                  }`}
                >
                  <span className="text-base sm:text-xl font-pixel font-bold">
                    {num}
                  </span>
                  <span className="text-[9px] font-mono opacity-60">
                    [{idx}]
                  </span>
                </motion.div>

                {/* Ground tile */}
                <div className="w-14 sm:w-18 h-2 bg-[#3D2A4D] rounded-full mt-2" />
              </div>
            );
          })}
        </div>
      </div>

      {/* BOTTOM: Visual Debugger Console */}
      <VisualDebuggerConsole
        currentCodeLine={currentStep.codeLine}
        activeIndices={currentStep.activeIndices}
        values={initialArray}
        pointerLeft={currentStep.pointerLeft}
        pointerRight={currentStep.pointerRight}
        actionMessage={currentStep.action}
      />
    </div>
  );
};

