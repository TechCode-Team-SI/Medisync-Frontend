import { Navigate, Outlet } from 'react-router-dom';

import { Sidebar } from 'src/components/sidebar/sidebar';
import { paths } from 'src/paths';

export const ProtectedRoute = ({ canActive = false, redirectPath = paths.login }) => {
  if (!canActive) {
    return <Navigate to={redirectPath} replace />;
  }
  return (
    <div className='w-full h-full flex grow pb-8'>
      <Sidebar />
      <Outlet />
    </div>
  );
};

export const PublicRoute = ({ canActive = false, redirectPath = paths.dashboard }) => {
  if (canActive) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};
