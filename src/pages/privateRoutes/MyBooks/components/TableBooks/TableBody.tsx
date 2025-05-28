import { useNavigate } from 'react-router-dom';

import Title from './rows/Title';
import Authors from './rows/Authors';
import LiteraryGenre from './rows/LiteraryGenre';
import ReadingStatus from './rows/ReadingStatus';

import { IBookAPI } from '../../../../../@types/Book';

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
          <Title title={book.title} />
          <Authors authors={book.authors} />
          <LiteraryGenre literaryGenre={book.literaryGenre} />
          <ReadingStatus status={book.read?.status} />
        </tr>
      ))}
    </tbody>
  );
}
