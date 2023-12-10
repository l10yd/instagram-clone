import { Container, Flex } from "@chakra-ui/react";

import ProfileHeader from "../../components/Profile/ProfileHeader";
import ProfileTabs from "../../components/Profile/ProfileTabs";
import ProfilePosts from "../../components/Profile/ProfilePosts";

const ProfilePage = () => {
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
        <ProfileHeader />
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

export default ProfilePage;
