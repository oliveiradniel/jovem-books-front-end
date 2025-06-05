import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { truncateString } from '../../../../utils/truncateString';

import { FaBookBookmark } from 'react-icons/fa6';

import { IGoogleBookAPI } from '../../../../@types/Book';

interface CardProps {
  book: IGoogleBookAPI;
}

export default function Card({ book }: CardProps) {
  const navigate = useNavigate();

  const [isFocused, setIsFocused] = useState(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const numberOfAuthors = book.authors?.length;
  const hasAuthors = numberOfAuthors > 0;
  const moreThanOneAuthor = numberOfAuthors - 1 > 0;
  const author =
    hasAuthors && truncateString(book.authors[0], windowWidth < 900 ? 10 : 14);
  const displayAuthor = author
    ? `${author} ${moreThanOneAuthor ? `+${numberOfAuthors}` : ''}`
    : 'Sem informações';

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      className="bg-navy-blue/70 animate-fade-in relative flex h-[clamp(6vw,32vw,250px)] w-[clamp(5vw,24vw,180px)] flex-col items-center justify-evenly gap-2 shadow-lg transition-all duration-300 ease-in-out hover:cursor-pointer sm:px-4 sm:py-2 lg:h-[250px] lg:w-[180px]"
    >
      {isFocused && (
        <div
          role="button"
          tabIndex={0}
          onClick={() =>
            navigate('/new-book', {
              state: { ...book, imagePath: null },
            })
          }
          className="text-sky-blue animate-fade-in absolute top-0 left-0 flex h-full w-full items-center justify-center"
        >
          <div className="relative z-2 flex h-full w-full items-center justify-center bg-black/60 backdrop-blur-[4px]">
            <p className="font-roboto text-snow-white absolute z-3 mx-3 rounded-sm text-center text-[clamp(10px,2vw,16px)] font-semibold">
              CLIQUE PARA ADICIONAR
            </p>
          </div>
          {book.imagePath && (
            <img
              src={book.imagePath}
              alt="Capa do livro"
              className="absolute h-full w-full"
            />
          )}
        </div>
      )}

      <p className="text-snow-white/70 font-quicksand flex min-h-6 items-center text-center text-[clamp(0.6rem,0.8rem,1rem)] sm:min-h-13 sm:text-[clamp(0.8rem,1rem,1rem)]">
        {truncateString(
          book.title,
          windowWidth < 720 ? 14 : windowWidth < 900 ? 20 : 28
        )}
      </p>

      {book.imagePath ? (
        <div className="border-ocean-blue rounded-full border-2 p-0.5">
          <img
            src={book.imagePath}
            alt="Capa do Livro"
            className={`rounded-full object-cover transition-all duration-300 ease-in-out ${windowWidth < 720 ? 'h-13 w-13' : windowWidth < 900 ? 'h-16 w-16' : 'h-24 w-24'}`}
          />
        </div>
      ) : (
        <div
          className={`flex items-center justify-center ${windowWidth < 720 ? 'h-13 w-13' : windowWidth < 900 ? 'h-16 w-16' : 'h-24 w-24'}`}
        >
          <FaBookBookmark
            size={windowWidth < 720 ? 30 : windowWidth < 900 ? 40 : 60}
            color="#ffffff50"
          />
        </div>
      )}

      <p className="text-sky-blue font-quicksand text- flex items-center text-center text-[clamp(0.4rem,0.8rem,1rem)] sm:h-12 sm:min-h-10 sm:text-[clamp(0.8rem,1rem,1rem)]">
        {displayAuthor}
      </p>
    </div>
  );
}
