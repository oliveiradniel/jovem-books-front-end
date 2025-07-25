import { useEffect, useState } from 'react';

import { useAuth } from '@/app/hooks/useAuth';
import { useDebounce } from '../../../app/hooks/useDebounce';
import { useSetDocumentTitle } from '@/app/hooks/useSetDocumentTitle';

import { useQueryGetGoogleBooks } from '../../../app/hooks/queries/googleBooks/useQueryGetGoogleBooks';

import { AxiosError } from 'axios';

import { emitToast } from '@/utils/emitToast';

import ServerErrorMessage from '../components/ServerErrorMessage';
import Header from './components/Header';
import BooksContainer from './components/BooksContainer';
import LoadingMessage from '../components/LoadingMessage';
import BookNotFoundMessage from './components/BookNotFoundMessage';
import WelcomeMessageToGoogleBooks from './components/WelcomeMessageToGoogleBooks';

import { TTypeOfSearch } from './components/RadioButtons';

export default function GoogleBooks() {
  useSetDocumentTitle({ title: 'Google Books' });

  const { signOut } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [selected, setSelected] = useState<TTypeOfSearch>('title');

  const { booksList, isLoadingBooks, googleBookError, hasError, tryAgain } =
    useQueryGetGoogleBooks({
      searchTerm: debouncedSearchTerm,
      selected,
    });

  function handleSelectedChange(selected: TTypeOfSearch) {
    setSelected(selected);
  }

  function handleSearchTermChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setSearchTerm(value);
  }

  useEffect(() => {
    if (googleBookError) {
      if (googleBookError instanceof AxiosError) {
        const errorMessage = googleBookError.response?.data.message as string;

        if (errorMessage && errorMessage.includes('Invalid access token')) {
          signOut();

          emitToast({
            type: 'error',
            message: 'Suas credenciais expiraram! Faça login novamente.',
          });
        }
      }
    }
  }, [signOut, googleBookError]);

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
        <LoadingMessage message="Buscando livros na Google Books..." />
      )}

      {hasError && !isLoadingBooks && (
        <ServerErrorMessage onTryAgain={tryAgain} />
      )}

      {!hasError &&
        !isLoadingBooks &&
        booksList.length === 0 &&
        debouncedSearchTerm.length > 0 && (
          <BookNotFoundMessage
            searchTerm={debouncedSearchTerm}
            selected={selected}
          />
        )}

      {!isLoadingBooks && !hasError && debouncedSearchTerm.length === 0 && (
        <WelcomeMessageToGoogleBooks />
      )}

      {!isLoadingBooks && booksList.length > 0 && (
        <BooksContainer books={booksList} />
      )}
    </div>
  );
}
