import React, { FC } from "react";
import { IUserPOrder } from "../../../../../packages/types/entity/IUserPOrder";
import { Flex, Icon, Text } from "@chakra-ui/react";
import OutletAddressCard from "@/components/RestaurantPanel/cards/orderCards/OutletAddressCard";
import UserAddressCard from "@/components/RestaurantPanel/cards/orderCards/UserAddressCard";
import OrderBillCard from "@/components/RestaurantPanel/cards/orderCards/OrderBillCard";
import FullBillCard from "./FullBillCard";
import DeliveryAddressCard from "./DeliveryAddressCard";
import StatusCard from "./StatusCard";

const UserPOrderCard: FC<{ order: IUserPOrder }> = ({ order }) => {
  const {
    restroAddress,
    userAddress,
    bill,
    items,
    id,
    status,
    note,
    restroId,
    timeline,
  } = order;
  return (
    <Flex
      flexDirection={"column"}
      minW={"350px"}
      maxW={"45%"}
      flex={1}
      boxShadow={"lg"}
      borderRadius={"20px"}
      border={"solid"}
      borderColor={"brand.100"}
      borderWidth={"1px"}
      overflow={"hidden"}
    >
      <Flex
        flexDirection={{ base: "column", md: "row" }}
        rowGap={3}
        columnGap={3}
        id="orderCard"
        minH={{ base: "300px", md: "100px" }}
        p={3}
        flex={1}
        width={"full"}
      >
        <Flex
          flex={1}
          border={"dotted"}
          borderColor={"brand.900"}
          borderWidth={{ base: "0px 0px 1px 0px", md: "0px 1px 0px 0px" }}
          px={2}
          flexDirection={"column"}
        >
          <FullBillCard
            bill={bill}
            items={items}
            restroName={restroAddress.name}
          />
        </Flex>
        <Flex
          flex={1}
          border={"dotted"}
          borderColor={"brand.900"}
          borderWidth={{ base: "0px 0px 1px 0px", md: "0px 1px 0px 0px" }}
          flexDirection={"column"}
          rowGap={3}
          p={2}
        >
          <OutletAddressCard address={restroAddress} />
          <DeliveryAddressCard address={userAddress} />
        </Flex>
      </Flex>
      <StatusCard status={status} id={id} />
    </Flex>
  );
};

export default UserPOrderCard;
