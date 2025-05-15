import { z } from 'zod';

const BaseBookSchema = z.object({
  id: z
    .string({ message: 'Book id must be a string' })
    .uuid({ message: 'Invalid book id' }),
  title: z
    .string({ message: 'The title must be a string' })
    .min(3, 'Title must be at least 3 characters'),
  authors: z.array(
    z
      .string({ message: 'Author must be a string' })
      .min(3, 'Author must be at least 3 characters'),
    { message: 'Author must be an array' }
  ),
  sinopse: z
    .union([z.string(), z.null()])
    .optional()
    .default(null)
    .transform((val) => val ?? null) as z.ZodType<string | null>,
  numberOfPages: z.number({ message: 'Number of pages must be a number' }),
  literaryGenre: z
    .array(z.string({ message: 'Literary genre must be a string' }), {
      message: 'Literary genre required',
    })
    .min(1, 'The literary genre array needs at least one literary genre'),
  imagePath: z
    .union([
      z
        .instanceof(File, { message: 'Enter a valid file' })
        .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
          message: 'File must be a maximum of 5MB',
        }),
      z.null(),
    ])
    .refine(
      (file) =>
        !file || ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type),
      { message: 'Only PNG, JPEG or JPG files are allowed' }
    )
    .optional()
    .default(null)
    .transform((val) => val ?? null) as z.ZodType<File | null>,
});

export const CreateBookSchema = BaseBookSchema.omit({
  id: true,
  imagePath: true,
});

export const UpdateBookSchema = BaseBookSchema.omit({
  numberOfPages: true,
});
