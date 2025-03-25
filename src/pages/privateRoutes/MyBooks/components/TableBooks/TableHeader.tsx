export default function TableHeader() {
  return (
    <thead>
      <tr className="bg-navy-blue text-mate-gray font-quicksand">
        <th className="rounded-tl-lg rounded-bl-lg px-2 py-2">Título</th>
        <th className="px-2 py-2">Autores(as)</th>
        <th className="px-2 py-2">Gênero Literário</th>
        <th className="rounded-tr-lg rounded-br-lg px-2 py-2">Status</th>
      </tr>
    </thead>
  );
}
