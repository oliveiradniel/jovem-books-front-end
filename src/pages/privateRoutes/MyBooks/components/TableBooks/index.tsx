import { useMemo } from 'react';

import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';

import TableHeader from './TableHeader';
import TableBody from './TableBody';

import { RingLoader } from 'react-spinners';

import { IBookAPI, TBookFilter } from '../../../../../@types/Book';

interface TabelBooksProps {
  filteredBooks: IBookAPI[];
  selectedFilter: TBookFilter;
  hasError: boolean;
  isLoading: boolean;
  isRefetching: boolean;
  onTryAgain: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<IBookAPI[], Error>>;
}

export default function TableBooks({
  filteredBooks,
  selectedFilter,
  hasError,
  isLoading,
  isRefetching,
  onTryAgain,
}: TabelBooksProps) {
  const message = useMemo(() => {
    switch (selectedFilter) {
      case 'ALL':
        return 'Não há nenhum livro cadastrado, vá até o Dashboard ou Google Books para adicionar novos livros.';
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
    <div className={`relative h-full overflow-y-auto`}>
      {(isLoading || hasError || filteredBooks.length === 0) && (
        <div className="animate-fade-in absolute flex h-full w-full items-center justify-center">
          {isLoading && <RingLoader color="#03a9f4" />}

          {hasError && (
            <div className="flex flex-col gap-6">
              <p className="text-blood-red font-quicksand font-semibold">
                Não foi possível encontrar seus livros.
              </p>

              <button
                type="button"
                onClick={() => onTryAgain()}
                className="text-snow-white bg-blood-red font-roboto hover:bg-blood-red/90 rounded-lg py-2 font-semibold transition-colors duration-300 ease-in-out hover:cursor-pointer"
              >
                Tentar novamente
              </button>
            </div>
          )}

          {!isLoading && filteredBooks.length === 0 && (
            <p className="text-ocean-blue font-quicksand text-center font-semibold">
              {message!}
            </p>
          )}
        </div>
      )}

      <table className={`w-full`}>
        <TableHeader />

        {!isLoading && filteredBooks.length > 0 && (
          <TableBody books={filteredBooks} isRefetching={isRefetching} />
        )}
      </table>
    </div>
  );
}
