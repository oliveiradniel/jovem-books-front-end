import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface PaginationProps {
  currentPage: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export default function Pagination({
  currentPage,
  onIncrement,
  onDecrement,
}: PaginationProps) {
  return (
    <div className="mt-4 flex justify-between">
      <p className="font-quicksand text-snow-white">
        Total: <span className="text-sky-blue">20</span>
      </p>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => onDecrement()}
          className="transition-opacity duration-300 ease-in-out hover:cursor-pointer hover:opacity-70"
        >
          <IoIosArrowBack className="text-sky-blue" size={22} />
        </button>
        <button
          type="button"
          onClick={() => onIncrement()}
          className="transition-opacity duration-300 ease-in-out hover:cursor-pointer hover:opacity-70"
        >
          <IoIosArrowForward className="text-sky-blue" size={22} />
        </button>
      </div>

      <p className="font-quicksand text-snow-white">
        Página: <span className="text-sky-blue">{currentPage}</span>
      </p>
    </div>
  );
}
