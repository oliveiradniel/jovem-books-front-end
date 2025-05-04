import { z } from 'zod';

import {
  SignInSchema,
  SignUpSchema,
  UpdateUserSchema,
} from '../assets/schemas/UserSchema';

export type TSignIn = z.infer<typeof SignInSchema>;

export type TSignUp = z.infer<typeof SignUpSchema>;

export type TUpdateUser = z.infer<typeof UpdateUserSchema>;

export interface IUserAPIResponse {
  id: string;
  username: string;
  imagePath: string | null;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string | null;
  booksReading: number;
  _count: {
    books: number;
  };
}
