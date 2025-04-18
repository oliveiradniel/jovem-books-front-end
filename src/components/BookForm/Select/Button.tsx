import { LITERARY_GENRE_LABELS } from '../../../constants/books';

import { TLiteraryGenre } from '../../../@types/Book';

interface ButtonProps {
  label: TLiteraryGenre;
}

export default function Button({ label }: ButtonProps) {
  return (
    <button
      type="button"
      className={`text-light-gray border-light-gray/30 hover:bg-blue-black/50 hover:border-navy-blue flex items-center rounded-lg border p-2 transition-colors duration-300 ease-in-out hover:cursor-pointer`}
    >
      <p className="font-quicksand text-sm">{LITERARY_GENRE_LABELS[label]}</p>
    </button>
  );
}
