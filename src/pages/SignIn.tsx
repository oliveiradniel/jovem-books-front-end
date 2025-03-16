import { ChangeEvent, useState } from 'react';

import { ZodError } from 'zod';
import { SignInSchema } from './schemas/SignInSchema';

import { handleSignInErrors } from './errors/handleSignInErrors';

import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';

import SessionTemplate from './components/SessionTemplate';
import Input from './components/Input';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = username.length > 0 && password.length > 0;

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
        handleSignInErrors(error);
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
      <Input
        theFieldIsEmpty={username.length > 0}
        Icon={FaUser}
        isDisabled={isSubmitting}
        disabled={isSubmitting}
        type="text"
        placeholder="Nome de usuário"
        value={username}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setUsername(event.target.value)
        }
      />

      <Input
        theFieldIsEmpty={password.length > 0}
        isAPasswordInput
        Icon={RiLockPasswordFill}
        isDisabled={isSubmitting}
        disabled={isSubmitting}
        placeholder="Senha"
        value={password}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setPassword(event.target.value)
        }
      />
    </SessionTemplate>
  );
}
