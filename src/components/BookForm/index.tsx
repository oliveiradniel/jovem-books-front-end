import { ChangeEvent, forwardRef, useImperativeHandle, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAuth } from '@/app/hooks/useAuth';

import { useMutateSubmitBook } from '../../app/hooks/mutations/book/useMutateSubmitBook';
import { useMutateDeleteBook } from '../../app/hooks/mutations/book/useMutateDeleteBook';

import { useErrors } from '../../app/hooks/useErrors';

import { AxiosError } from 'axios';

import AuthorsMapper from '../../app/services/mappers/AuthorsMapper';

import { env } from '@/config/env';

import { emitToast } from '@/utils/emitToast';

import { ZodError, ZodSchema } from 'zod';
import { handleBookErrors } from '../../app/handleErrors/handleBookErrors';

import { FiTrash2 } from 'react-icons/fi';

import DeleteBookModal from '../Modals/DeleteBookModal';
import DeleteButton from './DeleteButton';
import FormGroup from '../FormGroup';
import Input from './Input';
import Button from './Button';
import Select from './Select';
import Label from './Label';
import BookCover from './BookCover';
import SkeletonLoading from '../SkeletonLoading';

import { IBook } from '../../@types/Book';
import { TBookErrorMessages, TBookFields } from '../../@types/FormError';

export interface BookFormHandle {
  setFieldValues: (book: IBook) => void;
  setIsLoading: (loading: boolean) => void;
  resetFields: () => void;
}

interface BookFormProps<T> {
  type: 'create' | 'update';
  validationSchema: ZodSchema<T>;
  onSubmit: (book: T) => Promise<void>;
}

