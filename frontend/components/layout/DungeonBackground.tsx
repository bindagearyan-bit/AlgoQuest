'use client';

import React from 'react';

export const DungeonBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-[#0D0B2E] to-[#1A1744] text-white overflow-hidden">
      {/* Brick grid pattern subtle overlay */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#00F0FF 1px, transparent 1px), radial-gradient(#FF2FD4 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px',
        }}
      />
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
};

