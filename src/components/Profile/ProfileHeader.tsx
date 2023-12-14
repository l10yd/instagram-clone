import {
  Avatar,
  AvatarGroup,
  Flex,
  VStack,
  Text,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import EditProfile from "./EditProfile";

//2 части - аватар слева и контент справа (инфа о пользователе)

const ProfileHeader = () => {
  //загружаем стейт для выбранного профиля
  const { userProfile } = useUserProfileStore();
  //загружаем стейт авторизации (если есть)
  const authUser = useAuthStore((state) => state.user);
  //если стейты совпадают - юзер зашел на свою страницу
  //тогда показывается кнопка редактировать профиль
  const visitingOwnProfileAndAuth =
    authUser && authUser.username === userProfile?.username;
  //если стейты не совпали, попал на другую страницу
  //показывается кнопка Follow
  const visitingAnotherProfileAndAuth =
    authUser && authUser.username !== userProfile?.username;

  //хуки для модального окна Edit Profile
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      gap={{ base: 4, sm: 10 }}
      paddingY={10}
      direction={{ base: "column", sm: "row" }}
    >
      <AvatarGroup
        size={{ base: "xl", md: "2xl" }}
        justifySelf={"center"}
        alignSelf={"flex-start"}
        marginX={"auto"}
      >
        <Avatar src={userProfile?.profilePicURL} />
      </AvatarGroup>

      <VStack alignItems={"start"} gap={2} marginX={"auto"} flex={1}>
        <Flex
          gap={4}
          direction={{ base: "column", sm: "row" }}
          justifyContent={{ base: "center", sm: "flex-start" }}
          alignItems={"center"}
          width={"full"}
        >
          <Text fontSize={{ base: "sm", md: "lg" }}>
            {userProfile?.username}
          </Text>

          {visitingOwnProfileAndAuth && (
            <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
              <Button
                bg={"white"}
                color={"black"}
                _hover={{ bg: "whiteAlpha.800" }}
                size={{ base: "xs", md: "sm" }}
                onClick={onOpen}
              >
                Edit Profile
              </Button>
            </Flex>
          )}

          {visitingAnotherProfileAndAuth && (
            <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
              <Button
                bg={"blue.500"}
                color={"white"}
                _hover={{ bg: "blue.600" }}
                size={{ base: "xs", md: "sm" }}
              >
                Follow
              </Button>
            </Flex>
          )}
        </Flex>
        <Flex alignItems={"center"} gap={{ base: 2, sm: 4 }}>
          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as="span" fontWeight={"bold"} marginRight={1}>
              {userProfile?.posts.length}
            </Text>
            Posts
          </Text>
          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as="span" fontWeight={"bold"} marginRight={1}>
              {userProfile?.followers.length}
            </Text>
            Followers
          </Text>
          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as="span" fontWeight={"bold"} marginRight={1}>
              {userProfile?.following.length}
            </Text>
            Following
          </Text>
        </Flex>
        <Flex alignItems={"center"} gap={4}>
          <Text fontSize={"sm"} fontWeight={"bold"}>
            {userProfile?.fullName}
          </Text>
        </Flex>
        <Flex alignItems={"center"} gap={4}>
          <Text fontSize={"sm"}>{userProfile?.bio}</Text>
        </Flex>
      </VStack>

      {isOpen && <EditProfile isOpen={isOpen} onClose={onClose} />}
    </Flex>
  );
};

export default ProfileHeader;
