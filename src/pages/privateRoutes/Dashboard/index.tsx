// import AddCategoryIcon from './components/AddCategoryIcon';
import { useSetDocumentTitle } from '@/app/hooks/useSetDocumentTitle';
import AddBookIcon from './components/AddBookIcon';
import Card from './components/Card';

export default function Dashboard() {
  useSetDocumentTitle({ title: 'Dashboard' });

  return (
    <div className="flex-1">
      <p className="font-roboto text-light-gray">
        Aqui você é capaz de adicionar
        <span className="text-sky-blue"> novos livros.</span>
        {/* e{' '}
        <span className="text-sky-blue">novas categorias</span>  */}
        {/* para separar melhor seus livros. */}
      </p>

      <div className="mt-10 flex flex-col items-center gap-4 p-4 sm:flex-row">
        <Card to="/new-book" Icon={AddBookIcon} buttonLabel="Novo livro" />
        {/* <Card
          to="/new-collection"
          Icon={AddCategoryIcon}
          buttonLabel="Nova coleção"
          disabled
        /> */}
      </div>
    </div>
  );
}
