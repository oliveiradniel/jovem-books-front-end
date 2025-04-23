import SearchInput from './SearchInput';
import RadioButtons, { TSelected } from './RadioButtons';

interface HeaderProps {
  searchTerm: string;
  selected: TSelected;
  isLoadingBooks: boolean;
  onSearchTerm: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelected: (selected: TSelected) => void;
  onSearchBooks: () => void;
}

export default function Header({
  searchTerm,
  selected,
  isLoadingBooks,
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
          isLoadingBooks={isLoadingBooks}
          onChange={onSearchTerm}
          onSearchBooks={onSearchBooks}
        />
        <RadioButtons
          selected={selected}
          isLoadingBooks={isLoadingBooks}
          onSelected={onSelected}
        />
      </div>

      <span className="text-light-gray/80 text-[12px]">
        * Após acabar de digitar, clique em Procurar.
      </span>
    </div>
  );
}
