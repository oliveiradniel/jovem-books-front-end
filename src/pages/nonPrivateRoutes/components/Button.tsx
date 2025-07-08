import { ClipLoader } from 'react-spinners';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  isAbsolute: boolean;
  isLoading?: boolean;
}

export default function Button({
  label,
  isAbsolute,
  isLoading = false,
  ...props
}: ButtonProps) {
  return (
    <button
      type="submit"
      className={`bg-sky-blue font-roboto text-blue-black disabled:text-light-gray font-bold disabled:bg-white/70 ${isAbsolute && 'absolute bottom-0'} flex h-12 w-full items-center justify-center rounded-lg transition-colors duration-300 ease-in-out disabled:cursor-default ${isLoading ? 'hover:bg-sky-blue cursor-default' : 'hover:bg-sky-blue/80 cursor-pointer'}`}
      {...props}
    >
      {isLoading ? (
        <ClipLoader color="#ffffff" size={20} loading={isLoading} />
      ) : (
        label
      )}
    </button>
  );
}
