import { useContext } from 'react';

import { WebSocketContext } from 'src/components/WebSocketProvider/WebSocketProvider';

export const useWebScoket = () => {
  const context = useContext(WebSocketContext);

  if (!context) {
    throw new Error('useWebScoket must be used within a WebSocketProvider');
  } else {
    const { socket } = context;
    const sendMessage = (message: string) => {
      if (socket && socket.readyState === WebSocket.OPEN && message !== null) {
        socket.send(message);
        console.log('Message sent:', message);
      } else if (message !== null) {
        console.warn('Unable to send message,websocket is not open', socket?.readyState);
      } else {
        console.error('message is null', message);
      }
    };
    return { socket, sendMessage };
  }
};
