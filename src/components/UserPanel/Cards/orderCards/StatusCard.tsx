import React, { FC } from "react";
import { OrderStatus } from "../../../../../packages/enums/OrderStatus";
import { Flex, Text } from "@chakra-ui/react";

const StatusCard: FC<{ status: OrderStatus }> = ({ status }) => {
  return (
    <Flex
      h={"40px"}
      w={"full"}
      bg={"brand.50"}
      justifyContent={"center"}
      alignItems={"center"}
      fontSize={"1.2em"}
      fontWeight={600}
      color={"brand.900"}
    >
      {status === OrderStatus.Placed && <Text>Order Placed</Text>}
      {status === OrderStatus.Accepted && <Text>Order Accepted</Text>}
      {status === OrderStatus.Preparing && <Text>Order is being prepared</Text>}
      {status === OrderStatus.Ready && <Text>Order is ready for pickup</Text>}
      {status === OrderStatus.Out && <Text>Order id out for delivery</Text>}
      {status === OrderStatus.Delivered && <Text>Order id Delivered</Text>}
    </Flex>
  );
};

export default StatusCard;
