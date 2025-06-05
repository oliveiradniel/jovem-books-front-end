import { useNavigate } from 'react-router-dom';

import Logo from '../../assets/icons/logo.svg?react';

import { FaArrowRightLong } from 'react-icons/fa6';
import { FiLogIn } from 'react-icons/fi';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="to-sky-blue min-h-screen w-screen bg-linear-to-r from-black">
      <div className="h-full p-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo className="h-10 w-10" />
            <p className="font-bebas-neue text-xl text-white">JOVEM BOOKS</p>
          </div>
        </div>

        <h1 className="text-snow-white font-quicksand mt-[10.5rem] text-[2rem] sm:text-[2.5rem] md:text-[3rem]">
          Controle o progresso da sua leitura
        </h1>

        <p className="text-light-gray/80 font-roboto mt-32 mb-10 text-base">
          Tenha um relatório completo sobre os livros que já leu.
        </p>

        <div className="flex flex-col space-y-2 sm:flex-row sm:gap-2 sm:space-y-0">
          <button
            onClick={() => navigate('/sign-up')}
            className="font-roboto flex w-[240px] cursor-pointer items-center justify-center gap-4 rounded-sm border border-transparent bg-white py-2 font-medium text-black transition-all duration-300 ease-in-out hover:scale-102 hover:border-transparent hover:border-white hover:bg-transparent hover:text-white"
          >
            Criar uma conta
            <FaArrowRightLong />
          </button>

          <button
            onClick={() => navigate('/sign-in')}
            className="font-roboto border-snow-white hover:bg-snow-white flex w-[240px] cursor-pointer items-center justify-center gap-4 rounded-sm border py-2 font-medium text-white transition-all duration-300 ease-in-out hover:scale-102 hover:border-transparent hover:text-black hover:opacity-80"
          >
            Entrar
            <FiLogIn />
          </button>
        </div>
      </div>
    </div>
  );
}
