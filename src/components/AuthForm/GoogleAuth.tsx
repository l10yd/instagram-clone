import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../firebase/firebase";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import { doc, getDoc, setDoc } from "firebase/firestore";

export type GoogleAuthType = {
  prefix: string;
};

//авторизация через гугл, по аналогии можно через любой en сервис

const GoogleAuth: React.FC<GoogleAuthType> = ({ prefix }) => {
  const [signInWithGoogle, _, __, error] = useSignInWithGoogle(auth);
  const showToast = useShowToast();

  const loginUser = useAuthStore((state) => state.login);

  const handleGoogleAuth = async () => {
    try {
      const newUser = await signInWithGoogle();
      if (!newUser && error) {
        showToast("Ошибка", (error as Error).message, "error");
        return;
      }

      //проверяем, есть ли уже этот юзер в бд, если да - то логин
      if (newUser && newUser.user.uid) {
        const userRef = doc(firestore, "users", newUser.user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userDoc = userSnap.data();
          localStorage.setItem("user-info", JSON.stringify(userDoc));
          //иначе регистрируем как нового
        } else {
          if (newUser && newUser.user.email && newUser.user.displayName) {
            const userDoc = {
              uid: newUser.user.uid,
              email: newUser.user.email,
              username: newUser.user.email.split("@")[0],
              fullName: newUser.user.displayName,
              bio: "",
              profilePicURL: newUser.user.photoURL || "",
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
        }
      }
    } catch (error) {
      showToast("Ошибка", (error as Error).message, "error");
    }
  };

  return (
    <>
      <Flex
        onClick={handleGoogleAuth}
        alignItems={"center"}
        justifyContent={"center"}
        cursor={"pointer"}
      >
        <Image src="/google.png" w={5} alt="Google logo" />
        <Text mx="2" color={"blue.500"}>
          {prefix} with Google
        </Text>
      </Flex>
    </>
  );
};

export default GoogleAuth;
