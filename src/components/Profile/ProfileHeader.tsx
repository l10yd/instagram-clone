import React from "react";
import {
  Avatar,
  AvatarGroup,
  Flex,
  VStack,
  Text,
  Button,
} from "@chakra-ui/react";

//2 части - аватар слева и контент справа (инфа о пользователе)

const ProfileHeader = () => {
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
        <Avatar name="dudedude" src="/profilepic.png" />
      </AvatarGroup>
      <VStack alignItems={"start"} gap={2} marginX={"auto"} flex={1}>
        <Flex
          gap={4}
          direction={{ base: "column", sm: "row" }}
          justifyContent={{ base: "center", sm: "flex-start" }}
          alignItems={"center"}
          width={"full"}
        >
          <Text fontSize={{ base: "sm", md: "lg" }}>dudedude</Text>
          <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
            <Button
              bg={"white"}
              color={"black"}
              _hover={{ bg: "whiteAlpha.800" }}
              size={{ base: "xs", md: "sm" }}
            >
              Edit Profile
            </Button>
          </Flex>
        </Flex>
        <Flex alignItems={"center"} gap={{ base: 2, sm: 4 }}>
          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as="span" fontWeight={"bold"} marginRight={1}>
              4
            </Text>
            Posts
          </Text>
          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as="span" fontWeight={"bold"} marginRight={1}>
              100
            </Text>
            Followers
          </Text>
          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as="span" fontWeight={"bold"} marginRight={1}>
              99
            </Text>
            Following
          </Text>
        </Flex>
        <Flex alignItems={"center"} gap={4}>
          <Text fontSize={"sm"} fontWeight={"bold"}>
            Dude Dude
          </Text>
        </Flex>
        <Flex alignItems={"center"} gap={4}>
          <Text fontSize={"sm"}>I am the dude and that's it!</Text>
        </Flex>
      </VStack>
    </Flex>
  );
};

export default ProfileHeader;
