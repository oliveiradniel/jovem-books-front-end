import { MY_BOOKS_PAGES } from '../../../../../constants/myBooksPages';

import { Page } from '../../@types/Page';

interface SelectProps {
  children: React.ReactNode;
  page: Page;
  isOptionsVisible: boolean;
  onTogglingOfOptionsVisibility: () => void;
}

export default function Select({
  children,
  page,
  isOptionsVisible,
  onTogglingOfOptionsVisibility,
}: SelectProps) {
  return (
    <div className="flex w-[140px]">
      <button
        id="select"
        type="button"
        onClick={onTogglingOfOptionsVisibility}
        className={`bg-navy-blue text-sky-blue font-quicksand hover:bg-navy-blue-op-80 w-full rounded-lg p-2 text-sm transition-colors duration-300 ease-in-out hover:cursor-pointer ${isOptionsVisible && 'hover:bg-navy-blue!'}`}
      >
        {MY_BOOKS_PAGES[page]}
      </button>

      {children}
    </div>
  );
}
