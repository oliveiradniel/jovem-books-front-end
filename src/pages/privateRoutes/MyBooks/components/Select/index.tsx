import { useState } from 'react';

import { MY_BOOKS_PAGES } from '../../../../../constants/myBooksPages';

import { useCloseOnClickOutside } from '../../../../../app/hooks/useCloseOnClickOutside.ts';

import { TBookFilter } from '../../../../../@types/Book.ts';

import Options from './Options';

interface SelectProps {
  selectedFilter: TBookFilter;
  disabled: boolean;
  onChange: (selectedFilter: TBookFilter) => void;
}

export default function Select({
  selectedFilter,
  disabled,
  onChange,
}: SelectProps) {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);

  const filterDirection =
    selectedFilter === null ? 'NOT_READING' : selectedFilter;

  function handleTogglingOfOptionsVisibility() {
    setIsOptionsVisible((prevState) => !prevState);
  }

  useCloseOnClickOutside({
    containerIds: ['select', 'options'],
    isVisible: isOptionsVisible,
    onClose: () => setIsOptionsVisible(false),
  });

  return (
    <div className="z-1 flex w-[140px]">
      <button
        id="select"
        type="button"
        disabled={disabled}
        onClick={handleTogglingOfOptionsVisibility}
        className={`bg-navy-blue text-mate-gray font-quicksand hover:bg-navy-blue-op-80 w-full rounded-lg p-2 text-sm font-semibold transition-colors duration-300 ease-in-out hover:cursor-pointer ${isOptionsVisible || (disabled && 'hover:bg-navy-blue-op-40!')} ${disabled && 'bg-navy-blue-op-40 border-navy-blue-op-80 text-light-gray cursor-default! border'}`}
      >
        {MY_BOOKS_PAGES[filterDirection]}
      </button>

      <Options
        selectedFilter={selectedFilter}
        isVisible={isOptionsVisible}
        onSelect={(selectedFilter: TBookFilter) => onChange(selectedFilter)}
      />
    </div>
  );
}
