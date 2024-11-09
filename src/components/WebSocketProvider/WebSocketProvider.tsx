import React, { createContext, useContext, ReactNode } from 'react';

import useWebSocket from 'src/hooks/useWebSocket';

interface WebSocketContextProps {
  isConnected: boolean;
  sendMessage: (message: string) => void;
  socket: WebSocket | null;
}

const WebSocketContext = createContext<WebSocketContextProps | undefined>(undefined);

interface WebSocketProviderProps {
  children: ReactNode;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
  const { isConnected, sendMessage, socket } = useWebSocket();

  return <WebSocketContext.Provider value={{ isConnected, sendMessage, socket }}>{children}</WebSocketContext.Provider>;
};

export const useWebSocketContext = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocketContext must be used within a WebSocketProvider');
  }
  return context;
};
