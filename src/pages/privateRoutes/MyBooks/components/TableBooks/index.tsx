import { RingLoader } from 'react-spinners';

import TableHeader from './TableHeader';
import TableBody from './TableBoby';

import { IBook } from '../../../../../@types/Book';
import { Page } from '../../@types/Page';

interface TabelBooksProps {
  books: IBook[];
  filteredBooks: IBook[];
  page: Page;
  isLoading: boolean;
}

export default function TableBooks({
  books,
  filteredBooks,
  page,
  isLoading,
}: TabelBooksProps) {
  let message: string;

  if (page === 'ALL') {
    message =
      'Não há nenhum livro cadastrado, vá até o Dashboard para adicionar novos livros.';
  } else if (page === 'NOT_READING') {
    message = 'Todos os livros cadastrados estão em leitura ou finalizados.';
  } else if (page === 'READING') {
    message = 'Não há nenhum livro em leitura.';
  } else {
    message = 'Não há nenhum livro concluído.';
  }

  return (
    <div
      className={`relative h-[500px] ${books.length > 0 ? 'overflow-y-auto' : 'overflow-hidden'}`}
    >
      {isLoading && (
        <div className="animate-fade-in absolute flex h-full w-full items-center justify-center">
          <RingLoader color="#03a9f4" />
        </div>
      )}

      {filteredBooks.length === 0 && (
        <div className="animate-fade-in absolute top-20 flex w-full justify-center">
          <span className="text-ocean-blue font-quicksand font-semibold">
            {message}
          </span>
        </div>
      )}

      <table className="w-full">
        <TableHeader />

        {!isLoading && <TableBody books={filteredBooks} />}
      </table>
    </div>
  );
}
