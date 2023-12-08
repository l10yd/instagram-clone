import {
  Box,
  Flex,
  Grid,
  GridItem,
  Skeleton,
  Text,
  VStack,
  Image,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Avatar,
  Divider,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import Comment from "../Comment/Comment";
import PostFooter from "../FeedPosts/PostFooter";

export type ProfilePostType = {
  img: string;
};

const ProfilePost: React.FC<ProfilePostType> = ({ img }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {/* пост в общей разметке */}
      <GridItem
        cursor={"pointer"}
        borderRadius={4}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"whiteAlpha.300"}
        position={"relative"}
        aspectRatio={1 / 1}
        onClick={onOpen}
      >
        {/* оверлей с иконками */}
        <Flex
          opacity={0}
          _hover={{ opacity: 1 }}
          position={"absolute"}
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg={"blackAlpha.700"}
          transition={"all 0.3s ease"}
          zIndex={1}
          justifyContent={"center"}
        >
          <Flex alignItems={"center"} justifyContent={"center"} gap={50}>
            <Flex>
              <AiFillHeart size={20} />
              <Text fontWeight={"bold"} ml={2}>
                7
              </Text>
            </Flex>
            <Flex>
              <FaComment size={20} />
              <Text fontWeight={"bold"} ml={2}>
                9
              </Text>
            </Flex>
          </Flex>
        </Flex>

        {/* сама картинка */}
        <Image
          src={img}
          alt="profile post"
          width={"100%"}
          height={"100%"}
          objectFit={"cover"}
        />
      </GridItem>
      {/* модальное окно с этим постом, открывается при нажатии на пост */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered={true}
        size={{ base: "3xl", md: "5xl" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody bg={"black"} paddingBottom={5}>
            <Flex
              gap="4"
              width={{ base: "90%", sm: "70%", md: "full" }}
              marginX={"auto"}
            >
              {/* левая сторона, картинка*/}
              <Box
                borderRadius={4}
                overflow={"hidden"}
                border={"1px solid"}
                borderColor={"whiteAlpha.300"}
                flex={1.5}
              >
                <Image src={img} alt="profile post" />
              </Box>
              {/* правая сторона, инфа и комментарии */}
              <Flex
                flex={1}
                flexDirection={"column"}
                paddingX={10}
                display={{ base: "none", md: "flex" }}
              >
                {/* заголовок - аватар, имя, иконка удалить */}
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                  <Flex alignItems={"center"} gap={4}>
                    <Avatar src="/profilepic.png" size={"sm"} name="dudedude" />
                    <Text fontWeight={"bold"} fontSize={12}>
                      dudedude
                    </Text>
                  </Flex>
                  <Box
                    _hover={{ bg: "whiteAlpha.300", color: "red.600" }}
                    borderRadius={4}
                    padding={1}
                  >
                    <MdDelete size={20} cursor="pointer" />
                  </Box>
                </Flex>

                <Divider marginY={4} bg={"gray.500"} />

                {/* секция комментариев */}
                <VStack
                  w="full"
                  alignItems={"start"}
                  maxHeight={"350px"}
                  overflowY={"auto"}
                >
                  <Comment
                    createdAt="1d ago"
                    username="dudedude"
                    profilePic="/profilepic.png"
                    text={"Will you just shut up man"}
                  />
                </VStack>

                <Divider marginY={4} bg={"gray.8000"} />

                <PostFooter isProfilePage={true} />
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfilePost;
