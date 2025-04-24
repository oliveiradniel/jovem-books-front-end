import { useState } from 'react';

import GoogleBooksService from '../../../app/services/GoogleBooksService';

import { TSelected } from './components/RadioButtons';
import Header from './components/Header';
import CardsContainer from './components/CardsContainer';
import Card from './components/Card';

import { IBookAPI } from '../../../@types/Book';

export default function GoogleBooks() {
  const [books, setBooks] = useState([] as IBookAPI[]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState<TSelected>('title');

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  function handleSelectedChange(selected: TSelected) {
    setIsError(false);
    setSelected(selected);
  }

  function handleSearchTermChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setSearchTerm(value);
  }

  async function handleSearchBooks() {
    try {
      setIsLoading(true);
      setIsError(false);

      if (selected === 'title') {
        const books = await GoogleBooksService.getGoogleBookByTitle({
          title: searchTerm,
        });

        setBooks(books);
      } else {
        const books = await GoogleBooksService.getGoogleBookByAuthor({
          author: searchTerm,
        });

        setBooks(books);
      }
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

      <CardsContainer
        books={books}
        searchTerm={searchTerm}
        selected={selected}
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
