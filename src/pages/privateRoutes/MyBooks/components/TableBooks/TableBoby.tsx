import { truncateString } from '../../../../../utils/truncateString';

import {
  BOOK_LITERARY_GENRE,
  READING_STATUS,
} from '../../../../../constants/books';

import { Book } from '../../../../../@types/Book';

interface TableBodyProps {
  books: Book[];
}

export default function TableBody({ books }: TableBodyProps) {
  function handleClickOnBookData(bookId: string) {
    console.log(bookId);
  }

  return (
    <tbody className="text-mate-gray font-quicksand">
      {books.map((book) => (
        <tr
          role="button"
          tabIndex={0}
          key={book.id}
          onClick={() => handleClickOnBookData(String(book.id))}
          className="border-navy-blue hover:bg-navy-blue-op-40 border-b hover:cursor-pointer"
        >
          <td className="rounded-tl-lg rounded-bl-lg px-2 py-2 text-center">
            {truncateString(book.title, 10)}
          </td>
          <td className="px-2 py-2 text-center">
            {truncateString(book.author, 10)}
          </td>
          <td className="px-2 py-2 text-center">
            {BOOK_LITERARY_GENRE[book.genreLiterary]}
          </td>
          <td className="rounded-tr-lg rounded-br-lg px-2 py-2 text-center">
            <span
              className={`text-snow-white flex items-center justify-center rounded-sm p-1 font-semibold ${book.status === 'READING' && 'bg-ocean-blue'} ${book.status === 'READING' && 'bg-blue-black'} ${book.status === 'FINISHED' && 'bg-royal-blue'} ${book.status === 'ON_HOLD' && 'border-navy-blue border'} ${book.status === 'NOT_READING' && 'bg-blue-black'}`}
            >
              {READING_STATUS[book.status]}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
