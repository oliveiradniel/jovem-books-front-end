import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { books } from '../../assets/mocks/books';

import { Book as IBook, ReadingStatus } from '../../@types/Book';

import { GoArrowLeft } from 'react-icons/go';
import { GrInProgress } from 'react-icons/gr';
import { IoPauseOutline, IoPlayOutline } from 'react-icons/io5';
import { FaStopwatch } from 'react-icons/fa';
import { BsFillBookmarkCheckFill } from 'react-icons/bs';

export default function Book() {
  const [book, setBook] = useState<IBook>({} as IBook);

  const { id } = useParams();

  const navigate = useNavigate();

  const isReading = book.status === 'READING' || book.status === 'ON_HOLD';

  function handleChangeBookStatus(status: ReadingStatus) {
    let newBook = { ...book, status };

    const date = new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    if (status === 'READING') {
      newBook = { ...newBook, createdAt: date };
    }

    if (status === 'FINISHED') {
      newBook = { ...newBook, updatedAt: date };
    }

    setBook(newBook as IBook);
  }

  function handlePauseOrContinuationReading() {
    if (book.status === 'READING') {
      handleChangeBookStatus('ON_HOLD');
    } else if (book.status === 'ON_HOLD') {
      handleChangeBookStatus('READING');
    }
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

          <div className="flex gap-2">
            <button
              type="button"
              disabled={book.status !== 'NOT_READING'}
              onClick={() => handleChangeBookStatus('READING')}
              className="hover:bg-navy-blue-op-80 border-navy-blue text-snow-white font-roboto bg-navy-blue disabled:bg-navy-blue-op-40 disabled:border-navy-blue-op-80 hover:border-navy-blue-op-80 mt-10 flex h-10 w-[140px] items-center justify-center rounded-lg border px-3 py-2 text-sm font-semibold transition-colors duration-300 ease-in-out hover:cursor-pointer disabled:cursor-default"
            >
              {book.status === 'NOT_READING' && 'INICIAR LEITURA'}
              {book.status === 'READING' && (
                <p className="animate-fade-in flex items-center justify-center gap-2">
                  <GrInProgress /> EM LEITURA
                </p>
              )}
              {book.status === 'ON_HOLD' && (
                <p className="animate-fade-in flex items-center justify-center gap-2">
                  <FaStopwatch /> EM PAUSA
                </p>
              )}
              {book.status === 'FINISHED' && (
                <p className="animate-fade-in text-sky-blue flex items-center justify-center gap-2">
                  <BsFillBookmarkCheckFill />
                  CONCLUÍDO
                </p>
              )}
            </button>

            {isReading && (
              <>
                <button
                  type="button"
                  onClick={handlePauseOrContinuationReading}
                  className="animate-fade-in-500 hover:bg-navy-blue-op-80 border-navy-blue text-snow-white font-roboto bg-navy-blue hover:border-navy-blue-op-80 mt-10 flex h-10 w-[140px] items-center justify-center rounded-lg border-2 px-3 py-2 text-sm font-semibold transition-colors duration-300 ease-in-out hover:cursor-pointer"
                >
                  <p className="flex items-center justify-center gap-2">
                    {book.status === 'READING' && <IoPauseOutline size={20} />}

                    {book.status === 'ON_HOLD' && <IoPlayOutline size={20} />}
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => handleChangeBookStatus('FINISHED')}
                  className="animate-fade-in-500 hover:bg-stormy-blue-op-80 text-snow-white font-roboto bg-stormy-blue mt-10 flex h-10 w-[140px] items-center justify-center rounded-lg px-3 py-2 text-sm font-semibold transition-colors duration-300 ease-in-out hover:cursor-pointer"
                >
                  <p className="flex items-center justify-center gap-2">
                    FINALIZAR LIVRO
                  </p>
                </button>
              </>
            )}
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

      {book.status !== 'NOT_READING' && (
        <div className="bg-navy-blue-op-80 text-snow-white-op-70 font-quicksand animate-fade-in-500 mt-5 rounded-lg px-4 py-2 text-sm">
          <p className="flex gap-2">
            Leitura {isReading ? 'iniciada' : 'concluída'} em:{' '}
            <span className="text-light-gray font-semibold">
              {isReading && book.createdAt}
              {book.status === 'FINISHED' && book.updatedAt}
            </span>
          </p>
          <p className="flex gap-2">
            Total de páginas:{' '}
            <span className="text-light-gray font-semibold">
              <p>{book.numberOfPages}</p>
            </span>
          </p>
          {isReading && (
            <p className="flex gap-2">
              <p>Página atual: </p>{' '}
              <span className="text-light-gray font-semibold">
                {book.currentPage}
              </span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
