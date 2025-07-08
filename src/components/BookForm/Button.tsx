import { ClipLoader } from 'react-spinners';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonLabel: string;
  isLoading: boolean;
}

export default function Button({
  buttonLabel,
  isLoading,
  ...props
}: ButtonProps) {
  return (
    <button
      type="submit"
      {...props}
      className={`bg-sky-blue/80 font-roboto hover:bg-sky-blue/60 disabled:hover:bg-sky-blue/80 disabled:bg-light-gray/70! flex w-full items-center justify-center rounded-lg px-4 py-2 font-semibold text-white transition-colors duration-300 ease-in-out hover:cursor-pointer disabled:hover:cursor-default`}
    >
      {isLoading && <ClipLoader color="#ffffff" size={20} />}
      {!isLoading && buttonLabel}
    </button>
  );
}
