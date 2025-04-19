import { z } from 'zod';

import { SignInSchema, SignUpSchema } from '../assets/schemas/UserSchema';

export type TSignIn = z.infer<typeof SignInSchema>;

export type TSignUp = z.infer<typeof SignUpSchema>;
