import { ChangeEvent, useState } from 'react';

import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';

import InputPage from './components/InputPage';
import ButtonPage from './components/ButtonPage';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="bg-linear-to-r from-black to-royal-blue w-screen h-screen p-5">
      <div className="flex justify-between gap-20 bg-navy-blue-op-40 w-full h-full rounded-2xl p-5">
        <div className="flex-1 relative max-w-md">
          <nav>
            <ul className="flex gap-4">
              <li className="text-snow-white font-roboto">
                <button type="button">Entrar</button>
              </li>
              <li className="text-snow-white font-roboto">
                <button type="button">Criar conta</button>
              </li>
            </ul>
          </nav>

          <h1 className="text-4xl mt-20 mb-8 text-snow-white font-quicksand">
            Entrar
          </h1>

          <form className="flex flex-col gap-4">
            <InputPage
              theFieldIsEmpty={username.length > 0}
              Icon={FaUser}
              type="text"
              placeholder="Nome de usuário"
              value={username}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setUsername(event.target.value)
              }
            />

            <InputPage
              theFieldIsEmpty={password.length > 0}
              isAPasswordInput
              Icon={RiLockPasswordFill}
              placeholder="Senha"
              value={password}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setPassword(event.target.value)
              }
            />

            <ButtonPage label="Entrar" />
          </form>
        </div>
        <div className="flex-1 items-center justify-center bg-dark-burgundy-op-80 max-w-md rounded-lg p-6 hidden sm:flex">
          <span className="text-light-gray text-4xl font-bebas-neue text-center">
            Está pronto para terminar um livro hoje e iniciar outro? Entre já e
            atualize os dados sobre seus livros.
          </span>
        </div>
      </div>
    </div>
  );
}
