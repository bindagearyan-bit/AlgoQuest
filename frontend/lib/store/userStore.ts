import { create } from 'zustand';

export interface User {
  id: string;
  email: string;
  username: string;
  avatar: string;
  xp: number;
  hearts: number;
  gems: number;
  streakCount: number;
  selectedLevel?: string;
  currentLeague?: string;
  longestStreak?: number;
}

interface UserState {
  user: User | null;
  xp: number;
  hearts: number;
  gems: number;
  streakCount: number;
  setUser: (user: User) => void;
  updateXP: (xp: number) => void;
  updateHearts: (hearts: number) => void;
  updateGems: (gems: number) => void;
  updateStreak: (streak: number) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  xp: 0,
  hearts: 5,
  gems: 100,
  streakCount: 0,
  setUser: (user) =>
    set({
      user,
      xp: user.xp ?? 0,
      hearts: user.hearts ?? 5,
      gems: user.gems ?? 100,
      streakCount: user.streakCount ?? 0,
    }),
  updateXP: (xp) => set({ xp }),
  updateHearts: (hearts) => set({ hearts }),
  updateGems: (gems) => set({ gems }),
  updateStreak: (streakCount) => set({ streakCount }),
  logout: () => set({ user: null, xp: 0, hearts: 5, gems: 100, streakCount: 0 }),
}));

