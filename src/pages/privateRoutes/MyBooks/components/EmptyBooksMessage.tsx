import { useNavigate } from 'react-router-dom';

import { IoMdAdd } from 'react-icons/io';

import EmptyBooks from '../../../../assets/images/empty-books.svg?react';

export default function EmptyBooksMessage() {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in flex flex-col items-center justify-center">
      <p className="text-snow-white font-quicksand text-center text-[clamp(0.8rem,2vw,1rem)]">
        Parece que você não tem nenhum livro cadastrado.
      </p>

      <EmptyBooks className="w-[30vw] min-w-[16rem] lg:w-[20vw]" />

      <p className="text-snow-white font-quicksand mb-4 text-center text-[clamp(0.8rem,1.6vw,0.9rem)]">
        Clique no botão abaixo para adicionar.
      </p>

      <button
        onClick={() => navigate('/new-book')}
        className="bg-sky-blue font-roboto hover:bg-sky-blue/80 cursor-pointer rounded-md px-6 py-2 text-white transition-colors duration-300 ease-in-out"
      >
        <span className="hidden sm:inline-flex">Adicionar livro</span>
        <IoMdAdd className="sm:hidden" />
      </button>
    </div>
  );
}
