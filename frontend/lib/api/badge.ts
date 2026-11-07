import api from './axios';

export interface BadgeItem {
  id: number;
  sublevelId: number;
  levelId: number;
  title: string;
  description: string;
  iconSvg: string;
  xpReward: number;
  tier: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  isEarned: boolean;
  earnedAt?: string | null;
}

export const badgeApi = {
  getAllBadges: async (): Promise<BadgeItem[]> => {
    const res = await api.get('/badges/all');
    return res.data.data;
  },

  getEarnedBadges: async (): Promise<BadgeItem[]> => {
    const res = await api.get('/badges/earned');
    return res.data.data;
  },

  getSharePayload: async (badgeId: number) => {
    const res = await api.get(`/badges/${badgeId}/share`);
    return res.data.data;
  },
};
