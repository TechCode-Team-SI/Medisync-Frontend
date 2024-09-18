import { Outlet } from 'react-router-dom';

import { Sidebar } from 'src/components/sidebar/sidebar';

export const MainAppLayout = () => {
  return (
    <div className='w-full h-full flex grow pb-8'>
      <Sidebar />
      <Outlet />
    </div>
  );
};
