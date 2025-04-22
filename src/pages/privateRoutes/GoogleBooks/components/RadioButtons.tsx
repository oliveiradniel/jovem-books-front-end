export type Selected = 'title' | 'author';

export interface RadioButtonsProps {
  selected: Selected;
  onSelected: (selected: Selected) => void;
}

export default function RadioButtons({
  selected,
  onSelected,
}: RadioButtonsProps) {
  return (
    <div className="flex h-8">
      <button
        type="button"
        onClick={() => onSelected('title')}
        className={`font-roboto w-20 rounded-l-lg text-sm transition-colors duration-300 ease-in-out ${selected === 'title' ? 'bg-sky-blue/60 text-snow-white' : 'bg-blue-black/80 text-snow-white/60 hover:cursor-pointer'}`}
      >
        Título
      </button>
      <button
        type="button"
        onClick={() => onSelected('author')}
        className={`font-roboto w-20 rounded-r-lg text-sm transition-colors duration-300 ease-in-out ${selected === 'author' ? 'bg-sky-blue/60 text-snow-white' : 'bg-blue-black/80 text-snow-white/60 hover:text-snow-white/50 hover:cursor-pointer'}`}
      >
        Autor
      </button>
    </div>
  );
}
