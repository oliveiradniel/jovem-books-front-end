import { useLocation, useNavigate } from 'react-router-dom';

import { TbError404 } from 'react-icons/tb';
import { navigationNotPrivate, navigationPrivate } from '../assets/mocks/404';

interface NotFoundProps {
  isPrivate: boolean;
}

export default function NotFound({ isPrivate }: NotFoundProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const navigationOptions = isPrivate
    ? navigationPrivate
    : navigationNotPrivate;

  return (
    <div className="bg-blue-black flex h-screen flex-col items-center justify-center">
      <h1 className="font-bebas-neue text-snow-white text-4xl">JOVEM BOOKS</h1>

      <div className="bg-sky-blue/10 my-6 h-[0.1px] w-[50%]" />

      <div className="flex items-center gap-2">
        <TbError404 className="text-snow-white text-4xl" />
        <span className="text-light-gray"> - {pathname}</span>
      </div>

      <p className="text-sky-blue font-roboto mt-10 text-2xl font-semibold">
        Oops!
      </p>
      <span className="text-light-gray font-quicksand mb-10">
        A página que você está procurando não foi encontrada.
      </span>

      <div className="flex flex-col gap-4">
        <p className="text-snow-white font-quicksand mt-6 text-center">
          Talvez você esteja procurando por
        </p>
        <ul className="text-mt-2 flex justify-center">
          {navigationOptions.map((option, index) => (
            <li key={index}>
              <button
                onClick={() => navigate(option.path, { replace: true })}
                className="text-sky-blue hover:text-sky-blue/80 font-roboto transition-colors duration-300 ease-in-out hover:cursor-pointer"
              >
                {option.label}
              </button>
              {index < navigationOptions.length - 1 && (
                <span className="mx-3 font-thin">|</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
