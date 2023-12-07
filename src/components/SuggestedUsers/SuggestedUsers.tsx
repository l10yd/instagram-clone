import { VStack } from "@chakra-ui/react";
import { Flex, Box, Text, Link } from "@chakra-ui/react";

import SuggestedHeader from "./SuggestedHeader";
import SuggestedUser from "./SuggestedUser";

const SuggestedUsers = () => {
  return (
    <>
      <VStack paddingY={8} paddingX={6} gap={4}>
        <SuggestedHeader />
        <Flex
          alignItems={"center"}
          justifyContent={"space-between"}
          width={"full"}
        >
          <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
            Suggested for you
          </Text>
          <Text
            fontSize={12}
            fontWeight={"bold"}
            _hover={{ color: "gray:400" }}
            cursor={"pointer"}
          >
            See All
          </Text>
        </Flex>

        <SuggestedUser name="Bori Britva" followers={1392} avatar="/img1.png" />
        <SuggestedUser name="Gena Vetrov" followers={999} avatar="/img2.png" />
        <SuggestedUser name="Lesha Ogurtsov" followers={1} avatar="/img3.png" />

        <Box fontSize={12} color={"gray.500"} mt={5} alignSelf={"start"}>
          @ 2023 Built by{" "}
          <Link href="" target="_blank">
            l10yd
          </Link>
        </Box>
      </VStack>
    </>
  );
};

export default SuggestedUsers;
