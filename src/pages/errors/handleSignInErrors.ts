import { ZodError } from 'zod';

export function handleSignInErrors(error: ZodError) {
  if (error.message.includes('The username must be at least 5 characters')) {
    console.log('O nome de usuário deve ter no mínimo 5 caracteres');

    return;
  }

  if (error.message.includes('The password must be at least 8 characters')) {
    console.log('A senha do usuário deve ter no mínimo 8 caracteres');

    return;
  }
}
