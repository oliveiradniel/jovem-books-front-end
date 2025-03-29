import { CiEdit } from 'react-icons/ci';
import { IBook } from '../../../../@types/Book';

interface ReadingInformationProps {
  book: IBook;
  currentPage: number;
  onFinish: () => void;
}

export default function ReadingInformation({
  book,
  currentPage,
  onFinish,
}: ReadingInformationProps) {
  const isReading = book.status === 'READING' || book.status === 'ON_HOLD';

  const isFinished = book.status === 'FINISHED';

  const currentDate = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    book.status !== 'NOT_READING' && (
      <div className="bg-navy-blue-op-80 text-snow-white-op-70 font-quicksand animate-fade-in-500 mt-5 flex justify-between rounded-lg px-4 py-2 text-sm">
        <div>
          <p className="flex gap-2">
            Leitura {isReading ? 'iniciada' : 'concluída'} em:{' '}
            <span className="text-light-gray font-semibold">
              {isReading && book.createdAt}
              {book.status === 'FINISHED' && (book.updatedAt ?? currentDate)}
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
                {currentPage}
              </span>
            </p>
          )}

          {isReading && (
            <p className="flex gap-2">
              Página atual:
              <span className="text-light-gray font-semibold">
                {currentPage}
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
