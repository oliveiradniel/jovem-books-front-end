import { useState } from 'react';

import { ErrorData } from '../types/ErrorData';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorsData: ErrorData[];
  fieldName: string;
}

export default function Input({
  label,
  errorsData,
  fieldName,
  ...props
}: InputProps) {
  const [isTheFieldFocused, setIsTheFieldFocused] = useState(false);

  const errors = errorsData.filter((error) => {
    return fieldName.includes(error.fieldName);
  });

  const isError = errors.some((error) => error.fieldName === fieldName);

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="title" className="text-snow-white font-quicksand w-16">
        {label}
      </label>
      <div
        className={`border-navy-blue flex h-8 w-full items-center rounded-lg border px-2 transition-colors duration-300 ease-in-out ${
          isTheFieldFocused && 'border-sky-blue/40'
        } ${isError && 'border-blood-red!'}`}
      >
        <input
          type="text"
          onFocus={() => setIsTheFieldFocused(true)}
          onBlur={() => setIsTheFieldFocused(false)}
          {...props}
          className="text-sky-blue/80 font-quicksand placeholder:text-light-gray w-full outline-none placeholder:text-sm"
        />
      </div>
    </div>
  );
}
