export type TTypeOfSearch = 'title' | 'author';

export interface RadioButtonsProps {
  selected: TTypeOfSearch;
  isLoadingBooks: boolean;
  onSelected: (selected: TTypeOfSearch) => void;
}

export default function RadioButtons({
  selected,
  isLoadingBooks,
  onSelected,
}: RadioButtonsProps) {
  return (
    <div className="flex h-8">
      <button
        type="button"
        disabled={selected === 'title' || isLoadingBooks}
        onClick={() => onSelected('title')}
        className={`font-roboto disabled:bg-sky-blue/60 border-blue-black/80 bg-blue-black/80 hover:bg-sky-blue/10 w-20 rounded-l-lg border text-sm text-white/60 transition-colors duration-300 ease-in-out hover:cursor-pointer disabled:cursor-default disabled:text-white ${isLoadingBooks && 'bg-blue-black/80! border-navy-blue'}`}
      >
        Título
      </button>
      <button
        type="button"
        disabled={selected === 'author' || isLoadingBooks}
        onClick={() => onSelected('author')}
        className={`font-roboto disabled:bg-sky-blue/60 border-blue-black/80 bg-blue-black/80 hover:bg-sky-blue/10 w-20 rounded-r-lg border text-sm text-white/60 transition-colors duration-300 ease-in-out hover:cursor-pointer disabled:cursor-default disabled:text-white ${isLoadingBooks && 'bg-blue-black/80! border-navy-blue'}`}
      >
        Autor
      </button>
    </div>
  );
}
