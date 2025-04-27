import { useState } from 'react';

import GoogleBooksService from '../../../app/services/GoogleBooksService';

import { TSelected } from './components/RadioButtons';
import Header from './components/Header';
import CardsContainer from './components/CardsContainer';
import Card from './components/Card';
import Pagination from './components/Pagination';

import { IGoogleBookAPI } from '../../../@types/Book';

export default function GoogleBooks() {
  const [books, setBooks] = useState<IGoogleBookAPI[]>([]);

  const [noBookFound, setNoBookFound] = useState(false);

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

    setSearchTerm(value);
  }

  async function handleSearchBooks() {
    try {
      setIsLoading(true);
      setIsError(false);

      let googleBooks;

      if (selected === 'title') {
        googleBooks = await GoogleBooksService.getGoogleBookByTitle({
          title: searchTerm,
        });
      } else {
        googleBooks = await GoogleBooksService.getGoogleBookByAuthor({
          author: searchTerm,
        });
      }

      if (googleBooks.totalItems === 0) {
        return setNoBookFound(true);
      }

      setBooks(googleBooks.data);
    } catch {
      setBooks([]);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

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

      {books.length > 0 && <Pagination />}

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
