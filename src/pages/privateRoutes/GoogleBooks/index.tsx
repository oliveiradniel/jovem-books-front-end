import { useCallback, useEffect, useState } from 'react';

import { useDebounce } from '../../../app/hooks/useDebounce';

import GoogleBooksService, {
  TGoogleBookSearchParams,
} from '../../../app/services/GoogleBooksService';

import { TSelected } from './components/RadioButtons';
import Header from './components/Header';
import CardsContainer from './components/CardsContainer';
import Card from './components/Card';

import { IGoogleBookAPI } from '../../../@types/Book';

export default function GoogleBooks() {
  const [books, setBooks] = useState<IGoogleBookAPI[]>([]);

  const [noBookFound, setNoBookFound] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [selected, setSelected] = useState<TSelected>('title');

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  function handleSelectedChange(selected: TSelected) {
    setIsError(false);
    setNoBookFound(false);
    setSelected(selected);
  }

  function handleSearchTermChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setNoBookFound(false);
    setIsError(false);

    setSearchTerm(value);
  }

  const handleSearchBooks = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    setNoBookFound(false);

    try {
      const params: TGoogleBookSearchParams =
        selected === 'title'
          ? {
              title: debouncedSearchTerm.toString(),
            }
          : {
              author: debouncedSearchTerm.toString(),
            };

      const googleBooks = await GoogleBooksService.searchGoogleBooks(params);

      if (!googleBooks || googleBooks.totalItems === 0) {
        setBooks([]);
        setNoBookFound(true);
        return;
      }

      setBooks(googleBooks.data);
    } catch {
      setBooks([]);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearchTerm, selected]);

  useEffect(() => {
    if (!debouncedSearchTerm.trim()) return;

    handleSearchBooks();
  }, [debouncedSearchTerm, handleSearchBooks]);

  return (
    <div>
      <Header
        searchTerm={searchTerm}
        selected={selected}
        onSearchTerm={handleSearchTermChange}
        onSelected={handleSelectedChange}
        isLoadingBooks={isLoading}
      />

      <CardsContainer
        books={books}
        searchTerm={searchTerm}
        selected={selected}
        noBookFound={noBookFound}
        isLoadingBooks={isLoading}
        isError={isError}
      >
        {books.map((book, index) => (
          <Card key={index} book={book} />
        ))}
      </CardsContainer>
    </div>
  );
}
