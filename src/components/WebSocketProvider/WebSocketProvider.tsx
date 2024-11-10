import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

import { FILE_NAMES } from 'src/utils/constants';

interface WebSocketContextType {
  isConnected: boolean;
  sendMessage: (message: string) => void;
}
const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

interface WebSocketProviderProps {
  children: React.ReactNode;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const connectWebSocket = useCallback(() => {
    if (FILE_NAMES.URL_WS) {
      console.log('WebSocket URL is not defined');
      return;
    } else {
      const ws = new WebSocket(FILE_NAMES.URL_WS);

      ws.onopen = () => {
        console.log('WebSocket connection opened');
        setIsConnected(true);
        ws.send('Client connected');
      };

      ws.onmessage = (event) => {
        console.log('Message received from server', event.data);
      };

      ws.onclose = () => {
        console.log('WebSocket connection closed');
        setIsConnected(false);
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

  useEffect(() => {
    const disconnect = connectWebSocket();
    return disconnect;
  }, [connectWebSocket]);

  const sendMessage = useCallback(
    (message: string) => {
      if (socket && isConnected) {
        socket.send(message);
      } else {
        console.warn('Unable to send message, WebSocket is not online');
      }
    },
    [socket, isConnected],
  );

  return <WebSocketContext.Provider value={{ isConnected, sendMessage }}>{children}</WebSocketContext.Provider>;
};

export const useWebSocket = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};
