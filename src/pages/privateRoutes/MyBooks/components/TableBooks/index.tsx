import { useMemo } from 'react';

import EmptyBooks from '../../../../../assets/images/empty-books.svg?react';

import TableHeader from './TableHeader';
import TableBody from './TableBody';

import { IBookAPI, TBookFilter } from '../../../../../@types/Book';

interface TabelBooksProps {
  filteredBooks: IBookAPI[];
  selectedFilter: TBookFilter;
  isRefetching: boolean;
}

export default function TableBooks({
  filteredBooks,
  selectedFilter,
  isRefetching,
}: TabelBooksProps) {
  const message = useMemo(() => {
    switch (selectedFilter) {
      case 'NOT_READING':
        return 'Todos os livros cadastrados estão em leitura ou finalizados.';
      case 'READING':
        return 'Não há nenhum livro em leitura.';
      case 'FINISHED':
        return 'Não há nenhum livro concluído.';
      default:
        return '';
    }
  }, [selectedFilter]);

  return (
    <div className="relative h-full max-h-[460px]">
      {filteredBooks.length === 0 && (
        <div className="animate-fade-in absolute flex h-full w-full flex-col items-center justify-center">
          <EmptyBooks className="mb-4 w-[30vw] lg:w-[20vw]" />
          <p className="text-light-gray font-quicksand text-center text-[clamp(0.8rem,2vw,1rem)]">
            {message!}
          </p>
        </div>
      )}

      <table className={`w-full`}>
        <TableHeader />

        {filteredBooks.length > 0 && (
          <TableBody books={filteredBooks} isRefetching={isRefetching} />
        )}
      </table>
    </div>
  );
}
