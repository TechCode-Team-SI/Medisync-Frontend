import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

import Menu from 'src/components/titlebar/Menu';
import Titlebar from 'src/components/titlebar/Titlebar';
import WindowControls from 'src/components/titlebar/WindowControls';
import { SocketProvider } from 'src/components/WebSocketProvider/WebSocketProvider';

const queryClient = new QueryClient();

export const RootLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SocketProvider>
        <Toaster />
        <div className='w-full h-full flex flex-col justify-start items-start'>
          <Titlebar>
            {(windowState) => (
              <>
                <Menu />
                <WindowControls windowState={windowState} />
              </>
            )}
          </Titlebar>
          <Outlet />
        </div>
      </SocketProvider>
    </QueryClientProvider>
  );
};
