import { Metadata } from 'next';
import { EscapeRoomGame } from '@/components/games/escape-room/EscapeRoomGame';

export const metadata: Metadata = {
  title: 'Daily Algorithm Escape Room | AlgoQuest Arcade',
  description: 'A new 10-room procedurally generated procedural dungeon every day at 00:00 UTC. Can you escape?',
};

export default function EscapeRoomPage() {
  return (
    <main className="w-full">
      <EscapeRoomGame />
    </main>
  );
}
