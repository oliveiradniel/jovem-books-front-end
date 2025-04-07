import { useNavigate, useParams } from 'react-router-dom';

import { GoArrowLeft } from 'react-icons/go';
import { CiEdit } from 'react-icons/ci';

import { IBook } from '../../../../@types/Book';

interface ActionsProps {
  book: IBook;
  isLoadingBook: boolean;
}

export default function Actions({ book, isLoadingBook }: ActionsProps) {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="flex justify-between">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="text-snow-white hover:text-snow-white-op-70 h-10 transition-colors duration-300 ease-in-out hover:cursor-pointer"
      >
        <GoArrowLeft size={20} />
      </button>
      <button
        type="button"
        disabled={isLoadingBook}
        onClick={() =>
          navigate(`/book/edit/${id}`, { state: { bookData: book } })
        }
        className={`text-sky-blue border-sky-blue font-roboto hover:bg-dark-violet-op-60 disabled:border-navy-blue disabled:text-light-gray/40 flex h-10 w-[140px] items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition-colors duration-300 ease-in-out hover:cursor-pointer disabled:cursor-default disabled:hover:bg-transparent`}
      >
        <CiEdit size={18} />
        Editar livro
      </button>
    </div>
  );
}
