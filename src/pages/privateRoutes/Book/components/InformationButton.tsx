import { ReadingStatus } from '../../../../@types/Book';

import { BsFillBookmarkCheckFill } from 'react-icons/bs';
import { FaStopwatch } from 'react-icons/fa';
import { GrInProgress } from 'react-icons/gr';

import { ClockLoader } from 'react-spinners';

interface InformationButtonProps {
  status: ReadingStatus | null;
  onChangeBookStatus: (status: ReadingStatus) => void;
  isLoadingBook: boolean;
  isRefetchingBook: boolean;
}

export default function InformationButton({
  status,
  onChangeBookStatus,
  isLoadingBook,
  isRefetchingBook,
}: InformationButtonProps) {
  const notIsInReading = !status && !isLoadingBook;
  const inReading = status === 'READING' && !isLoadingBook;
  const inPause = status === 'ON_HOLD' && !isLoadingBook;
  const isFinished = status === 'FINISHED' && !isLoadingBook;

  return (
    <button
      type="button"
      disabled={status !== null || isRefetchingBook}
      onClick={() => onChangeBookStatus('READING')}
      className={`hover:bg-navy-blue-op-80 border-navy-blue text-snow-white font-roboto bg-navy-blue disabled:bg-navy-blue-op-40 disabled:border-navy-blue-op-80 hover:border-navy-blue-op-80 flex h-10 w-full items-center justify-center rounded-lg border px-3 py-2 text-sm font-normal transition-colors duration-300 ease-in-out hover:cursor-pointer disabled:cursor-default sm:w-[140px] ${isFinished && 'border-sky-blue!'}`}
    >
      {isLoadingBook && (
        <p className="animate-fade-in flex items-center justify-center gap-2">
          <ClockLoader size={18} color="#ffffff" /> CARREGANDO
        </p>
      )}
      {notIsInReading && 'INICIAR LEITURA'}
      {inReading && (
        <p className="animate-fade-in flex items-center justify-center gap-2">
          <GrInProgress /> EM LEITURA
        </p>
      )}
      {inPause && (
        <p className="animate-fade-in flex items-center justify-center gap-2">
          <FaStopwatch /> EM PAUSA
        </p>
      )}
      {isFinished && (
        <p className="animate-fade-in text-sky-blue flex items-center justify-center gap-2">
          <BsFillBookmarkCheckFill />
          CONCLUÍDO
        </p>
      )}
    </button>
  );
}
