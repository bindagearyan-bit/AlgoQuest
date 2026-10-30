import { z } from 'zod';

export const addXpSchema = z.object({
  body: z.object({
    amount: z.number().int().positive('XP amount must be positive').max(1000),
    reason: z.string().optional(),
  }),
});

export const updateStreakSchema = z.object({
  body: z.object({
    useFreeze: z.boolean().optional().default(false),
  }),
});

export type AddXpInput = z.infer<typeof addXpSchema>['body'];
export type UpdateStreakInput = z.infer<typeof updateStreakSchema>['body'];
