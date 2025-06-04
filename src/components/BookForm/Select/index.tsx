import { useState } from 'react';

import { useCloseOnClickOutside } from '../../../app/hooks/useCloseOnClickOutside';

import Options from './Options';
import SkeletonLoading from '@/components/SkeletonLoading';

interface SelectProps {
  selectedOptions: string[];
  disabled: boolean;
  isLoadingBook?: boolean;
  onChange: (value: string) => void;
}

export default function Select({
  selectedOptions,
  disabled,
  isLoadingBook = false,
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
    <div className="relative flex w-full flex-col">
      <button
        id="select"
        type="button"
        disabled={disabled}
        onClick={handleTogglingOfOptionsVisibility}
        className={`bg-navy-blue text-mate-gray font-quicksand hover:bg-navy-blue/80 disabled:bg-navy-blue/40 disabled:border-navy-blue/80 border-navy-blue disabled:text-light-gray h-8 w-full cursor-pointer rounded-lg border text-sm font-semibold transition-colors duration-300 ease-in-out disabled:cursor-default`}
      >
        {isLoadingBook ? (
          <SkeletonLoading />
        ) : (
          `Selecione (${selectedOptions?.length}/6)`
        )}
      </button>

      <Options
        selectedOptions={selectedOptions}
        isVisible={isOptionsVisible}
        onChange={onChange}
      />
    </div>
  );
}
