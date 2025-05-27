import { ButtonHTMLAttributes } from 'react';

import { TReadingStatus } from '../../../../@types/Read';

interface FinishButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onChangeBookStatus: (status: TReadingStatus) => void;
}

export default function FinishButton({
  onChangeBookStatus,
  ...props
}: FinishButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onChangeBookStatus('FINISHED')}
      {...props}
      className={`animate-fade-in-500 hover:bg-stormy-blue/85 text-snow-white font-roboto bg-stormy-blue disabled:bg-stormy-blue/85 flex h-10 w-full items-center justify-center rounded-lg px-3 py-2 text-sm font-normal transition-colors duration-300 ease-in-out hover:cursor-pointer disabled:cursor-default sm:w-[140px]`}
    >
      <p className="flex items-center justify-center gap-2">FINALIZAR LIVRO</p>
    </button>
  );
}
