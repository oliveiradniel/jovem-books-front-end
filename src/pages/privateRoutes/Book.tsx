import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { books } from '../../assets/mocks/books';

import { Book as IBook } from '../../@types/Book';

import { GoArrowLeft } from 'react-icons/go';
import { GrInProgress } from 'react-icons/gr';

export default function Book() {
  const [book, setBook] = useState<IBook>({} as IBook);

  const { id } = useParams();

  const navigate = useNavigate();

  function handleWithTheBeginninOfReading() {
    const newBook = { ...book, status: 'READING' };

    setBook(newBook as IBook);
  }

  useEffect(() => {
    async function getBookById() {
      const dataBook = books.find((book) => book.id === Number(id));

      setBook(dataBook as IBook);
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
              disabled={book.status !== 'NOT_READING'}
              onClick={handleWithTheBeginninOfReading}
              className="hover:bg-navy-blue-op-80 border-navy-blue text-snow-white font-roboto bg-navy-blue disabled:bg-navy-blue-op-40 disabled:border-navy-blue-op-80 hover:border-navy-blue-op-80 mt-10 flex h-10 w-[140px] items-center justify-center rounded-lg border px-3 py-2 text-sm font-semibold transition-colors duration-300 ease-in-out hover:cursor-pointer disabled:cursor-default"
            >
              {book.status === 'NOT_READING' && 'INICIAR LEITURA'}
              {book.status === 'READING' && (
                <p className="flex items-center justify-center gap-2">
                  <GrInProgress /> EM LEITURA
                </p>
              )}
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

      {book.status === 'READING' && (
        <div className="bg-navy-blue-op-80 text-snow-white-op-70 font-quicksand animate-fade-in-500 mt-5 rounded-lg px-4 py-2">
          <p className="flex gap-2">
            Leitura iniciada em:{' '}
            <span className="text-light-gray font-semibold">
              24 de dezembro de 2024
            </span>
          </p>
          <p className="flex gap-2">
            Total de páginas:{' '}
            <span className="text-light-gray font-semibold">
              <p> 302</p>
            </span>
          </p>
          <p className="flex gap-2">
            <p>Página atual: </p>{' '}
            <span className="text-light-gray font-semibold">225</span>
          </p>
        </div>
      )}
    </div>
  );
}
