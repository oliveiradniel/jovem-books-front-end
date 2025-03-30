import { ReadingStatus } from '../../../../@types/Book';

import { BsFillBookmarkCheckFill } from 'react-icons/bs';
import { FaStopwatch } from 'react-icons/fa';
import { GrInProgress } from 'react-icons/gr';

interface InformationButtonProps {
  status: ReadingStatus | null;
  onChangeBookStatus: (status: ReadingStatus) => void;
}

export default function InformationButton({
  status,
  onChangeBookStatus,
}: InformationButtonProps) {
  return (
    <button
      type="button"
      disabled={status !== null}
      onClick={() => onChangeBookStatus('READING')}
      className={`hover:bg-navy-blue-op-80 border-navy-blue text-snow-white font-roboto bg-navy-blue disabled:bg-navy-blue-op-40 disabled:border-navy-blue-op-80 hover:border-navy-blue-op-80 mt-10 flex h-10 w-[140px] items-center justify-center rounded-lg border px-3 py-2 text-sm font-semibold transition-colors duration-300 ease-in-out hover:cursor-pointer disabled:cursor-default ${status === 'FINISHED' && 'border-sky-blue!'}`}
    >
      {!status && 'INICIAR LEITURA'}
      {status === 'READING' && (
        <p className="animate-fade-in flex items-center justify-center gap-2">
          <GrInProgress /> EM LEITURA
        </p>
      )}
      {status === 'ON_HOLD' && (
        <p className="animate-fade-in flex items-center justify-center gap-2">
          <FaStopwatch /> EM PAUSA
        </p>
      )}
      {status === 'FINISHED' && (
        <p className="animate-fade-in text-sky-blue flex items-center justify-center gap-2">
          <BsFillBookmarkCheckFill />
          CONCLUÍDO
        </p>
      )}
    </button>
  );
}