function BookFormInner<T>(
  { type, validationSchema, onSubmit }: BookFormProps<T>,
  ref: React.Ref<BookFormHandle>
) {
  const { signOut } = useAuth();

  const { id } = useParams();

  const { errors, setError, removeError, getErrorMessageByFieldName } =
    useErrors<TBookFields, TBookErrorMessages>();

  const [title, setTitle] = useState('');

  const { submitBook, isSubmitting, hasError } = useMutateSubmitBook({
    type,
    onSubmit,
  });

  const { deleteBook, isDeleting } = useMutateDeleteBook({
    title,
    onCloseModal: () => setIsDeleteModalVisible(false),
  });

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const [authors, setAuthors] = useState('');
  const [sinopse, setSinopse] = useState('');
  const [literaryGenre, setLiteraryGenre] = useState([] as string[]);
  const [numberOfPages, setNumberOfPages] = useState<string>('');

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);

  const [isLoadingBook, setIsLoadingBook] = useState(false);

  const [removeImage, setRemoveImage] = useState(false);

  const hasErrorInTitle = getErrorMessageByFieldName(['title']);
  const hasErrorInAuthors = getErrorMessageByFieldName(['authors']);
  const hasErrorInNumberOfPages = getErrorMessageByFieldName(['numberOfPages']);

  const src = selectedImage
    ? URL.createObjectURL(selectedImage)
    : imageName?.includes('books.google')
      ? imageName
      : `${env.VITE_AWS_BUCKET_URL}/${imageName}`;

  const buttonLabel = type === 'create' ? 'Criar' : 'Salvar alterações';

  useImperativeHandle(ref, () => ({
    setFieldValues(book) {
      const parsedNumberOfPages = book.numberOfPages ?? '';
      setTitle(book.title);
      setAuthors(book.authors);
      setSinopse(book.sinopse ?? '');
      setLiteraryGenre(book.literaryGenre);
      setNumberOfPages(String(parsedNumberOfPages));
      setImageName(book.imagePath || null);
    },
    setIsLoading(loading: boolean) {
      setIsLoadingBook(loading);
    },
    resetFields() {
      setTitle('');
      setAuthors('');
      setSinopse('');
      setLiteraryGenre([]);
      setNumberOfPages('');
      setImageName('');
      setSelectedImage(null);
    },
  }));

  const isFormValid =
    title?.length > 0 &&
    authors?.length > 0 &&
    literaryGenre?.length > 0 &&
    Number(numberOfPages) > 0 &&
    errors.length === 0 &&
    !isLoadingBook;

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;
    const validTypes = ['image/jpeg', 'image/png'];

    if (!validTypes.includes(file.type)) {
      emitToast({
        type: 'error',
        message: 'Apenas arquivos de imagens JPEG ou PNG são aceitos.',
      });
      return;
    }

    const fiveMB = 5 * 1024 * 1024;
    if (file.size > fiveMB) {
      emitToast({
        type: 'error',
        message: 'A capa do livro não pode ser maior que 5MB.',
      });

      return;
    }

    setSelectedImage(file);
    setRemoveImage(false);
  }

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

  function handleLiteraryGenreChange(value: string) {
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

  function handleNumberOfPagesIncrement() {
    setNumberOfPages((prevState) => {
      const asNumber = Number(prevState) + 1;
      const newValue = String(asNumber);

      return newValue;
    });
  }

  function handleNumberOfPagesDecrement() {
    setNumberOfPages((prevState) => {
      const asNumber = Number(prevState) - 1;
      const newValue = String(asNumber);

      return newValue;
    });
  }

  function handleRemoveImageFromScreen() {
    if (imageName && selectedImage === null && !removeImage) {
      setRemoveImage(true);
      return;
    }

    if (imageName && selectedImage === null && removeImage) {
      setRemoveImage(false);
      return;
    }

    setRemoveImage(false);
    setSelectedImage(null);
  }

  async function handleDeleteBook() {
    deleteBook({ id: id! });
  }

  async function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const bookData = {
      id: id!,
      title,
      authors: AuthorsMapper.toPersistence({ authors }),
      sinopse: sinopse,
      numberOfPages: Number(numberOfPages),
      literaryGenre,
      file: selectedImage,
      removeImage,
    };

    try {
      const data = validationSchema.parse({
        ...bookData,
        imagePath: imageName,
      });

      await submitBook(data);
    } catch (error) {
      const result = handleBookErrors(error);
      if (result) {
        setError(result);
        return;
      }

      if (error instanceof ZodError) {
        if (error.message.includes('File must be a maximum of 5MB')) {
          emitToast({
            type: 'error',
            message: 'A capa do livro não pode ser maior que 5MB.',
          });

          return;
        }
      }

      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data.message as string;

        if (errorMessage && errorMessage.includes('Invalid access token')) {
          signOut();

          emitToast({
            type: 'error',
            message: 'Suas credenciais expiraram! Faça login novamente.',
          });

          return;
        }
      }

      emitToast({
        type: 'error',
        message: `Houve um erro ao ${type === 'create' ? 'criar' : 'atualizar'} seu livro.`,
      });
    }
  }

  return (
    <>
      <DeleteBookModal
        bookTitle={title}
        isVisible={isDeleteModalVisible}
        isDeleting={isDeleting}
        onClose={() => setIsDeleteModalVisible(false)}
        onConfirm={handleDeleteBook}
      />

      <form className="mt-10 flex flex-col gap-4 overflow-y-auto">
        <BookCover
          imageName={imageName}
          selectedImage={selectedImage}
          src={src!}
          isUpdating={isSubmitting}
          isLoadingBook={isLoadingBook}
          removeImage={removeImage}
          onImageChange={handleImageChange}
          onRemoveImageFromScreen={handleRemoveImageFromScreen}
        />

        <div className="bg-navy-blue my-8 h-[0.4px] w-full" />

        <i className="text-light-gray">Os campos com * são obrigatórios.</i>

        <FormGroup error={hasErrorInTitle}>
          <Input
            label="* Título"
            error={!!(hasErrorInTitle && hasErrorInTitle.length > 0)}
            name="title"
            placeholder="Dom Quixote"
            value={title || ''}
            isLoadingData={isLoadingBook}
            onChange={handleTitleChange}
          />
        </FormGroup>

        <FormGroup
          error={getErrorMessageByFieldName(['authors'])}
          warningText="Separe os autores(as) por vírgula."
        >
          <Input
            label="* Autor(es)"
            error={!!(hasErrorInAuthors && hasErrorInAuthors.length > 0)}
            name="authors"
            placeholder="Miguel de Cervantes"
            value={authors || ''}
            isLoadingData={isLoadingBook}
            onChange={handleAuthorsChange}
          />
        </FormGroup>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Label label="Sinopse" />
          <div className="relative h-[150px] max-h-[150px] min-h-[100px] w-full">
            {isLoadingBook ? (
              <SkeletonLoading rounded="sm" />
            ) : (
              <textarea
                name="sinopse"
                placeholder="A história gira em torno de Alonso Quixano, um fidalgo pobre que enlouquece após ler muitos romances de cavalaria. Ele decide tornar-se um cavaleiro andante sob o nome de Dom Quixote..."
                value={sinopse ?? ''}
                onChange={handleSinopseChange}
                className="text-sky-blue/80 focus:border-sky-blue/40 border-navy-blue font-quicksand placeholder:text-light-gray h-[150px] max-h-[150px] min-h-[100px] w-full rounded-lg border px-2 pt-1 transition-colors duration-300 ease-in-out outline-none placeholder:text-sm"
              />
            )}
          </div>
        </div>

        <FormGroup error={getErrorMessageByFieldName(['literaryGenre'])}>
          <div className="flex flex-col gap-2">
            <Label label="* Gênero Literário" />
            <Select
              selectedOptions={literaryGenre}
              disabled={isSubmitting || isLoadingBook}
              isLoadingBook={isLoadingBook}
              onChange={handleLiteraryGenreChange}
            />
          </div>
        </FormGroup>

        {type === 'create' && (
          <FormGroup error={getErrorMessageByFieldName(['numberOfPages'])}>
            <Input
              label="* Número de Páginas"
              error={
                !!(
                  hasErrorInNumberOfPages && hasErrorInNumberOfPages.length > 0
                )
              }
              name="numerOfPages"
              placeholder="332"
              value={numberOfPages || ''}
              onChange={handleNumberOfPagesChange}
              onIncrement={handleNumberOfPagesIncrement}
              onDecrement={handleNumberOfPagesDecrement}
            />
          </FormGroup>
        )}

        <div className="flex gap-2">
          <Button
            buttonLabel={hasError ? 'Tentar novamente' : buttonLabel}
            disabled={!isFormValid}
            isLoading={isSubmitting}
            onClick={handleSubmit}
          />
          {type === 'update' && (
            <DeleteButton
              buttonLabel={<FiTrash2 />}
              disabled={isSubmitting || isLoadingBook}
              onClick={() => setIsDeleteModalVisible(true)}
            />
          )}
        </div>
      </form>
    </>
  );
}

export const BookForm = forwardRef(BookFormInner) as <T>(
  props: BookFormProps<T> & { ref?: React.Ref<BookFormHandle> }
) => ReturnType<typeof BookFormInner>;

export default BookForm;
