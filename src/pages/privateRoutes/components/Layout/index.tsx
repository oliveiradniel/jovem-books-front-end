import { Outlet } from 'react-router-dom';

import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <div className="flex h-screen w-screen bg-linear-to-r bg-[url(/wallpaper-dashboard.jpg)] bg-no-repeat p-5">
      <Sidebar />

      <div className="bg-navy-blue-op-80 flex-1 rounded-e-sm p-5">
        <Outlet />
      </div>
    </div>
  );
}
