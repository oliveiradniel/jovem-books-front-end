import { TableCell } from '@/components/ui/table';
import { LiteraryGenreKey } from '../../../../../../@types/Book';
import { LITERARY_GENRE_LABELS } from '../../../../../../constants/books';

export default function LiteraryGenre({
  literaryGenre,
}: {
  literaryGenre: string[];
}) {
  return (
    <TableCell className="hidden w-1/4 md:table-cell">
      {LITERARY_GENRE_LABELS[literaryGenre[0] as LiteraryGenreKey]}
      {literaryGenre.length > 1 && ` (+${literaryGenre.length - 1})`}
    </TableCell>
  );
}
