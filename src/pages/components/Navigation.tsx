import { useLocation, useNavigate } from 'react-router-dom';

function Range({ isVisible }: { isVisible: boolean }) {
  if (!isVisible) {
    return null;
  }

  return <div className="bg-royal-purple animate-fade-in h-0.5" />;
}

export default function Navigation() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isSignInPage = pathname === '/sign-in';
  const isSignUpPage = pathname === '/sign-up';

  return (
    <nav>
      <ul className="flex gap-4">
        <li>
          <button
            type="button"
            onClick={() => navigate('/sign-in')}
            className={`font-roboto transition-colors duration-300 ease-in-out ${isSignInPage ? 'hover:text-snow-white text-snow-white cursor-default' : 'hover:text-snow-white-op-70 text-mate-gray cursor-pointer'}`}
          >
            Entrar
          </button>

          <Range isVisible={isSignInPage} />
        </li>
        <li className="text-snow-white font-roboto">
          <button
            type="button"
            onClick={() => navigate('/sign-up')}
            className={`font-roboto transition-colors duration-300 ease-in-out ${isSignUpPage ? 'hover:text-snow-white text-snow-white cursor-default' : 'hover:text-snow-white-op-70 text-mate-gray cursor-pointer'}`}
          >
            Criar conta
          </button>

          <Range isVisible={isSignUpPage} />
        </li>
      </ul>
    </nav>
  );
}
