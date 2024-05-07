import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import React, { FC } from "react";
import logoImage from "../../public/favicon.ico";
import { useRouter } from "next/router";

export const Logo: FC<{}> = () => {
  const { push } = useRouter();
  return (
    <Flex
      align="center"
      justify="center"
      w={"100%"}
      h={"100%"}
      borderRadius="md"
      boxShadow="md"
      cursor={"pointer"}
      onClick={() => {
        push("/");
      }}
    >
      <Box w="30px" h="30px" borderRadius="full">
        <Image src={logoImage} alt=""></Image>
      </Box>
      <Text ml="2" color={"brand.500"} fontWeight="bold">
        FlavourFleet
      </Text>
    </Flex>
  );
};
