import useShowToast from "./useShowToast";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import useAuthStore, { UserDocType } from "../store/authStore";

export type LoginType = {
  email: string;
  password: string;
};

const useLogin = () => {
  const showToast = useShowToast();
  const [signInWithEmailAndPassword, _, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const loginUser = useAuthStore((state) => state.login);

  //обработка логина
  const login = async (inputs: LoginType) => {
    if (!inputs.email || !inputs.password) {
      return showToast("Ошибка", "Заполните все поля!!", "error");
    }
    try {
      //проверяем, правильно ли введены данные
      const userCred = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      //достаем данные юзера и записываем их в локалстораж и зустанд
      if (userCred) {
        const docRef = doc(firestore, "users", userCred.user.uid);
        const docSnap = await getDoc(docRef);
        localStorage.setItem("user-info", JSON.stringify(docSnap.data()));
        loginUser(docSnap.data() as UserDocType);
      }
    } catch (error) {
      showToast("Ошибка", (error as Error).message, "error");
    }
  };

  return { loading, error, login };
};

export default useLogin;
