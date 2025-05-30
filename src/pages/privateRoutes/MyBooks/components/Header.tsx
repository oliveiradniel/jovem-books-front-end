import { MdFormatListBulleted } from 'react-icons/md';

import LargeOptionsMenu from '../components/LargeOptionsMenu';
import Select from '../components/Select';

import { TBookFilter } from '../../../../@types/Book';

interface HeaderProps {
  selectedFilter: TBookFilter;
  numberOfFilteredBooks: number;
  isRefetchingBooks: boolean;
  onChangeFilter: (selectedFilter: TBookFilter) => void;
}

export default function Header({
  selectedFilter,
  numberOfFilteredBooks,
  isRefetchingBooks,
  onChangeFilter,
}: HeaderProps) {
  return (
    <div className="flex h-[40px] justify-between">
      <div className="flex items-center gap-2">
        <LargeOptionsMenu
          selectedFilter={selectedFilter}
          disabled={isRefetchingBooks}
          onChange={onChangeFilter}
        />

        <Select
          selectedFilter={selectedFilter}
          disabled={isRefetchingBooks}
          onChange={onChangeFilter}
        />
      </div>

      <p
        className={`text-mate-gray font-quicksand flex items-center transition-opacity duration-300 ease-in-out ${isRefetchingBooks && 'opacity-40'}`}
      >
        <span className="mr-1 hidden sm:inline-flex">Total</span>
        <span className="mr-1 hidden md:inline-flex">encontrado</span>
        <MdFormatListBulleted
          title="Total encontrado"
          className="mr-1 inline-flex sm:hidden"
        />
        <span>({numberOfFilteredBooks})</span>
      </p>
    </div>
  );
}
