import { useAuth } from '../app/hooks/useAuth';

import { Navigate, Outlet } from 'react-router-dom';

interface AuthGuardProps {
  isPrivate: boolean;
}

export function AuthGuard({ isPrivate }: AuthGuardProps) {
  const { signedIn } = useAuth();

  if (!signedIn && isPrivate) {
    return <Navigate to="/sign-in" replace />;
  }

  if (signedIn && !isPrivate) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
