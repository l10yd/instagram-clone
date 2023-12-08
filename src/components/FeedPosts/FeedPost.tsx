import React from "react";
import PostHeader from "./PostHeader";
import { Box, Image } from "@chakra-ui/react";
import PostFooter from "./PostFooter";

//опциональные типы
export type FeedPostType = {
  img?: string;
  username?: string;
  avatar?: string;
  isProfilePage?: boolean;
};

const FeedPost: React.FC<FeedPostType> = ({ img, username, avatar }) => {
  return (
    <>
      <PostHeader username={username} avatar={avatar} />
      <Box marginY={2} borderRadius={4} overflow={"hidden"}>
        <Image src={img} alt={username} />
      </Box>
      <PostFooter username={username} />
    </>
  );
};

export default FeedPost;
