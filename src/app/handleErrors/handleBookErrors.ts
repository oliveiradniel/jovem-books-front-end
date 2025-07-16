import { ZodError } from 'zod';

import { AxiosError, AxiosResponse } from 'axios';

import {
  IFormError,
  TBookErrorMessages,
  TBookFields,
  TError,
} from '../../@types/FormError';

interface APIError extends AxiosError {
  response: AxiosResponse<{ message: string }>;
}

export function handleBookErrors(
  error: TError
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

    if (errorMessage === 'Number of pages must be greater than 0') {
      const message = 'O número de páginas deve ser maior que 0!';

      return { field: 'numberOfPages', message };
    }
  }

  return null;
}
