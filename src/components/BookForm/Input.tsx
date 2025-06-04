import { useState } from 'react';

import { CiSquareMinus, CiSquarePlus } from 'react-icons/ci';

import Label from './Label';
import SkeletonLoading from '../SkeletonLoading';
import NumberButton from './NumberButton';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean;
  onIncrement?: () => void;
  onDecrement?: () => void;
  isLoadingData?: boolean;
}

export default function Input({
  label,
  disabled,
  onIncrement,
  onDecrement,
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
          className={`relative flex h-8 w-full items-center rounded-lg border px-2 transition-colors duration-300 ease-in-out ${disabled && 'border-transparent'} ${
            isTheFieldFocused && 'border-sky-blue/40'
          } ${error ? 'border-blood-red!' : 'border-navy-blue'}`}
        >
          {isLoadingData ? (
            <SkeletonLoading rounded="lg" />
          ) : (
            <input
              type="text"
              disabled={disabled}
              onFocus={() => setIsTheFieldFocused(true)}
              onBlur={() => setIsTheFieldFocused(false)}
              {...props}
              className={`font-quicksand placeholder:text-light-gray w-full transition-all duration-300 ease-in-out outline-none placeholder:text-sm disabled:font-bold ${error ? 'text-blood-red' : 'text-sky-blue/80'}`}
            />
          )}
        </div>

        {label === 'Número de Páginas' && (
          <div className="w-100% flex sm:ml-4">
            <NumberButton
              error={error}
              Icon={CiSquarePlus}
              onClick={onIncrement}
            />
            <NumberButton
              error={error}
              Icon={CiSquareMinus}
              onClick={onDecrement}
            />
          </div>
        )}
      </div>
    </div>
  );
}
