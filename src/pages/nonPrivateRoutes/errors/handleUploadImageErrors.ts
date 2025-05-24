import { ZodError } from 'zod';

import { AxiosError, AxiosResponse } from 'axios';

import { THandleError } from '../../../@types/FormError';

interface APIError extends AxiosError {
  response: AxiosResponse<{ message: string }>;
}

export function handleUploadImageErrors(error: THandleError): string | null {
  if (error instanceof ZodError) {
    if (error.message.includes('Only PNG, JPEG or JPG files are allowed')) {
      const message = 'Apenas arquivos de imagens JPEG ou PNG são aceitos!';

      return message;
    }

    if (error.message.includes('The file must be a maximum of 5MB')) {
      const message = 'O arquivo deve ter no máximo 5MB!';

      return message;
    }
  }

  if (error instanceof AxiosError) {
    if (error.message === 'Network Error') {
      // console.log('Erro no servidor');
      return null;
    }

    const apiError = error as APIError;

    const errorMessage = apiError.response.data.message;

    if (errorMessage === 'Only JPG and PNG files are accepted') {
      const message = 'Apenas arquivos de imagens JPEG ou PNG são aceitos!';

      return message;
    }

    if (errorMessage === 'The file must be a maximum of 5MB') {
      const message = 'O arquivo deve ter no máximo 5MB!';

      return message;
    }
  }

  return null;
}
