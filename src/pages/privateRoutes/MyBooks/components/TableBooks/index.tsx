import { Book } from '../../../../../@types/Book';

import TableHeader from './TableHeader';
import TableBody from './TableBoby';

interface TabelBooksProps {
  books: Book[];
  isLoading: boolean;
}

export default function TableBooks({ books, isLoading }: TabelBooksProps) {
  return (
    <div className="h-[500px] overflow-y-auto">
      <table className="w-full">
        <TableHeader />

        {!isLoading && <TableBody books={books} />}
      </table>
    </div>
  );
}
