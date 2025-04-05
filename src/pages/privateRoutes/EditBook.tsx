import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { GoArrowLeft } from 'react-icons/go';

import BooksService from '../../app/services/BooksService';
import { IBook } from '../../@types/Book';
import { env } from '../../config/env';

export default function EditBook() {
  const [book, setBook] = useState<IBook>({} as IBook);

  const { id } = useParams();
  const navigate = useNavigate();

  const src = `${env.API_URL}/uploads/books/${book.imagePath}`;

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
  }, [id, navigate]);

  return (
    <div className="animate-fade-in">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="text-snow-white hover:text-snow-white-op-70 h-10 transition-colors duration-300 ease-in-out hover:cursor-pointer"
      >
        <GoArrowLeft size={20} />
      </button>

      <div className="bg-navy-blue flex items-center justify-around rounded-lg py-4">
        <img
          src={src}
          alt="Capa do Livro"
          className="h-[65px] w-[65px] rounded-full"
        />

        <p className="text-light-gray font-quicksand font-semibold">
          {book.title}
        </p>

        <button
          type="button"
          className="bg-sky-blue text-snow-white font-roboto hover:bg-sky-blue-op-94 rounded-lg px-4 py-2 font-semibold transition-colors duration-300 ease-in-out hover:cursor-pointer"
        >
          {book.imagePath ? 'Alterar' : 'Adicionar'} foto
        </button>
      </div>

      <div className="mt-8">
        <h1 className="text-snow-white font-quicksand text-2xl font-thin">
          Editar livro
        </h1>

        <form>
          <label htmlFor=""></label>
        </form>
      </div>
    </div>
  );
}
