import Card from './Card';

import { IGoogleBookAPI } from '../../../../@types/Book';

interface BooksContainerProps {
  books: IGoogleBookAPI[];
}

export default function BooksContainer({ books }: BooksContainerProps) {
  return (
    <div className="flex max-h-[40rem] min-h-0 flex-1 flex-wrap justify-center gap-4 overflow-y-auto p-5 sm:justify-start">
      {books.map((book, index) => (
        <Card key={index} book={book} />
      ))}
    </div>
  );
}
