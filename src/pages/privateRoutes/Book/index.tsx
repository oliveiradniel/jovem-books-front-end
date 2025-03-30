/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { delay } from '../../../utils/delay';
import { formatDate } from '../../../utils/formatDate';

import { books } from '../../../assets/mocks/books';

import { IBook } from '../../../@types/Book';

import ConfirmationModal from './components/Modal/ConfirmationModal';
import EditReadModal from './components/Modal/EditReadModal';

import GoBack from './components/GoBack';
import Title from './components/Title';
import Author from './components/Author';
import Sinopse from './components/Sinopse';
import InformationButton from './components/InformationButton';
import PauseOrPlayButton from './components/PauseOrPlayButton';
import FinishButton from './components/FinishButton';
import BookCover from './components/BookCover';
import ReadingInformation from './components/ReadingInformation';

export default function Book() {
  const [book, setBook] = useState<IBook>({} as IBook);

  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);
  const [isEditReadModalVisible, setIsEditReadModalVisible] = useState(false);

  const { id } = useParams();

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

  function handleStartReading() {
    setBook((prevState) => ({
      ...prevState,
      read: {
        status: 'READING',
        currentPage: 1,
        createdAt: formatDate(new Date()),
        finishedAt: null,
      },
    }));
  }

  function handlePauseOrContinuationReading() {
    const statusDirection =
      book.read?.status === 'READING' ? 'ON_HOLD' : 'READING';

    setBook((prevState) => ({
      ...prevState,
      read: {
        status: statusDirection,
        currentPage: prevState.read?.currentPage!,
        createdAt: prevState.read?.createdAt!,
        finishedAt: null,
      },
    }));
  }

  function handleWithBookCompletion() {
    setBook((prevState) => ({
      ...prevState,
      read: {
        status: 'FINISHED',
        currentPage: prevState.read?.currentPage!,
        createdAt: prevState.read?.createdAt!,
        finishedAt: formatDate(new Date()),
      },
    }));
  }

  function handlePagesNumberChange(number: number) {
    setBook((prevState) => ({
      ...prevState,
      read: {
        status: prevState.read?.status!,
        currentPage: number,
        createdAt: prevState.read?.createdAt!,
        finishedAt: prevState.read?.finishedAt ?? null,
      },
    }));
  }

  function handleSinopseEdit(sinopse: string) {
    setBook((prevState) => ({
      ...prevState,
      sinopse,
    }));
  }

  useEffect(() => {
    async function getBookById() {
      await delay(1000);

      const dataBook = books.find((book) => book.id === id);

      setBook(dataBook as IBook);
    }

    getBookById();
  }, [id]);

  return (
    <>
      <ConfirmationModal
        bookTitle={book.title}
        remainingPages={book.numberOfPages! - book.read?.currentPage!}
        isVisible={isConfirmationModalVisible}
        onClose={() => setIsConfirmationModalVisible(false)}
        onConfirm={handleWithBookCompletion}
      />

      <EditReadModal
        currentPage={book.read?.currentPage ?? null}
        pagesTotalNumber={book.numberOfPages!}
        isVisible={isEditReadModalVisible}
        onClose={() => setIsEditReadModalVisible(false)}
        onConfirm={handlePagesNumberChange}
      />

      <div>
        <GoBack />

        <div className="mt-8 flex justify-between gap-4">
          <div className="max-w-[900px]">
            <Title title={book.title} />

            <Author author={authors} />

            <Sinopse text={book.sinopse!} onSinopseEdit={handleSinopseEdit} />

            <div className="flex gap-2">
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
