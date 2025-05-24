import { z } from 'zod';

export const MimeTypeSchema = z.enum(['image/jpeg', 'image/jpg', 'image/png'], {
  message: 'Invalid mime type',
});

export const GetPreSignedURLSchema = z.object({
  mimeType: MimeTypeSchema,
  fileSize: z.number(),
});
