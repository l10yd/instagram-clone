import { Flex, Avatar, Text, Button } from "@chakra-ui/react";
import useLogout from "../../hooks/useLogout";
import useAuthStore from "../../store/authStore";
import { Link } from "react-router-dom";

const SuggestedHeader = () => {
  const { handleLogout, isLoggingOut } = useLogout();
  const authUser = useAuthStore((state) => state.user);

  //заголовок для рекомендуемых для фолловинга
  // аватар авторизованного юзера, его имя, кнопка логаут

  return (
    <>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        width={"full"}
      >
        <Flex alignItems={"center"} gap={2}>
          <Link to={`${authUser?.username}`}>
            <Avatar size={"lg"} src={authUser?.profilePicURL} />
          </Link>
          <Link to={`${authUser?.username}`}>
            <Text fontSize={12} fontWeight={"bold"}>
              {authUser?.username}
            </Text>
          </Link>
        </Flex>
        <Button
          size={"xs"}
          background={"transparent"}
          _hover={{ background: "transparent" }}
          fontSize={14}
          fontWeight={"medium"}
          color={"blue.400"}
          cursor={"pointer"}
          isLoading={isLoggingOut}
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </Flex>
    </>
  );
};

export default SuggestedHeader;
