import React, { FC } from "react";
import { OrderStatus } from "../../../../../packages/enums/OrderStatus";
import { Flex, Icon, Text } from "@chakra-ui/react";
import { FaMotorcycle } from "react-icons/fa";
import { useRouter } from "next/router";

const StatusCard: FC<{ status: OrderStatus; id: string }> = ({
  status,
  id,
}) => {
  const { push } = useRouter();
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
      {status === OrderStatus.Out && (
        <Flex
          flexDirection={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          columnGap={3}
          cursor={"pointer"}
          onClick={() => {
            push(`/profile/orders/track/${id}`);
          }}
        >
          <Icon as={FaMotorcycle}></Icon>
          <Text>Track Your Order</Text>
        </Flex>
      )}
      {status === OrderStatus.Delivered && <Text>Order is Delivered</Text>}
    </Flex>
  );
};

export default StatusCard;
