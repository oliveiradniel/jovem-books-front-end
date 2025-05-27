import { ButtonHTMLAttributes } from 'react';

import { IoPauseOutline, IoPlayOutline } from 'react-icons/io5';

import { TReadingStatus } from '../../../../@types/Read';

interface PauseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  status: TReadingStatus | null;
}

export default function PauseOrPlayButton({
  status,
  ...props
}: PauseButtonProps) {
  return (
    <button
      type="button"
      {...props}
      className={`animate-fade-in-500 hover:bg-navy-blue/85 border-navy-blue text-snow-white font-roboto bg-navy-blue hover:border-navy-blue/80 disabled:bg-navy-blue/40 flex h-10 w-full items-center justify-center rounded-lg border-2 px-3 py-2 text-sm font-semibold transition-colors duration-300 ease-in-out hover:cursor-pointer disabled:cursor-default sm:w-[140px]`}
    >
      <p className="flex items-center justify-center gap-2">
        {status === 'READING' && <IoPauseOutline size={20} />}

        {status === 'ON_HOLD' && <IoPlayOutline size={20} />}
      </p>
    </button>
  );
}
