import React from "react";
import { useState } from "react";
import { Flex, Avatar, VStack, Box, Button } from "@chakra-ui/react";

//опциональные типы
export type SuggestedUserType = {
  name?: string;
  followers?: number;
  avatar?: string;
};

const SuggestedUser: React.FC<SuggestedUserType> = ({
  name,
  followers,
  avatar,
}) => {
  const [isFollowed, setFollowed] = useState(false);

  return (
    <>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        width={"full"}
      >
        <Flex alignItems={"center"} gap={2}>
          <Avatar src={avatar} name={name} size={"md"} />
          <VStack spacing={2} alignItems={"flex-start"}>
            <Box fontSize={12} fontWeight={"bold"}>
              {name}
            </Box>
            <Box fontSize={11} fontWeight={"bold"} color={"gray.500"}>
              {followers} followers
            </Box>
          </VStack>
        </Flex>
        <Button
          fontSize={13}
          bg={"transparent"}
          p={0}
          h={"max-content"}
          fontWeight={"medium"}
          color={"blue.400"}
          cursor={"pointer"}
          _hover={{ color: "white" }}
          onClick={() => setFollowed(!isFollowed)}
        >
          {isFollowed ? "Unfollow" : "Follow"}
        </Button>
      </Flex>
    </>
  );
};

export default SuggestedUser;
