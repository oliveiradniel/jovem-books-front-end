import { InputHTMLAttributes } from 'react';

import { TSelected } from './RadioButtons';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  selected: TSelected;
  isLoadingBooks: boolean;
  onSearchBooks: () => void;
}

export default function SearchInput({
  selected,
  isLoadingBooks,
  onSearchBooks,
  ...props
}: SearchInputProps) {
  return (
    <div className={`flex h-8 w-full items-center sm:w-[60%]`}>
      <input
        type="text"
        placeholder={`Pesquise um livro pelo ${selected === 'title' ? 'título' : 'autor'}`}
        {...props}
        className="text-sky-blue/60 bg-blue-black/80 font-quicksand focus:border-sky-blue/60 placeholder:text-light-gray/60 h-full w-full rounded-l-lg border border-transparent px-2 py-1 transition-colors duration-300 ease-in-out outline-none placeholder:text-sm"
      />

      <button
        type="button"
        disabled={isLoadingBooks}
        onClick={onSearchBooks}
        className="text-snow-white bg-sky-blue/60 hover:bg-sky-blue/50 font-roboto disabled:bg-sky-blue/60 flex h-full w-20 items-center justify-center rounded-r-lg py-1 text-sm transition-colors duration-300 ease-in-out hover:cursor-pointer disabled:cursor-default"
      >
        Procurar
      </button>
    </div>
  );
}
