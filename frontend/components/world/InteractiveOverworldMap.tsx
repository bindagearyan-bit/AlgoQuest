'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Sparkles, Trophy, Lock, Check, Play, X } from 'lucide-react';

export interface OverworldLevel {
  id: number;
  sublevelId: number;
  name: string;
  x: number;
  y: number;
  status: 'completed' | 'current' | 'locked';
  stars: string;
  desc: string;
  biome: string;
  topicCount: number;
}

const DEFAULT_OVERWORLD_LEVELS: OverworldLevel[] = [
  {
    id: 1,
    sublevelId: 1,
    name: 'WORLD 1: GRASSLAND START',
    x: 20,
    y: 74,
    status: 'completed',
    stars: '★★★',
    desc: 'Foundations & Time Complexity basics. Master Big-O invariants in the starter village.',
    biome: 'Meadow Village',
    topicCount: 9,
  },
  {
    id: 2,
    sublevelId: 2,
    name: 'WORLD 2: WATERFALL CROSSING',
    x: 30,
    y: 44,
    status: 'completed',
    stars: '★★★',
    desc: 'Arrays & Two-Pointer traversal techniques. Step across rushing pixel cataracts.',
    biome: 'Waterfall Crossing',
    topicCount: 8,
  },
  {
    id: 3,
    sublevelId: 3,
    name: 'WORLD 3: WINDMILL FARMLAND',
    x: 68,
    y: 78,
    status: 'current',
    stars: '☆☆☆',
    desc: 'Linked Lists & Fast/Slow pointer algorithms across spinning sky windmills.',
    biome: 'Sky Windmills',
    topicCount: 8,
  },
  {
    id: 4,
    sublevelId: 11,
    name: 'WORLD 4: FLOATING LAKE CASTLE',
    x: 52,
    y: 51,
    status: 'locked',
    stars: '☆☆☆',
    desc: 'Binary Search Trees & DFS/BFS traversal within the central blue-spired citadel.',
    biome: 'Citadel Moat',
    topicCount: 7,
  },
  {
    id: 5,
    sublevelId: 21,
    name: 'WORLD 5: SKY CITADEL',
    x: 57,
    y: 28,
    status: 'locked',
    stars: '☆☆☆',
    desc: 'Graph theory, Dijkstra Shortest Paths & Topological Sort in high celestial towers.',
    biome: 'Sky Spire',
    topicCount: 9,
  },
  {
    id: 6,
    sublevelId: 31,
    name: 'WORLD 6: ICE PEAK MOUNTAIN',
    x: 84,
    y: 35,
    status: 'locked',
    stars: '☆☆☆',
    desc: 'Dynamic Programming & Knapsack puzzles locked in jagged snow-capped caverns.',
    biome: 'Frost Glacier',
    topicCount: 8,
  },
  {
    id: 7,
    sublevelId: 41,
    name: 'WORLD 7: MOLTEN LAVA DUNGEON',
    x: 88,
    y: 67,
    status: 'locked',
    stars: '☆☆☆',
    desc: 'Boss Challenge: Advanced Trie, Segment Trees & Network Flow in the volcano crater.',
    biome: 'Inferno Core',
    topicCount: 7,
  },
];

interface InteractiveOverworldMapProps {
  onSelectLevel?: (level: OverworldLevel) => void;
  userCurrentLevelId?: number;
  className?: string;
}

