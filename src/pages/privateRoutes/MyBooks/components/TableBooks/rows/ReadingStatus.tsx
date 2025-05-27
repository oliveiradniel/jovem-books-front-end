import { READING_STATUS } from '../../../../../../constants/books';

import { TReadingStatus } from '../../../../../../@types/Read';

export default function ReadingStatus({
  status,
}: {
  status: TReadingStatus | null | undefined;
}) {
  const isNotReading = status === null || status === undefined;

  return (
    <td className="rounded-tr-lg rounded-br-lg px-2 py-2 text-center">
      <span
        className={`text-snow-white flex items-center justify-center rounded-sm p-1 font-semibold ${status === 'READING' && 'bg-ocean-blue'} ${status === 'READING' && 'bg-blue-black'} ${status === 'FINISHED' && 'bg-royal-blue'} ${status === 'ON_HOLD' && 'border-navy-blue border'} ${isNotReading && 'bg-blue-black'}`}
      >
        {isNotReading ? 'Não lido' : READING_STATUS[status]}
      </span>
    </td>
  );
}
