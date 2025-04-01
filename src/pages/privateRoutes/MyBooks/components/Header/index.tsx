import { useEffect, useState } from 'react';

import { Page } from '../../@types/Page';

import LargeOptionsMenu from '../LargeOptionsMenu';
import Select from '../Select';

interface HeaderProps {
  page: Page;
  numberOfBooks: number;
  numberOfFilteredBooks: number;
  isLoading: boolean;
  onChangePage: (page: Page) => void;
}

export default function Header({
  page,
  numberOfBooks,
  numberOfFilteredBooks,
  isLoading,
  onChangePage,
}: HeaderProps) {
  const [isTheScreenLargeSized, setIsTheScreenLargeSized] = useState(false);

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

  return (
    <div className="flex h-[40px] justify-between">
      {isTheScreenLargeSized ? (
        <LargeOptionsMenu />
      ) : (
        <Select
          page={page}
          disabled={isLoading || numberOfBooks === 0}
          onChangePage={(page: Page) => onChangePage(page)}
        />
      )}

      <span className="text-mate-gray animate-fade-in flex items-center">
        {isLoading ? (
          <span>Carregando...</span>
        ) : (
          <span className="animate-fade-in">
            Total encontrado ({numberOfFilteredBooks})
          </span>
        )}
      </span>
    </div>
  );
}
