import { truncateString } from '../../../../../../utils/truncateString';

export default function Authors({ authors }: { authors: string[] }) {
  return (
    <td className="hidden px-2 py-2 text-center md:table-cell">
      {truncateString(authors[0], 10)}{' '}
      {authors.length > 1 && `+${authors.length - 1}`}
    </td>
  );
}
