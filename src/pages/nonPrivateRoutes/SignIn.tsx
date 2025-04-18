import { ChangeEvent, useState } from 'react';

import { useAuth } from '../../app/hooks/useAuth';
import { useErrors } from '../../app/hooks/useErrors';

import AuthService from '../../app/services/AuthService';

import { SignInSchema } from './schemas/SignInSchema';
import { handleSignInErrors } from './errors/handleSignInErrors';

import { emitToast } from '../../utils/emitToast';

import SessionTemplate from './components/SessionTemplate';
import SignInFields from './components/SignInFields';

export default function SignIn() {
  const { signIn } = useAuth();

  const { errors, setError, removeError } = useErrors();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [isError, setIsError] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid =
    username.length > 0 && password.length > 0 && errors.length === 0;

  function handleUsernameChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    if (value.length === 0) {
      setError({
        field: 'username',
        message: 'O nome de usuário é obrigatório!',
      });
    }

    setUsername(value);
  }

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    removeError('credentials');
    removeError('password');

    if (value.length === 0) {
      setError({ field: 'password', message: 'A senha é obrigatória!' });
    }

    setPassword(value);
  }

  async function handleSubmit() {
    try {
      setIsError(false);
      setIsSubmitting(true);

      const credentials = SignInSchema.parse({ username, password });

      const { accessToken } = await AuthService.signIn(credentials);

      signIn(accessToken);

      setUsername('');
      setPassword('');
    } catch (error) {
      const result = handleSignInErrors(error);
      if (result) {
        setError(result);

        return;
      }

      setIsError(true);
      emitToast({
        type: 'error',
        message: 'Não foi possível fazer login no momento.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SessionTemplate
      title="Entrar"
      buttonLabel={isError ? 'Tentar novamente' : 'Entrar'}
      highlightText="Está pronto para terminar um livro hoje e iniciar outro? Entre já e
            atualize os dados sobre seus livros."
      isFormValid={isFormValid}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
    >
      <SignInFields
        username={username}
        password={password}
        isSubmitting={isSubmitting}
        onUsernameChange={handleUsernameChange}
        onPasswordChange={handlePasswordChange}
      />
    </SessionTemplate>
  );
}
