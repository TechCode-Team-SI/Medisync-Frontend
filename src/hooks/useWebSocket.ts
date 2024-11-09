import { useEffect, useState } from 'react';

import { FILE_NAMES } from 'src/utils/constants';

export default function useWebSocket() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (FILE_NAMES.URL_WS) {
      console.log('WebSocket URL is not defined');
      return;
    }
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
    return () => {
      ws.close();
      console.log('WebSocket closed during cleanup');
    };
  }, [FILE_NAMES.URL_WS]);

  const sendMessage = (message: string) => {
    if (socket && isConnected) {
      socket.send(message);
    } else {
      console.warn('WebSocket is not connected');
    }
  };
  return { isConnected, sendMessage, socket };
}
