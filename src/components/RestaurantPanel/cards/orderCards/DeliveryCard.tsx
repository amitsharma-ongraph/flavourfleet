import { Logo } from "@/components/Logo";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { RiMotorbikeFill } from "react-icons/ri";

const DeliveryCard = () => {
  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      rowGap={4}
      h={"full"}
      display={{ base: "none", md: "flex" }}
    >
      <Box h={"40px"} w={"50%"}>
        <Logo />
      </Box>
      <Flex
        flexDirection={"row"}
        columnGap={3}
        alignItems={"center"}
        fontSize={"1.2em"}
        fontWeight={600}
        color={"brand.900"}
      >
        <Icon as={RiMotorbikeFill}></Icon>
        <Text>Delivery</Text>
      </Flex>
    </Flex>
  );
};

export default DeliveryCard;
