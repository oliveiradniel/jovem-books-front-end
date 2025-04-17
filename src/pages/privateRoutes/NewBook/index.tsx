import { useNavigate } from 'react-router-dom';

import { GoArrowLeft } from 'react-icons/go';

import BookForm from '../../../components/BookForm';
import { TCreateDataBook } from '../../../@types/Book';
import BooksService from '../../../app/services/BooksService';
import { emitToast } from '../../../utils/emitToast';
import { CreateDataBookSchema } from '../../../assets/schemas/BookSchemas';

export default function NewBook() {
  const navigate = useNavigate();

  async function handleSubmit(book: TCreateDataBook) {
    await BooksService.createBook(book);

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
        buttonLabel="Criar"
        onSubmit={handleSubmit}
        validationSchema={CreateDataBookSchema}
      />
    </div>
  );
}
