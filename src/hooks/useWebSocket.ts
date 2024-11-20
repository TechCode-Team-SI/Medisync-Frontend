import { useContext } from 'react';

import { SocketContext } from 'src/components/WebSocketProvider/WebSocketProvider';
// import { User } from 'src/services/api/interface';

export const useWebScoket = () => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error('useWebScoket must be used within a WebSocketProvider');
  }

  return context;
};

export enum SocketEnum {
  JOIN_ROOM = 'joinRoom',
  JOIN_USER_ROOM = 'joinUserRoom',
  LEAVE_ROOM = 'leaveRoom',
  SEND_MESSAGE = 'sendMessage',
  TICKET_CHANNEL = 'ticketChannel',
}
