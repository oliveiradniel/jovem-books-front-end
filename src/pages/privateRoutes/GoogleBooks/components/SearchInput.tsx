import { InputHTMLAttributes } from 'react';

import { TSelected } from './RadioButtons';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  selected: TSelected;
  value: string;
  isLoadingBooks: boolean;
  onSearchBooks: () => void;
}

export default function SearchInput({
  selected,
  isLoadingBooks,
  onSearchBooks,
  value,
  ...props
}: SearchInputProps) {
  return (
    <div className={`flex h-8 w-full items-center sm:w-[60%]`}>
      <input
        type="text"
        placeholder={`Pesquise um livro pelo ${selected === 'title' ? 'título' : 'autor'}`}
        value={value}
        {...props}
        className="text-sky-blue/60 bg-blue-black/80 font-quicksand focus:border-sky-blue/60 placeholder:text-light-gray/60 h-full w-full rounded-l-lg border border-transparent px-2 py-1 transition-colors duration-300 ease-in-out outline-none placeholder:text-sm"
      />

      <button
        type="button"
        disabled={isLoadingBooks || value.length === 0}
        onClick={onSearchBooks}
        className="text-snow-white bg-sky-blue/60 hover:bg-sky-blue/50 font-roboto flex h-full w-20 items-center justify-center rounded-r-lg py-1 text-sm transition-colors duration-300 ease-in-out hover:cursor-pointer disabled:cursor-default disabled:bg-gray-500"
      >
        Procurar
      </button>
    </div>
  );
}
