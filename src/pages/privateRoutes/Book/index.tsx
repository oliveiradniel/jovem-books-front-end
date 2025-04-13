/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAuth } from '../../../app/hooks/useAuth';

import BooksService from '../../../app/services/BooksService';
import ReadsService from '../../../app/services/ReadsService';

import { emitToast } from '../../../utils/emitToast';

import ConfirmationModal from './components/Modal/ConfirmationModal';
import EditReadModal from './components/Modal/EditReadModal';

import Actions from './components/Actions';
import Title from './components/Title';
import Authors from './components/Authors';
import Sinopse from './components/Sinopse';
import InformationButton from './components/InformationButton';
import PauseOrPlayButton from './components/PauseOrPlayButton';
import FinishButton from './components/FinishButton';
import BookCover from './components/BookCover';
import ReadingInformation from './components/ReadingInformation';

import { IBook } from '../../../@types/Book';

export default function Book() {
  const { user } = useAuth();

  const [book, setBook] = useState({} as IBook);

  const [isLoading, setIsLoading] = useState(true);

  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);
  const [isEditReadModalVisible, setIsEditReadModalVisible] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

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
    async function loadBook() {
      try {
        setIsLoading(true);

        const bookData = await BooksService.getBookById({
          id: id!,
          onlyCommas: false,
        });

        setBook(bookData);
      } catch {
        emitToast({
          type: 'error',
          message: 'Não foi possível encontrar o livro.',
        });

        navigate('/my-books');
      } finally {
        setIsLoading(false);
      }
    }

    loadBook();
  }, [id, navigate]);

  return (
    <>
      <ConfirmationModal
        bookTitle={book.title}
        remainingPages={book.numberOfPages! - book.read?.currentPage!}
        isVisible={isConfirmationModalVisible}
        onClose={() => setIsConfirmationModalVisible(false)}
        onConfirm={handleFinishReading}
      />

      <EditReadModal
        currentPage={book.read?.currentPage ?? null}
        pagesTotalNumber={book.numberOfPages!}
        isVisible={isEditReadModalVisible}
        onClose={() => setIsEditReadModalVisible(false)}
        onConfirm={handlePagesNumberChange}
      />

      <div>
        <Actions isLoadingBook={isLoading} />

        <div className="mt-8 flex justify-between gap-4">
          <div className="w-full lg:max-w-[900px]">
            <Title title={book.title} isLoadingBook={isLoading} />

            <Authors authors={book.authors} isLoadingBook={isLoading} />

            <Sinopse text={book.sinopse!} isLoadingBook={isLoading} />

            <div className="mt-8 flex flex-col gap-2 sm:flex-row">
              <InformationButton
                status={book.read?.status ?? null}
                onChangeBookStatus={handleStartReading}
                isLoadingBook={isLoading}
              />

              {isReading && !isLoading && (
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

          <BookCover imagePath={book.imagePath} isLoadingBook={isLoading} />
        </div>

        <ReadingInformation
          book={book}
          isLoadingBook={isLoading}
          onFinish={() => setIsEditReadModalVisible(true)}
        />
      </div>
    </>
  );
}
