import { Box, Grid, Skeleton, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ProfilePost from "./ProfilePost";

const ProfilePosts = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <Grid
      templateColumns={{
        sm: "repeat(1,1fr)",
        md: "repeat(3,1fr)",
      }}
      gap={1}
      columnGap={1}
    >
      {isLoading ? (
        Array(6)
          .fill("")
          .map((_, index) => (
            <VStack key={index} alignItems={"flex-start"} gap={4}>
              <Skeleton w={"full"}>
                <Box height="300px">skeletooor</Box>
              </Skeleton>
            </VStack>
          ))
      ) : (
        <>
          <ProfilePost img="/img1.png" />
          <ProfilePost img="/img2.png" />
          <ProfilePost img="/img3.png" />
          <ProfilePost img="/img4.png" />
        </>
      )}
    </Grid>
  );
};

export default ProfilePosts;
