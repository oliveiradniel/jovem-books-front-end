import { useState } from 'react';

import Label from './Label';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string[] | null;
}

export default function Input({ label, error = null, ...props }: InputProps) {
  const [isTheFieldFocused, setIsTheFieldFocused] = useState(false);

  return (
    <div className="flex w-full items-center justify-between gap-2">
      <Label label={label} />
      <div
        className={`flex h-8 w-full items-center rounded-lg border px-2 transition-colors duration-300 ease-in-out ${
          isTheFieldFocused && 'border-sky-blue/40'
        } ${error && error.length > 0 ? 'border-blood-red!' : 'border-navy-blue'}`}
      >
        <input
          type="text"
          onFocus={() => setIsTheFieldFocused(true)}
          onBlur={() => setIsTheFieldFocused(false)}
          {...props}
          className={`font-quicksand placeholder:text-light-gray w-full outline-none placeholder:text-sm ${error && error.length > 0 ? 'text-blood-red' : 'text-sky-blue/80'}`}
        />
      </div>
    </div>
  );
}
