import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Session, User } from '../services/api/interface';
export interface SessionState {
  session: Session | null;
  setSession: (sessionData: Session) => void;
  user: () => User | undefined;
  isAuth: () => boolean;
  logout: () => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      session: null,
      setSession: (sessionData: Session) => set(() => ({ session: sessionData })),
      user: () => get().session?.user,
      logout: () => set(() => ({ session: null })),
      isAuth: () => get().session !== null,
    }),
    {
      name: 'user1',
    },
  ),
);
export const getToken = () => {
  const sessionStore = useSessionStore.getState();

  if (!sessionStore.session?.token) {
    return '';
  }
  return sessionStore.session.token;
};
