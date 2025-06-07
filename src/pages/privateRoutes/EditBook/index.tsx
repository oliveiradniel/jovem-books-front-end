import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAuth } from '@/app/hooks/useAuth';

import { useQueryGetBookById } from '../../../app/hooks/queries/book/useQueryGetBookById';

import { AxiosError } from 'axios';

import BooksService from '../../../app/services/BooksService';
import S3Service from '@/app/services/S3Service';

import { UpdateBookSchema } from '../../../assets/schemas/BookSchemas';

import { emitToast } from '../../../utils/emitToast';
import { formatAuthors } from '../../../utils/formatAuthors';

import { GoArrowLeft } from 'react-icons/go';

import BookForm, { BookFormHandle } from '../../../components/BookForm';

import { TUpdateBook } from '../../../@types/Book';
import { IPreSignedURL, TMimeType } from '@/@types/S3';

export default function EditBook() {
  const { signOut } = useAuth();

  const { id } = useParams();
  const navigate = useNavigate();

  const { book, isLoadingBook, bookError, hasError } = useQueryGetBookById(id!);

  const bookFormRef = useRef<BookFormHandle>(null);

  async function handleSubmit(book: TUpdateBook) {
    let data: IPreSignedURL | null = null;

    const { file } = book;

    if (file !== null) {
      data = await BooksService.getPreSignedURL({
        mimeType: file.type as TMimeType,
        fileSize: file.size,
      });
    }

    await BooksService.updateBook({ ...book, imagePath: data?.key });

    if (data !== null && file !== null) {
      await S3Service.uploadImageS3({ preSignedURL: data.url, file });
    }

    emitToast({ type: 'success', message: 'Livro atualizado com sucesso.' });
  }

  useEffect(() => {
    if (book) {
      const authors = formatAuthors({ authors: book.authors });

      const formattedBook = { ...book, authors };

      bookFormRef.current?.setFieldValues(formattedBook);
    }
  }, [book, hasError, navigate]);

  useEffect(() => {
    if (isLoadingBook) {
      bookFormRef.current?.setIsLoading(true);
    } else {
      bookFormRef.current?.setIsLoading(false);
    }
  }, [isLoadingBook]);

  useEffect(() => {
    if (bookError) {
      if (bookError instanceof AxiosError) {
        const errorMessage = bookError.response?.data.message as string;

        if (errorMessage && errorMessage.includes('Invalid access token')) {
          signOut();

          emitToast({
            type: 'error',
            message: 'Suas credenciais expiraram! Faça login novamente.',
          });

          return;
        }
      }
    }

    if (hasError) {
      emitToast({
        type: 'error',
        message: 'Não foi possível encontrar o livro.',
      });

      navigate('/my-books');
    }
  }, [book, bookError, hasError, navigate, signOut]);

  return (
    <div className="animate-fade-in h-full overflow-y-auto">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="text-snow-white hover:text-snow-white-op-70 h-10 transition-colors duration-300 ease-in-out hover:cursor-pointer"
      >
        <GoArrowLeft size={20} />
      </button>

      <BookForm
        ref={bookFormRef}
        type="update"
        onSubmit={handleSubmit}
        validationSchema={UpdateBookSchema}
      />
    </div>
  );
}
