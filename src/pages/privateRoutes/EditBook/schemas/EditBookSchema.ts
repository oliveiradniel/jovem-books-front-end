import { z } from 'zod';

export const EditBookSchema = z.object({
  title: z
    .string({ message: 'The title must be a string' })
    .min(3, 'Title must be at least 3 characters'),
  authors: z.array(
    z
      .string({ message: 'Author must be a string' })
      .min(3, 'Author must be at least 3 characters'),
    { message: 'Author is required' }
  ),
  sinopse: z.string({ message: 'The title must be a string' }).optional(),
});
