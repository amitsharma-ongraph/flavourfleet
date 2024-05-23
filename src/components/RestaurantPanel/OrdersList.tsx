import React, { FC } from "react";
import { IRestroPOrder } from "../../../packages/types/entity/IRestroPOrder";
import { Flex } from "@chakra-ui/react";
import RestroPOrderCard from "./cards/orderCards/RestroPOrderCard";

const OrdersList: FC<{ orders: IRestroPOrder[] }> = ({ orders }) => {
  return (
    <Flex p={4} flexDirection={"column"} rowGap={3}>
      {orders.map((order) => (
        <RestroPOrderCard order={order} key={order.id} />
      ))}
    </Flex>
  );
};

export default OrdersList;
