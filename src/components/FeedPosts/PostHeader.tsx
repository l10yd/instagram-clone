import React from "react";
import { Flex, Box, Avatar, Text } from "@chakra-ui/react";
import { FeedPostType } from "./FeedPost";

//заголовок поста - аватар, имя, время, кнопка unfollow

const PostHeader: React.FC<FeedPostType> = ({ username, avatar }) => {
  return (
    <>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        width={"full"}
        marginBottom={2}
      >
        <Flex alignItems={"center"} gap={2}>
          <Avatar src={avatar} name="user pfp" size={"sm"} />
          <Flex fontSize={12} fontWeight={"bold"} gap={2}>
            {username}
            <Box color={"gray.500"}>- 1w</Box>
          </Flex>
        </Flex>
        <Box cursor={"pointer"}>
          <Text
            fontSize={12}
            color={"blue.500"}
            fontWeight={"bold"}
            _hover={{
              color: "white",
            }}
            transition={"0.2 ease-in-out"}
          >
            Unfollow
          </Text>
        </Box>
      </Flex>
    </>
  );
};

export default PostHeader;
