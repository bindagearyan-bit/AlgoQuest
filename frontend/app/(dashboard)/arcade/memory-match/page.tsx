import { Metadata } from 'next';
import { MemoryMatchGame } from '@/components/games/memory-match/MemoryMatchGame';

export const metadata: Metadata = {
  title: 'Memory Match: DS Icons | AlgoQuest Arcade',
  description: '16-bit retro arcade memory matching game to practice Data Structure recognition and terminology.',
};

export default function MemoryMatchPage() {
  return (
    <div className="w-full flex-1">
      <MemoryMatchGame />
    </div>
  );
}
