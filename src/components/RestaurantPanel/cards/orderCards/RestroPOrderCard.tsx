import React, { FC } from "react";
import { IRestroPOrder } from "../../../../../packages/types/entity/IRestroPOrder";
import { Flex, Icon, Text } from "@chakra-ui/react";
import OutletAddressCard from "./OutletAddressCard";
import UserAddressCard from "./UserAddressCard";
import OrderBillCard from "./OrderBillCard";
import StatusControlCard from "./StatusControlCard";
import DeliveryCard from "./DeliveryCard";
import { HiClipboardCheck } from "react-icons/hi";
import { BiPin } from "react-icons/bi";
import TimelineCard from "./TimelineCard";

const RestroPOrderCard: FC<{ order: IRestroPOrder }> = ({ order }) => {
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
      flexDirection={{ base: "column", md: "row" }}
      rowGap={3}
      columnGap={3}
      id="orderCard"
      minH={{ base: "300px", md: "100px" }}
      boxShadow={"lg"}
      borderRadius={"20px"}
      border={"solid"}
      borderColor={"brand.100"}
      borderWidth={"1px"}
      p={3}
    >
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
        <UserAddressCard address={userAddress} />
        <TimelineCard timeline={timeline} />
      </Flex>
      <Flex
        flex={1}
        border={"dotted"}
        borderColor={"brand.900"}
        borderWidth={{ base: "0px 0px 1px 0px", md: "0px 1px 0px 0px" }}
        px={2}
        flexDirection={"column"}
      >
        <OrderBillCard bill={bill} items={items} />
        <Flex
          h={"80px"}
          w={"full"}
          bg={"brand.50"}
          p={2}
          flexDirection={"column"}
          rowGap={2}
          overflowY={"scroll"}
        >
          <Icon as={BiPin}></Icon>
          <Text fontSize={"0.8em"} color={"brand.900"} fontWeight={600}>
            {note}
          </Text>
        </Flex>
        <StatusControlCard orderId={id} restroId={restroId} status={status} />
      </Flex>
      <Flex flex={1} px={2} flexDirection={"column"}>
        <DeliveryCard />
      </Flex>
    </Flex>
  );
};

export default RestroPOrderCard;
