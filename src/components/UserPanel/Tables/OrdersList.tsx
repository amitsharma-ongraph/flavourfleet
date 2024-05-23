import React, { FC } from "react";
import { Flex } from "@chakra-ui/react";

import { IUserPOrder } from "../../../../packages/types/entity/IUserPOrder";
import RestroPOrderCard from "@/components/RestaurantPanel/cards/orderCards/RestroPOrderCard";
import UserPOrderCard from "../Cards/orderCards/UserPOrderCard";

const RestroPOrdersList: FC<{ orders: IUserPOrder[] }> = ({ orders }) => {
  return (
    <Flex
      p={4}
      flexDirection={"row"}
      columnGap={4}
      flexWrap={"wrap"}
      rowGap={4}
    >
      {orders.map((order) => (
        <UserPOrderCard order={order} key={order.id} />
      ))}
    </Flex>
  );
};

export default RestroPOrdersList;
