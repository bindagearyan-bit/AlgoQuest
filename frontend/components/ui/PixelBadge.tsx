'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export interface PixelBadgeProps {
  title: string;
  description?: string;
  iconSvg?: string;
  tier?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | string;
  isEarned?: boolean;
  size?: 'sm' | 'md' | 'lg';
  earnedAt?: string | Date | null;
  xpReward?: number;
  onClick?: () => void;
  showDetails?: boolean;
}

export const PixelBadge: React.FC<PixelBadgeProps> = ({
  title,
  description,
  iconSvg,
  tier = 'BEGINNER',
  isEarned = false,
  size = 'md',
  earnedAt,
  xpReward = 500,
  onClick,
  showDetails = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Dimension scaling
  const sizeConfig = {
    sm: {
      width: 64,
      height: 74,
      iconBox: 'w-7 h-7',
      titleSize: 'text-[7px]',
      descSize: 'text-[9px]',
    },
    md: {
      width: 92,
      height: 106,
      iconBox: 'w-11 h-11',
      titleSize: 'text-[8px]',
      descSize: 'text-[11px]',
    },
    lg: {
      width: 128,
      height: 148,
      iconBox: 'w-16 h-16',
      titleSize: 'text-[10px]',
      descSize: 'text-[13px]',
    },
  }[size];

  // Tier Grading Colors & Lighting
  const getTierTheme = () => {
    if (!isEarned) {
      return {
        outerBorder: '#1B2A4A',
        highlight: '#2A3C66',
        shadow: '#0D1526',
        innerCore: 'radial-gradient(circle, #1A2744 0%, #0F172A 100%)',
        boxShadow: 'none',
        textColor: '#64748B',
        accentColor: '#475569',
      };
    }

    switch (tier) {
      case 'ADVANCED':
        return {
          outerBorder: '#FF2FD4',
          highlight: '#00F0FF',
          shadow: '#7A0060',
          innerCore: 'radial-gradient(circle, #2E1F3D 0%, #0D0B2E 100%)',
          boxShadow: '0 0 15px #FF2FD4, 0 0 30px #00F0FF',
          textColor: '#00F0FF',
          accentColor: '#FF2FD4',
        };
      case 'INTERMEDIATE':
        return {
          outerBorder: '#FFD93D',
          highlight: '#FFF275',
          shadow: '#A85A00',
          innerCore: 'radial-gradient(circle, #824400 0%, #3E2723 100%)',
          boxShadow: '0 0 15px #FFD93D, 0 0 30px rgba(255, 217, 61, 0.4)',
          textColor: '#FFD93D',
          accentColor: '#FF8F00',
        };
      case 'BEGINNER':
      default:
        return {
          outerBorder: '#7FFFD4',
          highlight: '#E0FFF7',
          shadow: '#145A32',
          innerCore: 'radial-gradient(circle, #1B4D2E 0%, #0A2618 100%)',
          boxShadow: '0 0 15px #7FFFD4, 0 0 30px rgba(127, 255, 212, 0.4)',
          textColor: '#7FFFD4',
          accentColor: '#6FCF97',
        };
    }
  };

  const theme = getTierTheme();

  return (
    <div
      className="inline-flex flex-col items-center select-none group cursor-pointer"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Perspective Card Wrapper */}
      <div
        className="relative transition-all duration-300 ease-out"
        style={{
          width: sizeConfig.width,
          height: sizeConfig.height,
          transform: isHovered
            ? 'perspective(600px) rotateX(10deg) rotateY(-10deg) scale(1.05)'
            : 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Pixel-Stepped Octagonal Arcade Casing (Stepped SVG Frame with Top-Left Highlight & Bottom-Right Shadow) */}
        <svg
          viewBox="0 0 80 92"
          className="absolute inset-0 w-full h-full"
          style={{
            filter: isEarned ? `drop-shadow(${theme.boxShadow.split(',')[0]})` : undefined,
          }}
          shapeRendering="crispEdges"
        >
          {/* Outer Black Pixel Outline (80x92) with authentic 4px stepped cut corners */}
          <path
            d="
              M 16 0 H 64 V 4 H 72 V 8 H 76 V 16 H 80 V 76 H 76 V 84 H 72 V 88 H 64 V 92 H 16 V 88 H 8 V 84 H 4 V 76 H 0 V 16 H 4 V 8 H 8 V 4 H 16 Z
            "
            fill="#050811"
          />

          {/* 4px Extruded Arcade Bezel */}
          {/* Top-Left Highlight Bevel */}
          <path
            d="
              M 16 4 H 64 V 8 H 72 V 16 H 68 V 8 H 16 V 4 Z
              M 4 16 H 8 V 76 H 4 Z
              M 8 8 H 16 V 12 H 8 Z
            "
            fill={theme.highlight}
          />

          {/* Bottom-Right Shadow Bevel */}
          <path
            d="
              M 16 84 H 64 V 88 H 16 Z
              M 64 80 H 72 V 84 H 64 Z
              M 72 76 H 76 V 16 H 72 Z
            "
            fill={theme.shadow}
          />

          {/* Main Tier Accent Bezel Rim */}
          <path
            d="
              M 16 8 H 64 V 12 H 70 V 16 H 72 V 76 H 70 V 80 H 64 V 84 H 16 V 80 H 10 V 76 H 8 V 16 H 10 V 12 H 16 Z
            "
            fill={theme.outerBorder}
          />

          {/* Inset Inner Dark Border */}
          <path
            d="
              M 18 12 H 62 V 16 H 66 V 20 H 68 V 72 H 66 V 76 H 62 V 80 H 18 V 76 H 14 V 72 H 12 V 20 H 14 V 16 H 18 Z
            "
            fill="#090D1A"
          />
        </svg>

        {/* Inner Holographic Core Container (with CRT scanlines and radial gradient) */}
        <div
          className="absolute inset-[10px] sm:inset-[12px] flex items-center justify-center overflow-hidden"
          style={{
            background: theme.innerCore,
            clipPath: 'polygon(15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%, 0% 15%)',
          }}
        >
          {/* CRT Vertical Scanlines Overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              backgroundImage:
                'repeating-linear-gradient(to bottom, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)',
            }}
          />

          {/* Holographic Shifting Glare Reflection */}
          <div
            className="absolute -inset-full bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none transition-transform duration-700 ease-out"
            style={{
              transform: isHovered ? 'translate(70%, 70%) rotate(45deg)' : 'translate(-70%, -70%) rotate(45deg)',
            }}
          />

          {/* Badge Centerpiece (Icon or Locked Padlock) */}
          <div className="relative z-10 flex items-center justify-center w-full h-full p-2">
            {isEarned ? (
              <div
                className={`${sizeConfig.iconBox} flex items-center justify-center transition-transform duration-200 group-hover:scale-110`}
                dangerouslySetInnerHTML={{
                  __html:
                    iconSvg ||
                    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" shape-rendering="crispEdges">
                      <rect x="7" y="3" width="10" height="2" fill="${theme.outerBorder}"/>
                      <rect x="5" y="5" width="14" height="14" fill="${theme.highlight}"/>
                      <rect x="9" y="9" width="6" height="6" fill="#FFFFFF"/>
                    </svg>`,
                }}
              />
            ) : (
              /* 16-Bit Blocky Padlock Sprite */
              <svg
                viewBox="0 0 16 16"
                className="w-6 h-6 opacity-45 grayscale"
                shapeRendering="crispEdges"
              >
                <rect x="5" y="2" width="6" height="2" fill="#94A3B8" />
                <rect x="4" y="4" width="2" height="4" fill="#94A3B8" />
                <rect x="10" y="4" width="2" height="4" fill="#94A3B8" />
                <rect x="3" y="7" width="10" height="7" fill="#475569" />
                <rect x="4" y="8" width="8" height="5" fill="#334155" />
                <rect x="7" y="9" width="2" height="2" fill="#CBD5E1" />
                <rect x="7" y="11" width="2" height="1" fill="#CBD5E1" />
              </svg>
            )}
          </div>
        </div>
      </div>

      {/* Typography: Press Start 2P for Title & Pixelify Sans for Lore */}
      {(showDetails || size === 'lg') && (
        <div className="mt-2.5 text-center max-w-[140px]">
          <h4
            className="font-pixel text-[8px] sm:text-[9px] leading-tight uppercase truncate"
            style={{
              color: isEarned ? theme.textColor : '#64748B',
              textShadow: isEarned ? `0 0 6px ${theme.accentColor}` : 'none',
              fontFamily: "'Press Start 2P', monospace",
            }}
          >
            {title}
          </h4>

          {description && (
            <p
              className="text-[10px] sm:text-[11px] text-slate-400 mt-1 line-clamp-2 leading-tight font-medium"
              style={{ fontFamily: "'Pixelify Sans', sans-serif" }}
            >
              {description}
            </p>
          )}

          {isEarned && (
            <div className="mt-1 flex items-center justify-center gap-1 font-pixel text-[7px] text-amber-300">
              <span>+{xpReward} XP</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
