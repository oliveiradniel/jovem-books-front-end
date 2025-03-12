import { ChangeEvent, useState } from 'react';

import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';

import SessionTemplate from './components/SessionTemplate';
import Input from './components/Input';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SessionTemplate
      title="Entrar"
      buttonLabel="Entrar"
      highlightText="Está pronto para terminar um livro hoje e iniciar outro? Entre já e
            atualize os dados sobre seus livros."
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
