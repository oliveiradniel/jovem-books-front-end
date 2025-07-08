import BoyStudying from '../../../../assets/images/boy-studying.svg?react';

import { TTypeOfSearch } from './RadioButtons';

interface BookNotFoundMessageProps {
  searchTerm: string;
  selected: TTypeOfSearch;
}

export default function BookNotFoundMessage({
  searchTerm,
  selected,
}: BookNotFoundMessageProps) {
  const notFoundBookText =
    selected === 'title'
      ? 'Não foi possível encontrar o(s) livro(s) de títutlo '
      : 'Não foi possível encontrar o(s) livro(s) do autor ';

  return (
    <div className="animate-fade-in flex min-h-full flex-1 flex-col items-center justify-center gap-4">
      <p className="font-quicksand text-center text-[clamp(0.8rem,2vw,1rem)] text-white">
        {notFoundBookText}{' '}
        <span className="text-sky-blue font-semibold">"{searchTerm}"</span>
      </p>
      <BoyStudying className="mb-4 w-[30vw] lg:w-[20vw]" />
    </div>
  );
}
