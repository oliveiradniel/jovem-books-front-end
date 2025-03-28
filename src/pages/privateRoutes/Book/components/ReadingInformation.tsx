import { CiEdit } from 'react-icons/ci';
import { Book } from '../../../../@types/Book';

interface ReadingInformationProps {
  book: Book;
  currentPage: number;
  onFinish: () => void;
}

export default function ReadingInformation({
  book,
  currentPage,
  onFinish,
}: ReadingInformationProps) {
  const isReading = book.status === 'READING' || book.status === 'ON_HOLD';

  return (
    book.status !== 'NOT_READING' && (
      <div className="bg-navy-blue-op-80 text-snow-white-op-70 font-quicksand animate-fade-in-500 mt-5 flex justify-between rounded-lg px-4 py-2 text-sm">
        <div>
          <p className="flex gap-2">
            Leitura {isReading ? 'iniciada' : 'concluída'} em:{' '}
            <span className="text-light-gray font-semibold">
              {isReading && book.createdAt}
              {book.status === 'FINISHED' && book.updatedAt}
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
              <p>Página atual: </p>{' '}
              <span className="text-light-gray font-semibold">
                {currentPage}
              </span>
            </p>
          )}
        </div>

        {book.status !== 'FINISHED' && (
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
