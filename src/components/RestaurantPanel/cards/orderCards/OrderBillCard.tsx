import React, { FC } from "react";
import { IBill } from "../../../../../packages/types/entity/IBill";
import { Flex, Text } from "@chakra-ui/react";
import { ICartItem } from "../../../../../packages/types/entity/ICartItem";

const OrderBillCard: FC<{ bill: IBill; items: ICartItem[] }> = ({
  bill,
  items,
}) => {
  return (
    <Flex
      direction={"column"}
      rowGap={1}
      border={"dotted"}
      borderColor={"brand.200"}
      minH={"30px"}
      borderWidth={"0px 0px 1px 0px"}
      color={"brand.900"}
      w={"full"}
    >
      <Flex
        flexDirection={"column"}
        w={"full"}
        maxH={"150px"}
        overflowY={"scroll"}
      >
        {items.map((item, i) => (
          <Flex
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            key={i}
            fontSize={"0.9em"}
          >
            <Text>
              {item.quantity}x{item.menuItem.name.toUpperCase()}
            </Text>
            <Text>₹{item.quantity * item.menuItem.price}</Text>
          </Flex>
        ))}
        <Flex
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          fontSize={"0.9em"}
        >
          <Text>GST</Text>
          <Text>₹{bill.gst}</Text>
        </Flex>
      </Flex>

      <Flex
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        fontSize={"0.9em"}
        fontWeight={700}
        paddingTop={1}
        border={"dotted"}
        borderColor={"brand.200"}
        borderWidth={"1px 0px 0px 0px"}
        color={"brand.900"}
      >
        <Text>TOTAL BILL</Text>
        <Text>₹{bill.itemToatal + bill.gst}</Text>
      </Flex>
    </Flex>
  );
};

export default OrderBillCard;
