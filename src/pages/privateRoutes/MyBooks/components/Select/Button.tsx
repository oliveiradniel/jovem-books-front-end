import { Page } from '../../@types/Page';

interface ButtonProps {
  label: string;
  buttonPage: Page;
  page: Page;
  onClick: () => void;
}

export default function Button({
  label,
  buttonPage,
  page,
  onClick,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`text-light-gray hover:bg-blue-black-op-80 flex items-center rounded-lg p-2 transition-colors duration-300 ease-in-out hover:cursor-pointer ${page === buttonPage && 'text-sky-blue hover:bg-navy-blue hover:cursor-default!'}`}
    >
      <p className="font-quicksand text-sm">{label}</p>
    </button>
  );
}
