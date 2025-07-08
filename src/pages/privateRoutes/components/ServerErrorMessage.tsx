import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';

import { IoMdRefresh } from 'react-icons/io';

import ServerError from '../../../assets/images/server-error.svg?react';

import { IGoogleBookAPI } from '../../../@types/Book';

interface ServerErrorMessageProps {
  onTryAgain: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<IGoogleBookAPI[], Error>>;
}

export default function ServerErrorMessage({
  onTryAgain,
}: ServerErrorMessageProps) {
  return (
    <div className="animate-fade-in flex min-h-full flex-1 flex-col items-center justify-center">
      <p className="font-quicksand text-center text-[clamp(0.8rem,2vw,1rem)] text-white">
        Houve um erro ao buscar os livros na Google Books.
      </p>
      <ServerError className="mb-4 w-[30vw] lg:w-[20vw]" />

      <button
        onClick={() => onTryAgain()}
        className="bg-blood-red font-roboto hover:bg-blood-red/90 cursor-pointer rounded-md px-6 py-2 text-white transition-colors duration-300 ease-in-out"
      >
        <span className="hidden font-semibold sm:inline-flex">
          Tentar novamente
        </span>
        <IoMdRefresh className="sm:hidden" />
      </button>
    </div>
  );
}
