import { Box, VStack, Image } from "@chakra-ui/react";
import React from "react";

const AuthForm = () => {
  return (
    <Box border={"1px solid gray"} borderRadius={4} padding={5}>
      <VStack spacing={4}>
        <Image src="/logo.png" h={24} cursor={"pointer"} alt="Instagram" />
      </VStack>
    </Box>
  );
};

export default AuthForm;
