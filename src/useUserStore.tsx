import create from 'zustand';
import { UserProps, users as data } from './data/users';

interface TokenState {
  users: UserProps[];
  addUser: (key: number) => void;
  removeUser: (key: number) => void;
}

const useUserStore = create<TokenState>((set) => ({
  users: [...data],
  addUser: (key: number) => {
    set((state) => ({
      ...state,
      user: data.find((e) => e.key === key),
    }));
  },
  removeUser: (key: number) => {
    set((state) => ({
      ...state,
      users: state.users.filter((e) => e.key !== key),
    }));
  },
}));

export default useUserStore;
