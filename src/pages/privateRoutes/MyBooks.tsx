import { useEffect, useState } from 'react';

import { truncateString } from '../../utils/truncateString';

import { books } from '../../assets/mocks/books';

import { IoBookSharp } from 'react-icons/io5';

import { BOOK_LITERARY_GENRE, READING_STATUS } from '../../constants/books';
import { MY_BOOKS_PAGES } from '../../constants/myBooksPages';

export default function MyBooks() {
  const [isTheScreenLargeSized, setIsTheScreenLargeSized] = useState(false);
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);

  const [page, setPage] = useState<
    'ALL' | 'NOT_READING' | 'READING' | 'FINISHED'
  >('ALL');

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 920 && isTheScreenLargeSized) {
        setIsTheScreenLargeSized(false);
      } else if (window.innerWidth > 920 && !isTheScreenLargeSized) {
        setIsTheScreenLargeSized(true);
      }
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isTheScreenLargeSized]);

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-quicksand text-snow-white text-2xl">Meus Livros</h1>
        <p className="font-quicksand text-snow-white text-xl font-bold">
          Bom dia!
        </p>
      </div>

      <div className="bg-blue-black-op-80 mt-3 p-5">
        <div className="flex justify-between">
          {isTheScreenLargeSized && (
            <>
              <div className="font-roboto flex gap-4 p-2">
                <button
                  type="button"
                  className="text-sky-blue flex items-center gap-1"
                >
                  <IoBookSharp />
                  <div className="bg-navy-blue-op-80 rounded-sm p-1 text-xs">
                    (23)
                  </div>
                </button>

                <button
                  type="button"
                  className="text-sky-blue flex items-center gap-1"
                >
                  <span>Não lidos</span>
                  <div className="bg-navy-blue-op-80 rounded-sm p-1 text-xs">
                    (4)
                  </div>
                </button>

                <button
                  type="button"
                  className="text-sky-blue flex items-center gap-1"
                >
                  <span>Em leitura</span>
                  <div className="bg-navy-blue-op-80 rounded-sm p-1 text-xs">
                    (2)
                  </div>
                </button>

                <button
                  type="button"
                  className="text-sky-blue flex items-center gap-1"
                >
                  <span>Concluídos</span>
                  <div className="bg-navy-blue-op-80 rounded-sm p-1 text-xs">
                    (9)
                  </div>
                </button>
              </div>
            </>
          )}

          {!isTheScreenLargeSized && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsNavigationOpen((prevState) => !prevState)}
                className={`bg-navy-blue text-sky-blue font-quicksand hover:bg-navy-blue-op-80 mb-2 flex w-[120px] justify-center rounded-lg p-2 text-sm transition-colors duration-300 ease-in-out hover:cursor-pointer ${isNavigationOpen && 'hover:bg-navy-blue!'}`}
              >
                {MY_BOOKS_PAGES[page]}
              </button>
              {isNavigationOpen && (
                <div className="font-roboto bg-navy-blue absolute flex w-[170px] flex-col gap-1 rounded-lg p-1">
                  <button
                    onClick={() => setPage('ALL')}
                    type="button"
                    className={`text-light-gray hover:bg-blue-black-op-80 flex items-center rounded-lg p-2 transition-colors duration-300 ease-in-out hover:cursor-pointer ${page === 'ALL' && 'text-sky-blue hover:bg-navy-blue hover:cursor-default!'}`}
                  >
                    <p className="font-quicksand text-sm">
                      Todos os livros
                      <span
                        className={`text-mate-gray ml-1 ${page === 'ALL' && 'text-sky-blue'}`}
                      >
                        (23)
                      </span>
                    </p>
                  </button>

                  <button
                    onClick={() => setPage('NOT_READING')}
                    type="button"
                    className={`text-light-gray hover:bg-blue-black-op-80 flex items-center rounded-lg p-2 transition-colors duration-300 ease-in-out hover:cursor-pointer ${page === 'NOT_READING' && 'text-sky-blue hover:bg-navy-blue hover:cursor-default!'}`}
                  >
                    <p className="font-quicksand text-sm">
                      Não lidos
                      <span
                        className={`text-mate-gray ml-1 ${page === 'NOT_READING' && 'text-sky-blue'}`}
                      >
                        (2)
                      </span>
                    </p>
                  </button>

                  <button
                    onClick={() => setPage('READING')}
                    type="button"
                    className={`text-light-gray hover:bg-blue-black-op-80 flex items-center rounded-lg p-2 transition-colors duration-300 ease-in-out hover:cursor-pointer ${page === 'READING' && 'text-sky-blue hover:bg-navy-blue hover:cursor-default!'}`}
                  >
                    <p className="font-quicksand text-sm">
                      Em leitura
                      <span
                        className={`text-mate-gray ml-1 ${page === 'READING' && 'text-sky-blue'}`}
                      >
                        (20)
                      </span>
                    </p>
                  </button>

                  <button
                    onClick={() => setPage('FINISHED')}
                    type="button"
                    className={`text-light-gray hover:bg-blue-black-op-80 flex items-center rounded-lg p-2 transition-colors duration-300 ease-in-out hover:cursor-pointer ${page === 'FINISHED' && 'text-sky-blue hover:bg-navy-blue hover:cursor-default!'}`}
                  >
                    <p className="font-quicksand text-sm">
                      Concluídos
                      <span
                        className={`text-mate-gray ml-1 ${page === 'FINISHED' && 'text-sky-blue'}`}
                      >
                        (9)
                      </span>
                    </p>
                  </button>
                </div>
              )}
            </div>
          )}

          <span className="text-mate-gray flex items-center">
            Total encontrado (10)
          </span>
        </div>

        <div className="bg-light-gray-op-40 mt-4 mb-4 h-[0.1px] w-full" />

        <div className="bg-navy-blue-op-80 text-mate-gray font-roboto flex justify-around rounded-lg p-2 font-bold">
          <span>Título</span>
          <span>Autores(as)</span>
          <span>Gênero Literário</span>
          <span>Status</span>
        </div>

        <div className="h-full overflow-auto">
          {books.map((book) => (
            <div
              key={book.id}
              className="text-mate-gray font-roboto flex justify-around border-b p-2 text-sm last:border-0"
            >
              <span className="w-20">{truncateString(book.title, 9)}</span>
              <span className="w-20 whitespace-nowrap">
                {truncateString(book.author, 9)}
              </span>
              <span className="w-20">
                {BOOK_LITERARY_GENRE[book.genreLiterary] || '-'}
              </span>
              <span
                className={`rounded-sm p-1 ${book.status === 'NOT_READING' && 'bg-blue-black'} ${book.status === 'READING' && 'bg-ocean-blue'} ${book.status === 'READING' && 'bg-blue-black'} ${book.status === 'FINISHED' && 'bg-sky-blue'} `}
              >
                {READING_STATUS[book.status]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
