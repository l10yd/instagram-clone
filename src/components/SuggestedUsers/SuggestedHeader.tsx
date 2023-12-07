import React from "react";
import { Flex, Avatar, Text, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const SuggestedHeader = () => {
  return (
    <>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        width={"full"}
      >
        <Flex alignItems={"center"} gap={2}>
          <Avatar name="user123" size={"lg"} src="/profilepic.png" />
          <Text fontSize={12} fontWeight={"bold"}>
            dudedude
          </Text>
        </Flex>
        <Link
          as={RouterLink}
          to={"/auth"}
          fontSize={14}
          fontWeight={"medium"}
          color={"blue.400"}
          style={{ textDecoration: "none" }}
          cursor={"pointer"}
        >
          Log Out
        </Link>
      </Flex>
    </>
  );
};

export default SuggestedHeader;
