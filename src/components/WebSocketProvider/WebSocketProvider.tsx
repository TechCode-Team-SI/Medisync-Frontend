import React, { createContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import { FILE_NAMES } from 'src/utils/constants';

interface SocketContextType {
  socket: Socket | null;
}
export const SocketContext = createContext<SocketContextType | undefined>(undefined);

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = io(FILE_NAMES.URL_WS, {
      transports: ['websocket'],
      autoConnect: true,
    });

    setSocket(socketInstance);

    socketInstance.on('connect', () => {
      console.log('Connected Server');
      socketInstance.emit('joinRoom', { roomName: 'desktop' });
    });

    socketInstance.on('connect_error', (/*err*/) => {
      // console.error('connect error:', err.message);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};
