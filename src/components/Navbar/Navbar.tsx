import { Container, Flex, Image, Button } from "@chakra-ui/react";

import { Link } from "react-router-dom";

//хедер с кнопками логин/сайнап

const Navbar = () => {
  return (
    <Container maxWidth={"container.lg"} marginY={4}>
      <Flex
        width={"full"}
        justifyContent={{ base: "center", sm: "space-between" }}
        alignItems={"center"}
      >
        <Image
          src="/logo.png"
          height={20}
          display={{ base: "none", sm: "block" }}
          cursor={"pointer"}
        />
        <Flex gap={4}>
          <Link to="/auth">
            <Button colorScheme={"blue"} size={"sm"}>
              Login
            </Button>
          </Link>
          <Link to="/auth">
            <Button variant={"outline"} size={"sm"}>
              Signup
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Navbar;
