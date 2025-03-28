import { GoArrowLeft } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';

export default function GoBack() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className="text-snow-white hover:text-snow-white-op-70 transition-colors duration-300 ease-in-out hover:cursor-pointer"
    >
      <GoArrowLeft size={20} />
    </button>
  );
}
