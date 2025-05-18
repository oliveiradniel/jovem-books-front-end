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
          className="text-snow-white hover:text-snow-white-op-70 h-10 transition-colors duration-300 ease-in-out hover:cursor-pointer"
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
        className={`font-roboto flex h-10 w-[140px] items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition-colors duration-300 ease-in-out ${isLoadingBook || isRefetchingBook ? 'border-navy-blue text-light-gray/40 cursor-default hover:bg-transparent' : 'border-sky-blue text-sky-blue hover:bg-dark-violet/60 hover:cursor-pointer'}`}
      >
        <CiEdit size={18} />
        Editar livro
      </Link>
    </div>
  );
}
