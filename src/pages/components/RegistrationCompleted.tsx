import React, { ChangeEvent, useState } from 'react';

import reactDOM from 'react-dom';

import useAnimatedUnmount from '../../hooks/useAnimatedUnmount.ts';

import { ZodError } from 'zod';
import { SignInSchema } from '../schemas/SignInSchema';

import { handleSignInErrors } from '../errors/handleSignInErrors';

import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FaArrowLeftLong } from 'react-icons/fa6';

import { ClipLoader } from 'react-spinners';

import Input from './Input';

interface RegistrationCompletedProps {
  isVisible: boolean;
  fullName: string;
  onClose: () => void;
}

export default function RegistrationCompleted({
  isVisible,
  fullName,
  onClose,
}: RegistrationCompletedProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { shouldRender, animatedElementRef } = useAnimatedUnmount(isVisible);

  if (!shouldRender) {
    return null;
  }

  const container = document.getElementById('success-root')!;

  const isFormValid = username.length > 0 && password.length > 0;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

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

  return reactDOM.createPortal(
    <div
      className={`animate-move-in-bottom-700 font-quicksand to-royal-blue absolute top-0 flex h-screen w-screen flex-col items-center justify-center gap-20 bg-linear-to-r from-black ${!isVisible && 'animate-return-to-top-700'}`}
    >
      <button
        type="button"
        onClick={onClose}
        className="flex items-center gap-2 transition-opacity duration-300 ease-in-out hover:cursor-pointer hover:opacity-60"
      >
        <FaArrowLeftLong className="text-snow-white" />
        <p className="text-snow-white font-roboto">Voltar</p>
      </button>

      <h1
        className={`text-snow-white animate-move-in-bottom-300 text-4xl font-medium ${!isVisible && 'animate-return-to-top-300'}`}
      >
        Cadastro concluído!
      </h1>

      <p
        className={`font-quicksand text-snow-white animate-move-in-bottom-700 max-w-xl text-center text-xl ${!isVisible && 'animate-return-to-top-700'}`}
      >
        <span className="text-sky-blue font-medium">{fullName}</span>, bem vindo
        ao Jovem Books. Entre agora usando as credenciais usadas no cadastro.
      </p>

      <form
        ref={animatedElementRef}
        onSubmit={handleSubmit}
        className={`animate-move-in-top-700 flex w-full max-w-md flex-col gap-4 ${!isVisible && 'animate-return-to-bottom-700'}`}
      >
        <Input
          theFieldIsEmpty={username.length > 0}
          Icon={FaUser}
          isDisabled={isSubmitting}
          disabled={isSubmitting}
          type="text"
          placeholder="Nome de usuário"
          value={username}
          autoFocus
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

        <button
          type="submit"
          disabled={!isFormValid}
          className={`bg-dark-violet text-snow-white font-roboto focus:bg-dark-violet disabled:bg-snow-white-op-70 bottom-0 mt-4 flex h-13 w-full items-center justify-center rounded-lg transition-colors duration-300 ease-in-out disabled:cursor-default ${isSubmitting ? 'hover:bg-dark-violet hover:cursor-default' : 'hover:bg-dark-violet-op-60 hover:cursor-pointer'}`}
        >
          {!isSubmitting && 'Entrar'}
          <ClipLoader color="#ffffff" size={20} loading={isSubmitting} />
        </button>
      </form>
    </div>,
    container
  );
}
