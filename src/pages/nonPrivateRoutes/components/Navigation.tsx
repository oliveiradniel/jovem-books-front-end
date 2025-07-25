import { useLocation, useNavigate } from 'react-router-dom';

function Range({ isVisible }: { isVisible: boolean }) {
  if (!isVisible) {
    return null;
  }

  return <div className="bg-sky-blue animate-fade-in h-0.5" />;
}

interface NavigationProps {
  disabled: boolean;
}

export default function Navigation({ disabled }: NavigationProps) {
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
            disabled={isSignInPage || disabled}
            onClick={() => navigate('/sign-in')}
            className={`font-roboto disabled:hover:text-mate-gray cursor-pointer transition-colors duration-300 ease-in-out disabled:cursor-default ${isSignInPage ? 'text-white hover:text-white disabled:hover:text-white' : 'text-mate-gray hover:text-white/70'} `}
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
            className={`font-roboto disabled:hover:text-mate-gray cursor-pointer transition-colors duration-300 ease-in-out disabled:cursor-default ${isSignUpPage ? 'text-white hover:text-white disabled:hover:text-white' : 'text-mate-gray hover:text-white/70'} `}
          >
            Criar conta
          </button>

          <Range isVisible={isSignUpPage} />
        </li>
      </ul>
    </nav>
  );
}
