import { useState } from 'react';

import { useAuth } from '../../app/hooks/useAuth';

import AuthService from '../../app/services/AuthService';

import { SignInSchema } from '../../assets/schemas/UserSchema';
import { handleSignInErrors } from '../../app/handleErrors/handleSignInErrors';

import SessionTemplate from './components/SessionTemplate';
import SessionForm from './components/SessionForm';

import { TSignIn } from '../../@types/User';

export default function SignIn() {
  const { signIn } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(credentials: TSignIn) {
    setIsSubmitting(true);

    const { accessToken } = await AuthService.signIn(credentials);

    signIn(accessToken);

    setIsSubmitting(false);
  }

  return (
    <SessionTemplate
      title="Entrar"
      highlightText="Com uma lista completa de livros da Google BOOKS, você pode criar sua própria lista de livros e controlar seu progresso de leitura."
      isSubmitting={isSubmitting}
    >
      <SessionForm
        validationSchema={SignInSchema}
        onSubmit={handleSubmit}
        handleErrors={handleSignInErrors}
      />
    </SessionTemplate>
  );
}
