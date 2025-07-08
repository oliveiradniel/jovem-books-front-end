import { Link, useNavigate, useParams } from 'react-router-dom';

import { GoArrowLeft } from 'react-icons/go';
import { CiEdit } from 'react-icons/ci';
import { ClipLoader } from 'react-spinners';

interface ActionsProps {
  isLoadingBook: boolean;
  isRefetchingBook: boolean;
}

export default function Actions({
  isLoadingBook,
  isRefetchingBook,
}: ActionsProps) {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-white transition-colors duration-300 ease-in-out hover:cursor-pointer hover:text-white/70"
        >
          <GoArrowLeft size={20} />
        </button>

        {!isLoadingBook && isRefetchingBook && (
          <ClipLoader color="#ffffff" size={18} />
        )}
      </div>

      <Link
        to={`/book/edit/${id}`}
        onClick={(e) => {
          if (isLoadingBook || isRefetchingBook) e.preventDefault();
        }}
        className={`font-roboto flex items-center justify-center gap-2 text-sm transition-all duration-300 ease-in-out ${isLoadingBook || isRefetchingBook ? 'text-light-gray/40 cursor-default' : 'text-sky-blue cursor-pointer hover:opacity-90'}`}
      >
        <CiEdit size={18} />
        Editar livro
      </Link>
    </div>
  );
}
