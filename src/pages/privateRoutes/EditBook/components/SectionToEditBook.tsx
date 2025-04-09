import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BooksService from '../../../../app/services/BooksService';

import { formatAuthors } from '../../../../utils/formatAuthors';

import ConfirmationModal from './ConfirmationModal';
import Input from './Input';
import SaveButton from './SaveButton';

import { FiTrash2 } from 'react-icons/fi';

import { ErrorData } from '../types/ErrorData';
import { IBook } from '../../../../@types/Book';
import FormGroup from '../../../../components/FormGroup';

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

  const [errorsData, setErrorsData] = useState([] as ErrorData[]);

  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);

  const navigate = useNavigate();

  const isFormValid = title.length > 0 && authors.length > 0;

  function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setErrorsData((prevState) =>
      prevState.filter((error) => error.fieldName !== 'title')
    );

    if (value.length === 0) {
      setErrorsData((prevState) => [
        ...prevState,
        {
          fieldName: 'title',
          message: 'O título do livro é obrigatório',
        },
      ]);
    }

    setTitle(value);
  }

  function handleAuthorsChange(event: React.ChangeEvent<HTMLInputElement>) {
    let { value } = event.target;

    value = value.replace(/\s+/g, ' ');

    setErrorsData((prevState) =>
      prevState.filter((error) => error.fieldName !== 'authors')
    );

    if (value.length === 0) {
      setErrorsData((prevState) => [
        ...prevState,
        {
          fieldName: 'authors',
          message: 'O livro deve ter pelo menos um autor(a)',
        },
      ]);
    }

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

      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <FormGroup fieldName={['title']} errorsData={errorsData}>
            <Input
              label="Título"
              errorsData={errorsData}
              fieldName="title"
              name="title"
              placeholder="Título do livro"
              value={title}
              disabled={isUpdatingBook || isUpdatingBookCover}
              onChange={handleTitleChange}
            />
          </FormGroup>

          <div>
            <span className="font-quicksand text-light-gray text-xs">
              Separe os autores(as) por vírgula.
            </span>
            <FormGroup fieldName={['authors']} errorsData={errorsData}>
              <Input
                label="Autores"
                errorsData={errorsData}
                fieldName="authors"
                name="authors"
                placeholder="Autores(as)"
                value={authors}
                disabled={isUpdatingBook || isUpdatingBookCover}
                onChange={handleAuthorsChange}
              />
            </FormGroup>
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
        </div>

        <div className="flex gap-2">
          <SaveButton
            buttonLabel="Salvar alterações"
            fullWidth
            disabled={isUpdatingBook || isUpdatingBookCover || !isFormValid}
            isLoading={isUpdatingBook}
            isLoadingOther={isUpdatingBookCover || !isFormValid}
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
