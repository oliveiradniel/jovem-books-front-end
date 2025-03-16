import { ZodError } from 'zod';

interface HandleSignInErrorsResponse {
  fieldName: 'username' | 'password';
  message: string;
}

export function handleSignInErrors(
  error: ZodError
): HandleSignInErrorsResponse | null {
  if (error.message.includes('The username must be at least 5 characters')) {
    const message = 'O nome de usuário deve ter no mínimo 5 caracteres';

    return { fieldName: 'username', message };
  }

  if (error.message.includes('The password must be at least 8 characters')) {
    const message = 'A senha do usuário deve ter no mínimo 8 caracteres';

    return { fieldName: 'password', message };
  }

  return null;
}
