import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import BooksService from '../../../app/services/BooksService';

import { CreateDataBookSchema } from '../../../assets/schemas/BookSchemas';

import { emitToast } from '../../../utils/emitToast';

import { GoArrowLeft } from 'react-icons/go';

import BookForm, { BookFormHandle } from '../../../components/BookForm';

import { TCreateDataBook } from '../../../@types/Book';

export default function NewBook() {
  const navigate = useNavigate();

  const bookFormRef = useRef<BookFormHandle>(null);

  async function handleSubmit(book: TCreateDataBook) {
    await BooksService.createBook(book);

    bookFormRef.current?.resetFields();

    emitToast({ type: 'success', message: 'Livro criado com sucesso.' });
  }

  return (
    <div>
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
