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

  function handleSelectedChange(selected: TSelected) {
    setSelected(selected);
  }

  function handleSearchTermChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setSearchTerm(value);
  }

  async function handleSearchBooks() {
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
  }

  return (
    <div>
      <Header
        searchTerm={searchTerm}
        selected={selected}
        onSearchTerm={handleSearchTermChange}
        onSelected={handleSelectedChange}
        onSearchBooks={handleSearchBooks}
      />

      <CardsContainer>
        {books.map((book) => (
          <Card key={book.id} book={book} />
        ))}
      </CardsContainer>
    </div>
  );
}
