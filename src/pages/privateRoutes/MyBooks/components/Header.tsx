import { useEffect, useState } from 'react';

import { Page } from '../@types/Page';

import LargeOptionsMenu from '../components/LargeOptionsMenu';
import Select from '../components/Select';

interface HeaderProps {
  page: Page;
  numberOfBooks: number;
  numberOfFilteredBooks: number;
  isLoading: boolean;
  isError: boolean;
  onChangePage: (page: Page) => void;
}

export default function Header({
  page,
  numberOfBooks,
  numberOfFilteredBooks,
  isLoading,
  isError,
  onChangePage,
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
          page={page}
          disabled={isLoading || numberOfBooks === 0 || isError}
          onChange={onChangePage}
        />
      ) : (
        <Select
          page={page}
          disabled={isLoading || numberOfBooks === 0 || isError}
          onChangePage={onChangePage}
        />
      )}

      <span className="text-mate-gray animate-fade-in flex items-center">
        {!isLoading && !isError && (
          <span className="animate-fade-in">
            Total encontrado ({numberOfFilteredBooks})
          </span>
        )}
      </span>
    </div>
  );
}
