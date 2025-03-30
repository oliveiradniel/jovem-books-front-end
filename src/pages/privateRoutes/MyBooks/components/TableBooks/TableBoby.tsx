import { truncateString } from '../../../../../utils/truncateString';

import {
  BOOK_LITERARY_GENRE,
  READING_STATUS,
} from '../../../../../constants/books';

import { IBook } from '../../../../../@types/Book';
import { useNavigate } from 'react-router-dom';

interface TableBodyProps {
  books: IBook[];
}

export default function TableBody({ books }: TableBodyProps) {
  const navigate = useNavigate();

  function handleClickOnBookData(bookId: string) {
    navigate(`/book/${bookId}`);
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
            {truncateString(book.authors[0], 10)}{' '}
            {book.authors.length > 1 && `+${book.authors.length - 1}`}
          </td>
          <td className="px-2 py-2 text-center">
            {BOOK_LITERARY_GENRE[book.genreLiterary[0]]}{' '}
            {book.genreLiterary.length > 1 &&
              `+${book.genreLiterary.length - 1}`}
          </td>
          <td className="rounded-tr-lg rounded-br-lg px-2 py-2 text-center">
            <span
              className={`text-snow-white flex items-center justify-center rounded-sm p-1 font-semibold ${book.read?.status === 'READING' && 'bg-ocean-blue'} ${book.read?.status === 'READING' && 'bg-blue-black'} ${book.read?.status === 'FINISHED' && 'bg-royal-blue'} ${book.read?.status === 'ON_HOLD' && 'border-navy-blue border'} ${book.read === null && 'bg-blue-black'}`}
            >
              {book.read === null
                ? 'Não lido'
                : READING_STATUS[book.read?.status]}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
