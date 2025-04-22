import { RingLoader } from 'react-spinners';

import TableHeader from './TableHeader';
import TableBody from './TableBoby';

import { IBookAPI } from '../../../../../@types/Book';
import { TPageStatus } from '../../../../../@types/Read';

interface TabelBooksProps {
  books: IBookAPI[];
  filteredBooks: IBookAPI[];
  onLoadBooks: () => void;
  page: TPageStatus;
  isLoading: boolean;
  isError: boolean;
}

export default function TableBooks({
  books,
  onLoadBooks,
  filteredBooks,
  page,
  isLoading,
  isError,
}: TabelBooksProps) {
  let message: string;

  const allBooks = page === 'ALL';
  const unreadBooks = page === 'NOT_READING';
  const booksInReading = page === 'READING';
  const finishedBooks = page === 'FINISHED';

  if (allBooks) {
    message =
      'Não há nenhum livro cadastrado, vá até o Dashboard para adicionar novos livros.';
  } else if (unreadBooks) {
    message = 'Todos os livros cadastrados estão em leitura ou finalizados.';
  } else if (booksInReading) {
    message = 'Não há nenhum livro em leitura.';
  } else if (finishedBooks) {
    message = 'Não há nenhum livro concluído.';
  }

  return (
    <div
      className={`relative ${books && books.length > 0 ? 'overflow-y-auto' : 'overflow-hidden'}`}
    >
      {isLoading && (
        <div className="animate-fade-in absolute flex h-full w-full items-center justify-center">
          <RingLoader color="#03a9f4" />
        </div>
      )}

      {!isLoading && filteredBooks && filteredBooks.length === 0 && (
        <div className="animate-fade-in absolute top-20 flex w-full justify-center">
          {isError ? (
            <div className="flex flex-col gap-6">
              <p className="text-blood-red font-quicksand font-semibold">
                Não foi possível encontrar seus livros.
              </p>

              <button
                type="button"
                onClick={onLoadBooks}
                className="text-snow-white bg-blood-red font-roboto hover:bg-blood-red/80 rounded-lg py-2 font-semibold transition-colors duration-300 ease-in-out hover:cursor-pointer"
              >
                Tentar novamente
              </button>
            </div>
          ) : (
            <p className="text-ocean-blue font-quicksand font-semibold">
              {message!}
            </p>
          )}
        </div>
      )}

      <table className="w-full">
        <TableHeader />

        {!isLoading && books && <TableBody books={filteredBooks} />}
      </table>
    </div>
  );
}
