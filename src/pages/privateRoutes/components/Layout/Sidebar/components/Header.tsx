import { useLocation } from 'react-router-dom';

import { useAuth } from '../../../../../../app/hooks/useAuth';

import { getGreeting } from '../../../../../../utils/getGreeting';

export default function Header() {
  const { user } = useAuth();

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
        <h1 className="font-quicksand text-snow-white text-2xl">
          {titles[pathname]}
        </h1>
        <p className="font-quicksand text-snow-white hidden text-xl font-bold sm:flex">
          {getGreeting({ name: user?.firstName as string })}
        </p>
      </div>

      <div className="bg-navy-blue mb-3 h-[0.2px] w-full"></div>
    </>
  );
}
