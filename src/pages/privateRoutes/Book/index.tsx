import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { delay } from '../../../utils/delay';

import { books } from '../../../assets/mocks/books';

import { Book as IBook, ReadingStatus } from '../../../@types/Book';

import ConfirmationModal from './components/ConfirmationModal';
import EditModal from './components/EditModal';
import GoBack from './components/GoBack';
import Title from './components/Title';
import Author from './components/Author';
import Sinopse from './components/Sinopse';
import InformationButton from './components/InformationButton';
import PauseOrPlayButton from './components/PauseOrPlayButton';
import FinishButton from './components/Finish';
import BookCover from './components/BookCover';
import ReadingInformation from './components/ReadingInformation';

export default function Book() {
  const [book, setBook] = useState<IBook>({} as IBook);

  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const { id } = useParams();

  const currentPage = book.currentPage === null ? 0 : book.currentPage;

  const isReading = book.status === 'READING' || book.status === 'ON_HOLD';

  const date = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  function handleChangeBookStatus(status: ReadingStatus) {
    let newBook = { ...book, status };

    if (status === 'READING') {
      newBook = { ...newBook, createdAt: date };
    }

    if (status === 'FINISHED') {
      setIsConfirmationModalVisible(true);
      return;
    }

    setBook(newBook as IBook);
  }

  function handlePauseOrContinuationReading() {
    if (book.status === 'READING') {
      handleChangeBookStatus('ON_HOLD');
    } else if (book.status === 'ON_HOLD') {
      handleChangeBookStatus('READING');
    }
  }

  function handleWithBookCompletion() {
    const newBook = {
      ...book,
      status: 'FINISHED' as ReadingStatus,
      updatedAt: date,
    };

    setBook(newBook);
  }

  function handlePagesNumberChange(number: number) {
    const newBook = { ...book, currentPage: number };

    setBook(newBook);
  }

  useEffect(() => {
    async function getBookById() {
      await delay(1000);

      const dataBook = books.find((book) => book.id === Number(id));

      setBook(dataBook as IBook);
    }

    getBookById();
  }, [id]);

  return (
    <>
      <ConfirmationModal
        bookTitle={book.title}
        remainingPages={book.numberOfPages - currentPage}
        isVisible={isConfirmationModalVisible}
        onClose={() => setIsConfirmationModalVisible(false)}
        onConfirm={handleWithBookCompletion}
      />

      <EditModal
        currentPage={book.currentPage}
        pagesTotalNumber={book.numberOfPages}
        isVisible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        onConfirm={handlePagesNumberChange}
      />

      <div>
        <GoBack />

        <div className="mt-8 flex justify-between gap-4">
          <div className="max-w-[900px]">
            <Title title={book.title} />

            <Author author={book.author} />

            <Sinopse sinopse={book.sinopse} />

            <div className="flex gap-2">
              <InformationButton
                status={book.status}
                onChangeBookStatus={handleChangeBookStatus}
              />

              {isReading && (
                <>
                  <PauseOrPlayButton
                    status={book.status}
                    onPauseOrContinuationReading={
                      handlePauseOrContinuationReading
                    }
                  />

                  <FinishButton onChangeBookStatus={handleChangeBookStatus} />
                </>
              )}
            </div>
          </div>

          <BookCover imagePath={book.imagePath} />
        </div>

        <ReadingInformation
          book={book}
          currentPage={currentPage}
          onFinish={() => setIsEditModalVisible(true)}
        />
      </div>
    </>
  );
}
