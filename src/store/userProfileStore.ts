import { create } from "zustand";
import { UserDocType } from "./authStore";

interface UserProfileStore {
  userProfile: null | UserDocType;
  setUserProfile: (userProfile: null | UserDocType) => void;
}

//стейт для хранения данных профиля выбранного пользователя
const useUserProfileStore = create<UserProfileStore>((set) => ({
  userProfile: null,
  setUserProfile: (userProfile) => set({ userProfile }),
  //addPost: ()
}));

export default useUserProfileStore;
