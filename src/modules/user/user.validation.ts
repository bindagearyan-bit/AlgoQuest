import { z } from 'zod';

export const updateProfileSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(100).optional(),
    avatar: z.string().url('Invalid avatar URL').optional(),
    selectedLevel: z.string().uuid('Invalid level ID').optional(),
  }),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>['body'];
