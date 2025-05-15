/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import { formatDate } from '../../../../utils/formatDate';
import { getDaysBetween } from '../../../../utils/getDaysBetween';

import { CiEdit } from 'react-icons/ci';

import SkeletonLoading from '../../../../components/SkeletonLoading';

import { IBookAPI } from '../../../../@types/Book';

interface ReadingInformationProps {
  book: IBookAPI;
  isLoadingBook: boolean;
  onFinish: () => void;
}

export default function ReadingInformation({
  book,
  isLoadingBook,
  onFinish,
}: ReadingInformationProps) {
  const isReading =
    book.read?.status === 'READING' || book.read?.status === 'ON_HOLD';
  const isNotFinished = book.read?.status !== 'FINISHED';
  const isFinished = book.read?.status === 'FINISHED';

  const bookProgress = Number(
    book.read?.currentPage && book.numberOfPages
      ? (book.read?.currentPage! / book.numberOfPages) * 100
      : '0'
  ).toFixed(2);

  const totalDaysToFinish = getDaysBetween({
    startDate: book.read?.createdAt as string,
    endDate: book.read?.finishedAt as string,
  });

  return (
    <div className="bg-navy-blue text-snow-white-op-70 font-quicksand animate-fade-in-500 relative mt-3 flex justify-between rounded-lg px-4 py-2 text-sm sm:mt-5">
      {isLoadingBook ? (
        <SkeletonLoading rounded="lg" />
      ) : (
        <div>
          <p className="flex gap-2">
            {book.read ? (
              <>
                Leitura {isNotFinished ? 'iniciada' : 'concluída'} em:{' '}
                <span className="text-sky-blue font-semibold">
                  {book.read.status !== 'FINISHED' &&
                    formatDate(new Date(book.read.createdAt))}
                  {book.read.status === 'FINISHED' &&
                    formatDate(new Date(book.read?.finishedAt!))}
                </span>
              </>
            ) : (
              <span className="text-sky-blue font-semibold">
                Leitura não iniciada
              </span>
            )}
          </p>
          <p className="flex gap-2">
            Total de páginas:{' '}
            <span className="text-sky-blue font-semibold">
              {book.numberOfPages}
            </span>
          </p>
          {isReading && (
            <p className="flex gap-2">
              Página atual:
              <span className="text-sky-blue font-semibold">
                {book.read?.currentPage!}
              </span>
            </p>
          )}

          {isReading && (
            <p className="flex gap-2">
              Progresso:
              <span className="text-sky-blue font-semibold">
                {bookProgress}%
              </span>
            </p>
          )}

          {isFinished && (
            <p className="flex gap-2">
              Terminado em:
              <span className="text-sky-blue font-semibold">
                {totalDaysToFinish} dias
              </span>
            </p>
          )}
        </div>
      )}

      {!isLoadingBook && book.read && book.read?.status !== 'FINISHED' && (
        <button type="button" onClick={onFinish} className="flex">
          <CiEdit
            size={20}
            className="text-sky-blue transition-opacity duration-300 ease-in-out hover:cursor-pointer hover:opacity-60"
          />
        </button>
      )}
    </div>
  );
}
