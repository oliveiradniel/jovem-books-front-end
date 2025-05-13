import { useState } from 'react';

import { useDebounce } from '../../../app/hooks/useDebounce';

import { useQueryGetGoogleBooks } from '../../../app/hooks/queries/googleBooks/useQueryGetGoogleBooks';

import { TSelected } from './components/RadioButtons';
import Header from './components/Header';
import CardsContainer from './components/CardsContainer';
import Card from './components/Card';

export default function GoogleBooks() {
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [selected, setSelected] = useState<TSelected>('title');

  const { booksList, isLoadingBooks, isError } = useQueryGetGoogleBooks({
    searchTerm: debouncedSearchTerm,
    selected,
  });

  function handleSelectedChange(selected: TSelected) {
    setSelected(selected);
  }

  function handleSearchTermChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setSearchTerm(value);
  }

  return (
    <div>
      <Header
        searchTerm={searchTerm}
        selected={selected}
        onSearchTerm={handleSearchTermChange}
        onSelected={handleSelectedChange}
        isLoadingBooks={isLoadingBooks}
      />

      <CardsContainer
        books={booksList}
        searchTerm={searchTerm}
        selected={selected}
        noBookFound={!!booksList && debouncedSearchTerm.length > 0}
        isLoadingBooks={isLoadingBooks}
        isError={isError}
      >
        {booksList.map((book, index) => (
          <Card key={index} book={book} />
        ))}
      </CardsContainer>
    </div>
  );
}
