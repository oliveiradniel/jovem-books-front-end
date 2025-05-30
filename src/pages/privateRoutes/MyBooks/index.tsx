import { useMemo, useState } from 'react';

import { useQueryListBooks } from '../../../app/hooks/queries/book/useQueryListBooks';

import TableBooks from './components/TableBooks';
import Header from './components/Header';
import LoadingMessage from '../components/LoadingMessage';
import ServerErrorMessage from '../components/ServerErrorMessage';
import EmptyBooks from './components/EmptyBooks';

import { TBookFilter } from '../../../@types/Book';

export default function MyBooks() {
  const { booksList, isLoadingBooks, isRefetchingBooks, hasError, tryAgain } =
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
        <LoadingMessage message="Carregando seus livros..." />
      )}

      {hasError && !isRefetchingBooks && (
        <ServerErrorMessage onTryAgain={tryAgain} />
      )}

      {booksList.length === 0 &&
        !isLoadingBooks &&
        !isRefetchingBooks &&
        !hasError && <EmptyBooks />}

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
