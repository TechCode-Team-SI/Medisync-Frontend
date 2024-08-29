import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';

import { Sidebar } from 'src/components/sidebar/sidebar';

const queryClient = new QueryClient();

export const RootLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='w-full h-full flex flex-1'>
        <Sidebar />
        <Outlet />
      </div>
    </QueryClientProvider>
  );
};
