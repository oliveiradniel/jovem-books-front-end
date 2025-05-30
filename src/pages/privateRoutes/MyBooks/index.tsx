import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useQueryListBooks } from '../../../app/hooks/queries/book/useQueryListBooks';

import EmptyBooks from '../../../assets/images/empty-books.svg?react';
import ServerError from '../../../assets/images/server-error.svg?react';

import { IoMdAdd, IoMdRefresh } from 'react-icons/io';

import TableBooks from './components/TableBooks';
import Header from './components/Header';
import Spinner from '../../../components/Spinner';

import { TBookFilter } from '../../../@types/Book';

export default function MyBooks() {
  const navigate = useNavigate();

  const { booksList, isLoadingBooks, isRefetchingBooks, hasError, refetch } =
    useQueryListBooks();

  const [selectedFilter, setSelectedFilter] = useState<TBookFilter>('ALL');

  const filteredBooksByStatus = useMemo(
    () =>
      booksList.filter((book) => {
        if (selectedFilter === 'NOT_READING') {
          return book.read === null;
        }

        if (selectedFilter === 'ALL') {
          return true;
        }

        return book.read?.status === selectedFilter;
      }),
    [selectedFilter, booksList]
  );

  return (
    <div
      className={`flex-1 overflow-y-auto rounded-lg p-5 ${(isLoadingBooks || booksList.length === 0 || hasError) && 'flex items-center justify-center'}`}
    >
      {(isLoadingBooks || (isRefetchingBooks && booksList.length === 0)) && (
        <div className="animate-fade-in flex flex-col items-center justify-center gap-4">
          <Spinner />
          <p className="text-light-gray text-[1rem]">
            Carregando seus livros...
          </p>
        </div>
      )}

      {hasError && !isRefetchingBooks && (
        <div className="animate-fade-in flex flex-col items-center justify-center">
          <p className="text-light-gray font-quicksand text-center text-[clamp(0.8rem,2vw,1rem)]">
            Houve um erro ao carregar seus livros.
          </p>
          <ServerError className="mb-4 w-[30vw] lg:w-[20vw]" />

          <button
            onClick={() => refetch()}
            className="bg-blood-red font-roboto hover:bg-blood-red/90 cursor-pointer rounded-md px-6 py-2 text-white transition-colors duration-300 ease-in-out"
          >
            <span className="hidden sm:inline-flex">Tentar novamente</span>
            <IoMdRefresh className="sm:hidden" />
          </button>
        </div>
      )}

      {booksList.length === 0 &&
        !isLoadingBooks &&
        !isRefetchingBooks &&
        !hasError && (
          <div className="animate-fade-in flex flex-col items-center justify-center">
            <p className="text-light-gray font-quicksand text-center text-[clamp(0.8rem,2vw,1rem)]">
              Parece que você não tem nenhum livro cadastrado.
            </p>

            <EmptyBooks className="w-[30vw] lg:w-[20vw]" />

            <p className="text-light-gray font-quicksand mb-4 text-[clamp(0.8rem,2vw,1rem)]">
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
        )}

      {!isLoadingBooks && !hasError && booksList.length > 0 && (
        <>
          <Header
            selectedFilter={selectedFilter}
            numberOfBooks={booksList.length}
            numberOfFilteredBooks={filteredBooksByStatus.length}
            hasError={hasError}
            isLoadingBooks={isLoadingBooks}
            isRefetchingBooks={isRefetchingBooks}
            onChangeFilter={setSelectedFilter}
          />

          <div className="bg-navy-blue my-4 h-[0.1px] w-full" />

          <TableBooks
            filteredBooks={filteredBooksByStatus}
            selectedFilter={selectedFilter}
            isRefetching={isRefetchingBooks}
          />
        </>
      )}
    </div>
  );
}
