import { useEffect, useRef } from 'react';

import { useAuth } from '../../app/hooks/useAuth';

import AuthService from '../../app/services/AuthService';

import { SignInSchema } from '../../assets/schemas/UserSchema';
import { handleSignInErrors } from '../../app/handleErrors/handleSignInErrors';

import SessionTemplate from './components/SessionTemplate';
import SessionForm from './components/SessionForm';

import { TSignIn } from '../../@types/User';

export default function SignIn() {
  const { signIn } = useAuth();

  const controllerRef = useRef<AbortController | null>(null);

  async function handleSubmit(credentials: TSignIn) {
    const { accessToken } = await AuthService.signIn({
      credentials,
      signal: controllerRef.current?.signal as AbortSignal,
    });

    signIn(accessToken);
  }

  useEffect(() => {
    controllerRef.current = new AbortController();

    return () => {
      controllerRef.current?.abort();
    };
  }, []);

  return (
    <SessionTemplate
      title="Entrar"
      highlightText="Com uma lista completa de livros da Google BOOKS, você pode criar sua própria lista de livros e controlar seu progresso de leitura."
    >
      <SessionForm
        validationSchema={SignInSchema}
        onSubmit={handleSubmit}
        handleErrors={handleSignInErrors}
      />
    </SessionTemplate>
  );
}
