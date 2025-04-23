export type TSelected = 'title' | 'author';

export interface RadioButtonsProps {
  selected: TSelected;
  onSelected: (selected: TSelected) => void;
}

export default function RadioButtons({
  selected,
  onSelected,
}: RadioButtonsProps) {
  return (
    <div className="flex h-8">
      <button
        type="button"
        disabled={selected === 'title'}
        onClick={() => onSelected('title')}
        className={`font-roboto disabled:bg-sky-blue/60 disabled:text-snow-white bg-blue-black/80 text-snow-white/60 hover:bg-sky-blue/10 w-20 rounded-l-lg text-sm transition-colors duration-300 ease-in-out hover:cursor-pointer`}
      >
        Título
      </button>
      <button
        type="button"
        disabled={selected === 'author'}
        onClick={() => onSelected('author')}
        className={`font-roboto disabled:bg-sky-blue/60 disabled:text-snow-white bg-blue-black/80 text-snow-white/60 hover:bg-sky-blue/10 w-20 rounded-r-lg text-sm transition-colors duration-300 ease-in-out hover:cursor-pointer`}
      >
        Autor
      </button>
    </div>
  );
}
