import { useState } from 'react';

import Header from './components/Header';

import { Selected } from './components/RadioButtons';
import GoogleBooksService from '../../../app/services/GoogleBooksService';

export default function GoogleBooks() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState<Selected>('title');

  function handleSelectedChange(selected: Selected) {
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

      console.log(books);
    } else {
      const books = await GoogleBooksService.getGoogleBookByAuthor({
        author: searchTerm,
      });

      console.log(books);
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
    </div>
  );
}
