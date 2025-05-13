import { useMemo, useState } from 'react';

import { useQueryListBooks } from '../../../app/hooks/queries/book/useQueryListBooks';

import TableBooks from './components/TableBooks';
import Header from './components/Header';

import { TBookFilter } from '../../../@types/Book';

export default function MyBooks() {
  const { booksList, isLoadingBooks, isError, refetch } = useQueryListBooks();

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
    <div className="bg-blue-black/60 relative h-[580px] overflow-y-auto rounded-lg p-5">
      <Header
        selectedFilter={selectedFilter}
        numberOfBooks={booksList.length}
        numberOfFilteredBooks={filteredBooksByStatus.length}
        hasError={isError}
        isLoadingBooks={isLoadingBooks}
        onChangeFilter={setSelectedFilter}
      />

      <div className="bg-navy-blue my-4 h-[0.1px] w-full" />

      <TableBooks
        filteredBooks={filteredBooksByStatus}
        selectedFilter={selectedFilter}
        hasError={isError}
        isLoading={isLoadingBooks}
        onTryAgain={refetch}
      />
    </div>
  );
}
