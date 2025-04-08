import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BooksService from '../../../../app/services/BooksService';

import { formatAuthors } from '../../../../utils/formatAuthors';

import ConfirmationModal from './ConfirmationModal';
import Input from './Input';
import SaveButton from './SaveButton';

import { FiTrash2 } from 'react-icons/fi';

import { IBook } from '../../../../@types/Book';

interface SectionToEditBookProps {
  book: IBook;
  setBook: (book: IBook) => void;
  isUpdatingBookCover: boolean;
  isUpdatingBook: boolean;
  setIsUpdatingBook: (value: boolean) => void;
}

export default function SectionToEditBook({
  book,
  setBook,
  isUpdatingBookCover,
  isUpdatingBook,
  setIsUpdatingBook,
}: SectionToEditBookProps) {
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [sinopse, setSinopse] = useState('');

  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);

  const navigate = useNavigate();

  function handleAuthorsChange(event: React.ChangeEvent<HTMLInputElement>) {
    let { value } = event.target;

    value = value.replace(/\s+/g, ' ');

    setAuthors(value);
  }

  async function handleDeleteBook() {
    try {
      await BooksService.delete(book.id);

      navigate('/my-books');
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit() {
    try {
      setIsUpdatingBook(true);

      const formData = {
        title,
        authors: authors
          .split(',')
          .map((author) => author.trim())
          .filter((author) => author !== ''),
        sinopse,
      };

      const updatedBook = await BooksService.updateBook({
        id: book.id,
        ...formData,
      });

      setBook(updatedBook);

      setTitle(updatedBook.title);
      setAuthors(
        formatAuthors({ authors: updatedBook.authors, onlyCommas: true })
      );
      setSinopse(updatedBook.sinopse ?? '');
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdatingBook(false);
    }
  }

  useEffect(() => {
    setTitle(book.title);
    setAuthors(formatAuthors({ authors: book.authors }));
    setSinopse(book.sinopse ?? '');
  }, [book]);

  return (
    <>
      <ConfirmationModal
        bookTitle={book.title}
        isVisible={isConfirmationModalVisible}
        onClose={() => setIsConfirmationModalVisible(false)}
        onConfirm={handleDeleteBook}
      />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-lg">
        <Input
          label="Título"
          name="title"
          placeholder="Título do livro"
          value={title}
          disabled={isUpdatingBook || isUpdatingBookCover}
          onChange={({ target }) => setTitle(target.value)}
        />

        <div>
          <span className="font-quicksand text-light-gray text-xs">
            Separe os autores(as) por vírgula.
          </span>
          <Input
            label="Autores"
            name="title"
            placeholder="Autores(as)"
            value={authors}
            disabled={isUpdatingBook || isUpdatingBookCover}
            onChange={handleAuthorsChange}
          />
        </div>

        <div className="flex gap-2">
          <label
            htmlFor="title"
            className="text-snow-white font-quicksand w-16"
          >
            Sinopse
          </label>
          <textarea
            name="title"
            placeholder="Sinopse do livro"
            value={sinopse}
            disabled={isUpdatingBook || isUpdatingBookCover}
            onChange={(event) => setSinopse(event.target.value)}
            className="text-sky-blue/80 focus:border-sky-blue/40 border-navy-blue font-quicksand placeholder:text-light-gray h-[150px] max-h-[150px] min-h-[100px] w-full rounded-lg border px-2 pt-1 transition-colors duration-300 ease-in-out outline-none placeholder:text-sm"
          />
        </div>

        <div className="flex gap-2">
          <SaveButton
            buttonLabel="Salvar alterações"
            fullWidth
            disabled={isUpdatingBook || isUpdatingBookCover}
            isLoading={isUpdatingBook}
            isLoadingOther={isUpdatingBookCover}
            onClick={handleSubmit}
          />

          <button
            type="button"
            disabled={isUpdatingBook || isUpdatingBookCover}
            onClick={() => setIsConfirmationModalVisible(true)}
            className={`text-snow-white bg-blood-red hover:bg-blood-red/70 disabled:bg-light-gray/70 flex h-10 w-12 items-center justify-center rounded-lg transition-colors duration-300 ease-in-out hover:cursor-pointer disabled:hover:cursor-default`}
          >
            <FiTrash2 />
          </button>
        </div>
      </form>
    </>
  );
}
