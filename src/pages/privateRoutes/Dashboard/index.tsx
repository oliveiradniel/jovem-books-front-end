import AddCategoryIcon from './components/AddCategoryIcon';
import AddBookIcon from './components/AddBookIcon';
import Card from './components/Card';

export default function Dashboard() {
  return (
    <div>
      <p className="font-roboto text-light-gray">
        Aqui você é capaz de adicionar{' '}
        <span className="text-sky-blue">novos livros</span> e{' '}
        <span className="text-sky-blue">novas categorias</span> para separar
        melhor seus livros.
      </p>

      <div className="mt-10 flex flex-col items-center gap-4 overflow-y-auto p-4 sm:flex-row">
        <Card Icon={AddBookIcon} buttonLabel="Novo livro" />
        <Card Icon={AddCategoryIcon} buttonLabel="Nova coleção" />
      </div>
    </div>
  );
}
