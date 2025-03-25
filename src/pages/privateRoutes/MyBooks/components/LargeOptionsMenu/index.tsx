import Button from './Button';

export default function LargeOptionsMenu() {
  return (
    <div className="flex gap-4">
      <Button numberOfItems={23} label="Todos os livros" />

      <Button numberOfItems={4} label="Não lidos" />

      <Button numberOfItems={2} label="Em leitura" />

      <Button numberOfItems={9} label="Concluídos" />
    </div>
  );
}
