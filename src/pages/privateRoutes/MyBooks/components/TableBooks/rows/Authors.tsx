import { TableCell } from '@/components/ui/table';
import { truncateString } from '../../../../../../utils/truncateString';

export default function Authors({ authors }: { authors: string[] }) {
  return (
    <TableCell className="hidden w-1/4 sm:table-cell">
      {truncateString(authors[0], 10)}
      {authors.length > 1 && ` (+${authors.length - 1})`}
    </TableCell>
  );
}
