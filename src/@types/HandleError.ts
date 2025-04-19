import { AxiosError } from 'axios';
import { ZodError } from 'zod';

export type HandleError = ZodError | AxiosError | unknown;
