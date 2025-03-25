import { useEffect, useState } from 'react';

import { MY_BOOKS_PAGES } from '../../../../../constants/myBooksPages';

import { Page } from '../../@types/Page';
import Options from './Options';

interface SelectProps {
  page: Page;
  onPage: (page: Page) => void;
}

export default function Select({ page, onPage }: SelectProps) {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);

  function handleTogglingOfOptionsVisibility() {
    setIsOptionsVisible((prevState) => !prevState);
  }

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
    <div className="z-1 flex w-[140px]">
      <button
        id="select"
        type="button"
        onClick={handleTogglingOfOptionsVisibility}
        className={`bg-navy-blue text-mate-gray font-quicksand hover:bg-navy-blue-op-80 w-full rounded-lg p-2 text-sm font-semibold transition-colors duration-300 ease-in-out hover:cursor-pointer ${isOptionsVisible && 'hover:bg-navy-blue!'}`}
      >
        {MY_BOOKS_PAGES[page]}
      </button>

      <Options
        page={page}
        isVisible={isOptionsVisible}
        onSelect={(page: Page) => onPage(page)}
      />
    </div>
  );
}
