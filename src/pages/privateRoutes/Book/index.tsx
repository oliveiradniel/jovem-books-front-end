import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useQueryGetBookById } from '../../../app/hooks/queries/book/useQueryGetBookById';

import { useAuth } from '@/app/hooks/useAuth';

import { AxiosError } from 'axios';

import { emitToast } from '../../../utils/emitToast';

import Actions from './components/Actions';
import Title from './components/Title';
import Authors from './components/Authors';
import Sinopse from './components/Sinopse';
import BookCover from './components/BookCover';
import ReadingInformation from './components/ReadingInformation';

import { LiteraryGenreKey } from '../../../@types/Book';
import { LITERARY_GENRE_LABELS } from '../../../constants/books';
import { useSetDocumentTitle } from '@/app/hooks/useSetDocumentTitle';

export default function Book() {
  const { signOut } = useAuth();

  const { id } = useParams();
  const navigate = useNavigate();

  const { book, isLoadingBook, isRefetchingBook, bookError, hasError } =
    useQueryGetBookById(id!);

  useSetDocumentTitle({ title: book?.title ?? 'Carregando...' });

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
    <>
      <div className="animate-fade-in h-full overflow-y-auto">
        <Actions
          isLoadingBook={isLoadingBook}
          isRefetchingBook={isRefetchingBook}
        />

        <div className="mt-8 flex justify-between gap-4">
          <div className="w-full lg:max-w-[900px]">
            <Title
              title={book?.title as string}
              isLoadingBook={isLoadingBook}
              isRefetchingBook={isRefetchingBook}
            />

            <Authors
              authors={book?.authors as string[]}
              isLoadingBook={isLoadingBook}
              isRefetchingBook={isRefetchingBook}
            />

            <Sinopse
              text={book?.sinopse ?? null}
              isLoadingBook={isLoadingBook}
              isRefetchingBook={isRefetchingBook}
            />

            <div className="mt-4 flex flex-wrap gap-2">
              {book?.literaryGenre?.map((literaryGenre, index) => (
                <p
                  key={index}
                  className={`bg-navy-blue rounded-lg px-2 py-1 text-[14px] text-white/80 uppercase transition-opacity duration-300 ease-in-out ${isRefetchingBook && 'opacity-70'}`}
                >
                  {LITERARY_GENRE_LABELS[literaryGenre as LiteraryGenreKey]}
                </p>
              ))}
            </div>
          </div>

          <BookCover
            imagePath={book?.imagePath ?? null}
            isLoadingBook={isLoadingBook}
            isRefetchingBook={isRefetchingBook}
          />
        </div>

        <ReadingInformation
          bookTitle={book?.title as string}
          numberOfPages={book?.numberOfPages as number}
        />
      </div>
    </>
  );
}
