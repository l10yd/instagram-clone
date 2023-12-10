import { auth, firestore } from "../firebase/firebase";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { doc, setDoc } from "firebase/firestore";
import useShowToast from "./useShowToast";

export type SignUpInputsType = {
  email: string;
  password: string;
  username: string;
  fullName: string;
};

const useSignUpWithEmailAndPassword = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const showToast = useShowToast();

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
      }
    } catch (error) {
      showToast("Ошибка", (error as Error).message, "error");
    }
  };

  return { loading, error, signup };
};

export default useSignUpWithEmailAndPassword;
