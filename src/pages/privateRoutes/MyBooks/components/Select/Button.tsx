import { Page } from '../../@types/Page';

interface ButtonProps {
  numberOfItems: number;
  label: string;
  currentPage: Page;
  page: Page;
  onClick: () => void;
}

export default function Button({
  numberOfItems,
  label,
  currentPage,
  page,
  onClick,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`text-light-gray hover:bg-blue-black-op-80 flex items-center rounded-lg p-2 transition-colors duration-300 ease-in-out hover:cursor-pointer ${page === currentPage && 'text-sky-blue hover:bg-navy-blue hover:cursor-default!'}`}
    >
      <p className="font-quicksand text-sm">
        {label}
        <span
          className={`text-mate-gray ml-1 ${page === currentPage && 'text-sky-blue'}`}
        >
          ({numberOfItems})
        </span>
      </p>
    </button>
  );
}
