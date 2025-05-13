import { useEffect, useState } from 'react';

import { TBookFilter } from '../../../../@types/Book';

import LargeOptionsMenu from '../components/LargeOptionsMenu';
import Select from '../components/Select';

interface HeaderProps {
  selectedFilter: TBookFilter;
  numberOfBooks: number;
  numberOfFilteredBooks: number;
  isLoadingBooks: boolean;
  hasError: boolean;
  onChangeFilter: (selectedFilter: TBookFilter) => void;
}

export default function Header({
  selectedFilter,
  numberOfBooks,
  numberOfFilteredBooks,
  isLoadingBooks,
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
      {isTheScreenLargeSized ? (
        <LargeOptionsMenu
          selectedFilter={selectedFilter}
          disabled={numberOfBooks === 0 || isLoadingBooks || hasError}
          onChange={onChangeFilter}
        />
      ) : (
        <Select
          selectedFilter={selectedFilter}
          disabled={isLoadingBooks || numberOfBooks === 0 || hasError}
          onChange={onChangeFilter}
        />
      )}

      <span className="text-mate-gray flex items-center">
        {!isLoadingBooks &&
          !hasError &&
          `Total encontrado (${numberOfFilteredBooks})`}
      </span>
    </div>
  );
}
