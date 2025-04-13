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
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`flex items-center gap-1 p-2 ${page === buttonPage && !disabled ? 'text-sky-blue hover:cursor-default!' : `text-light-gray transition-opacity duration-300 ease-in-out ${!disabled && 'hover:opacity-70'}`} ${disabled ? 'hover:text-light-gray/80 text-light-gray/80 hover:cursor-default' : 'hover:cursor-pointer'}`}
      {...props}
    >
      <span className="font-quicksand text-sm">{label}</span>
    </button>
  );
}
