import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import GoogleBooksService, {
  TGoogleBookSearchParams,
} from '../../../app/services/GoogleBooksService';

import { TSelected } from './components/RadioButtons';
import Header from './components/Header';
import CardsContainer from './components/CardsContainer';
import Card from './components/Card';
import Pagination from './components/Pagination';

import { IGoogleBookAPI } from '../../../@types/Book';

export default function GoogleBooks() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [books, setBooks] = useState<IGoogleBookAPI[]>([]);

  const [noBookFound, setNoBookFound] = useState(false);

  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get('page')) || 1
  );
  const [searchTerm, setSearchTerm] = useState('');
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

    if (value.length === 0) {
      setBooks([]);
    }

    setSearchTerm(value);
  }

  function handlePageIncrement() {
    const nextPage = currentPage + 1;

    setCurrentPage(nextPage);
    setSearchParams({ page: nextPage.toString() });
  }

  function handlePageDecrement() {
    if (currentPage === 1) return;

    const prevPage = currentPage - 1;

    setCurrentPage(prevPage);
    setSearchParams({ page: prevPage.toString() });
  }

  const handleSearchBooks = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    setNoBookFound(false);

    try {
      const params: TGoogleBookSearchParams =
        selected === 'title'
          ? {
              page: Number(searchParams.get('page')) || 1,
              title: searchTerm.toString(),
            }
          : {
              page: Number(searchParams.get('page')) || 1,
              author: searchParams.toString(),
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
  }, [searchTerm, selected, searchParams]);

  useEffect(() => {
    const page = Number(searchParams.get('page'));

    if (searchTerm.trim().length === 0 || page > 6) return;

    handleSearchBooks();
  }, [handleSearchBooks, searchTerm, searchParams]);

  useEffect(() => {
    const page = searchParams.get('page');

    if (!page || Number(page) > 6) {
      setBooks([]);
      setCurrentPage(0);
      setSearchParams({ page: '0' });
    }
  }, [searchParams, setSearchParams]);

  return (
    <div>
      <Header
        searchTerm={searchTerm}
        selected={selected}
        onSearchTerm={handleSearchTermChange}
        onSelected={handleSelectedChange}
        onSearchBooks={handleSearchBooks}
        isLoadingBooks={isLoading}
      />

      {books.length > 0 && (
        <Pagination
          currentPage={currentPage}
          onIncrement={handlePageIncrement}
          onDecrement={handlePageDecrement}
        />
      )}

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
