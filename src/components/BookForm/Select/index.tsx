import { useState } from 'react';

import { useCloseOnClickOutside } from '../../../app/hooks/useCloseOnClickOutside';

import Options from './Options';

import { TLiteraryGenre } from '../../../@types/Book';

interface SelectProps {
  options: TLiteraryGenre[];
  disabled: boolean;
}

export default function Select({ options, disabled }: SelectProps) {
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
        Selecione até 6 gêneros literários
      </button>

      <Options options={options} isVisible={isOptionsVisible} />
    </div>
  );
}
