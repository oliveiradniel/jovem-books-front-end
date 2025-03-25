import { useEffect, useState } from 'react';

import { Page } from '../../@types/Page';

import LargeOptionsMenu from '../LargeOptionsMenu';
import Select from '../Select';

interface HeaderProps {
  page: Page;
  numberOfBooks: number;
  isLoading: boolean;
  onChangePage: (page: Page) => void;
}

export default function Header({
  page,
  numberOfBooks,
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
        <Select page={page} onChangePage={(page: Page) => onChangePage(page)} />
      )}

      <span className="text-mate-gray animate-fade-in flex items-center">
        {isLoading ? (
          <span>Carregando...</span>
        ) : (
          <span className="animate-fade-in">
            Total encontrado ({numberOfBooks})
          </span>
        )}
      </span>
    </div>
  );
}
