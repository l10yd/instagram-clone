import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

export type AuthError = {
  code: string;
  message: string;
};

export type ToastType = {
  title: string;
  description: string | AuthError;
  status: "info" | "warning" | "success" | "error" | "loading" | undefined;
};

//кастомное окошко с сообщением об ошибке
const useShowToast = () => {
  const toast = useToast();

  //чтобы бесконечно не перерисовывалось, кэшируем отдельную функцию
  //через колбэк
  const showToast = useCallback(
    (
      title: string,
      description: string | AuthError,
      status: ToastType["status"]
    ) => {
      const toastConfig = {
        title,
        description:
          typeof description === "string" ? description : description.message,
        status,
        duration: 3000,
        isClosable: true,
      };

      toast(toastConfig);
    },
    [toast]
  );

  return showToast;
};

export default useShowToast;
