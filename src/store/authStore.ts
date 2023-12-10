import { create } from "zustand";

export type UserDocType = {
  uid: string;
  email: string;
  username: string;
  fullName: string;
  bio: string;
  profilePicURL: string;
  followers: UserDocType[];
  following: UserDocType[];
  posts: any[];
  createdAt: number;
};

export type AuthState = {
  user: UserDocType | null;
  login: (user: UserDocType) => void;
  logout: () => void;
  setUser: (user: UserDocType) => void;
};

//стейт для аутентификации

const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem("user-info") ?? "null"),
  login: (user: UserDocType) => set({ user }),
  logout: () => set({ user: null }),
  setUser: (user: UserDocType) => set({ user }),
}));

export default useAuthStore;
