import { useEffect, useMemo, useState } from 'react';

import BooksService from '../../../app/services/BooksService';

import TableBooks from './components/TableBooks';
import Header from './components/Header';

import { IBookAPIResponse } from '../../../@types/Book';
import { Page } from './@types/Page';

export default function MyBooks() {
  const [books, setBooks] = useState<IBookAPIResponse[]>([]);
  const [page, setPage] = useState<Page>('ALL');

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const filteredBooksByStatus = useMemo(
    () =>
      books.filter((book) => {
        if (page === 'NOT_READING') {
          return !book.read;
        }

        if (page === 'ALL') {
          return books;
        }

        return book.read?.status === page;
      }),
    [page, books]
  );

  async function loadBooks() {
    try {
      setIsError(false);
      setIsLoading(true);

      const booksList = await BooksService.listBooks();

      setBooks(booksList);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadBooks();
  }, []);

  return (
    <div className="h-full">
      <div className="bg-blue-black-op-80 min-h-[600px] rounded-lg p-5">
        <Header
          page={page}
          numberOfBooks={books.length}
          numberOfFilteredBooks={filteredBooksByStatus.length}
          isLoading={isLoading}
          isError={isError}
          onChangePage={setPage}
        />

        <div className="bg-navy-blue my-4 h-[0.1px] w-full" />

        <TableBooks
          books={books}
          onLoadBooks={loadBooks}
          filteredBooks={filteredBooksByStatus}
          page={page}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
    </div>
  );
}
