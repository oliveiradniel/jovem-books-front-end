import { LiteraryGenreKey } from '../../../../../../@types/Book';
import { LITERARY_GENRE_LABELS } from '../../../../../../constants/books';

export default function LiteraryGenre({
  literaryGenre,
}: {
  literaryGenre: string[];
}) {
  return (
    <td className="hidden px-2 py-2 text-center lg:table-cell">
      {LITERARY_GENRE_LABELS[literaryGenre[0] as LiteraryGenreKey]}{' '}
      {literaryGenre.length > 1 && `+${literaryGenre.length - 1}`}
    </td>
  );
}
