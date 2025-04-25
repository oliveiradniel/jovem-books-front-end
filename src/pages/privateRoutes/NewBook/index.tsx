import { useEffect, useMemo, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import BooksService from '../../../app/services/BooksService';

import { CreateDataBookSchema } from '../../../assets/schemas/BookSchemas';

import AuthorsMapper from '../../../app/services/mappers/AuthorsMapper';

import { emitToast } from '../../../utils/emitToast';

import { GoArrowLeft } from 'react-icons/go';

import BookForm, { BookFormHandle } from '../../../components/BookForm';

import { IBookAPI, TCreateDataBook } from '../../../@types/Book';
import { LITERARY_GENRE_OPTIONS } from '../../../constants/books';

export default function NewBook() {
  const navigate = useNavigate();
  const location = useLocation();
  const book = useMemo(
    () => (location.state?.book as IBookAPI) || {},
    [location.state?.book]
  );

  const bookFormRef = useRef<BookFormHandle>(null);

  async function handleSubmit(book: TCreateDataBook) {
    await BooksService.createBook(book);

    bookFormRef.current?.resetFields();

    emitToast({ type: 'success', message: 'Livro criado com sucesso.' });
  }

  useEffect(() => {
    if (book) {
      let authors = AuthorsMapper.toDomain({
        authors: book.authors,
      });

      let literaryGenre = book.literaryGenre?.map(
        (literaryGenre) => literaryGenre.toUpperCase() as string
      );

      literaryGenre = literaryGenre?.filter((item) =>
        LITERARY_GENRE_OPTIONS.includes(item)
      );

      if (authors === null) {
        authors = '';
      }
      if (!literaryGenre) {
        literaryGenre = [];
      }

      bookFormRef.current?.setFieldValues({ ...book, authors, literaryGenre });
    }
  }, [book]);

  return (
    <div className="h-full overflow-y-auto">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-snow-white hover:text-snow-white-op-70 h-10 transition-colors duration-300 ease-in-out hover:cursor-pointer"
        >
          <GoArrowLeft size={20} />
        </button>

        <h1 className="font-quicksand text-snow-white text-2xl">Novo livro</h1>
      </div>

      <BookForm
        ref={bookFormRef}
        buttonLabel="Criar"
        onSubmit={handleSubmit}
        validationSchema={CreateDataBookSchema}
      />
    </div>
  );
}
