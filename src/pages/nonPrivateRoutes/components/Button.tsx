import { ClipLoader } from 'react-spinners';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  isAbsolute: boolean;
  isSubmitting?: boolean;
}

export default function Button({
  label,
  isAbsolute,
  isSubmitting = false,
  ...props
}: ButtonProps) {
  return (
    <button
      type="submit"
      className={`bg-sky-blue text-snow-white font-roboto disabled:bg-snow-white-op-70 ${isAbsolute && 'absolute bottom-0'} flex h-12 w-full items-center justify-center rounded-lg transition-colors duration-300 ease-in-out disabled:cursor-default ${isSubmitting ? 'hover:bg-sky-blue cursor-default' : 'hover:bg-sky-blue/80 cursor-pointer'}`}
      {...props}
    >
      {isSubmitting ? (
        <ClipLoader color="#ffffff" size={20} loading={isSubmitting} />
      ) : (
        label
      )}
    </button>
  );
}
