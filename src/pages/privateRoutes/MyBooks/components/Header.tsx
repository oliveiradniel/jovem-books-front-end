import { useEffect, useState } from 'react';

import { TBookFilter } from '../../../../@types/Book';

import LargeOptionsMenu from '../components/LargeOptionsMenu';
import Select from '../components/Select';
import { ClipLoader } from 'react-spinners';

interface HeaderProps {
  selectedFilter: TBookFilter;
  numberOfBooks: number;
  numberOfFilteredBooks: number;
  isLoadingBooks: boolean;
  isRefetchingBooks: boolean;
  hasError: boolean;
  onChangeFilter: (selectedFilter: TBookFilter) => void;
}

export default function Header({
  selectedFilter,
  numberOfBooks,
  numberOfFilteredBooks,
  isLoadingBooks,
  isRefetchingBooks,
  hasError,
  onChangeFilter,
}: HeaderProps) {
  const [isTheScreenLargeSized, setIsTheScreenLargeSized] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 1024 && isTheScreenLargeSized) {
      setIsTheScreenLargeSized(false);
    } else if (window.innerWidth > 1024 && !isTheScreenLargeSized) {
      setIsTheScreenLargeSized(true);
    }

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

  return (
    <div className="flex h-[40px] justify-between">
      <div className="flex items-center gap-2">
        {isTheScreenLargeSized ? (
          <LargeOptionsMenu
            selectedFilter={selectedFilter}
            disabled={
              numberOfBooks === 0 ||
              isLoadingBooks ||
              isRefetchingBooks ||
              hasError
            }
            onChange={onChangeFilter}
          />
        ) : (
          <Select
            selectedFilter={selectedFilter}
            disabled={
              isLoadingBooks ||
              isRefetchingBooks ||
              numberOfBooks === 0 ||
              hasError
            }
            onChange={onChangeFilter}
          />
        )}

        {!isLoadingBooks && isRefetchingBooks && (
          <ClipLoader size={18} color="#ffffff" />
        )}
      </div>

      <span
        className={`text-mate-gray flex items-center transition-opacity duration-300 ease-in-out ${!isLoadingBooks && isRefetchingBooks && 'opacity-40'}`}
      >
        {!isLoadingBooks &&
          !hasError &&
          `Total encontrado (${numberOfFilteredBooks})`}
      </span>
    </div>
  );
}
