import { useState } from 'react';

import { TSelected } from './RadioButtons';
import { GoSearch } from 'react-icons/go';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  selected: TSelected;
  value: string;
}

export default function SearchInput({
  selected,
  value,
  ...props
}: SearchInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className={`bg-blue-black/80 flex h-8 w-full items-center gap-2 rounded-lg border px-2 py-1 transition-colors duration-300 ease-in-out sm:w-[60%] ${isFocused ? 'border-sky-blue/60' : 'border-transparent'}`}
    >
      <input
        type="text"
        placeholder={`Pesquise um livro pelo ${selected === 'title' ? 'título' : 'autor'}`}
        value={value}
        {...props}
        className="text-sky-blue/60 font-quicksand placeholder:text-light-gray/60 h-full w-full outline-none placeholder:text-sm"
      />

      <GoSearch
        className={`${isFocused || value.length > 0 ? 'text-sky-blue/60' : 'text-snow-white/40'}`}
      />
    </div>
  );
}
