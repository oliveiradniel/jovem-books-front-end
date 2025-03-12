import { useState } from 'react';

import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [isTheUsernameFieldFocused, setIsTheUsernameFieldFocus] =
    useState(false);
  const [isThePasswordFieldFocused, setIsThePasswordFieldFocus] =
    useState(false);

  const [isThePasswordVisible, setIsThePasswordVisible] = useState(false);

  function handlePasswordVisibility(event: MouseEvent) {
    event.stopPropagation();

    setIsThePasswordVisible((prevState) => !prevState);
  }

  return (
    <div className="bg-linear-to-r from-black to-royal-blue w-screen h-screen p-5">
      <div className="flex gap-20 bg-navy-blue-op-40 w-full h-full rounded-2xl p-5">
        <div className="flex-1">
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
            <div
              className={`flex gap-3 items-center bg-midnight-blue-op-40 py-2 px-4 rounded-lg border border-midnight-blue-op-40 transition duration-300 ease-in-out ${
                isTheUsernameFieldFocused && 'border-royal-purple'
              }`}
            >
              <FaUser
                className={`text-light-gray-op-40 transition duration-300 ease-in-out ${
                  (isTheUsernameFieldFocused || username.length > 0) &&
                  'text-royal-purple'
                }`}
              />
              <input
                type="text"
                placeholder="Nome de usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={() => setIsTheUsernameFieldFocus(true)}
                onBlur={() => setIsTheUsernameFieldFocus(false)}
                className="focus:outline-none placeholder:text-light-gray-op-70 text-snow-white w-full"
              />
            </div>

            <div
              className={`flex gap-3 items-center bg-midnight-blue-op-40 py-2 px-4 rounded-lg border border-midnight-blue-op-40 transition duration-300 ease-in-out ${
                isThePasswordFieldFocused && 'border-royal-purple'
              }`}
            >
              <RiLockPasswordFill
                className={`text-light-gray-op-40 transition duration-300 ease-in-out ${
                  (isThePasswordFieldFocused || password.length > 0) &&
                  'text-royal-purple'
                }`}
              />
              <input
                type={!isThePasswordVisible ? 'password' : 'text'}
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setIsThePasswordFieldFocus(true)}
                onBlur={() => setIsThePasswordFieldFocus(false)}
                className="focus:outline-none placeholder:text-light-gray-op-70 text-snow-white w-full"
              />
              <button type="button" onClick={handlePasswordVisibility}>
                {!isThePasswordVisible ? (
                  <FaEye
                    className={`text-light-gray-op-40 transition duration-300 ease-in-out ${
                      (isThePasswordFieldFocused || password.length > 0) &&
                      'text-royal-purple'
                    }`}
                  />
                ) : (
                  <FaEyeSlash
                    className={`text-light-gray-op-40 transition duration-300 ease-in-out ${
                      (isThePasswordFieldFocused || password.length > 0) &&
                      'text-royal-purple'
                    }`}
                  />
                )}
              </button>
            </div>

            <button
              type="submit"
              className="bg-dark-violet h-13 rounded-lg text-snow-white font-roboto mt-40 hover:bg-dark-violet-op-60 hover:cursor-pointer transition-colors duration-300 ease-in-out focus:bg-dark-violet"
            >
              Entrar
            </button>
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
