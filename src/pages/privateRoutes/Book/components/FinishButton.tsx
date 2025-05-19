import { ReadingStatus } from '../../../../@types/Book';

interface FinishButtonProps {
  isRefetchingRead: boolean;
  onChangeBookStatus: (status: ReadingStatus) => void;
}

export default function FinishButton({
  isRefetchingRead,
  onChangeBookStatus,
}: FinishButtonProps) {
  return (
    <button
      type="button"
      disabled={isRefetchingRead}
      onClick={() => onChangeBookStatus('FINISHED')}
      className={`animate-fade-in-500 !disabled:hover:bg-stormy-blue-op-80 text-snow-white font-roboto bg-stormy-blue flex h-10 w-full items-center justify-center rounded-lg px-3 py-2 text-sm font-normal transition-colors duration-300 ease-in-out hover:cursor-pointer disabled:cursor-default disabled:opacity-70 sm:w-[140px]`}
    >
      <p className="flex items-center justify-center gap-2">FINALIZAR LIVRO</p>
    </button>
  );
}
