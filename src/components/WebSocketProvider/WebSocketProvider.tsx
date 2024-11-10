import React, { createContext, useEffect, useState } from 'react';

import { FILE_NAMES } from 'src/utils/constants';

interface WebSocketContextType {
  socket: WebSocket | null;
}
export const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

interface WebSocketProviderProps {
  children: React.ReactNode;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (!FILE_NAMES.URL_WS) {
      console.log('WebSocket URL is not defined');
      return;
    } else {
      const ws = new WebSocket(FILE_NAMES.URL_WS);

      ws.onopen = () => {
        console.log('WebSocket connection opened');
        ws.send('Client connected');
      };

      ws.onmessage = (event) => {
        console.log('Message received from server', event.data);
      };

      ws.onclose = () => {
        console.log('WebSocket connection closed');
      };

      ws.onerror = (err) => {
        console.error('WebSocket error', err);
      };

      setSocket(ws);

      return () => {
        ws.close();
        console.log('WebSocket closed during cleanup');
      };
    }
  }, []);

  return <WebSocketContext.Provider value={{ socket }}>{children}</WebSocketContext.Provider>;
};
