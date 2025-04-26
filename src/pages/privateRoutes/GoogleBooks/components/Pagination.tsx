import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

export default function Pagination() {
  return (
    <div className="mt-4 flex justify-between">
      <p className="font-quicksand text-snow-white">
        Total: <span className="text-sky-blue">20</span>
      </p>

      <div className="flex items-center gap-4">
        <button
          type="button"
          className="transition-opacity duration-300 ease-in-out hover:cursor-pointer hover:opacity-70"
        >
          <IoIosArrowBack className="text-sky-blue" size={22} />
        </button>
        <button
          type="button"
          className="transition-opacity duration-300 ease-in-out hover:cursor-pointer hover:opacity-70"
        >
          <IoIosArrowForward className="text-sky-blue" size={22} />
        </button>
      </div>

      <p className="font-quicksand text-snow-white">
        Página: <span className="text-sky-blue">1</span>
      </p>
    </div>
  );
}
