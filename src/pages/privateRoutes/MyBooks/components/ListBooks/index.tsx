import { truncateString } from '../../../../../utils/truncateString';

import {
  BOOK_LITERARY_GENRE,
  READING_STATUS,
} from '../../../../../constants/books';

import { Book } from '../../../../../@types/Book';

interface ListBooksProps {
  books: Book[];
}

export default function ListBooks({ books }: ListBooksProps) {
  return (
    <div className="animate-fade-in h-[460px] overflow-y-auto">
      {books.map((book) => (
        <div
          key={book.id}
          className="text-mate-gray font-roboto flex justify-around border-b p-2 text-sm last:border-0"
        >
          <span className="font-quicksand w-20">
            {truncateString(book.title, 9)}
          </span>
          <span className="font-quicksand w-20 whitespace-nowrap">
            {truncateString(book.author, 9)}
          </span>
          <span className="font-quicksand w-20">
            {BOOK_LITERARY_GENRE[book.genreLiterary] || '-'}
          </span>
          <span
            className={`font-quicksand w-[80px] rounded-sm p-1 text-center font-bold ${book.status === 'NOT_READING' && 'bg-blue-black'} ${book.status === 'READING' && 'bg-ocean-blue'} ${book.status === 'READING' && 'bg-blue-black'} ${book.status === 'FINISHED' && 'bg-royal-blue'} ${book.status === 'ON_HOLD' && 'border-navy-blue border'}`}
          >
            {READING_STATUS[book.status]}
          </span>
        </div>
      ))}
    </div>
  );
}
