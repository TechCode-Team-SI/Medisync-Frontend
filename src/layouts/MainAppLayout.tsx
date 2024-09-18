import { Outlet } from 'react-router-dom';

import { Sidebar } from 'src/components/sidebar/sidebar';

export const MainAppLayout = () => {
  return (
    <div className='w-full h-full flex grow'>
      <Sidebar />
      <Outlet />
    </div>
  );
};
