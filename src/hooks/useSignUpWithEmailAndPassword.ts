import { auth, firestore } from "../firebase/firebase";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import useShowToast from "./useShowToast";
import useAuthStore, { AuthState } from "../store/authStore";

export type SignUpInputsType = {
  email: string;
  password: string;
  username: string;
  fullName: string;
};

const useSignUpWithEmailAndPassword = () => {
  const [createUserWithEmailAndPassword, _, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const showToast = useShowToast();

  const loginUser = useAuthStore((state: AuthState) => state.login);

  //обработка регистрации
  const signup = async (inputs: SignUpInputsType) => {
    if (
      !inputs.email ||
      !inputs.password ||
      !inputs.username ||
      !inputs.fullName
    ) {
      showToast("Ошибка", "Заполните все поля!!", "error");
      return;
    }

    //проверяем, есть ли юзер с таким username в бд
    const usersRef = collection(firestore, "users");
    const q = query(usersRef, where("username", "==", inputs.username));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      showToast("Ошибка", "Этот юзернейм уже занят", "error");
      return;
    }

    try {
      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!newUser && error) {
        showToast("Ошибка", (error as Error).message, "error");
        return;
      }
      //если инпуты норм, создаем новую запись в firestore
      if (newUser) {
        const userDoc = {
          uid: newUser.user.uid,
          email: inputs.email,
          username: inputs.username,
          fullName: inputs.fullName,
          bio: "",
          profilePicURL: "",
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        };
        //записываем в бд (объект firestore, коллекция users)
        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
        //заодно в локалстораж
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);
      }
    } catch (error) {
      showToast("Ошибка", (error as Error).message, "error");
    }
  };

  return { loading, error, signup };
};

export default useSignUpWithEmailAndPassword;
