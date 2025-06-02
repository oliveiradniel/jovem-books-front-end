import { TableCell } from '@/components/ui/table';
import { truncateString } from '../../../../../../utils/truncateString';

export default function Title({ title }: { title: string }) {
  return <TableCell className="w-1/4">{truncateString(title, 10)}</TableCell>;
}
