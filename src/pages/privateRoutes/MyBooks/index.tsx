import { useEffect, useMemo, useState } from 'react';

import { useAuth } from '@/app/hooks/useAuth';

import { useQueryListBooks } from '../../../app/hooks/queries/book/useQueryListBooks';

import { emitToast } from '@/utils/emitToast';

import TableBooks from './components/TableBooks';
import Header from './components/Header';
import LoadingMessage from '../components/LoadingMessage';
import ServerErrorMessage from '../components/ServerErrorMessage';
import EmptyBooksMessage from './components/EmptyBooksMessage';

import { TBookFilter } from '../../../@types/Book';
import { AxiosError } from 'axios';

export default function MyBooks() {
  const { signOut } = useAuth();

  const {
    booksList,
    isLoadingBooks,
    isRefetchingBooks,
    bookError,
    hasError,
    tryAgain,
  } = useQueryListBooks();

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

  useEffect(() => {
    if (bookError) {
      if (bookError instanceof AxiosError) {
        const errorMessage = bookError.response?.data.message as string;

        if (errorMessage && errorMessage.includes('Invalid access token')) {
          signOut();

          emitToast({
            type: 'error',
            message: 'Suas credenciais expiraram! Faça login novamente.',
          });
        }
      }
    }
  }, [signOut, bookError]);

  return (
    <div
      className={`flex-1 overflow-y-auto rounded-lg py-5 ${(isLoadingBooks || booksList.length === 0 || hasError) && 'flex items-center justify-center'}`}
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
        !hasError && <EmptyBooksMessage />}

      {!isLoadingBooks && !hasError && booksList.length > 0 && (
        <div className="h-full space-y-4 overflow-hidden">
          <Header
            selectedFilter={selectedFilter}
            numberOfFilteredBooks={filteredBooksByStatus.length}
            isRefetchingBooks={isRefetchingBooks}
            onChangeFilter={setSelectedFilter}
          />

          <TableBooks
            filteredBooks={filteredBooksByStatus}
            selectedFilter={selectedFilter}
            isRefetching={isRefetchingBooks}
          />
        </div>
      )}
    </div>
  );
}
