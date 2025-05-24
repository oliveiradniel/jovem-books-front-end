import { z } from 'zod';

const BaseUserSchema = z.object({
  username: z
    .string({ message: 'The username must be a string' })
    .min(5, 'The username must be at least 5 characters'),
  firstName: z
    .string({ message: 'The first name must be a string' })
    .min(3, 'The first name must be at least 3 characters'),
  lastName: z
    .string({ message: 'The last name must be a string' })
    .min(3, 'The last name must be at least 3 characters'),
  email: z
    .string({ message: 'The e-mail must be a string' })
    .email('Enter a valid e-mail'),
  password: z
    .string({ message: 'The password must be a string' })
    .min(8, 'The password must be at least 8 characters'),
});

export const SignInSchema = BaseUserSchema.omit({
  firstName: true,
  lastName: true,
  email: true,
});

export const SignUpSchema = BaseUserSchema;

export const UpdateUserSchema = BaseUserSchema.omit({ password: true }).extend({
  file: z
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
  imagePath: z.string({ message: 'Image path must be a string' }).nullable(),
  removeImage: z.boolean().default(false),
});
