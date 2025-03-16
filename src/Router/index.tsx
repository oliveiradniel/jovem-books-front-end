import { Routes, Route } from 'react-router-dom';

import { AuthGuard } from './AuthGuard';

import Home from '../pages/nonPrivateRoutes/Home';
import SignIn from '../pages/nonPrivateRoutes/SignIn';
import SignUp from '../pages/nonPrivateRoutes/SignUp';

import Dashboard from '../pages/privateRoutes/Dashboard';

export default function Router() {
  return (
    <Routes>
      <Route element={<AuthGuard isPrivate={false} />}>
        <Route index path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Route>

      <Route element={<AuthGuard isPrivate />}>
        <Route index path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}
