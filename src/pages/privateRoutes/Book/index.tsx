/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useQueryGetBookById } from '../../../app/hooks/queries/book/useQueryGetBookById';

import { useAuth } from '../../../app/hooks/useAuth';

import ReadsService from '../../../app/services/ReadsService';

import { emitToast } from '../../../utils/emitToast';

import Actions from './components/Actions';
import Title from './components/Title';
import Authors from './components/Authors';
import Sinopse from './components/Sinopse';
import InformationButton from './components/InformationButton';
import PauseOrPlayButton from './components/PauseOrPlayButton';
import FinishButton from './components/FinishButton';
import BookCover from './components/BookCover';
import ReadingInformation from './components/ReadingInformation';

import FinishBookModal from '../../../components/Modals/FinishBookModal';
import EditCurrentPageModal from '../../../components/Modals/EditCurrentPageModal';

import { IBook, LiteraryGenreKey } from '../../../@types/Book';
import { LITERARY_GENRE_LABELS } from '../../../constants/books';

export default function Book() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useAuth();

  const { bookData, isLoadingBook, isError } = useQueryGetBookById(id!);

  const [book, setBook] = useState({} as IBook);

  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);
  const [isEditReadModalVisible, setIsEditReadModalVisible] = useState(false);

  const isReading =
    book.read?.status === 'READING' || book.read?.status === 'ON_HOLD';

  async function handleStartReading() {
    try {
      const createdRead = await ReadsService.createRead({
        bookId: id!,
        status: 'READING',
        currentPage: 1,
      });

      setBook((prevState) => ({
        ...prevState,
        read: {
          ...createdRead,
        },
      }));

      emitToast({
        type: 'success',
        message: `Boa leitura ${user?.firstName}.`,
      });
    } catch {
      emitToast({
        type: 'error',
        message: `Não foi possível iniciar a leitura do livro ${book.title}.`,
      });
    }
  }

  async function handlePauseOrContinuationReading() {
    const status = book.read?.status;

    const statusDirection = status === 'READING' ? 'ON_HOLD' : 'READING';

    try {
      const updatedRead = await ReadsService.updateRead({
        bookId: id!,
        status: statusDirection,
      });

      setBook((prevState) => ({
        ...prevState,
        read: {
          ...updatedRead,
        },
      }));
    } catch {
      if (status === 'READING') {
        emitToast({
          type: 'error',
          message: `Não foi possível pausar a leitura do livro.`,
        });
      } else if (status === 'ON_HOLD') {
        emitToast({
          type: 'error',
          message: `Não foi possível continuar a leitura do livro.`,
        });
      }
    }
  }

  async function handleFinishReading() {
    try {
      const updatedRead = await ReadsService.updateRead({
        bookId: id!,
        status: 'FINISHED',
      });

      setBook((prevState) => ({
        ...prevState,
        read: {
          ...updatedRead,
        },
      }));
    } catch (error) {
      console.log(error);
    }
  }

  async function handlePagesNumberChange(number: number) {
    try {
      const updatedRead = await ReadsService.updateRead({
        bookId: id!,
        currentPage: number,
      });

      setBook((prevState) => ({
        ...prevState,
        read: {
          ...updatedRead,
        },
      }));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (bookData) {
      setBook(bookData);
    }

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
      <FinishBookModal
        bookTitle={book.title}
        remainingPages={book.numberOfPages! - book.read?.currentPage!}
        isVisible={isConfirmationModalVisible}
        onClose={() => setIsConfirmationModalVisible(false)}
        onConfirm={handleFinishReading}
      />

      <EditCurrentPageModal
        currentPage={book.read?.currentPage ?? null}
        pagesTotalNumber={book.numberOfPages!}
        isVisible={isEditReadModalVisible}
        onClose={() => setIsEditReadModalVisible(false)}
        onConfirm={handlePagesNumberChange}
      />

      <div className="animate-fade-in h-full overflow-y-auto">
        <Actions isLoadingBook={isLoadingBook} />

        <div className="mt-8 flex justify-between gap-4">
          <div className="w-full lg:max-w-[900px]">
            <Title title={book.title} isLoadingBook={isLoadingBook} />

            <Authors authors={book.authors} isLoadingBook={isLoadingBook} />

            <Sinopse text={book.sinopse!} isLoadingBook={isLoadingBook} />

            <div className="mt-4 flex flex-wrap gap-2">
              {book.literaryGenre?.map((literaryGenre, index) => (
                <p
                  key={index}
                  className="text-snow-white/80 bg-navy-blue rounded-lg px-2 py-1 text-[14px] uppercase"
                >
                  {LITERARY_GENRE_LABELS[literaryGenre as LiteraryGenreKey]}
                </p>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-2 sm:flex-row">
              <InformationButton
                status={book.read?.status ?? null}
                onChangeBookStatus={handleStartReading}
                isLoadingBook={isLoadingBook}
              />

              {isReading && !isLoadingBook && (
                <>
                  <PauseOrPlayButton
                    status={book.read?.status ?? null}
                    onClick={handlePauseOrContinuationReading}
                  />

                  <FinishButton
                    onChangeBookStatus={() =>
                      setIsConfirmationModalVisible(true)
                    }
                  />
                </>
              )}
            </div>
          </div>

          <BookCover imagePath={book.imagePath} isLoadingBook={isLoadingBook} />
        </div>

        <ReadingInformation
          book={book}
          isLoadingBook={isLoadingBook}
          onFinish={() => setIsEditReadModalVisible(true)}
        />
      </div>
    </>
  );
}
