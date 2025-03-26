import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { books } from '../../assets/mocks/books';

import { Book as IBook } from '../../@types/Book';

import { GoArrowLeft } from 'react-icons/go';

export default function Book() {
  const [book, setBook] = useState<IBook>();

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    async function getBookById() {
      const dataBook = books.find((book) => book.id === Number(id));

      setBook(dataBook);
    }

    getBookById();
  }, [id]);

  return (
    <div>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="text-snow-white hover:text-snow-white-op-70 transition-colors duration-300 ease-in-out hover:cursor-pointer"
      >
        <GoArrowLeft size={20} />
      </button>

      <div className="mt-8 flex justify-between gap-4">
        <div className="max-w-[900px]">
          <h1 className="text-sky-blue font-roboto text-3xl font-thin">
            {book?.title}
          </h1>
          <h6 className="text-ocean-blue font-roboto mt-2 font-semibold">
            <span className="text-snow-white font-thin">Escrito por</span>{' '}
            {book?.author}
          </h6>

          <p className="text-snow-white-op-70 font-quicksand mt-8">
            {book?.sinopse}
          </p>

          <div>
            <button
              type="button"
              className="bg-sky-blue-op-80 text-snow-white font-roboto hover:bg-sky-blue-op-60 mt-10 rounded-lg px-3 py-2 text-sm font-semibold transition-colors duration-300 ease-in-out hover:cursor-pointer"
            >
              INICIAR LEITURA
            </button>
          </div>
        </div>

        <div className="hidden max-w-[240px] min-w-[240px] lg:flex">
          <img
            src={book?.imagePath}
            alt="Capa do Livro"
            className="h-auto w-[100%]"
          />
        </div>
      </div>
    </div>
  );
}
