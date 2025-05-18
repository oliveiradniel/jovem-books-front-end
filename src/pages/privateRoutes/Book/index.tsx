import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useQueryGetBookById } from '../../../app/hooks/queries/book/useQueryGetBookById';

import { emitToast } from '../../../utils/emitToast';

import Actions from './components/Actions';
import Title from './components/Title';
import Authors from './components/Authors';
import Sinopse from './components/Sinopse';
import BookCover from './components/BookCover';
import ReadingInformation from './components/ReadingInformation';

import { LiteraryGenreKey } from '../../../@types/Book';
import { LITERARY_GENRE_LABELS } from '../../../constants/books';

export default function Book() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { bookData, isLoadingBook, isRefetchingBook, isError } =
    useQueryGetBookById(id!);

  useEffect(() => {
    if (isError) {
      emitToast({
        type: 'error',
        message: 'Não foi possível encontrar o livro.',
      });

      navigate('/my-books');
    }
  }, [bookData, isError, navigate]);

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
              title={bookData?.title as string}
              isLoadingBook={isLoadingBook}
              isRefetchingBook={isRefetchingBook}
            />

            <Authors
              authors={bookData?.authors as string[]}
              isLoadingBook={isLoadingBook}
              isRefetchingBook={isRefetchingBook}
            />

            <Sinopse
              text={bookData?.sinopse ?? null}
              isLoadingBook={isLoadingBook}
              isRefetchingBook={isRefetchingBook}
            />

            <div className="mt-4 flex flex-wrap gap-2">
              {bookData?.literaryGenre?.map((literaryGenre, index) => (
                <p
                  key={index}
                  className={`text-snow-white/80 bg-navy-blue rounded-lg px-2 py-1 text-[14px] uppercase transition-opacity duration-300 ease-in-out ${isRefetchingBook && 'opacity-70'}`}
                >
                  {LITERARY_GENRE_LABELS[literaryGenre as LiteraryGenreKey]}
                </p>
              ))}
            </div>
          </div>

          <BookCover
            imagePath={bookData?.imagePath ?? null}
            isLoadingBook={isLoadingBook}
            isRefetchingBook={isRefetchingBook}
          />
        </div>

        <ReadingInformation
          bookTitle={bookData?.title as string}
          numberOfPages={bookData?.numberOfPages as number}
        />
      </div>
    </>
  );
}
