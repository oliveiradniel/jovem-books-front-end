import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { truncateString } from '../../../../utils/truncateString';

import { FaBookBookmark } from 'react-icons/fa6';
import { MdLibraryAdd } from 'react-icons/md';

import { IGoogleBookAPI } from '../../../../@types/Book';
import clsx from 'clsx';

interface CardProps {
  book: IGoogleBookAPI;
}

export default function Card({ book }: CardProps) {
  const navigate = useNavigate();

  const [isHoverCard, setIsHoverCard] = useState(false);

  const numberOfAuthors = book.authors?.length;
  const hasAuthors = numberOfAuthors > 0;
  const moreThanOneAuthor = numberOfAuthors > 1;
  const author = hasAuthors && truncateString(book.authors[0], 14);
  const displayAuthor = author
    ? `${author} ${moreThanOneAuthor ? `+${numberOfAuthors}` : ''}`
    : 'Sem informações';

  return (
    <button
      onMouseEnter={() => setIsHoverCard(true)}
      onMouseLeave={() => setIsHoverCard(false)}
      onClick={() => {
        navigate('/new-book', {
          state: { book, cameFromGoogleBooks: true },
        });
      }}
      className="bg-navy-blue/70 animate-fade-in relative flex h-[200px] w-[140px] flex-col items-center justify-evenly gap-2 px-2 shadow-lg transition-all duration-300 ease-in-out hover:cursor-pointer sm:px-4 sm:py-2 md:h-[250px] md:w-[190px] lg:h-[250px] lg:w-[180px]"
    >
      <div
        className={clsx(
          'animate-fade-in absolute top-0 left-0 h-full w-full items-center justify-center',
          isHoverCard ? 'flex' : 'hidden'
        )}
      >
        <div className="relative z-2 flex h-full w-full flex-col items-center justify-center gap-4 bg-black/60 backdrop-blur-[2px]">
          <MdLibraryAdd className="text-white" size={60} />

          <p className="flex text-white sm:hidden">Clique para adicionar</p>
        </div>
        {book.imagePath && (
          <img
            src={book.imagePath}
            alt="Capa do livro"
            className="absolute h-full w-full"
          />
        )}
      </div>

      <p className="font-quicksand flex min-h-6 items-center text-center text-sm text-white/70 md:text-[16px] xl:text-[18px]">
        {truncateString(book.title, 20)}
      </p>

      {book.imagePath ? (
        <div className="border-ocean-blue rounded-full border-2 p-0.5">
          <img
            src={book.imagePath}
            alt="Capa do Livro"
            className="h-[68px] w-[68px] rounded-full object-cover transition-all duration-300 ease-in-out"
          />
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <FaBookBookmark size={60} className="text-white/60" />
        </div>
      )}

      <p className="text-sky-blue font-quicksand text- flex items-center text-center text-sm md:text-[16px] xl:text-[18px]">
        {displayAuthor}
      </p>
    </button>
  );
}
