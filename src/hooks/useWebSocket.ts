import { useEffect, useRef, useState } from 'react';

import { FILE_NAMES } from 'src/utils/constants';

export default function useWebSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (FILE_NAMES.URL_WS) {
      console.log('WebSocket URL is not defined');
      return;
    }
    const socket = new WebSocket(FILE_NAMES.URL_WS);
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
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        console.log('WebSocket closed during cleanup');
      }
    };
  }, [FILE_NAMES.URL_WS]);

  const sendMessage = (message: string) => {
    if (socketRef.current && isConnected) {
      socketRef.current.send(message);
    }
  };
  return { isConnected, sendMessage };
}
