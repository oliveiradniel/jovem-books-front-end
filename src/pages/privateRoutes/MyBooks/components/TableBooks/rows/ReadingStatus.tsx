import { READING_STATUS } from '../../../../../../constants/books';

import { TableCell } from '@/components/ui/table';

import { MdAutoStories } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa6';
import { IoIosPause } from 'react-icons/io';
import { GiBlackBook } from 'react-icons/gi';

import { TReadingStatus } from '../../../../../../@types/Read';

export default function ReadingStatus({
  status,
}: {
  status: TReadingStatus | null | undefined;
}) {
  const isNotReading = status === null || status === undefined;
  const inReading = status === 'READING';
  const inPause = status === 'ON_HOLD';
  const finished = status === 'FINISHED';

  return (
    <TableCell className="w-1/4 text-end">
      <div
        className={`font-roboto flex min-w-[100px] justify-center gap-2 rounded-sm py-2 font-semibold ${inReading && 'bg-ocean-blue'} $ ${finished && 'bg-sky-blue'} ${inPause && 'border-navy-blue border'} ${isNotReading && 'bg-blue-black'}`}
      >
        {isNotReading ? 'Não lido' : READING_STATUS[status]}
        {isNotReading && <GiBlackBook size={20} />}
        {inPause && <IoIosPause size={20} />}
        {inReading && <MdAutoStories size={20} />}
        {finished && <FaCheck size={20} />}
      </div>
    </TableCell>
  );
}
