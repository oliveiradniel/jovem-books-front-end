import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BooksService from '../../../app/services/BooksService';

import { UpdateDataBookSchema } from '../../../assets/schemas/BookSchemas';

import { emitToast } from '../../../utils/emitToast';

import { GoArrowLeft } from 'react-icons/go';

import BookForm, { BookFormHandle } from '../../../components/BookForm';
import SectionToEditBookCover from './components/SectionToEditBookCover';

import { IBook, TUpdateBookData } from '../../../@types/Book';
import { useQueryGetBookById } from '../../../app/hooks/queries/book/useQueryGetBookById';

export default function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { bookData, isError, isLoadingBook } = useQueryGetBookById(id!);

  const bookFormRef = useRef<BookFormHandle>(null);

  const [book, setBook] = useState({} as IBook);

  const [isUpdatingBookCover, setIsUpdatingBookCover] = useState(false);

  async function handleSubmit(book: TUpdateBookData) {
    await BooksService.updateBook(book);

    emitToast({ type: 'success', message: 'Livro atualizado com sucesso.' });
  }

  useEffect(() => {
    if (bookData) {
      setBook(bookData);
      bookFormRef.current?.setFieldValues(bookData);
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
        isUpdatingBookCover={isUpdatingBookCover}
        setIsUpdatingBookCover={setIsUpdatingBookCover}
      />

      <div className="bg-navy-blue my-8 h-[0.4px] w-full" />

      <BookForm
        ref={bookFormRef}
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
        validationSchema={UpdateDataBookSchema}
      />
    </div>
  );
}
