import Card from './Card';

import { IGoogleBookAPI } from '../../../../@types/Book';

interface BooksContainerProps {
  books: IGoogleBookAPI[];
}

export default function BooksContainer({ books }: BooksContainerProps) {
  return (
    <div className="flex max-h-[40rem] flex-1 flex-wrap gap-3 overflow-y-auto sm:gap-4 sm:p-5">
      {books.map((book, index) => (
        <Card key={index} book={book} />
      ))}
    </div>
  );
}
