import { truncateString } from '../../../../../../utils/truncateString';

export default function Title({ title }: { title: string }) {
  return (
    <td className="rounded-tl-lg rounded-bl-lg px-2 py-2 text-center">
      {truncateString(title, 10)}
    </td>
  );
}
