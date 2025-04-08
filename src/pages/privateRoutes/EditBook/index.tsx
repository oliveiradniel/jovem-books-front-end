import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { GoArrowLeft } from 'react-icons/go';

import SectionToEditBookCover from './components/SectionToEditBookCover';
import SectionToEditBook from './components/SectionToEditBook';

export default function EditBook() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [book, setBook] = useState(state.bookData);

  const [isUpdatingBookCover, setIsUpdatingBookCover] = useState(false);
  const [isUpdatingBook, setIsUpdatingBook] = useState(false);

  return (
    <>
      <div className="animate-fade-in overflow-y-auto">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-snow-white hover:text-snow-white-op-70 h-10 transition-colors duration-300 ease-in-out hover:cursor-pointer"
        >
          <GoArrowLeft size={20} />
        </button>

        <SectionToEditBookCover
          book={book}
          setBook={setBook}
          isUpdatingBook={isUpdatingBook}
          isUpdatingBookCover={isUpdatingBookCover}
          setIsUpdatingBookCover={setIsUpdatingBookCover}
        />

        <SectionToEditBook
          book={book}
          setBook={setBook}
          isUpdatingBookCover={isUpdatingBookCover}
          isUpdatingBook={isUpdatingBook}
          setIsUpdatingBook={setIsUpdatingBook}
        />
      </div>
    </>
  );
}
