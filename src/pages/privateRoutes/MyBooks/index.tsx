import { useCallback, useEffect, useState } from 'react';

import { books as dataBooks } from '../../../assets/mocks/books';

import { Book } from '../../../@types/Book';
import { Page } from './@types/Page';

import LargeOptionsMenu from './components/LargeOptionsMenu';
import Select from './components/Select';
import TableBooks from './components/TableBooks';

export default function MyBooks() {
  const [isTheScreenLargeSized, setIsTheScreenLargeSized] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState<Page>('ALL');

  const handleGetAllBooks = useCallback(async () => {
    try {
      setIsLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 3000));

      setBooks(dataBooks);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  function handleWithUnreadBooksFiltration() {
    const filteredBooks = dataBooks.filter(
      (book) => book.status === 'NOT_READING'
    );

    setBooks(filteredBooks);
  }

  function handleWithFilteringBooksInReading() {
    const filteredBooks = dataBooks.filter((book) => book.status === 'READING');

    setBooks(filteredBooks);
  }

  function handleFilteringCompletedBooks() {
    const filteredBooks = dataBooks.filter(
      (book) => book.status === 'FINISHED'
    );

    setBooks(filteredBooks);
  }

  useEffect(() => {
    switch (page) {
      case 'NOT_READING': {
        handleWithUnreadBooksFiltration();
        break;
      }
      case 'READING': {
        handleWithFilteringBooksInReading();
        break;
      }
      case 'FINISHED': {
        handleFilteringCompletedBooks();
        break;
      }
      default: {
        setBooks(dataBooks);
      }
    }
  }, [handleGetAllBooks, page]);

  useEffect(() => {
    handleGetAllBooks();
  }, [handleGetAllBooks]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1024 && isTheScreenLargeSized) {
        setIsTheScreenLargeSized(false);
      } else if (window.innerWidth > 1024 && !isTheScreenLargeSized) {
        setIsTheScreenLargeSized(true);
      }
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isTheScreenLargeSized]);

  return (
    <div className="h-full">
      <div className="mb-3 flex justify-between">
        <h1 className="font-quicksand text-snow-white text-2xl">Meus Livros</h1>
        <p className="font-quicksand text-snow-white text-xl font-bold">
          Bom dia!
        </p>
      </div>

      <div className="bg-blue-black-op-80 min-h-[600px] p-5">
        <div className="flex h-[40px] justify-between">
          {isTheScreenLargeSized ? (
            <LargeOptionsMenu />
          ) : (
            <Select page={page} onPage={(page: Page) => setPage(page)} />
          )}

          <span className="text-mate-gray animate-fade-in flex items-center">
            {isLoading ? (
              <span>Carregando...</span>
            ) : (
              <span className="animate-fade-in">
                Total encontrado ({books.length})
              </span>
            )}
          </span>
        </div>

        <div className="bg-light-gray-op-40 my-4 h-[0.1px] w-full" />

        <TableBooks books={books} isLoading={isLoading} />
      </div>
    </div>
  );
}
