import { AxiosError } from 'axios';
import { ZodError } from 'zod';

export type THandleError = ZodError | AxiosError | unknown;
