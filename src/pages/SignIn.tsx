import { ChangeEvent, useState } from 'react';

import { SignInSchema } from './schemas/SignInSchema';

import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';

import SessionTemplate from './components/SessionTemplate';
import Input from './components/Input';
import { ZodError } from 'zod';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit() {
    try {
      const credentials = SignInSchema.parse({ username, password });

      console.log(credentials);
    } catch (error) {
      if (error instanceof ZodError) {
        if (
          error.message.includes('The username must be at least 5 characters')
        ) {
          console.log('O nome de usuário precisa ter no mínimo 5 caracteres');
        }

        if (
          error.message.includes('The password must be at least 8 characters')
        ) {
          console.log('A senha precisa ter no mínimo 8 caracteres');
        }
      }
    }
  }

  return (
    <SessionTemplate
      title="Entrar"
      buttonLabel="Entrar"
      highlightText="Está pronto para terminar um livro hoje e iniciar outro? Entre já e
            atualize os dados sobre seus livros."
      onSubmit={handleSubmit}
    >
      <Input
        theFieldIsEmpty={username.length > 0}
        Icon={FaUser}
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
        placeholder="Senha"
        value={password}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setPassword(event.target.value)
        }
      />
    </SessionTemplate>
  );
}
