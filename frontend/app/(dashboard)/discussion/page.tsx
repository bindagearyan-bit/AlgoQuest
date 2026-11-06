'use client';

import React, { useState } from 'react';
import { PixelCard } from '@/components/ui/PixelCard';
import { PixelButton } from '@/components/ui/PixelButton';
import { PixelInput } from '@/components/ui/PixelInput';
import { MessageSquare, ThumbsUp, MessageCircle, Send } from 'lucide-react';

export default function DiscussionPage() {
  const [threads, setThreads] = useState([
    {
      id: 1,
      title: 'How to intuitively visualize Two Pointers vs Sliding Window?',
      author: 'ByteWizard',
      replies: 14,
      upvotes: 42,
      tag: 'TIPS & TRICKS',
      time: '2 hours ago',
    },
    {
      id: 2,
      title: 'Level 1 Boss: Two Sum in O(1) space - what edge cases did you encounter?',
      author: 'AlgoNinja',
      replies: 8,
      upvotes: 29,
      tag: 'LEVEL 1 BOSS',
      time: '5 hours ago',
    },
    {
      id: 3,
      title: 'Monotonic Stack implementation nuances in C++ vs Python',
      author: 'StackRogue',
      replies: 19,
      upvotes: 61,
      tag: 'CODE DISCUSSION',
      time: 'Yesterday',
    },
  ]);

  const [newTitle, setNewTitle] = useState('');

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setThreads([
      {
        id: Date.now(),
        title: newTitle,
        author: 'PixelKnight',
        replies: 0,
        upvotes: 1,
        tag: 'GENERAL',
        time: 'Just now',
      },
      ...threads,
    ]);
    setNewTitle('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="text-center space-y-2">
        <span className="font-pixel text-[10px] text-[#8B7FD9] uppercase">
          GUILD TAVERN
        </span>
        <h1 className="font-pixel text-lg sm:text-2xl text-[#1A2744]">
          COMMUNITY DISCUSSION
        </h1>
        <p className="font-body text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
          Ask questions, discuss algorithm invariants, and share optimal trade-offs with other heroes.
        </p>
      </div>

      {/* Start New Thread Form */}
      <PixelCard variant="blue">
        <form onSubmit={handlePost} className="flex gap-3">
          <input
            type="text"
            placeholder="Ask a question or discuss an algorithmic stage..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl border-2 border-[#1A2744]/20 bg-white font-body text-sm outline-none focus:border-[#8B7FD9]"
          />
          <PixelButton type="submit" variant="mint" size="md">
            <Send size={14} className="mr-1.5" /> POST
          </PixelButton>
        </form>
      </PixelCard>

      {/* Thread list */}
      <div className="space-y-3">
        {threads.map((thread) => (
          <PixelCard key={thread.id} variant="white" className="p-4 sm:p-5 hover:border-[#8B7FD9] transition-colors cursor-pointer">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1.5">
                <span className="font-pixel text-[8px] px-2 py-0.5 rounded bg-[#8B7FD9]/15 text-[#8B7FD9] border border-[#8B7FD9]/30">
                  {thread.tag}
                </span>
                <h3 className="font-pixel text-xs sm:text-sm text-[#1A2744]">
                  {thread.title}
                </h3>
                <p className="font-body text-xs text-slate-500">
                  Posted by <span className="font-pixel text-[9px] text-[#1A2744]">{thread.author}</span> • {thread.time}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0 text-slate-600 font-pixel text-[10px]">
                <span className="flex items-center gap-1">
                  <ThumbsUp size={14} className="text-[#8B7FD9]" /> {thread.upvotes}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle size={14} className="text-slate-400" /> {thread.replies}
                </span>
              </div>
            </div>
          </PixelCard>
        ))}
      </div>
    </div>
  );
}

