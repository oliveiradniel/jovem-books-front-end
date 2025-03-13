import { z } from 'zod';

export const SignUpSchema = z.object({
  username: z
    .string({ message: 'The username must be a string' })
    .min(5, 'The username must be at least 5 characters'),
  firstName: z
    .string({ message: 'The first name must be a string' })
    .min(5, 'The first name must be at least 5 characters'),
  lastName: z
    .string({ message: 'The last name must be a string' })
    .min(5, 'The last name must be at least 5 characters'),
  email: z
    .string({ message: 'The e-mail must be a string' })
    .email('Enter a valid e-mail'),
  password: z
    .string({ message: 'The password must be a string' })
    .min(8, 'The password must be at least 8 characters'),
});
