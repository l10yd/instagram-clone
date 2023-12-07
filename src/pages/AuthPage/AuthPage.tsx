import { Flex } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { VStack } from "@chakra-ui/react";
import AuthForm from "../../components/AuthForm/AuthForm";

const AuthPage = () => {
  return (
    <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
      <Container maxW={"container.md"} padding={0}>
        <Flex justifyContent={"center"} alignItems={"center"} gap={"10"}>
          {/* левая сторона, base:none скрывает на маленьких экранах */}
          <Box display={{ base: "none", md: "block" }}>
            <Image src="/auth.png" h={650} alt="Phone img" />
          </Box>

          {/* правая сторона */}
          <VStack spacing={4} align={"stretch"}>
            <AuthForm />
            <Box textAlign={"center"}>Скачай же приложение!!</Box>
            <Flex gap={5} justifyContent={"center"}>
              <Image src="/playstore.png" h={"10"} alt="Playstore logo" />
              <Image src="/microsoft.png" h={"10"} alt="Microsoft logo" />
            </Flex>
          </VStack>
        </Flex>
      </Container>
    </Flex>
  );
};

export default AuthPage;
