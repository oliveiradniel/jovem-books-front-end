import { ZodError } from 'zod';

import { AxiosError, AxiosResponse } from 'axios';

import {
  IFormError,
  TBookErrorMessages,
  TBookFields,
} from '../../../../@types/FormError';

type Error = ZodError | AxiosError | unknown;

interface APIError extends AxiosError {
  response: AxiosResponse<{ message: string }>;
}

export function handleBookErrors(
  error: Error
): IFormError<TBookFields, TBookErrorMessages> | null {
  if (error instanceof ZodError) {
    if (error.message.includes('Title must be at least 3 characters')) {
      const message = 'O título do livro deve ter no mínimo 3 caracteres!';

      return { field: 'title', message };
    }

    if (error.message.includes('Author must be at least 3 characters')) {
      const message = 'O nome do autor deve ter no mínimo 3 caracteres!';

      return { field: 'authors', message };
    }
  }

  if (error instanceof AxiosError) {
    if (error.message === 'Network Error') {
      // console.log('Erro no servidor');
      return null;
    }

    const apiError = error as APIError;

    const errorMessage = apiError.response.data.message;

    if (errorMessage === 'Title already in use') {
      const message = 'O título do livro já está em uso!';

      return { field: 'title', message };
    }
  }

  return null;
}
