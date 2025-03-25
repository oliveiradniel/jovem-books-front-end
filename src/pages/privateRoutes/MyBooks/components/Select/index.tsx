import { useEffect, useState } from 'react';

import { MY_BOOKS_PAGES } from '../../../../../constants/myBooksPages';

import { Page } from '../../@types/Page';
import Options from './Options';

interface SelectProps {
  page: Page;
  disabled: boolean;
  onChangePage: (page: Page) => void;
}

export default function Select({ page, disabled, onChangePage }: SelectProps) {
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
        disabled={disabled}
        onClick={handleTogglingOfOptionsVisibility}
        className={`bg-navy-blue text-mate-gray font-quicksand hover:bg-navy-blue-op-80 w-full rounded-lg p-2 text-sm font-semibold transition-colors duration-300 ease-in-out hover:cursor-pointer ${isOptionsVisible || (disabled && 'hover:bg-navy-blue-op-40!')} ${disabled && 'bg-navy-blue-op-40 border-navy-blue-op-80 text-light-gray cursor-default! border'}`}
      >
        {MY_BOOKS_PAGES[page]}
      </button>

      <Options
        page={page}
        isVisible={isOptionsVisible}
        onSelect={(page: Page) => onChangePage(page)}
      />
    </div>
  );
}
