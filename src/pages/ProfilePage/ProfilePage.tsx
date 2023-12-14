import {
  Container,
  Flex,
  Text,
  Link,
  SkeletonCircle,
  VStack,
  Skeleton,
} from "@chakra-ui/react";

import ProfileHeader from "../../components/Profile/ProfileHeader";
import ProfileTabs from "../../components/Profile/ProfileTabs";
import ProfilePosts from "../../components/Profile/ProfilePosts";
import useGetUserProfileByUsername from "../../hooks/useGetUserProfileByUsername";
import { Link as RouterLink, useParams } from "react-router-dom";

const ProfilePage = () => {
  //в App.tsx эта страница открывается по пути /:username
  const { username } = useParams();
  const { isLoading, userProfile } = useGetUserProfileByUsername(
    username || ""
  );

  //если юзера по такому id нет, рендерится 404
  const userNotFound = !isLoading && !userProfile;
  if (userNotFound) {
    return <UserNotFound />;
  }

  return (
    <Container maxWidth="container.lg" paddingY={5}>
      <Flex
        paddingY={10}
        paddingX={4}
        paddingLeft={{ base: 4, md: 10 }}
        width={"full"}
        marginX={"auto"}
        flexDirection={"column"}
      >
        {!isLoading && userProfile && <ProfileHeader />}
        {isLoading && <ProfileHeaderSkeleton />}
      </Flex>
      <Flex
        paddingX={{ base: 2, sm: 4 }}
        maxWidth={"full"}
        marginX={"auto"}
        borderTop={"1px solid"}
        borderColor={"whiteAlpha.300"}
        direction={"column"}
      >
        <ProfileTabs />
        <ProfilePosts />
      </Flex>
    </Container>
  );
};

//скелетон для заголовка профиля, пока идет загрузка
const ProfileHeaderSkeleton = () => {
  return (
    <Flex
      gap={{ base: 4, sm: 10 }}
      py={10}
      direction={{ base: "column", sm: "row" }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <SkeletonCircle size="24" />
      <VStack
        alignItems={{ base: "center", sm: "flex-start" }}
        gap={2}
        mx={"auto"}
        flex={1}
      >
        <Skeleton height="12px" width="150px" />
        <Skeleton height="12px" width="100px" />
      </VStack>
    </Flex>
  );
};

//если пользователь не найден
const UserNotFound = () => {
  return (
    <Flex flexDir="column" textAlign={"center"} mx={"auto"}>
      <Text fontSize={"2x1"}>Пользователь не найден!</Text>
      <Link
        as={RouterLink}
        to={"/"}
        color={"blue.500"}
        w={"max-content"}
        mx={"auto"}
      >
        На главную
      </Link>
    </Flex>
  );
};

export default ProfilePage;
