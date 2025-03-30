import { ReadingStatus } from '../../../../@types/Book';

import { IoPauseOutline, IoPlayOutline } from 'react-icons/io5';

interface PauseButtonProps {
  status: ReadingStatus | null;
  onClick: () => void;
}

export default function PauseOrPlayButton({
  status,
  onClick,
}: PauseButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="animate-fade-in-500 hover:bg-navy-blue-op-80 border-navy-blue text-snow-white font-roboto bg-navy-blue hover:border-navy-blue-op-80 mt-10 flex h-10 w-[140px] items-center justify-center rounded-lg border-2 px-3 py-2 text-sm font-semibold transition-colors duration-300 ease-in-out hover:cursor-pointer"
    >
      <p className="flex items-center justify-center gap-2">
        {status === 'READING' && <IoPauseOutline size={20} />}

        {status === 'ON_HOLD' && <IoPlayOutline size={20} />}
      </p>
    </button>
  );
}
