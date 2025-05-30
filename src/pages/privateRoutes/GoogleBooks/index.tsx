import { useState } from 'react';

import { useDebounce } from '../../../app/hooks/useDebounce';

import { useQueryGetGoogleBooks } from '../../../app/hooks/queries/googleBooks/useQueryGetGoogleBooks';

import GirlStudying from '../../../assets/images/girl-studying.svg?react';
import BoyStudying from '../../../assets/images/boy-studying.svg?react';
import GoogleBooksIcon from '../../../assets/icons/google-books.svg?react';
import ErrorInBooks from '../../../assets/images/error-in-books.svg?react';

import Header from './components/Header';
import BooksContainer from './components/BooksContainer';
import Spinner from '../../../components/Spinner';

import { TSelected } from './components/RadioButtons';
import { IoMdRefresh } from 'react-icons/io';

export default function GoogleBooks() {
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [selected, setSelected] = useState<TSelected>('title');

  const { booksList, isLoadingBooks, hasError, tryAgain } =
    useQueryGetGoogleBooks({
      searchTerm: debouncedSearchTerm,
      selected,
    });

  const notFoundBookText =
    selected === 'title'
      ? 'Não foi possível encontrar o(s) livro(s) de títutlo '
      : 'Não foi possível encontrar o(s) livro(s) do autor ';

  function handleSelectedChange(selected: TSelected) {
    setSelected(selected);
  }

  function handleSearchTermChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setSearchTerm(value);
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col space-y-6 overflow-hidden">
      <Header
        searchTerm={searchTerm}
        selected={selected}
        onSearchTerm={handleSearchTermChange}
        onSelected={handleSelectedChange}
        isLoadingBooks={isLoadingBooks}
      />

      {isLoadingBooks && (
        <div className="animate-fade-in flex min-h-0 flex-1 flex-col items-center justify-center gap-4">
          <Spinner />
          <p className="text-light-gray text-[1rem]">
            Buscando livros na Google Books...
          </p>
        </div>
      )}

      {hasError && !isLoadingBooks && (
        <div className="animate-fade-in flex min-h-full flex-1 flex-col items-center justify-center">
          <p className="text-snow-white font-quicksand text-center text-[clamp(0.8rem,2vw,1rem)]">
            Houve um erro ao buscar os livros na Google Books.
          </p>
          <ErrorInBooks className="mb-4 w-[30vw] lg:w-[20vw]" />

          <button
            onClick={() => tryAgain()}
            className="bg-blood-red font-roboto hover:bg-blood-red/90 cursor-pointer rounded-md px-6 py-2 text-white transition-colors duration-300 ease-in-out"
          >
            <span className="hidden sm:inline-flex">Tentar novamente</span>
            <IoMdRefresh className="sm:hidden" />
          </button>
        </div>
      )}

      {!hasError &&
        !isLoadingBooks &&
        booksList.length === 0 &&
        debouncedSearchTerm.length > 0 && (
          <div className="animate-fade-in flex min-h-full flex-1 flex-col items-center justify-center gap-4">
            <p className="text-snow-white font-quicksand text-center text-[clamp(0.8rem,2vw,1rem)]">
              {notFoundBookText}{' '}
              <span className="text-sky-blue font-semibold">
                "{debouncedSearchTerm}"
              </span>
            </p>
            <BoyStudying className="mb-4 w-[30vw] lg:w-[20vw]" />
          </div>
        )}

      {!isLoadingBooks && !hasError && debouncedSearchTerm.length === 0 && (
        <div className="animate-fade-in flex min-h-full flex-1 flex-col items-center justify-center">
          <div className="flex items-center">
            <h1 className="text-snow-white font-bebas-neue text-center text-6xl text-[clamp(0.8rem,4vw,3rem)]">
              Bem vindo a google books!
            </h1>
            <GoogleBooksIcon className="hidden h-14 w-14 lg:inline-flex" />
          </div>

          <p className="text-snow-white font-quicksand mt-2 text-center text-[clamp(0.8rem,2vw,1rem)]">
            Aqui você pode facilitar seu cadastro utilizando essa integração
            para preencher os dados dos seus livros e iniciar sua leitura com
            mais praticidade.
          </p>

          <GirlStudying className="mt-8 w-[30vw] lg:w-[20vw]" />
        </div>
      )}

      {!isLoadingBooks && booksList.length > 0 && (
        <BooksContainer books={booksList} />
      )}
    </div>
  );
}
