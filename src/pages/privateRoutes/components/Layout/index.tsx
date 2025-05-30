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
    <div className="flex min-h-screen w-screen bg-linear-to-r bg-[url(/wallpaper-dashboard.jpg)] bg-no-repeat p-5">
      <Sidebar />

      <div className="bg-navy-blue/80 flex min-h-full flex-1 flex-col overflow-hidden rounded-e-sm p-5">
        {isVisible && <Header />}
        <Outlet />
      </div>
    </div>
  );
}
