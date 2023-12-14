import { useState } from "react";
import useAuthStore, { UserDocType } from "../store/authStore";
import useShowToast from "./useShowToast";
import { firestore, storage } from "../firebase/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import useUserProfileStore from "../store/userProfileStore";

interface Inputs {
  fullName?: string;
  username?: string;
  bio?: string;
  profilePicURL?: string;
}

// возвращает функцию для обновления данных в Edit Profile
const useEditProfile = () => {
  const [isUpdating, setUpdating] = useState(false);

  const authUser: UserDocType | null = useAuthStore((state) => state.user);
  const setAuthUser = useAuthStore((state) => state.setUser);
  const setUserProfile = useUserProfileStore((state) => state.setUserProfile);

  const showToast = useShowToast();

  const editProfile = async (inputs: Inputs, selectedFile: string | null) => {
    // защита от мультиклика
    if (isUpdating || !authUser) return;
    setUpdating(true);

    // получаем ссылки на записи в бд
    const storageRef = ref(storage, `profilePics/${authUser.uid}`);
    const userDocRef = doc(firestore, "users", authUser.uid);

    let URL = "";

    try {
      if (selectedFile) {
        await uploadString(storageRef, selectedFile, "data_url");
        URL = await getDownloadURL(storageRef);
      }

      const updatedUser: UserDocType = {
        ...authUser,
        fullName: inputs.fullName || authUser.fullName,
        username: inputs.username || authUser.username,
        bio: inputs.bio || authUser.bio,
        profilePicURL: URL || authUser.profilePicURL,
      };

      // обновляем запись в бд
      await updateDoc(userDocRef, updatedUser);
      // перезаписываем в стейты авторизации, данных профиля и локалстораж
      localStorage.setItem("user-info", JSON.stringify(updatedUser));
      setAuthUser(updatedUser);
      setUserProfile(updatedUser);
      showToast("Успех!", "Профиль обновлен", "success");
    } catch (error) {
      showToast("Ошибка", (error as Error).message, "error");
    } finally {
      setUpdating(false);
    }
  };

  return { editProfile, isUpdating };
};

export default useEditProfile;
