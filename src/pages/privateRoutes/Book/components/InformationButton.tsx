import { TReadingStatus } from '../../../../@types/Read';

import { BsFillBookmarkCheckFill } from 'react-icons/bs';
import { FaStopwatch } from 'react-icons/fa';
import { GrInProgress } from 'react-icons/gr';

import { ClockLoader } from 'react-spinners';

interface InformationButtonProps {
  status: TReadingStatus | null;
  onChangeBookStatus: (status: TReadingStatus) => void;
  isLoadingRead: boolean;
  isStartingRead: boolean;
  isUpdatingReadStatus: boolean;
}

export default function InformationButton({
  status,
  onChangeBookStatus,
  isLoadingRead,
  isStartingRead,
  isUpdatingReadStatus,
}: InformationButtonProps) {
  const isNotReading = !status;
  const inReading = status === 'READING';
  const inPause = status === 'ON_HOLD';
  const isFinished = status === 'FINISHED';

  const isNotLoading =
    !isLoadingRead && !isStartingRead && !isUpdatingReadStatus;

  return (
    <button
      type="button"
      disabled={
        status !== null ||
        isLoadingRead ||
        isStartingRead ||
        isUpdatingReadStatus
      }
      onClick={() => onChangeBookStatus('READING')}
      className={`hover:bg-navy-blue-op-80 border-navy-blue text-snow-white font-roboto bg-navy-blue disabled:bg-navy-blue-op-40 disabled:border-navy-blue-op-80 hover:border-navy-blue-op-80 flex h-10 w-full items-center justify-center rounded-lg border px-3 py-2 text-sm font-normal transition-colors duration-300 ease-in-out hover:cursor-pointer disabled:cursor-default sm:w-[140px] ${isFinished && isNotLoading && 'border-sky-blue!'}`}
    >
      {isLoadingRead && (
        <p className="animate-fade-in flex items-center justify-center gap-2">
          <ClockLoader size={18} color="#ffffff" /> CARREGANDO
        </p>
      )}

      {(isStartingRead || isUpdatingReadStatus) && (
        <ClockLoader size={18} color="#ffffff" />
      )}

      {isNotReading && isNotLoading && 'INICIAR LEITURA'}

      {inReading && isNotLoading && (
        <p className="animate-fade-in flex items-center justify-center gap-2">
          <GrInProgress /> EM LEITURA
        </p>
      )}

      {inPause && isNotLoading && (
        <p className="animate-fade-in flex items-center justify-center gap-2">
          <FaStopwatch /> EM PAUSA
        </p>
      )}

      {isFinished && isNotLoading && (
        <p className="animate-fade-in text-sky-blue flex items-center justify-center gap-2">
          <BsFillBookmarkCheckFill />
          CONCLUÍDO
        </p>
      )}
    </button>
  );
}
