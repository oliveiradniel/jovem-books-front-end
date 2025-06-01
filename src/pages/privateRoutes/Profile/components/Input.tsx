import { useState } from 'react';

import Label from '../../../../components/BookForm/Label';
import SkeletonLoading from '../../../../components/SkeletonLoading';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isBeingEdited: boolean;
  error?: boolean;
  isLoadingData?: boolean;
}

export default function Input({
  label,
  disabled,
  isBeingEdited,
  isLoadingData = false,
  error = false,
  ...props
}: InputProps) {
  const [isTheFieldFocused, setIsTheFieldFocused] = useState(false);

  return (
    <div className="flex w-full flex-col items-center justify-between gap-2 sm:flex-row">
      <Label label={label} />
      <div className="flex w-full">
        <div
          className={`relative flex h-8 w-full items-center rounded-lg border transition-all duration-300 ease-in-out ${disabled && 'border-transparent'} ${
            isTheFieldFocused && 'border-sky-blue/40'
          } ${error ? 'border-blood-red!' : 'border-navy-blue'} ${isBeingEdited ? 'px-2' : 'px-0'}`}
        >
          {isLoadingData && <SkeletonLoading rounded="lg" />}
          <input
            type="text"
            disabled={disabled}
            onFocus={() => setIsTheFieldFocused(true)}
            onBlur={() => setIsTheFieldFocused(false)}
            {...props}
            className={`font-quicksand placeholder:text-light-gray w-full text-start transition-all duration-300 ease-in-out outline-none placeholder:text-sm disabled:font-bold sm:text-end ${error ? 'text-blood-red' : 'text-sky-blue/80'}`}
          />
        </div>
      </div>
    </div>
  );
}
