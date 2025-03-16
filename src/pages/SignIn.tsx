import { ChangeEvent, useState } from 'react';

import { authService } from '../app/services/authService';

import { SignInSchema } from './schemas/SignInSchema';

import { handleSignInErrors } from './errors/handleSignInErrors';

import SessionTemplate from './components/SessionTemplate';
import SignInFields from './components/SignInFields';

import { ErrorData } from './types/ErrorData';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errorsData, setErrorsData] = useState([] as ErrorData[]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid =
    username.length > 0 && password.length > 0 && errorsData.length === 0;

  function handleUsernameChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setErrorsData((prevState) =>
      prevState.filter(
        (error) =>
          error.fieldName !== 'credentials' && error.fieldName !== 'username'
      )
    );

    if (value.length === 0) {
      setErrorsData((prevState) => [
        ...prevState,
        {
          fieldName: 'username',
          message: 'O nome de usuário é obrigatório',
        },
      ]);
    }

    setUsername(value);
  }

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setErrorsData((prevState) =>
      prevState.filter(
        (error) =>
          error.fieldName !== 'credentials' && error.fieldName !== 'password'
      )
    );

    if (value.length === 0) {
      setErrorsData((prevState) => [
        ...prevState,
        {
          fieldName: 'password',
          message: 'A senha é obrigatória',
        },
      ]);
    }

    setPassword(value);
  }

  async function handleSubmit() {
    try {
      const credentials = SignInSchema.parse({ username, password });

      setIsSubmitting(true);

      await authService.signIn(credentials);

      // setUsername('');
      // setPassword('');

      setErrorsData([]);
    } catch (error) {
      const result = handleSignInErrors(error);
      if (result) {
        setErrorsData((prevState) => [...prevState, result]);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SessionTemplate
      title="Entrar"
      buttonLabel="Entrar"
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
        errorsData={errorsData}
        onUsernameChange={handleUsernameChange}
        onPasswordChange={handlePasswordChange}
      />
    </SessionTemplate>
  );
}
