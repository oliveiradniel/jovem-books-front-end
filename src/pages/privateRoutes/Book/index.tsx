/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import BooksService from '../../../app/services/BooksService';
import ReadsService from '../../../app/services/ReadsService';

import ConfirmationModal from './components/Modal/ConfirmationModal';
import EditReadModal from './components/Modal/EditReadModal';

import Actions from './components/Actions';
import Title from './components/Title';
import Author from './components/Author';
import Sinopse from './components/Sinopse';
import InformationButton from './components/InformationButton';
import PauseOrPlayButton from './components/PauseOrPlayButton';
import FinishButton from './components/FinishButton';
import BookCover from './components/BookCover';
import ReadingInformation from './components/ReadingInformation';

import { IBook } from '../../../@types/Book';

export default function Book() {
  const [book, setBook] = useState<IBook>({} as IBook);

  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);
  const [isEditReadModalVisible, setIsEditReadModalVisible] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const isReading =
    book.read?.status === 'READING' || book.read?.status === 'ON_HOLD';

  let authors = '';
  book.authors?.forEach((author, index) => {
    if (book.authors.length === 1) {
      authors = author;
      return;
    }

    if (index === book.authors.length - 1) {
      authors += `e ${author}`;
      return;
    }

    if (index === book.authors.length - 2) {
      authors += `${author} `;
      return;
    }

    authors += `${author}, `;
  });

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
    } catch (error) {
      console.log(error);
    }
  }

  async function handlePauseOrContinuationReading() {
    try {
      const statusDirection =
        book.read?.status === 'READING' ? 'ON_HOLD' : 'READING';

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
    } catch (error) {
      console.log(error);
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

  async function handleSinopseEdit(sinopse: string) {
    const updatedBook = await BooksService.updateBook({ id: id!, sinopse });

    setBook(updatedBook);
  }

  useEffect(() => {
    async function loadBook() {
      try {
        const bookData = await BooksService.getBookById(id!);

        setBook(bookData);
      } catch {
        navigate('/my-books');
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
        <Actions />

        <div className="mt-8 flex justify-between gap-4">
          <div className="max-w-[900px]">
            <Title title={book.title} />

            <Author author={authors} />

            <Sinopse text={book.sinopse!} onSinopseEdit={handleSinopseEdit} />

            <div className="mt-8 flex flex-col gap-2 sm:flex-row">
              <InformationButton
                status={book.read?.status ?? null}
                onChangeBookStatus={handleStartReading}
              />

              {isReading && (
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

          <BookCover imagePath={book.imagePath} />
        </div>

        <ReadingInformation
          book={book}
          onFinish={() => setIsEditReadModalVisible(true)}
        />
      </div>
    </>
  );
}
