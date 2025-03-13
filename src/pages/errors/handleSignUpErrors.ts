import { ZodError } from 'zod';

export function handleSignUpErrors(error: ZodError) {
  if (error.message.includes('The username must be at least 5 characters')) {
    console.log('O nome de usuário deve ter no mínimo 5 caracteres');

    return;
  }

  if (error.message.includes('The first name must be at least 5 characters')) {
    console.log('O primeiro nome do usuário deve ter no mínimo 5 caracteres');

    return;
  }

  if (error.message.includes('The last name must be at least 5 characters')) {
    console.log('O último nome do usuário deve ter no mínimo 5 caracteres');

    return;
  }

  if (error.message.includes('Enter a valid e-mail')) {
    console.log('Insira um e-mail válido');

    return;
  }

  if (error.message.includes('The password must be at least 8 characters')) {
    console.log('A senha do usuário deve ter no mínimo 8 caracteres');

    return;
  }
}
