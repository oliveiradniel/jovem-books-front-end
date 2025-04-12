import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BooksService from '../../../app/services/BooksService';

import { GoArrowLeft } from 'react-icons/go';

import SectionToEditBookCover from './components/SectionToEditBookCover';
import SectionToEditBook from './components/SectionToEditBook';

import { IBook } from '../../../@types/Book';

export default function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState({} as IBook);

  const [isLoading, setIsLoading] = useState(false);

  const [isUpdatingBookCover, setIsUpdatingBookCover] = useState(false);
  const [isUpdatingBook, setIsUpdatingBook] = useState(false);

  useEffect(() => {
    async function loadBook() {
      try {
        setIsLoading(true);

        const updatedBook = await BooksService.getBookById({
          id: id!,
          onlyCommas: true,
        });

        setBook(updatedBook);
      } catch {
        navigate('/my-books');
      } finally {
        setIsLoading(false);
      }
    }

    loadBook();
  }, [id, navigate]);

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
          imagePath={book.imagePath}
          isLoadingBook={isLoading}
          isUpdatingBook={isUpdatingBook}
          isUpdatingBookCover={isUpdatingBookCover}
          setIsUpdatingBookCover={setIsUpdatingBookCover}
        />

        <div className="bg-navy-blue my-8 h-[0.4px] w-full"></div>

        <SectionToEditBook
          book={book}
          isLoadingBook={isLoading}
          isUpdatingBookCover={isUpdatingBookCover}
          isUpdatingBook={isUpdatingBook}
          setIsUpdatingBook={setIsUpdatingBook}
        />
      </div>
    </>
  );
}
