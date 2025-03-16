import React, { ChangeEvent, useState } from 'react';

import reactDOM from 'react-dom';

import useAnimatedUnmount from '../../hooks/useAnimatedUnmount.ts';

import { SignInSchema } from '../schemas/SignInSchema';

import { handleSignInErrors } from '../errors/handleSignInErrors';

import { FaArrowLeftLong } from 'react-icons/fa6';

import { ClipLoader } from 'react-spinners';

import { ErrorData } from '../types/ErrorData.ts';
import SignInFields from './SignInFields.tsx';
import { authService } from '../../app/services/authService.ts';

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

  const [errorsData, setErrorsData] = useState([] as ErrorData[]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { shouldRender, animatedElementRef } = useAnimatedUnmount(isVisible);

  if (!shouldRender) {
    return null;
  }

  const container = document.getElementById('success-root')!;

  const isFormValid = username.length > 0 && password.length > 0;

  function handleClose() {
    setUsername('');
    setPassword('');

    onClose();
  }

  function handleUsernameChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setErrorsData((prevState) =>
      prevState.filter(
        (error) =>
          error.fieldName !== 'credentials' && error.fieldName !== 'username'
      )
    );

    if (value.length === 0) {
      setErrorsData((prevState) => [
        ...prevState,
        {
          fieldName: 'username',
          message: 'O nome de usuário é obrigatório',
        },
      ]);
    }

    setUsername(value);
  }

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setErrorsData((prevState) =>
      prevState.filter(
        (error) =>
          error.fieldName !== 'credentials' && error.fieldName !== 'password'
      )
    );

    if (value.length === 0) {
      setErrorsData((prevState) => [
        ...prevState,
        {
          fieldName: 'password',
          message: 'A senha é obrigatória',
        },
      ]);
    }

    setPassword(value);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const credentials = SignInSchema.parse({ username, password });

      setIsSubmitting(true);

      await authService.signIn(credentials);

      // setUsername('');
      // setPassword('');

      setErrorsData([]);
    } catch (error) {
      const result = handleSignInErrors(error);
      if (result) {
        setErrorsData((prevState) => [...prevState, result]);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return reactDOM.createPortal(
    <div
      className={`animate-move-in-bottom-700 font-quicksand to-royal-blue absolute top-0 flex h-screen w-screen flex-col items-center gap-20 bg-linear-to-r from-black ${!isVisible && 'animate-return-to-top-700'}`}
    >
      <button
        type="button"
        onClick={handleClose}
        className="mt-20 flex items-center gap-2 transition-opacity duration-300 ease-in-out hover:cursor-pointer hover:opacity-60"
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
        <SignInFields
          username={username}
          password={password}
          isSubmitting={isSubmitting}
          errorsData={errorsData}
          onUsernameChange={handleUsernameChange}
          onPasswordChange={handlePasswordChange}
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
