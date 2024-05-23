import React, { FC } from "react";
import { OrderStatus } from "../../../../../packages/enums/OrderStatus";
import { Button, Flex } from "@chakra-ui/react";
import { useManageOrder } from "@/hooks/useManageOrder";

const StatusControlCard: FC<{
  orderId: string;
  restroId: string;
  status: string;
}> = ({ orderId, restroId, status }) => {
  const { changeStatus } = useManageOrder();
  return (
    <Flex justifyContent={"center"} alignItems={"center"} w={"full"}>
      {status === OrderStatus.Placed && (
        <Flex
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"flex-end"}
          columnGap={3}
          w={"full"}
          pt={4}
        >
          <Button
            bg={"red.400"}
            color={"white"}
            sx={{
              ":hover": {
                bgColor: "red.600",
              },
            }}
            onClick={() => {
              changeStatus(orderId, restroId, OrderStatus.Rejected);
            }}
          >
            Reject
          </Button>
          <Button
            bg={"brand.600"}
            color={"white"}
            sx={{
              ":hover": {
                bgColor: "brand.900",
              },
            }}
            onClick={() => {
              changeStatus(orderId, restroId, OrderStatus.Accepted);
            }}
          >
            Accept
          </Button>
        </Flex>
      )}
      {status === OrderStatus.Accepted && (
        <Button
          bg={"brand.600"}
          color={"white"}
          sx={{
            ":hover": {
              bgColor: "brand.900",
            },
          }}
          onClick={() => {
            changeStatus(orderId, restroId, OrderStatus.Preparing);
          }}
          mt={4}
        >
          Start Preparation
        </Button>
      )}
      {status === OrderStatus.Preparing && (
        <Button
          bg={"brand.600"}
          color={"white"}
          sx={{
            ":hover": {
              bgColor: "brand.900",
            },
          }}
          onClick={() => {
            changeStatus(orderId, restroId, OrderStatus.Ready);
          }}
          mt={4}
        >
          Order Ready
        </Button>
      )}
      {status === OrderStatus.Ready && (
        <Button
          bg={"brand.600"}
          color={"white"}
          sx={{
            ":hover": {
              bgColor: "brand.900",
            },
          }}
          onClick={() => {
            changeStatus(orderId, restroId, OrderStatus.Out);
          }}
          mt={4}
        >
          Out For Delivery
        </Button>
      )}
    </Flex>
  );
};

export default StatusControlCard;
