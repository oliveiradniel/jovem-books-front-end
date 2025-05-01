import { Outlet, useLocation } from 'react-router-dom';

import Sidebar from './Sidebar';
import Header from './Sidebar/components/Header';

export default function Layout() {
  const { pathname } = useLocation();

  const isVisible =
    pathname === '/dashboard' ||
    pathname === '/my-books' ||
    pathname === '/google-books' ||
    pathname === '/profile';

  return (
    <div className="flex h-screen w-screen bg-linear-to-r bg-[url(/wallpaper-dashboard.jpg)] bg-no-repeat p-5">
      <Sidebar />

      <div className="bg-navy-blue-op-80 flex-1 rounded-e-sm p-5">
        {isVisible && <Header />}
        <Outlet />
      </div>
    </div>
  );
}
