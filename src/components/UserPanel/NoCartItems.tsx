import { Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { BiSad } from "react-icons/bi";

function NoCartItems() {
  return (
    <Flex
      w={"full"}
      flexDirection={"column"}
      rowGap={1}
      alignItems={"center"}
      color={"brand.900"}
      fontSize={"1.5em"}
    >
      <Icon as={BiSad} fontSize={"2em"}></Icon>
      <Text>No Items</Text>
      <Text>Please Add Some dishes</Text>
    </Flex>
  );
}

export default NoCartItems;
