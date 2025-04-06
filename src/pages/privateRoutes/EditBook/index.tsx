import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BooksService from '../../../app/services/BooksService';

import { GoArrowLeft } from 'react-icons/go';
import { formatAuthors } from '../../../utils/formatAuthors';

import SectionToEditBookCover from './components/SectionToEditBookCover';
import { IBook } from '../../../@types/Book';
import SectionToEditBook from './components/SectionToEditBook';

export default function EditBook() {
  const [book, setBook] = useState<IBook>({} as IBook);

  const { id } = useParams();
  const navigate = useNavigate();

  const formattedAuthors = formatAuthors({
    authors: book.authors,
    onlyCommas: true,
  });

  useEffect(() => {
    async function loadBook() {
      try {
        const bookData = await BooksService.getBookById(id!);

        setBook(bookData);
      } catch {
        navigate('/my-books');
      }
    }

    loadBook();
  }, [id, navigate, formattedAuthors]);

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

        <SectionToEditBookCover book={book} setBook={setBook} />

        <SectionToEditBook book={book} setBook={setBook} />
      </div>
    </>
  );
}
