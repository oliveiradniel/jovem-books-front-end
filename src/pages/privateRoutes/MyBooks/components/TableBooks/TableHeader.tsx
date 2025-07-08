import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function Header() {
  return (
    <TableHeader>
      <TableRow className="bg-navy-blue hover:bg-navy-blue font-roboto border-none">
        <TableHead className="w-1/4 text-white">Título</TableHead>
        <TableHead className="hidden w-1/4 text-white sm:table-cell">
          Autor(es)
        </TableHead>
        <TableHead className="hidden w-1/4 text-white md:table-cell">
          Gênero Literário
        </TableHead>
        <TableHead className="w-1/4 text-center text-white">Status</TableHead>
      </TableRow>
    </TableHeader>
  );
}
