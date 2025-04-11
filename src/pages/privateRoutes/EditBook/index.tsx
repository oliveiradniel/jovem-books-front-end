import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import BooksService from '../../../app/services/BooksService';

import { GoArrowLeft } from 'react-icons/go';

import SectionToEditBookCover from './components/SectionToEditBookCover';
import SectionToEditBook from './components/SectionToEditBook';

export default function EditBook() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const isFirstRender = useRef(true);

  const [book, setBook] = useState(state.bookData);

  const [isUpdatingBookCover, setIsUpdatingBookCover] = useState(false);
  const [isUpdatingBook, setIsUpdatingBook] = useState(false);

  useEffect(() => {
    async function loadBook() {
      try {
        const updatedBook = await BooksService.getBookById({
          id: id!,
          onlyCommas: true,
        });

        setBook(updatedBook);
      } catch {
        navigate('/my-books');
      }
    }

    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      loadBook();
    }
  }, [book, id, navigate]);

  return (
    <>
      <div className="animate-fade-in h-full overflow-y-auto">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-snow-white hover:text-snow-white-op-70 mb-10 h-10 transition-colors duration-300 ease-in-out hover:cursor-pointer"
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

        <div className="bg-navy-blue my-8 h-[0.4px] w-full"></div>

        <SectionToEditBook
          book={book}
          isUpdatingBookCover={isUpdatingBookCover}
          isUpdatingBook={isUpdatingBook}
          setIsUpdatingBook={setIsUpdatingBook}
        />
      </div>
    </>
  );
}
