import { useLocation, useNavigate } from 'react-router-dom';

function Range({ isVisible }: { isVisible: boolean }) {
  if (!isVisible) {
    return null;
  }

  return <div className="bg-sky-blue animate-fade-in h-0.5" />;
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
            disabled={isSignInPage}
            onClick={() => navigate('/sign-in')}
            className={`font-roboto disabled:hover:text-mate-gray cursor-pointer transition-colors duration-300 ease-in-out disabled:cursor-default ${isSignInPage ? 'text-snow-white disabled:hover:text-snow-white hover:text-snow-white' : 'text-mate-gray hover:text-snow-white-op-70'} `}
          >
            Entrar
          </button>

          <Range isVisible={isSignInPage} />
        </li>
        <li>
          <button
            type="button"
            disabled={isSignUpPage}
            onClick={() => navigate('/sign-up')}
            className={`font-roboto disabled:hover:text-mate-gray cursor-pointer transition-colors duration-300 ease-in-out disabled:cursor-default ${isSignUpPage ? 'text-snow-white disabled:hover:text-snow-white hover:text-snow-white' : 'text-mate-gray hover:text-snow-white-op-70'} `}
          >
            Criar conta
          </button>

          <Range isVisible={isSignUpPage} />
        </li>
      </ul>
    </nav>
  );
}
