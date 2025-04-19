import reactDOM from 'react-dom';

import { useAuth } from '../../../app/hooks/useAuth.ts';

import useAnimatedUnmount from '../../../app/hooks/useAnimatedUnmount.ts';

import AuthService from '../../../app/services/AuthService.ts';

import { SignInSchema } from '../../../assets/schemas/UserSchema.ts';
import { handleSignInErrors } from '../errors/handleSignInErrors';

import { FaArrowLeftLong } from 'react-icons/fa6';

import SessionForm from './SessionForm.tsx';

import { TSignIn } from '../../../@types/User.ts';

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
        className={`font-quicksand text-light-gray animate-move-in-bottom-700 mx-5 max-w-xl text-center text-xl ${!isVisible && 'animate-return-to-top-700'}`}
      >
        <span className="text-sky-blue font-medium">{fullName}</span>, bem vindo
        ao <span className="text-snow-white">Jovem Books</span>. Entre agora
        usando as credenciais usadas no cadastro.
      </p>

      <div
        ref={animatedElementRef}
        className={`animate-move-in-top-700 flex max-w-xl min-w-md ${!isVisible && 'animate-return-to-bottom-700'}`}
      >
        <SessionForm
          type="registrationCompleted"
          validationSchema={SignInSchema}
          onSubmit={handleSubmit}
          handleErrors={handleSignInErrors}
        />
      </div>
    </div>,
    container
  );
}
