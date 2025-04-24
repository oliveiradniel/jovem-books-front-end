import { ChangeEvent, forwardRef, useImperativeHandle, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useErrors } from '../../app/hooks/useErrors';

import BooksService from '../../app/services/BooksService';

import AuthorsMapper from '../../app/services/mappers/AuthorsMapper';

import { ZodSchema } from 'zod';
import { handleBookErrors } from '../../pages/privateRoutes/EditBook/errors/handleBookErrors';

import { emitToast } from '../../utils/emitToast';

import { FiTrash2 } from 'react-icons/fi';

import DeleteBookModal from '../Modals/DeleteBookModal';
import DeleteButton from './DeleteButton';
import FormGroup from '../FormGroup';
import Input from './Input';
import Button from './Button';
import Select from './Select';
import Label from './Label';
import NumberInput from './NumberInput';

import { IBook, TLiteraryGenre } from '../../@types/Book';
import { TBookErrorMessages, TBookFields } from '../../@types/FormError';

export interface BookFormHandle {
  setFieldValues: (book: IBook) => void;
  resetFields: () => void;
}

interface BookFormProps<T> {
  buttonLabel: 'Criar' | 'Salvar alterações';
  validationSchema: ZodSchema<T>;
  isLoadingBook?: boolean;
  onSubmit: (book: T) => Promise<void>;
}

