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
  const { signIn } = useAuth();

  const { shouldRender, animatedElementRef } =
    useAnimatedUnmount<HTMLDivElement>(isVisible);

  if (!shouldRender) {
    return null;
  }

  const container = document.getElementById('success-root')!;

  function handleClose() {
    onClose();
  }

  async function handleSubmit(credentials: TSignIn) {
    const { accessToken } = await AuthService.signIn(credentials);

    signIn(accessToken);
  }

  return reactDOM.createPortal(
    <div
      className={`animate-move-in-bottom-700 font-quicksand absolute top-0 left-0 flex h-screen w-screen items-center justify-center bg-black/60 ${!isVisible && 'animate-return-to-top-700'}`}
    >
      <div className="bg-blue-black/10 flex h-[80%] w-[90%] flex-col items-center justify-center gap-8 rounded-2xl border border-white/10 backdrop-blur-md sm:w-[80%]">
        <button
          type="button"
          onClick={handleClose}
          className="mb-8 flex items-center gap-2 transition-opacity duration-300 ease-in-out hover:cursor-pointer hover:opacity-60"
        >
          <FaArrowLeftLong className="text-snow-white" />
          <p className="text-snow-white font-roboto">Voltar</p>
        </button>

        <h1
          className={`text-snow-white animate-move-in-bottom-300 text-[20px] font-medium sm:text-2xl lg:text-4xl ${!isVisible && 'animate-return-to-top-300'}`}
        >
          Cadastro concluído!
        </h1>

        <p
          className={`font-quicksand text-snow-white animate-move-in-bottom-700 sm:text-md max-w-xl text-center lg:text-xl ${!isVisible && 'animate-return-to-top-700'}`}
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
