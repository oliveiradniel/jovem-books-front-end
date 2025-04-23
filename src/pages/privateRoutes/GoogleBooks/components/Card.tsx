import { truncateString } from '../../../../utils/truncateString';

import { IBookAPI } from '../../../../@types/Book';

import { FaBookBookmark } from 'react-icons/fa6';

interface CardProps {
  book: IBookAPI;
}

export default function Card({ book }: CardProps) {
  const hasAuthors = book.authors?.length > 0;
  const author = hasAuthors && truncateString(book.authors[0], 14);

  return (
    <div className="bg-navy-blue/70 flex h-[250px] w-[180px] flex-col items-center gap-6 px-4 py-2 shadow-lg">
      <p className="text-snow-white/70 font-quicksand flex h-12 items-center text-center">
        {truncateString(book.title, 28)}
      </p>

      {book.imagePath ? (
        <div className="border-ocean-blue rounded-full border-2 p-0.5">
          <img
            src={book.imagePath}
            alt="Capa do Livro"
            className="h-24 w-24 rounded-full object-cover"
          />
        </div>
      ) : (
        <div className="flex h-24 w-24 items-center justify-center">
          <FaBookBookmark size={60} color="#ffffff50" />
        </div>
      )}

      <p className="text-snow-white/70 font-quicksand flex h-12 items-center text-center text-sm">
        {author ? author : 'Sem informações'}
      </p>
    </div>
  );
}
