import { ZodError } from 'zod';

import { AxiosError, AxiosResponse } from 'axios';
import { ErrorData } from '../../../@types/ErrorData';

type Errors = ZodError | AxiosError | unknown;

interface APIError extends AxiosError {
  response: AxiosResponse<{ message: string }>;
}

export function handleSignInErrors(error: Errors): ErrorData | null {
  if (error instanceof ZodError) {
    if (error.message.includes('The username must be at least 5 characters')) {
      const message = 'O nome de usuário deve ter no mínimo 5 caracteres';

      return { fieldName: 'username', message };
    }

    if (error.message.includes('The password must be at least 8 characters')) {
      const message = 'A senha do usuário deve ter no mínimo 8 caracteres';

      return { fieldName: 'password', message };
    }
  }

  if (error instanceof AxiosError) {
    if (error.message === 'Network Error') {
      console.log('Erro no servidor');
      return null;
    }

    const apiError = error as APIError;

    const errorMessage = apiError.response.data.message;

    if (errorMessage === 'Invalid credentials') {
      const message =
        'Suas credenciais não coincidem com uma conta em nosso sistema';

      return { fieldName: 'credentials', message };
    }
  }

  return null;
}
