import { useContext, useEffect, useState } from 'react';

import { WebSocketContext } from 'src/components/WebSocketProvider/WebSocketProvider';

export const useWebScoket = () => {
  const context = useContext(WebSocketContext);

  if (!context) {
    throw new Error('useWebScoket must be used within a WebSocketProvider');
  } else {
    const { socket } = context;
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
      if (socket && socket.readyState === WebSocket.OPEN && message !== null) {
        socket.send(message);
        console.log('Message sent:', message);
        setMessage(null);
      } else if (message !== null) {
        console.warn('Unable to send message,websocket is not open');
      }
    }, [socket, message]);

    const sendMessage = (newMessage: string) => {
      setMessage(newMessage);
    };
    return { socket, sendMessage };
  }
};
