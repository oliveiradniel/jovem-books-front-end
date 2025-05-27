import { truncateString } from '../../../../../../utils/truncateString';

export default function Authors({ authors }: { authors: string[] }) {
  return (
    <td className="px-2 py-2 text-center">
      {truncateString(authors[0], 10)}{' '}
      {authors.length > 1 && `+${authors.length - 1}`}
    </td>
  );
}
