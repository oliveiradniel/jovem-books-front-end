import { ClipLoader } from 'react-spinners';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  buttonLabel: string;
  isLoading: boolean;
}

export default function Button({
  children,
  buttonLabel,
  isLoading,
  onClick,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      {...props}
      className={`bg-sky-blue/80 text-snow-white font-roboto hover:bg-sky-blue/60 disabled:hover:bg-sky-blue/80 disabled:bg-light-gray/70! flex w-full items-center justify-center rounded-lg px-4 py-2 font-semibold transition-colors duration-300 ease-in-out hover:cursor-pointer disabled:hover:cursor-default`}
    >
      {isLoading && <ClipLoader color="#ffffff" size={20} />}
      {!isLoading && buttonLabel}
      {children}
    </button>
  );
}
