import { create } from 'zustand';

type Store = {
  count: number;
  inc: () => void;
};

export const useCount = create<Store>()((set) => ({
  count: 1,
  inc: () => {
    set((state) => {
      return { count: state.count + 1 };
    });
  },
}));
