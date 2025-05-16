import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useQueryGetBookById } from '../../../app/hooks/queries/book/useQueryGetBookById';

import BooksService from '../../../app/services/BooksService';

import { UpdateBookSchema } from '../../../assets/schemas/BookSchemas';

import { emitToast } from '../../../utils/emitToast';
import { formatAuthors } from '../../../utils/formatAuthors';

import { GoArrowLeft } from 'react-icons/go';

import BookForm, { BookFormHandle } from '../../../components/BookForm';
import SectionToEditBookCover from './components/SectionToEditBookCover';

import { IBook, TUpdateBook } from '../../../@types/Book';

export default function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { bookData, isError, isLoadingBook } = useQueryGetBookById(id!);

  const bookFormRef = useRef<BookFormHandle>(null);

  const [book, setBook] = useState({} as IBook);

  async function handleSubmit(book: TUpdateBook) {
    const updatedBook = await BooksService.updateBook(book);

    emitToast({ type: 'success', message: 'Livro atualizado com sucesso.' });

    return updatedBook;
  }

  useEffect(() => {
    if (bookData) {
      const authors = formatAuthors({ authors: bookData.authors });

      const formattedBook = { ...bookData, authors };

      setBook(formattedBook);
      bookFormRef.current?.setFieldValues(formattedBook);
    }

    if (isError) {
      emitToast({
        type: 'success',
        message: `Não foi possível encontrar o livro`,
      });

      navigate('/my-books');
    }
  }, [bookData, isError, navigate]);

  return (
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
        isLoadingBook={isLoadingBook}
        isUpdatingBook={false}
      />

      <div className="bg-navy-blue my-8 h-[0.4px] w-full" />

      <BookForm
        ref={bookFormRef}
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
        validationSchema={UpdateBookSchema}
      />
    </div>
  );
}
