import React, { FC } from "react";
import { IOfferCard } from "../../../packages/types/card/IOfferCard";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";

const OfferCard: FC<{ offer: IOfferCard }> = ({ offer }) => {
  return (
    <Flex
      h={"60px"}
      bg={"white"}
      borderRadius={"10px"}
      flexShrink={0}
      flexDirection={"column"}
      justifyContent={"space-evenly"}
      alignItems={"center"}
      boxShadow={"md"}
      border={"solid"}
      borderColor={"brand.100"}
      borderWidth={"1px"}
      pt={3}
      px={2}
      position={"relative"}
    >
      <Flex
        position={"absolute"}
        left={"50%"}
        transform={"translate(-50%,0%)"}
        justifyContent={"center"}
        alignItems={"center"}
        top={0}
      >
        <Icon as={offer.icon} color={"brand.900"} />
      </Flex>
      <Text fontSize={"1em"} color={"brand.900"}>
        {offer.title}
      </Text>
      <Text fontSize={"0.7em"} color={"brand.900"}>
        {offer.description}
      </Text>
    </Flex>
  );
};

export default OfferCard;
