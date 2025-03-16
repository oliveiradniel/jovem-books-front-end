import { ClipLoader } from 'react-spinners';

interface ButtonPageProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  isSubmitting?: boolean;
}

export default function Button({
  label,
  isSubmitting = false,
  ...props
}: ButtonPageProps) {
  return (
    <button
      type="submit"
      className={`bg-dark-violet text-snow-white font-roboto focus:bg-dark-violet disabled:bg-snow-white-op-70 absolute bottom-0 mt-40 flex h-13 w-full items-center justify-center rounded-lg transition-colors duration-300 ease-in-out disabled:cursor-default ${isSubmitting ? 'hover:bg-dark-violet hover:cursor-default' : 'hover:bg-dark-violet-op-60 hover:cursor-pointer'}`}
      {...props}
    >
      {!isSubmitting && label}
      <ClipLoader color="#ffffff" size={20} loading={isSubmitting} />
    </button>
  );
}
