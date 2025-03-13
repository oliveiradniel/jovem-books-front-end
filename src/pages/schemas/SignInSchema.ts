import { z } from 'zod';

export const SignInSchema = z.object({
  username: z
    .string({ message: 'The username must be a string' })
    .min(5, 'The username must be at least 5 characters'),
  password: z
    .string({ message: 'The password must be a string' })
    .min(8, 'The password must be a least 8 characters'),
});
