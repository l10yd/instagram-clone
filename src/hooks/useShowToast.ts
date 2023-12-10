import { useToast } from "@chakra-ui/react";

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

  const showToast = (
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
  };

  return showToast;
};

export default useShowToast;
