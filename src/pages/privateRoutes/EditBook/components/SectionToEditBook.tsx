import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BooksService from '../../../../app/services/BooksService';

import AuthorsMapper from '../../../../app/services/mappers/AuthorsMapper';

import { ErrorData } from '../../../../@types/ErrorData';
import { handleEditBookErrors } from '../errors/handleEditBookErrors';

import { EditBookSchema } from '../schemas/EditBookSchema';

import { FiTrash2 } from 'react-icons/fi';

import FormGroup from '../../../../components/FormGroup';
import ConfirmationModal from './ConfirmationModal';
import Input from './Input';
import SaveButton from './SaveButton';
import SkeletonLoading from '../../../../components/SkeletonLoading';

import { IBook } from '../../../../@types/Book';

interface SectionToEditBookProps {
  book: IBook;
  isLoadingBook: boolean;
  isUpdatingBookCover: boolean;
  isUpdatingBook: boolean;
  setIsUpdatingBook: (value: boolean) => void;
}

export default function SectionToEditBook({
  book,
  isLoadingBook,
  isUpdatingBookCover,
  isUpdatingBook,
  setIsUpdatingBook,
}: SectionToEditBookProps) {
  const { id } = useParams();

  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [sinopse, setSinopse] = useState('');

  const [errorsData, setErrorsData] = useState([] as ErrorData[]);

  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);

  const isFormValid = title?.length > 0 && authors?.length > 0;

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
      await BooksService.delete(id!);

      navigate('/my-books');
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit() {
    try {
      setIsUpdatingBook(true);

      const persistenceAuthors = AuthorsMapper.toPersistence({ authors });

      EditBookSchema.parse({
        title,
        authors: persistenceAuthors,
        sinopse,
      });

      const updatedBook = await BooksService.updateBook({
        id: id!,
        title,
        authors,
        sinopse: sinopse ?? null,
      });

      setTitle(updatedBook.title);
      setAuthors(updatedBook.authors);
      setSinopse(updatedBook.sinopse ?? '');
    } catch (error) {
      const result = handleEditBookErrors(error);
      if (result) {
        setErrorsData((prevState) => [...prevState, result]);
      }
    } finally {
      setIsUpdatingBook(false);
    }
  }

  useEffect(() => {
    setTitle(book.title ?? '');
    setAuthors(book.authors ?? '');
    setSinopse(book.sinopse ?? '');
  }, [book.title, book.authors, book.sinopse]);

  console.log({ title });
  console.log({ authors });
  console.log({ sinopse });

  return (
    <>
      <ConfirmationModal
        bookTitle={title}
        isVisible={isConfirmationModalVisible}
        onClose={() => setIsConfirmationModalVisible(false)}
        onConfirm={handleDeleteBook}
      />

      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        <div className="relative flex flex-col gap-4">
          <FormGroup fieldName={['title']} errorsData={errorsData}>
            <Input
              label="Título"
              errorsData={errorsData}
              fieldName="title"
              name="title"
              placeholder="Título do livro"
              value={title}
              isLoading={isLoadingBook}
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
                isLoading={isLoadingBook}
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
            <div className="relative h-[150px] max-h-[150px] min-h-[100px] w-full">
              {isLoadingBook && <SkeletonLoading rounded="lg" />}

              {!isLoadingBook && (
                <textarea
                  name="title"
                  placeholder="Sinopse do livro"
                  value={sinopse ?? ''}
                  disabled={isUpdatingBook || isUpdatingBookCover}
                  onChange={(event) => setSinopse(event.target.value)}
                  className="text-sky-blue/80 focus:border-sky-blue/40 border-navy-blue font-quicksand placeholder:text-light-gray h-[150px] max-h-[150px] min-h-[100px] w-full rounded-lg border px-2 pt-1 transition-colors duration-300 ease-in-out outline-none placeholder:text-sm"
                />
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <SaveButton
            buttonLabel="Salvar alterações"
            fullWidth
            disabled={
              isUpdatingBook ||
              isUpdatingBookCover ||
              !isFormValid ||
              errorsData.length > 0 ||
              isLoadingBook
            }
            isLoading={isUpdatingBook}
            isLoadingOther={
              isUpdatingBookCover ||
              !isFormValid ||
              errorsData.length > 0 ||
              isLoadingBook
            }
            onClick={handleSubmit}
          />

          <button
            type="button"
            disabled={isUpdatingBook || isUpdatingBookCover || isLoadingBook}
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
