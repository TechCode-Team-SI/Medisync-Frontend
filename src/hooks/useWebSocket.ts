import { useContext } from 'react';

import { SocketContext } from 'src/components/WebSocketProvider/WebSocketProvider';

export const useWebScoket = () => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error('useWebScoket must be used within a WebSocketProvider');
  } else {
    return context;
  }
};
