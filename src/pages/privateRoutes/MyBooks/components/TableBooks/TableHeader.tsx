export default function TableHeader() {
  return (
    <thead>
      <tr className="bg-navy-blue text-mate-gray font-quicksand">
        <th className="rounded-tl-lg rounded-bl-lg px-2 py-2">Título</th>
        <th className="hidden px-2 py-2 md:table-cell">Autores(as)</th>
        <th className="hidden px-2 py-2 lg:table-cell">Gênero Literário</th>
        <th className="rounded-tr-lg rounded-br-lg px-2 py-2">Status</th>
      </tr>
    </thead>
  );
}
