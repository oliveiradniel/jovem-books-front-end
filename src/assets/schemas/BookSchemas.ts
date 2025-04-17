import { z } from 'zod';

const ILiteraryGenreSchema = z.union([
  z.literal('ROMANCE'),
  z.literal('SCIENCE_FICTION'),
  z.literal('ADVENTURE'),
  z.literal('PHILOSOPHY'),
  z.literal('DRAMA'),
  z.literal('RELIGIOUS'),
  z.literal('MYSTERY'),
  z.literal('HORROR'),
  z.literal('BIOGRAPHY'),
  z.literal('HISTORICAL'),
  z.literal('FANTASY'),
  z.literal('THRILLER'),
  z.literal('HUMOR'),
  z.literal('CHILDRENS'),
  z.literal('YOUNG_ADULT'),
  z.literal('POETRY'),
  z.literal('ART_AND_DESIGN'),
  z.literal('POLITICS'),
  z.literal('ECONOMICS'),
  z.literal('SELF_HELP'),
  z.literal('CRIME'),
  z.literal('DYSTOPIAN'),
  z.literal('WESTERN'),
  z.literal('GOTHIC'),
  z.literal('EROTIC'),
  z.literal('CYBERPUNK'),
  z.literal('STEAMPUNK'),
  z.literal('COOKING'),
  z.literal('TRAVEL'),
  z.literal('SPORTS'),
  z.literal('FAIRYTALE'),
  z.literal('OTHER'),
]);

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
  genreLiterary: z
    .array(ILiteraryGenreSchema, { message: 'Enter a valid literary genre' })
    .min(1, 'The genre literary array needs at least one genre literary'),
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
  removeImage: z
    .union([z.string(), z.null()])
    .default(null)
    .transform((val) => val ?? null) as z.ZodType<string | null>,
});

export const CreateDataBookSchema = BaseBookSchema.omit({
  id: true,
  removeImage: true,
});

export const UpdateDataBookSchema = BaseBookSchema;
