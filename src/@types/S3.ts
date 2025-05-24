import { z } from 'zod';

import {
  GetPreSignedURLSchema,
  MimeTypeSchema,
} from '../assets/schemas/GetPreSignedURLSchema';

export type TGetPreSignedURL = z.infer<typeof GetPreSignedURLSchema>;

export type TMimeType = z.infer<typeof MimeTypeSchema>;

export interface IPreSignedURL {
  url: string;
  key: string;
}
