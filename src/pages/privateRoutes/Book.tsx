import { useNavigate } from 'react-router-dom';

import { GoArrowLeft } from 'react-icons/go';

export default function Book() {
  const navigate = useNavigate();

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="text-snow-white hover:text-snow-white-op-70 transition-colors duration-300 ease-in-out hover:cursor-pointer"
      >
        <GoArrowLeft size={20} />
      </button>
    </div>
  );
}
