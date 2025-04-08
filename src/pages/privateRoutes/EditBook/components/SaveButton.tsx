import { ClipLoader } from 'react-spinners';

interface SaveButtonProps {
  children?: React.ReactNode;
  buttonLabel: string;
  fullWidth?: boolean;
  isLoading: boolean;
  isLoadingOther: boolean;
  onClick: () => void;
}

export default function SaveButton({
  children,
  buttonLabel,
  fullWidth = false,
  isLoading,
  isLoadingOther,
  onClick,
}: SaveButtonProps) {
  return (
    <button
      type="button"
      disabled={isLoading || isLoadingOther}
      onClick={onClick}
      className={`bg-sky-blue/80 text-snow-white font-roboto hover:bg-sky-blue/60 disabled:hover:bg-sky-blue/80 flex w-[140px] items-center justify-center rounded-lg px-4 py-2 font-semibold transition-colors duration-300 ease-in-out hover:cursor-pointer disabled:hover:cursor-default ${isLoadingOther && 'bg-light-gray/70!'} ${fullWidth ? 'w-full' : 'w-[140px]'}`}
    >
      {isLoading && <ClipLoader color="#ffffff" size={20} />}
      {!isLoading && buttonLabel}
      {children}
    </button>
  );
}
