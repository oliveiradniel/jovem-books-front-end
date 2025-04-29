import { FaGoogle } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { SiBookstack } from 'react-icons/si';

export function getMenuItems(isExpanded: boolean) {
  return [
    {
      label: 'Dashboard',
      url: '/dashboard',
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
      url: '/google-books',
      icon: <FaGoogle className={`${!isExpanded && 'text-xl'}`} />,
      id: 'google-books',
    },
  ];
}
