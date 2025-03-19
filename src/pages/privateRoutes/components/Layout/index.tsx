import { Outlet } from 'react-router-dom';

import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <div className="flex h-screen w-screen bg-linear-to-r bg-[url(/wallpaper-dashboard.jpg)] bg-no-repeat p-5">
      <Sidebar />

      <div>
        <Outlet />
      </div>
    </div>
  );
}