function BookFormInner<T>(
  {
    buttonLabel,
    validationSchema,
    isLoadingBook = false,
    onSubmit,
  }: BookFormProps<T>,
  ref: React.Ref<BookFormHandle>
) {
  const { id } = useParams();
  const navigate = useNavigate();

  const { errors, setError, removeError, getErrorMessageByFieldName } =
    useErrors<TBookFields, TBookErrorMessages>();

  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [sinopse, setSinopse] = useState('');
  const [literaryGenre, setLiteraryGenre] = useState([] as TLiteraryGenre[]);
  const [numberOfPages, setNumberOfPages] = useState<number | string | null>(
    null
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    setFieldValues(book) {
      setTitle(book.title);
      setAuthors(book.authors);
      setSinopse(book.sinopse ?? '');
      setLiteraryGenre(book.literaryGenre);
      setNumberOfPages(book.numberOfPages);
    },
    resetFields() {
      setTitle('');
      setAuthors('');
      setSinopse('');
      setLiteraryGenre([]);
      setNumberOfPages(null);
    },
  }));

  const isFormValid =
    title?.length > 0 &&
    authors?.length > 0 &&
    literaryGenre?.length > 0 &&
    Number(numberOfPages) > 0 &&
    String(numberOfPages)?.length > 0 &&
    errors.length === 0;

  function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
    let { value } = event.target;

    value = value.replace(/^\s+/, '');
    value = value.replace(/\s+/g, ' ');

    if (value.length === 0) {
      setError({ field: 'title', message: 'O título do livro é obrigatório!' });
    } else {
      removeError('title');
    }

    setTitle(value);
  }

  function handleAuthorsChange(event: React.ChangeEvent<HTMLInputElement>) {
    let { value } = event.target;

    value = value.replace(/^\s+/, '');
    value = value.replace(/\s+/g, ' ');

    if (value.length === 0) {
      setError({
        field: 'authors',
        message: 'O livro deve conter ao menos um autor(a)!',
      });
    } else {
      removeError('authors');
    }

    setAuthors(value);
  }

  function handleSinopseChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    let { value } = event.target;

    value = value.replace(/^\s+/, '');
    value = value.replace(/\s+/g, ' ');

    setSinopse(value);
  }

  function handleLiteraryGenreChange(value: TLiteraryGenre) {
    const hasSixLiteraryGenre = literaryGenre.length === 6;
    if (literaryGenre.includes(value)) {
      const newLiteraryGenre = literaryGenre.filter(
        (literaryGenreValue) => literaryGenreValue !== value
      );

      setLiteraryGenre(newLiteraryGenre);

      if (newLiteraryGenre.length === 0) {
        setError({
          field: 'literaryGenre',
          message: 'O livro deve conter ao menos um gênero literário!',
        });
      }
    } else if (!hasSixLiteraryGenre) {
      setLiteraryGenre((prevState) => [...prevState, value]);

      removeError('literaryGenre');
    }
  }

  function handleNumberOfPagesChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    const matchPositiveInteger = /^[1-9]\d*$/;

    const validNumber = matchPositiveInteger.test(value) || value === '';

    if (!validNumber) return;

    if (value.length === 0) {
      setError({
        field: 'numberOfPages',
        message: 'O número de páginas é obrigatório!',
      });
    } else {
      removeError('numberOfPages');
    }

    setNumberOfPages(value);
  }

  function handlePageIncrement() {
    setNumberOfPages((prevState) => Number(prevState) + 1);
  }

  function handlePageDecrement() {
    if (Number(numberOfPages) === 0) return;
    setNumberOfPages((prevState) => Number(prevState) - 1);
  }

  async function handleDeleteBook() {
    try {
      await BooksService.deleteBook(id!);

      emitToast({
        type: 'success',
        message: `O livro ${title} foi excluído com sucesso.`,
      });

      navigate('/my-books');
    } catch {
      emitToast({
        type: 'error',
        message: `Não foi possível excluir o livro ${title}.`,
      });
    }
  }

  async function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const formattedNumberOfPages = Number(numberOfPages);

    try {
      setIsLoading(true);

      const formData = {
        id: id,
        title,
        authors: AuthorsMapper.toPersistence({ authors }),
        sinopse,
        numberOfPages: formattedNumberOfPages,
        genreLiterary: literaryGenre,
      };

      const data = validationSchema.parse(formData);
      await onSubmit(data);
    } catch (error) {
      console.log(error);
      const result = handleBookErrors(error);
      if (result) {
        setError(result);
        return;
      }

      const errorMessage = `Não foi possível ${buttonLabel === 'Criar' ? 'criar o' : 'salvar as alterações do'} livro.`;

      emitToast({ type: 'error', message: errorMessage });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <DeleteBookModal
        bookTitle={title}
        isVisible={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
        onConfirm={handleDeleteBook}
      />

      <form className="mt-10 flex flex-col gap-4">
        <FormGroup error={getErrorMessageByFieldName(['title'])}>
          <Input
            label="Título"
            error={getErrorMessageByFieldName(['title'])}
            name="title"
            placeholder="Dom Quixote"
            value={title}
            onChange={handleTitleChange}
          />
        </FormGroup>

        <FormGroup
          error={getErrorMessageByFieldName(['authors'])}
          warningText="Separe os autores(as) por vírgula."
        >
          <Input
            label="Autor(es)"
            error={getErrorMessageByFieldName(['authors'])}
            name="authors"
            placeholder="Miguel de Cervantes"
            value={authors}
            onChange={handleAuthorsChange}
          />
        </FormGroup>

        <div className="flex gap-2">
          <Label label="Sinopse" />
          <div className="relative h-[150px] max-h-[150px] min-h-[100px] w-full">
            <textarea
              name="sinopse"
              placeholder="A história gira em torno de Alonso Quixano, um fidalgo pobre que enlouquece após ler muitos romances de cavalaria. Ele decide tornar-se um cavaleiro andante sob o nome de Dom Quixote..."
              value={sinopse ?? ''}
              onChange={handleSinopseChange}
              className="text-sky-blue/80 focus:border-sky-blue/40 border-navy-blue font-quicksand placeholder:text-light-gray h-[150px] max-h-[150px] min-h-[100px] w-full rounded-lg border px-2 pt-1 transition-colors duration-300 ease-in-out outline-none placeholder:text-sm"
            />
          </div>
        </div>

        <FormGroup error={getErrorMessageByFieldName(['literaryGenre'])}>
          <div className="flex flex-col gap-2">
            <Label label="Gênero Literário" />
            <Select
              selectedOptions={literaryGenre}
              disabled={isLoading || isLoadingBook}
              onChange={handleLiteraryGenreChange}
            />
          </div>
        </FormGroup>

        {buttonLabel === 'Criar' && (
          <FormGroup error={getErrorMessageByFieldName(['numberOfPages'])}>
            <NumberInput
              error={getErrorMessageByFieldName(['numberOfPages'])}
              value={numberOfPages ?? ''}
              placeholder="332"
              onChange={handleNumberOfPagesChange}
              onIncrement={handlePageIncrement}
              onDecrement={handlePageDecrement}
            />
          </FormGroup>
        )}

        <div className="flex gap-2">
          <Button
            buttonLabel={buttonLabel}
            disabled={!isFormValid}
            isLoading={isLoading}
            onClick={handleSubmit}
          />
          {buttonLabel === 'Salvar alterações' && (
            <DeleteButton
              buttonLabel={<FiTrash2 />}
              disabled={isLoading || isLoadingBook}
              onClick={() => setIsDeleteModalVisible(true)}
            />
          )}
        </div>
      </form>
    </>
  );
}

const BookForm = forwardRef(BookFormInner) as <T>(
  props: BookFormProps<T> & { ref?: React.Ref<BookFormHandle> }
) => ReturnType<typeof BookFormInner>;

export default BookForm;
