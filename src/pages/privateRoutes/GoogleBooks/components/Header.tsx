import SearchInput from './SearchInput';
import RadioButtons, { TTypeOfSearch } from './RadioButtons';

interface HeaderProps {
  searchTerm: string;
  selected: TTypeOfSearch;
  isLoadingBooks: boolean;
  onSearchTerm: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelected: (selected: TTypeOfSearch) => void;
}

export default function Header({
  searchTerm,
  selected,
  isLoadingBooks,
  onSearchTerm,
  onSelected,
}: HeaderProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 sm:flex-row">
        <SearchInput
          selected={selected}
          value={searchTerm}
          onChange={onSearchTerm}
        />
        <RadioButtons
          selected={selected}
          isLoadingBooks={isLoadingBooks}
          onSelected={onSelected}
        />
      </div>
    </div>
  );
}
