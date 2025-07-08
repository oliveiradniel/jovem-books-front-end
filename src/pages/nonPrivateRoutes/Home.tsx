import { useNavigate } from 'react-router-dom';

import Logo from '../../assets/icons/logo.svg?react';

import { FaArrowRightLong } from 'react-icons/fa6';
import { FiLogIn } from 'react-icons/fi';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-blue-black h-screen p-6 sm:p-12">
      <div className="flex h-12 items-center gap-4">
        <Logo className="h-10 w-10" />
        <p className="font-bebas-neue text-xl text-white">JOVEM BOOKS</p>
      </div>

      <div className="mt-16 flex h-[calc(100vh-184px)] flex-col justify-between sm:h-[calc(100vh-208px)]">
        <div>
          <h1 className="font-quicksand text-4xl font-semibold text-white md:text-5xl lg:max-w-[700px] lg:text-6xl">
            Controle o progresso da sua leitura
          </h1>

          <p className="font-roboto mt-8 text-xl text-white/80 md:text-2xl">
            Tenha um relatório completo sobre os livros que já leu.
          </p>
        </div>

        <div className="mt-16 flex flex-col justify-end gap-4 sm:flex-row">
          <button
            onClick={() => navigate('/sign-up')}
            className="font-roboto flex w-full cursor-pointer items-center justify-center gap-4 rounded-sm bg-white py-3 font-medium text-black transition-all duration-300 ease-in-out hover:scale-102 sm:max-w-[240px]"
          >
            Criar uma conta
            <FaArrowRightLong />
          </button>

          <button
            onClick={() => navigate('/sign-in')}
            className="font-roboto flex w-full cursor-pointer items-center justify-center gap-4 rounded-sm py-3 font-medium text-white transition-all duration-300 ease-in-out hover:scale-102 hover:text-white sm:max-w-[140px]"
          >
            Entrar
            <FiLogIn />
          </button>
        </div>
      </div>
    </div>
  );
}
