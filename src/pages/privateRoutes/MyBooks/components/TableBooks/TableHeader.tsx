import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function Header() {
  return (
    <TableHeader>
      <TableRow className="bg-navy-blue text-snow-white font-roboto border-none">
        <TableHead className="w-1/4">Título</TableHead>
        <TableHead className="hidden w-1/4 sm:table-cell">Autor(es)</TableHead>
        <TableHead className="hidden w-1/4 md:table-cell">
          Gênero Literário
        </TableHead>
        <TableHead className="w-1/4 text-center">Status</TableHead>
      </TableRow>
    </TableHeader>
  );
}
