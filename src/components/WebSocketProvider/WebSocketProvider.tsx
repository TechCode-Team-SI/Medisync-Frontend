import React, { createContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import { useSessionStore } from 'src/store/sessionStore';
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
  const { session } = useSessionStore();

  useEffect(() => {
    const socketInstance = io(FILE_NAMES.URL_WS, {
      transports: ['websocket'],
      autoConnect: true,
      auth: { token: `Bearer ${session?.token}` },
    });

    setSocket(socketInstance);

    socketInstance.on('connect', () => {
      console.log('Connected Server');
      //socketInstance.emit('joinRoom', { roomName: 'desktop' });
    });

    socketInstance.on('error', (error) => {
      console.error('connect error:', error);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.auth = { token: `Bearer ${session?.token}` };
    }
  }, [socket, session]);

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};
