import { ReadingStatus } from '../../../../@types/Book';

interface FinishButtonProps {
  onChangeBookStatus: (status: ReadingStatus) => void;
}

export default function FinishButton({
  onChangeBookStatus,
}: FinishButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onChangeBookStatus('FINISHED')}
      className="animate-fade-in-500 hover:bg-stormy-blue-op-80 text-snow-white font-roboto bg-stormy-blue mt-10 flex h-10 w-[140px] items-center justify-center rounded-lg px-3 py-2 text-sm font-semibold transition-colors duration-300 ease-in-out hover:cursor-pointer"
    >
      <p className="flex items-center justify-center gap-2">FINALIZAR LIVRO</p>
    </button>
  );
}
