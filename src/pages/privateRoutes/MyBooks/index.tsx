import { useEffect, useState } from 'react';

import { truncateString } from '../../../utils/truncateString';

import { books } from '../../../assets/mocks/books';

import { BOOK_LITERARY_GENRE, READING_STATUS } from '../../../constants/books';

import { Page } from './@types/Page';

import LargeOptionsMenu from './components/LargeOptionsMenu';
import Select from './components/Select';
import Options from './components/Select/Options';

export default function MyBooks() {
  const [isTheScreenLargeSized, setIsTheScreenLargeSized] = useState(false);
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);

  const [page, setPage] = useState<
    'ALL' | 'NOT_READING' | 'READING' | 'FINISHED'
  >('ALL');

  function handleTogglingOfOptionsVisibility() {
    setIsOptionsVisible((prevState) => !prevState);
  }

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1024 && isTheScreenLargeSized) {
        setIsTheScreenLargeSized(false);
      } else if (window.innerWidth > 1024 && !isTheScreenLargeSized) {
        setIsTheScreenLargeSized(true);
      }
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isTheScreenLargeSized]);

  useEffect(() => {
    function handleClickOutsideTheSelect(event: MouseEvent) {
      const target = event.target as HTMLElement;

      const clickTheSelect = target.closest('#select');
      const clickTheOptions = target.closest('#options');

      if (!clickTheSelect && !clickTheOptions) {
        setIsOptionsVisible(false);
      }
    }

    document.addEventListener('click', handleClickOutsideTheSelect);

    return () => {
      document.removeEventListener('click', handleClickOutsideTheSelect);
    };
  }, [isOptionsVisible]);

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-quicksand text-snow-white text-2xl">Meus Livros</h1>
        <p className="font-quicksand text-snow-white text-xl font-bold">
          Bom dia!
        </p>
      </div>

      <div className="bg-blue-black-op-80 mt-3 p-5">
        <div className="flex h-[40px] justify-between">
          {isTheScreenLargeSized ? (
            <LargeOptionsMenu />
          ) : (
            <Select
              page={page}
              isOptionsVisible={isOptionsVisible}
              onTogglingOfOptionsVisibility={handleTogglingOfOptionsVisibility}
            >
              <Options
                page={page}
                isOptionsVisible={isOptionsVisible}
                onSelect={(page: Page) => setPage(page)}
              />
            </Select>
          )}

          <span className="text-mate-gray flex items-center">
            Total encontrado (10)
          </span>
        </div>

        <div className="bg-light-gray-op-40 mt-4 mb-4 h-[0.1px] w-full" />

        <div className="bg-navy-blue-op-80 text-mate-gray font-roboto flex justify-around rounded-lg p-2 font-bold">
          <span>Título</span>
          <span>Autores(as)</span>
          <span>Gênero Literário</span>
          <span>Status</span>
        </div>

        <div className="h-full overflow-auto">
          {books.map((book) => (
            <div
              key={book.id}
              className="text-mate-gray font-roboto flex justify-around border-b p-2 text-sm last:border-0"
            >
              <span className="w-20">{truncateString(book.title, 9)}</span>
              <span className="w-20 whitespace-nowrap">
                {truncateString(book.author, 9)}
              </span>
              <span className="w-20">
                {BOOK_LITERARY_GENRE[book.genreLiterary] || '-'}
              </span>
              <span
                className={`rounded-sm p-1 ${book.status === 'NOT_READING' && 'bg-blue-black'} ${book.status === 'READING' && 'bg-ocean-blue'} ${book.status === 'READING' && 'bg-blue-black'} ${book.status === 'FINISHED' && 'bg-sky-blue'} `}
              >
                {READING_STATUS[book.status]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
