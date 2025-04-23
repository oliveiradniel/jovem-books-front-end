export type TSelected = 'title' | 'author';

export interface RadioButtonsProps {
  selected: TSelected;
  isLoadingBooks: boolean;
  onSelected: (selected: TSelected) => void;
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
        className={`font-roboto disabled:bg-sky-blue/60 disabled:text-snow-white border-blue-black/80 bg-blue-black/80 text-snow-white/60 hover:bg-sky-blue/10 w-20 rounded-l-lg border text-sm transition-colors duration-300 ease-in-out hover:cursor-pointer disabled:cursor-default ${isLoadingBooks && 'bg-blue-black/80! border-navy-blue'}`}
      >
        Título
      </button>
      <button
        type="button"
        disabled={selected === 'author' || isLoadingBooks}
        onClick={() => onSelected('author')}
        className={`font-roboto disabled:bg-sky-blue/60 disabled:text-snow-white border-blue-black/80 bg-blue-black/80 text-snow-white/60 hover:bg-sky-blue/10 w-20 rounded-r-lg border text-sm transition-colors duration-300 ease-in-out hover:cursor-pointer disabled:cursor-default ${isLoadingBooks && 'bg-blue-black/80! border-navy-blue'}`}
      >
        Autor
      </button>
    </div>
  );
}
