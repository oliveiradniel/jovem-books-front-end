import { ChangeEvent, useState } from 'react';

import { ZodError } from 'zod';

import { SignUpSchema } from './schemas/SignUpSchema';

import { handleSignUpErrors } from './errors/handleSignUpErrors';

import { FaUserSecret } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';

import Input from './components/Input';
import SessionTemplate from './components/SessionTemplate';
import { sanitizeAndCapitalize } from '../utils/sanitizeAndCapitalize';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid =
    username.length > 0 &&
    firstName.length > 0 &&
    lastName.length > 0 &&
    email.length > 0 &&
    password.length > 0;

  function handleFirstNameChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setFirstName(sanitizeAndCapitalize(value));
  }

  function handleLastNameChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setLastName(sanitizeAndCapitalize(value));
  }

  async function handleSubmit() {
    try {
      const data = SignUpSchema.parse({
        username,
        firstName,
        lastName,
        email,
        password,
      });

      setIsSubmitting(true);

      await new Promise((resolve) => setTimeout(resolve, 4000));

      setIsSubmitting(false);

      console.log(data);
    } catch (error) {
      if (error instanceof ZodError) {
        handleSignUpErrors(error);
      }
    }
  }

  return (
    <SessionTemplate
      title="Criar uma nova conta"
      buttonLabel="Criar"
      highlightText="Com uma lista completa de livros da Google BOOKS, você pode criar
            sua própria lista de livros e controlar seu progresso de leitura."
      isFormValid={isFormValid}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
    >
      <Input
        theFieldIsEmpty={username.length > 0}
        Icon={FaUserSecret}
        isDisabled={isSubmitting}
        disabled={isSubmitting}
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
          isDisabled={isSubmitting}
          disabled={isSubmitting}
          type="text"
          placeholder="Primeiro nome"
          value={firstName}
          onChange={handleFirstNameChange}
        />

        <Input
          theFieldIsEmpty={lastName.length > 0}
          Icon={FaUser}
          isDisabled={isSubmitting}
          disabled={isSubmitting}
          type="text"
          placeholder="Sobrenome"
          value={lastName}
          autoCapitalize="on"
          onChange={handleLastNameChange}
        />
      </div>

      <Input
        theFieldIsEmpty={email.length > 0}
        Icon={MdEmail}
        isDisabled={isSubmitting}
        disabled={isSubmitting}
        type="email"
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
