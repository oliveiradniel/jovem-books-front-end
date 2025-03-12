import { ChangeEvent, useState } from 'react';

import { FaUserSecret } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';

import Input from './components/Input';
import Button from './components/Button';
import Navigation from './components/Navigation';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="to-royal-blue h-screen w-screen bg-linear-to-r from-black p-5">
      <div className="bg-navy-blue-op-40 flex h-full w-full justify-between gap-20 rounded-2xl p-5">
        <div className="relative max-w-md flex-1">
          <Navigation />

          <h1 className="text-snow-white font-quicksand mt-20 mb-8 text-4xl">
            Criar uma nova conta
          </h1>

          <form className="flex flex-col gap-4">
            <Input
              theFieldIsEmpty={username.length > 0}
              Icon={FaUserSecret}
              type="text"
              placeholder="Nome de usuário"
              value={username}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setUsername(event.target.value)
              }
            />

            <div className="flex gap-4">
              <Input
                theFieldIsEmpty={firstName.length > 0}
                Icon={FaUser}
                type="text"
                placeholder="Primeiro nome"
                value={firstName}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setFirstName(event.target.value)
                }
              />

              <Input
                theFieldIsEmpty={lastName.length > 0}
                Icon={FaUser}
                type="text"
                placeholder="Sobrenome"
                value={lastName}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setLastName(event.target.value)
                }
              />
            </div>

            <Input
              theFieldIsEmpty={email.length > 0}
              Icon={MdEmail}
              placeholder="E-mail"
              value={email}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setEmail(event.target.value)
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

            <Button label="Criar" />
          </form>
        </div>
        <div className="bg-dark-burgundy-op-80 hidden max-w-md flex-1 items-center justify-center rounded-lg p-6 sm:flex">
          <span className="text-light-gray font-bebas-neue text-center text-4xl">
            Com uma lista completa de livros da Google BOOKS, você pode criar
            sua própria lista de livros e controlar seu progresso de leitura.
          </span>
        </div>
      </div>
    </div>
  );
}
