import { Link, useLocation } from 'react-router-dom';

import { useAuth } from '../../../../app/hooks/useAuth';

import { FaGoogle } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { SiBookstack } from 'react-icons/si';

export default function Sidebar() {
  const { user } = useAuth();

  const { pathname } = useLocation();

  const menuItems = [
    {
      label: 'Dashboard',
      url: '/dashboard',
      icon: <MdDashboard />,
      id: 'dashboard',
    },
    {
      label: 'Meus Livros',
      url: '/my-books',
      icon: <SiBookstack />,
      id: 'my-books',
    },
    {
      label: 'Google Books',
      url: '/google-books',
      icon: <FaGoogle />,
      id: 'google-books',
    },
  ];

  return (
    <div className="bg-blue-black-op-80 relative rounded-s-2xl">
      <div className="p-5">
        <h1 className="text-snow-white font-bebas-neue flex items-center gap-2 text-3xl">
          JOVEM BOOKS
        </h1>
      </div>

      <div className="mt-20 flex flex-col justify-between">
        <nav className="flex flex-col gap-2">
          <ul className="flex flex-col gap-1 p-1">
            {menuItems.map((item) => (
              <li
                key={item.id}
                className={`text-mate-gray font-quicksand text-base font-bold ${item.url === pathname && 'bg-navy-blue-op-80 text-sky-blue cursor-default!'} hover:bg-navy-blue-op-80 ease-in- rounded-sm transition-colors duration-300`}
              >
                <Link
                  to={item.url}
                  className="flex items-center gap-2 px-5 py-3"
                >
                  {item.icon}
                  <div>{item.label}</div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="absolute bottom-0 flex gap-2 p-5">
          <div className="bg-mate-gray h-6 w-6 rounded-full"></div>
          <h1 className="font-quicksand text-snow-white">{user?.username}</h1>
        </div>
      </div>
    </div>
  );
}
