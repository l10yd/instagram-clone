import { useState, useEffect } from "react";
import {
  Container,
  VStack,
  Flex,
  SkeletonCircle,
  Skeleton,
  Box,
} from "@chakra-ui/react";
import FeedPost from "./FeedPost";

const FeedPosts = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <Container maxW={"container.sm"} paddingY={10} paddingX={2}>
      {isLoading ? (
        [0, 1, 2, 3].map((_, index) => (
          <VStack key={index} gap={4} alignItems={"flex=start"} mb={10}>
            <Flex gap="2">
              <SkeletonCircle size="10" />
              <VStack gap={2} alignItems={"flex-start"}>
                <Skeleton height="10px" width={"200px"} />
                <Skeleton height="10px" width={"200px"} />
              </VStack>
            </Flex>
            <Skeleton width={"full"}>
              <Box height={"500px"}></Box>
            </Skeleton>
          </VStack>
        ))
      ) : (
        <>
          <FeedPost img="/img1.png" username="dudedude1" avatar="/img1.png" />
          <FeedPost img="/img2.png" username="dudedude2" avatar="/img2.png" />
          <FeedPost img="/img3.png" username="dudedude3" avatar="/img3.png" />
          <FeedPost img="/img4.png" username="dudedude4" avatar="/img4.png" />
        </>
      )}
    </Container>
  );
};

export default FeedPosts;
