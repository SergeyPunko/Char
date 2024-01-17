import * as z from 'zod';

export const registrationSchema = z.object({
  username: z
    .string()
    .min(8)
    .max(12)
    .trim()
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: 'You may use only alphanumeric characters (uppercase and lowercase) along with underscores',
    }),
  avatar: z.any().optional(),
});
