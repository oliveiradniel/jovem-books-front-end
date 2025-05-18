import { useNavigate } from 'react-router-dom';

import { truncateString } from '../../../../../utils/truncateString';

import {
  LITERARY_GENRE_LABELS,
  READING_STATUS,
} from '../../../../../constants/books';

import { IBookAPI, LiteraryGenreKey } from '../../../../../@types/Book';

interface TableBodyProps {
  books: IBookAPI[];
  isRefetching: boolean;
}

export default function TableBody({ books, isRefetching }: TableBodyProps) {
  const navigate = useNavigate();

  function handleClickOnBookData(bookId: string) {
    if (isRefetching) return;

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
          className={`border-navy-blue border-b transition-colors duration-400 ease-in-out ${isRefetching ? 'cursor-default' : 'hover:bg-navy-blue/40 cursor-pointer'}`}
        >
          <td className="rounded-tl-lg rounded-bl-lg px-2 py-2 text-center">
            {truncateString(book.title, 10)}
          </td>
          <td className="px-2 py-2 text-center">
            {truncateString(book.authors[0], 10)}{' '}
            {book.authors.length > 1 && `+${book.authors.length - 1}`}
          </td>
          <td className="px-2 py-2 text-center">
            {LITERARY_GENRE_LABELS[book.literaryGenre[0] as LiteraryGenreKey]}{' '}
            {book.literaryGenre.length > 1 &&
              `+${book.literaryGenre.length - 1}`}
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
