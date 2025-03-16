import { ZodError } from 'zod';

interface HandleSignUpErrorsResponse {
  fieldName: 'username' | 'firstName' | 'lastName' | 'email' | 'password';
  message: string;
}

export function handleSignUpErrors(
  error: ZodError
): HandleSignUpErrorsResponse | null {
  if (error.message.includes('The username must be at least 5 characters')) {
    const message = 'O nome de usuário deve ter no mínimo 5 caracteres';

    return { fieldName: 'username', message };
  }

  if (error.message.includes('The first name must be at least 5 characters')) {
    const message =
      'O primeiro nome do usuário deve ter no mínimo 5 caracteres';

    return { fieldName: 'firstName', message };
  }

  if (error.message.includes('The last name must be at least 5 characters')) {
    const message = 'O último nome do usuário deve ter no mínimo 5 caracteres';

    return { fieldName: 'lastName', message };
  }

  if (error.message.includes('Enter a valid e-mail')) {
    const message = 'Insira um e-mail válido';

    return { fieldName: 'email', message };
  }

  if (error.message.includes('The password must be at least 8 characters')) {
    const message = 'A senha do usuário deve ter no mínimo 8 caracteres';

    return { fieldName: 'password', message };
  }

  return null;
}
