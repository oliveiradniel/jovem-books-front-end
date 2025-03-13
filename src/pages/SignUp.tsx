import { ChangeEvent, useState } from 'react';

import { ZodError } from 'zod';

import { SignUpSchema } from './schemas/SignUpSchema';

import { FaUserSecret } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';

import Input from './components/Input';
import SessionTemplate from './components/SessionTemplate';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit() {
    try {
      const data = SignUpSchema.parse({
        username,
        firstName,
        lastName,
        email,
        password,
      });

      console.log(data);
    } catch (error) {
      if (error instanceof ZodError) {
        if (
          error.message.includes('The username must be at least 5 characters')
        ) {
          console.log('O nome de usuário precisa ter no mínimo 5 caracteres');
        }

        if (
          error.message.includes('The first name must be at least 5 characters')
        ) {
          console.log('O primeiro nome precisa ter no mínimo 5 caracteres');
        }

        if (
          error.message.includes('The last name must be at least 5 characters')
        ) {
          console.log('O último nome precisa ter no mínimo 5 caracteres');
        }

        if (error.message.includes('Enter a valid e-mail')) {
          console.log('Insira um e-mail válido');
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
      title="Criar uma nova conta"
      buttonLabel="Criar"
      highlightText="Com uma lista completa de livros da Google BOOKS, você pode criar
            sua própria lista de livros e controlar seu progresso de leitura."
      onSubmit={handleSubmit}
    >
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
        type="text"
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
    </SessionTemplate>
  );
}
