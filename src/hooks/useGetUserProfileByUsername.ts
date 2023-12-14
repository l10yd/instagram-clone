import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useUserProfileStore from "../store/userProfileStore";

const useGetUserProfileByUsername = (username: string) => {
  const [isLoading, setLoading] = useState(true);
  const showToast = useShowToast();
  const { userProfile, setUserProfile } = useUserProfileStore();

  useEffect(() => {
    const getUserProfile = async () => {
      setLoading(true);
      try {
        //получаем данные юзера из бд по его юзернейму
        const q = query(
          collection(firestore, "users"),
          where("username", "==", username)
        );
        const querySnapshot = await getDocs(q);

        //если такого нет - профиль пустой
        if (querySnapshot.empty) {
          return setUserProfile(null);
        }

        let userDoc;
        querySnapshot.forEach((doc) => {
          userDoc = doc.data();
        });

        if (userDoc) {
          setUserProfile(userDoc);
          console.log(userDoc);
        }
      } catch (error) {
        showToast("Ошибка", (error as Error).message, "error");
      } finally {
        setLoading(false);
      }
    };

    getUserProfile();
  }, [setUserProfile, username, showToast]);
  return { isLoading, userProfile };
};

export default useGetUserProfileByUsername;
