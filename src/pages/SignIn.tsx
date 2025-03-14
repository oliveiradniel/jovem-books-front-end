import { ChangeEvent, useState } from 'react';

import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';

import Input from './components/Input';
import Button from './components/Button';
import Navigation from './components/Navigation';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="to-royal-blue h-screen w-screen bg-linear-to-r from-black p-5">
      <div className="bg-navy-blue-op-40 flex h-full w-full justify-between gap-20 rounded-2xl p-5">
        <div className="relative max-w-md flex-1">
          <Navigation />

          <h1 className="text-snow-white font-quicksand mt-20 mb-8 text-4xl">
            Entrar
          </h1>

          <form className="flex flex-col gap-4">
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

            <Button label="Entrar" />
          </form>
        </div>
        <div className="bg-dark-burgundy-op-80 hidden max-w-md flex-1 items-center justify-center rounded-lg p-6 sm:flex">
          <span className="text-light-gray font-bebas-neue text-center text-4xl">
            Está pronto para terminar um livro hoje e iniciar outro? Entre já e
            atualize os dados sobre seus livros.
          </span>
        </div>
      </div>
    </div>
  );
}
