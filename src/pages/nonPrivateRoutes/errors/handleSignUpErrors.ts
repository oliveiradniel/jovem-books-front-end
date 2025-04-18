import { ZodError } from 'zod';

import { AxiosError, AxiosResponse } from 'axios';
import { IFormError } from '../../../@types/FormError';

type Error = ZodError | AxiosError | unknown;

interface APIError extends AxiosError {
  response: AxiosResponse<{ message: string }>;
}

export function handleSignUpErrors(error: Error): IFormError | null {
  if (error instanceof ZodError) {
    if (error.message.includes('The username must be at least 5 characters')) {
      const message = 'O nome de usuário deve ter no mínimo 5 caracteres!';

      return { field: 'username', message };
    }

    if (
      error.message.includes('The first name must be at least 3 characters')
    ) {
      const message =
        'O primeiro nome do usuário deve ter no mínimo 3 caracteres!';

      return { field: 'firstName', message };
    }

    if (error.message.includes('The last name must be at least 3 characters')) {
      const message =
        'O último nome do usuário deve ter no mínimo 3 caracteres!';

      return { field: 'lastName', message };
    }

    if (error.message.includes('Enter a valid e-mail')) {
      const message = 'Insira um e-mail válido!';

      return { field: 'email', message };
    }

    if (error.message.includes('The password must be at least 8 characters')) {
      const message = 'A senha do usuário deve ter no mínimo 8 caracteres!';

      return { field: 'password', message };
    }
  }

  if (error instanceof AxiosError) {
    if (error.message === 'Network Error') {
      console.log('Erro no servidor');
      return null;
    }

    const apiError = error as APIError;

    const errorMessage = apiError.response.data.message;

    if (errorMessage === 'Username already in use') {
      const message = 'O nome de usuário já está em uso!';

      return { field: 'username', message };
    }

    if (errorMessage === 'Email already in use') {
      const message = 'O e-mail já está em uso!';

      return { field: 'email', message };
    }
  }

  return null;
}
