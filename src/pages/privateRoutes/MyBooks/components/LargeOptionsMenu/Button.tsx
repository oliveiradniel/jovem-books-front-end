import { Page } from '../../@types/Page';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  page: Page;
  buttonPage: Page;
}

export default function Button({
  label,
  page,
  buttonPage,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`flex items-center gap-1 p-2 hover:cursor-pointer ${page === buttonPage ? 'text-sky-blue hover:cursor-default!' : 'text-light-gray transition-opacity duration-300 ease-in-out hover:opacity-70'}`}
      {...props}
    >
      <span className="font-quicksand text-sm">{label}</span>
    </button>
  );
}
