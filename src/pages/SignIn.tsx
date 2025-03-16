import { ChangeEvent, useState } from 'react';

import { ZodError } from 'zod';
import { SignInSchema } from './schemas/SignInSchema';

import { handleSignInErrors } from './errors/handleSignInErrors';

import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';

import SessionTemplate from './components/SessionTemplate';
import Input from './components/Input';
import FormGroup from '../components/FormGroup';

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
      prevState.filter((error) => error.fieldName !== 'username')
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
      prevState.filter((error) => error.fieldName !== 'password')
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

      await new Promise((resolve) => setTimeout(resolve, 4000));

      console.log(credentials);

      setUsername('');
      setPassword('');
    } catch (error) {
      if (error instanceof ZodError) {
        const result = handleSignInErrors(error);
        if (result) {
          setErrorsData((prevState) => [...prevState, result]);
        }
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
      <FormGroup fieldName={['username']} errorsData={errorsData}>
        <Input
          theFieldIsEmpty={username.length > 0}
          Icon={FaUser}
          errorsData={errorsData}
          fieldName="username"
          isDisabled={isSubmitting}
          disabled={isSubmitting}
          type="text"
          placeholder="Nome de usuário"
          value={username}
          onChange={handleUsernameChange}
        />
      </FormGroup>

      <FormGroup fieldName={['password']} errorsData={errorsData}>
        <Input
          theFieldIsEmpty={password.length > 0}
          isAPasswordInput
          Icon={RiLockPasswordFill}
          errorsData={errorsData}
          fieldName="password"
          isDisabled={isSubmitting}
          disabled={isSubmitting}
          placeholder="Senha"
          value={password}
          onChange={handlePasswordChange}
        />
      </FormGroup>
    </SessionTemplate>
  );
}