export const InteractiveOverworldMap: React.FC<InteractiveOverworldMapProps> = ({
  onSelectLevel,
  userCurrentLevelId = 3,
  className = '',
}) => {
  const router = useRouter();

  const [levels, setLevels] = useState<OverworldLevel[]>(DEFAULT_OVERWORLD_LEVELS);
  const [selectedLevel, setSelectedLevel] = useState<OverworldLevel | null>(null);
  const [playerPos, setPlayerPos] = useState({ x: 68, y: 78 });

  // Update levels dynamically based on userCurrentLevelId
  useEffect(() => {
    const updated = DEFAULT_OVERWORLD_LEVELS.map((lvl) => {
      let status: 'completed' | 'current' | 'locked' = 'locked';
      let stars = '☆☆☆';
      if (lvl.id < userCurrentLevelId) {
        status = 'completed';
        stars = '★★★';
      } else if (lvl.id === userCurrentLevelId) {
        status = 'current';
        stars = '☆☆☆';
      } else {
        status = 'locked';
        stars = '☆☆☆';
      }
      return { ...lvl, status, stars };
    });
    setLevels(updated);

    const active = updated.find((l) => l.status === 'current') || updated[0];
    setPlayerPos({ x: active.x, y: active.y });
  }, [userCurrentLevelId]);

  // Handle node selection
  const handleNodeClick = (lvl: OverworldLevel) => {
    if (lvl.status === 'locked') return;

    // Smoothly walk player avatar to the target island node
    setPlayerPos({ x: lvl.x, y: lvl.y });
    setSelectedLevel(lvl);
  };

  const handleStartLevel = () => {
    if (!selectedLevel) return;
    if (onSelectLevel) {
      onSelectLevel(selectedLevel);
    } else {
      router.push(`/sublevel/${selectedLevel.sublevelId}`);
    }
    setSelectedLevel(null);
  };

  // Close modal on Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedLevel(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      {/* Map Header */}
      <div className="text-center mb-4">
        <h2 className="font-pixel text-xs sm:text-base text-[#ffd700] drop-shadow-[2px_2px_0_#000] tracking-wide mb-1 flex items-center justify-center gap-2">
          <span>⚔️</span> ALGOQUEST WORLD OVERWORLD <span>⚔️</span>
        </h2>
        <p className="font-pixel text-[9px] sm:text-[10px] text-slate-400">
          SELECT A FLOATING BIOME TO ENTER THE DUNGEON
        </p>
      </div>

      {/* Map Stage Container (16:9 Aspect Ratio) */}
      <div
        className="relative w-full max-w-5xl rounded-xl border-4 border-[#3b4261] overflow-hidden bg-[#111] shadow-[0_16px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(80,120,255,0.25)] select-none"
        style={{ aspectRatio: '16 / 9' }}
      >
        {/* Background Pixel Art Overworld Image */}
        <Image
          src="/map.png"
          alt="Pixel RPG Floating Island Map"
          fill
          priority
          sizes="(max-width: 1200px) 100vw, 1100px"
          className="object-cover pixelated pointer-events-none"
          style={{ imageRendering: 'pixelated' }}
        />

        {/* Ambient Golden Cloud Overlay Vignette */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-black/20" />

        {/* Connecting Golden Dotted Trails (SVG Overlay) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-[5]">
          <defs>
            <filter id="mapGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          {/* Path 1 -> 2 */}
          <line
            x1="20%"
            y1="74%"
            x2="30%"
            y2="44%"
            stroke="#ffd15c"
            strokeWidth="3"
            strokeDasharray="6 6"
            strokeOpacity="0.8"
            filter="url(#mapGlow)"
          />
          {/* Path 2 -> 4 */}
          <line
            x1="30%"
            y1="44%"
            x2="52%"
            y2="51%"
            stroke="#ffd15c"
            strokeWidth="3"
            strokeDasharray="6 6"
            strokeOpacity="0.8"
            filter="url(#mapGlow)"
          />
          {/* Path 2 -> 3 */}
          <line
            x1="30%"
            y1="44%"
            x2="68%"
            y2="78%"
            stroke="#ffd15c"
            strokeWidth="3"
            strokeDasharray="6 6"
            strokeOpacity="0.8"
            filter="url(#mapGlow)"
          />
          {/* Path 4 -> 5 */}
          <line
            x1="52%"
            y1="51%"
            x2="57%"
            y2="28%"
            stroke="#ffd15c"
            strokeWidth="3"
            strokeDasharray="6 6"
            strokeOpacity="0.8"
            filter="url(#mapGlow)"
          />
          {/* Path 5 -> 6 */}
          <line
            x1="57%"
            y1="28%"
            x2="84%"
            y2="35%"
            stroke="#ffd15c"
            strokeWidth="3"
            strokeDasharray="6 6"
            strokeOpacity="0.8"
            filter="url(#mapGlow)"
          />
          {/* Path 6 -> 7 */}
          <line
            x1="84%"
            y1="35%"
            x2="88%"
            y2="67%"
            stroke="#ffd15c"
            strokeWidth="3"
            strokeDasharray="6 6"
            strokeOpacity="0.8"
            filter="url(#mapGlow)"
          />
        </svg>

        {/* Interactive Level Nodes */}
        {levels.map((lvl) => {
          const isCompleted = lvl.status === 'completed';
          const isCurrent = lvl.status === 'current';
          const isLocked = lvl.status === 'locked';

          return (
            <button
              key={lvl.id}
              onClick={() => handleNodeClick(lvl)}
              style={{ left: `${lvl.x}%`, top: `${lvl.y}%` }}
              title={lvl.name}
              className={`absolute -translate-x-1/2 -translate-y-1/2 w-7 h-7 sm:w-9 sm:h-9 rounded-full font-pixel text-[10px] sm:text-xs flex items-center justify-center font-bold transition-all duration-150 z-10 ${
                isCompleted
                  ? 'bg-[#4ade80] border-[3px] border-white text-[#064e3b] shadow-[0_4px_0_#15803d,0_0_14px_rgba(74,222,128,0.85)] hover:-translate-y-[55%] hover:scale-110'
                  : isCurrent
                  ? 'bg-[#ffd15c] border-[3px] border-white text-[#1a1a2e] shadow-[0_4px_0_#b38600,0_0_20px_#ffe600] animate-pulse hover:-translate-y-[55%] hover:scale-115'
                  : 'bg-[#4a5568] border-[3px] border-[#718096] text-[#a0aec0] shadow-[0_4px_0_#2d3748] opacity-75 cursor-not-allowed'
              }`}
            >
              {isCompleted ? '✓' : isLocked ? '🔒' : lvl.id}
            </button>
          );
        })}

        {/* Animated Player Token / Character Pin */}
        <div
          className="absolute pointer-events-none z-20 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] -translate-x-1/2 -translate-y-full"
          style={{ left: `${playerPos.x}%`, top: `${playerPos.y}%` }}
        >
          <div className="text-2xl sm:text-3xl animate-bounce filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]">
            🧙‍♂️
          </div>
        </div>

        {/* Level Modal Popup */}
        {selectedLevel && (
          <div
            className="absolute inset-0 bg-black/65 backdrop-blur-[2px] flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedLevel(null)}
          >
            <div
              className="bg-[#1f2438] border-4 border-[#ffd700] rounded-lg p-5 sm:p-6 w-full max-w-sm text-center shadow-[0_10px_0_#0d0f18,0_0_30px_rgba(0,0,0,0.9)] animate-in fade-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-pixel text-[8px] text-[#4ade80] bg-[#064e3b]/80 px-2 py-0.5 rounded border border-[#4ade80]/40">
                  {selectedLevel.biome.toUpperCase()}
                </span>
                <button
                  onClick={() => setSelectedLevel(null)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <h2 className="font-pixel text-xs sm:text-sm text-[#ffd700] leading-snug mb-2">
                {selectedLevel.name}
              </h2>

              <div className="font-pixel text-base sm:text-lg text-[#ffd700] mb-3 tracking-widest">
                {selectedLevel.stars}
              </div>

              <p className="font-pixel text-[8px] sm:text-[9px] leading-relaxed text-[#cbd5e1] mb-5 px-1">
                {selectedLevel.desc}
              </p>

              <div className="space-y-2">
                <button
                  onClick={handleStartLevel}
                  className="w-full py-3 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-pixel text-[10px] rounded-md border-b-4 border-[#1d4ed8] active:translate-y-0.5 active:border-b-2 shadow-[0_4px_10px_rgba(59,130,246,0.4)] transition-all flex items-center justify-center gap-2"
                >
                  <Play size={12} className="fill-current" /> PLAY LEVEL
                </button>

                <button
                  onClick={() => setSelectedLevel(null)}
                  className="text-slate-400 hover:text-slate-200 font-pixel text-[8px] underline pt-1 block mx-auto cursor-pointer"
                >
                  CLOSE [ESC]
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
