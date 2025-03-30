/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import { CiEdit } from 'react-icons/ci';
import { IBook } from '../../../../@types/Book';
import { formatDate } from '../../../../utils/formatDate';

interface ReadingInformationProps {
  book: IBook;
  onFinish: () => void;
}

export default function ReadingInformation({
  book,
  onFinish,
}: ReadingInformationProps) {
  const isReading =
    book.read?.status === 'READING' || book.read?.status === 'ON_HOLD';

  const isFinished = book.read?.status === 'FINISHED';

  return (
    book.read !== null && (
      <div className="bg-navy-blue-op-80 text-snow-white-op-70 font-quicksand animate-fade-in-500 mt-3 flex justify-between rounded-lg px-4 py-2 text-sm sm:mt-5">
        <div>
          <p className="flex gap-2">
            Leitura {isReading ? 'iniciada' : 'concluída'} em:{' '}
            <span className="text-light-gray font-semibold">
              {isReading && book.read.createdAt}
              {book.read?.status === 'FINISHED' &&
                (book.read?.finishedAt ?? formatDate(new Date()))}
            </span>
          </p>
          <p className="flex gap-2">
            Total de páginas:{' '}
            <span className="text-light-gray font-semibold">
              {book.numberOfPages}
            </span>
          </p>
          {isReading && (
            <p className="flex gap-2">
              Página atual:
              <span className="text-light-gray font-semibold">
                {book.read?.currentPage!}
              </span>
            </p>
          )}

          {isReading && book.numberOfPages && (
            <p className="flex gap-2">
              Progresso:
              <span className="text-light-gray font-semibold">
                {((book.read.currentPage / book.numberOfPages) * 100).toFixed(
                  2
                )}
                %
              </span>
            </p>
          )}

          {isFinished && (
            <p className="flex gap-2">
              Terminado em:
              <span className="text-light-gray font-semibold">10 dias</span>
            </p>
          )}
        </div>

        {book.read?.status !== 'FINISHED' && (
          <button type="button" onClick={onFinish} className="flex">
            <CiEdit
              size={20}
              className="text-sky-blue transition-opacity duration-300 ease-in-out hover:cursor-pointer hover:opacity-60"
            />
          </button>
        )}
      </div>
    )
  );
}
