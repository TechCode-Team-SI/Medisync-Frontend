import { useEffect, useRef, useState } from 'react';

import { URL_WS } from 'src/utils/constants';

const useWebSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (URL_WS) {
      console.log('WebSocket URL is not defined');
      return;
    }
  });

  const socket = new WebSocket(URL_WS);
  socketRef.current = socket;

  socket.onopen = () => {
    console.log('WebSocket connection opened');
    setIsConnected(true);
    socket.send('Client connected');
  };

  socket.onmessage = (event) => {
    console.log('Message received from server', event.data);
  };

  socket.onclose = () => {
    console.log('WebSocket connection closed');
    setIsConnected(false);
  };

  socket.onerror = (err) => {
    console.error('WebSocket error', err);
  };

  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        console.log('WebSocket closed during cleanup');
      }
    };
  }, [URL_WS]);

  const sendMessage = (message: string) => {
    if (socketRef.current && isConnected) {
      socketRef.current.send(message);
    }
  };
  return { isConnected, sendMessage };
};

export default useWebSocket;
