import SearchInput from './SearchInput';
import RadioButtons, { Selected } from './RadioButtons';

interface HeaderProps {
  searchTerm: string;
  selected: Selected;
  onSearchTerm: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelected: (selected: Selected) => void;
  onSearchBooks: () => void;
}

export default function Header({
  searchTerm,
  selected,
  onSearchTerm,
  onSelected,
  onSearchBooks,
}: HeaderProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 sm:flex-row">
        <SearchInput
          selected={selected}
          value={searchTerm}
          onChange={onSearchTerm}
          onSearchBooks={onSearchBooks}
        />
        <RadioButtons selected={selected} onSelected={onSelected} />
      </div>

      <span className="text-light-gray/80 text-[12px]">
        * Após acabar de digitar, clique em Procurar.
      </span>
    </div>
  );
}
