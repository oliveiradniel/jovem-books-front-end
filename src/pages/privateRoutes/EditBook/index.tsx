import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BooksService from '../../../app/services/BooksService';

import { emitToast } from '../../../utils/emitToast';

import { GoArrowLeft } from 'react-icons/go';

import BookForm from '../../../components/BookForm';
import SectionToEditBookCover from './components/SectionToEditBookCover';

import { IBook, TUpdateBookData } from '../../../@types/Book';
import { UpdateDataBookSchema } from '../../../assets/schemas/BookSchemas';

export default function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState({} as IBook);

  const [isLoading, setIsLoading] = useState(false);

  const [isUpdatingBookCover, setIsUpdatingBookCover] = useState(false);

  async function handleSubmit(book: TUpdateBookData) {
    const updatedBook = await BooksService.updateBook(book);

    console.log(updatedBook);

    emitToast({ type: 'success', message: 'Livro atualizado com sucesso.' });
  }

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
        emitToast({
          type: 'success',
          message: `Não foi possível encontrar o livro`,
        });

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
          isUpdatingBook={false}
          isUpdatingBookCover={isUpdatingBookCover}
          setIsUpdatingBookCover={setIsUpdatingBookCover}
        />

        <div className="bg-navy-blue my-8 h-[0.4px] w-full" />

        <BookForm
          buttonLabel="Salvar alterações"
          onSubmit={handleSubmit}
          validationSchema={UpdateDataBookSchema}
        />
      </div>
    </>
  );
}
