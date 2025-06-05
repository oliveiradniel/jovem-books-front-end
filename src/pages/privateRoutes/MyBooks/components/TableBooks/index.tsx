import { useMemo } from 'react';

import EmptyBooks from '../../../../../assets/images/empty-books.svg?react';

import TableHeader from './TableHeader';
import TableBody from './TableBody';

import { IBookAPI, TBookFilter } from '../../../../../@types/Book';
import { Table } from '@/components/ui/table';

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
      case 'ON_HOLD':
        return 'Não há nenhum livro em pausa.';
      case 'FINISHED':
        return 'Não há nenhum livro concluído.';
      default:
        return '';
    }
  }, [selectedFilter]);

  return (
    <div className="relative h-full">
      {filteredBooks.length === 0 && (
        <div className="animate-fade-in absolute flex h-full w-full flex-col items-center justify-center">
          <EmptyBooks className="mb-4 w-[30vw] lg:w-[20vw]" />
          <p className="text-snow-white font-quicksand text-center text-[clamp(0.8rem,2vw,1rem)]">
            {message!}
          </p>
        </div>
      )}

      <Table className="table-fixed">
        <TableHeader />
      </Table>

      <div className="max-h-[calc(100vh-260px)] overflow-y-auto">
        <Table>
          {filteredBooks.length > 0 && (
            <TableBody books={filteredBooks} isRefetching={isRefetching} />
          )}
        </Table>
      </div>
    </div>
  );
}
