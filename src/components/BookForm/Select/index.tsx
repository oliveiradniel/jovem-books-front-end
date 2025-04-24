import { useState } from 'react';

import { useCloseOnClickOutside } from '../../../app/hooks/useCloseOnClickOutside';

import Options from './Options';

import { TLiteraryGenre } from '../../../@types/Book';

interface SelectProps {
  selectedOptions: TLiteraryGenre[];
  disabled: boolean;
  onChange: (value: TLiteraryGenre) => void;
}

export default function Select({
  selectedOptions,
  disabled,
  onChange,
}: SelectProps) {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);

  function handleTogglingOfOptionsVisibility() {
    setIsOptionsVisible((prevState) => !prevState);
  }

  useCloseOnClickOutside({
    containerIds: ['select', 'options'],
    isVisible: isOptionsVisible,
    onClose: () => setIsOptionsVisible(false),
  });

  return (
    <div className="relative z-1 flex w-full">
      <button
        id="select"
        type="button"
        disabled={disabled}
        onClick={handleTogglingOfOptionsVisibility}
        className={`bg-navy-blue text-mate-gray font-quicksand hover:bg-navy-blue/80 disabled:bg-navy-blue/40 disabled:border-navy-blue/80 border-navy-blue disabled:text-light-gray w-full rounded-lg border py-2 text-sm font-semibold transition-colors duration-300 ease-in-out hover:cursor-pointer disabled:cursor-default!`}
      >
        Selecione ({selectedOptions?.length}/6)
      </button>

      <Options
        selectedOptions={selectedOptions}
        isVisible={isOptionsVisible}
        onChange={onChange}
      />
    </div>
  );
}
