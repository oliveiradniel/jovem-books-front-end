import { useState } from 'react';

import Label from '../../../../components/BookForm/Label';
import SkeletonLoading from '../../../../components/SkeletonLoading';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean;
  isLoadingData?: boolean;
}

export default function Input({
  label,
  disabled,
  isLoadingData = false,
  error = false,
  ...props
}: InputProps) {
  const [isTheFieldFocused, setIsTheFieldFocused] = useState(false);

  return (
    <div className="flex w-full items-center justify-between gap-2">
      <Label label={label} />
      <div className="flex w-full">
        <div
          className={`relative flex h-8 w-full items-center rounded-lg border px-2 transition-colors duration-300 ease-in-out ${disabled && 'border-transparent'} ${
            isTheFieldFocused && 'border-sky-blue/40'
          } ${error ? 'border-blood-red!' : 'border-navy-blue'}`}
        >
          {isLoadingData && <SkeletonLoading rounded="lg" />}
          <input
            type="text"
            disabled={disabled}
            onFocus={() => setIsTheFieldFocused(true)}
            onBlur={() => setIsTheFieldFocused(false)}
            {...props}
            className={`font-quicksand placeholder:text-light-gray w-full text-end transition-all duration-300 ease-in-out outline-none placeholder:text-sm disabled:font-bold ${error ? 'text-blood-red' : 'text-sky-blue/80'}`}
          />
        </div>
      </div>
    </div>
  );
}
