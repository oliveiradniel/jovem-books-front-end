import { useLocation } from 'react-router-dom';

import { useAuth } from '../../../../../../app/hooks/useAuth';

import { getGreeting } from '../../../../../../utils/getGreeting';
import { ClipLoader } from 'react-spinners';

export default function Header() {
  const { user, isLoadingUser, isRefetchingUser } = useAuth();

  const { pathname } = useLocation();

  const titles: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/my-books': 'Meus Livros',
    '/google-books': 'Google Books',
    '/profile': 'Meu perfil',
  };

  return (
    <>
      <div className="mb-3 flex justify-between">
        <h1 className="font-quicksand text-2xl text-white">
          {titles[pathname]}
        </h1>
        <p className="font-quicksand hidden items-center text-xl font-bold text-white sm:flex">
          {isLoadingUser && isRefetchingUser && 'Carregando...'}
          {!isLoadingUser && isRefetchingUser && (
            <ClipLoader color="#ffffff" size={16} className="mr-2 text-sm" />
          )}
          {user && getGreeting({ name: user.firstName })}
        </p>
      </div>

      <div className="bg-navy-blue mb-3 h-[0.2px] w-full"></div>
    </>
  );
}
