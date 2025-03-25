import { Book } from '../../../../../@types/Book';

import TableHeader from './TableHeader';
import TableBody from './TableBoby';
import { RingLoader } from 'react-spinners';

interface TabelBooksProps {
  books: Book[];
  isLoading: boolean;
}

export default function TableBooks({ books, isLoading }: TabelBooksProps) {
  return (
    <div className="relative h-[500px] overflow-y-auto">
      {isLoading && (
        <div className="animate-fade-in absolute flex h-full w-full items-center justify-center">
          <RingLoader color="#03a9f4" />
        </div>
      )}
      <table className="w-full">
        <TableHeader />

        {!isLoading && <TableBody books={books} />}
      </table>
    </div>
  );
}
