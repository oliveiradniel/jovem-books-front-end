import { useRef } from 'react';
import reactDOM from 'react-dom';

import { useAuth } from '../../../app/hooks/useAuth.ts';

import useAnimatedUnmount from '../../../app/hooks/useAnimatedUnmount.ts';

import AuthService from '../../../app/services/AuthService.ts';

import { SignInSchema } from '../../../assets/schemas/UserSchema.ts';

import { FaArrowLeftLong } from 'react-icons/fa6';

import SessionForm from './SessionForm.tsx';

import { TSignIn } from '../../../@types/User.ts';
import { handleSignInErrors } from '../../../app/handleErrors/handleSignInErrors.ts';

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
  const controllerRef = useRef<AbortController | null>(null);

  const { signIn } = useAuth();

  const { shouldRender, animatedElementRef } =
    useAnimatedUnmount<HTMLDivElement>(isVisible);

  if (!shouldRender) {
    return null;
  }

  const container = document.getElementById('success-root')!;

  function handleClose() {
    onClose();

    if (controllerRef.current) {
      controllerRef.current.abort();
    }
  }

  async function handleSubmit(credentials: TSignIn) {
    controllerRef.current = new AbortController();

    const { accessToken } = await AuthService.signIn({
      credentials,
      signal: controllerRef.current?.signal as AbortSignal,
    });

    signIn(accessToken);
  }

  return reactDOM.createPortal(
    <div
      className={`animate-move-in-bottom-700 font-quicksand absolute top-0 left-0 flex h-screen w-screen items-center justify-center bg-black/60 ${!isVisible && 'animate-return-to-top-700'}`}
    >
      <div className="bg-blue-black/30 flex h-[80%] w-[90%] flex-col items-center justify-center gap-8 rounded-2xl border border-white/10 backdrop-blur-[8px] sm:w-[80%]">
        <button
          type="button"
          onClick={handleClose}
          className="mb-8 flex items-center gap-2 transition-opacity duration-300 ease-in-out hover:cursor-pointer hover:opacity-60"
        >
          <FaArrowLeftLong className="text-white" />
          <p className="font-roboto text-white">Voltar</p>
        </button>

        <h1
          className={`animate-move-in-bottom-300 text-xl font-medium text-white sm:text-2xl lg:text-4xl ${!isVisible && 'animate-return-to-top-300'}`}
        >
          Cadastro concluído!
        </h1>

        <p
          className={`font-quicksand animate-move-in-bottom-700 sm:text-md max-w-xl px-5 text-center text-white lg:text-xl ${!isVisible && 'animate-return-to-top-700'}`}
        >
          <span className="text-sky-blue font-medium">{fullName}</span>, bem
          vindo ao <span className="font-bold">Jovem Books</span>. Entre agora
          usando as credenciais usadas no cadastro.
        </p>

        <div
          ref={animatedElementRef}
          className={`animate-move-in-top-700 mt-4 flex w-full max-w-xl px-5 ${!isVisible && 'animate-return-to-bottom-700'}`}
        >
          <SessionForm
            type="registrationCompleted"
            validationSchema={SignInSchema}
            onSubmit={handleSubmit}
            handleErrors={handleSignInErrors}
          />
        </div>
      </div>
    </div>,
    container
  );
}
