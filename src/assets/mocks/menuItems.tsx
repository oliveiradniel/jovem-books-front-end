import { FaGoogle } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { SiBookstack } from 'react-icons/si';

export function getMenuItems(isExpanded: boolean) {
  return [
    {
      label: 'Dashboard',
      url: '/dashboard',
      // Usando o componente MdDashboard diretamente no JSX
      icon: <MdDashboard className={`${!isExpanded && 'text-xl'}`} />,
      id: 'dashboard',
    },
    {
      label: 'Meus Livros',
      url: '/my-books',
      icon: <SiBookstack className={`${!isExpanded && 'text-xl'}`} />,
      id: 'my-books',
    },
    {
      label: 'Google Books',
      url: '/google-books?page=0',
      icon: <FaGoogle className={`${!isExpanded && 'text-xl'}`} />,
      id: 'google-books',
    },
  ];
}
