import React, { FC } from "react";
import { Address } from "../../../../../packages/types/entity/Address";
import { Flex, Text } from "@chakra-ui/react";

const UserAddressCard: FC<{
  address: { name: string; email: string } & Address;
}> = ({ address }) => {
  return (
    <Flex
      direction={"column"}
      rowGap={1}
      border={"dotted"}
      borderColor={"brand.200"}
      minH={"30px"}
      borderWidth={"0px 0px 1px 0px"}
      color={"brand.900"}
    >
      <Text fontSize={"1em"} fontWeight={600}>
        Customer Details
      </Text>
      <Text fontSize={"0.8em"}>{address.name}</Text>
      <Text fontSize={"0.8em"}>{address.email}</Text>
      <Text fontSize={"0.8em"}>{address.addressLine}</Text>
      <Text fontSize={"0.8em"}>
        {address.city} , {address.zipCode} , {address.country}
      </Text>
    </Flex>
  );
};

export default UserAddressCard;
