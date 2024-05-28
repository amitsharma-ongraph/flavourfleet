import React, { FC } from "react";
import { IBill } from "../../../../../packages/types/entity/IBill";
import { Flex, Icon, Text } from "@chakra-ui/react";
import { ICartItem } from "../../../../../packages/types/entity/ICartItem";
import { BiBook, BiShoppingBag } from "react-icons/bi";
import { CiBank } from "react-icons/ci";
import { GiScooter } from "react-icons/gi";

const FullBillCard: FC<{
  bill: IBill;
  items: ICartItem[];
  restroName: string;
}> = ({ bill, items, restroName }) => {
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
      <Text fontSize={"1.2em"} fontWeight={600}>
        {restroName}
      </Text>
      <Flex
        flexDirection={"column"}
        w={"full"}
        maxH={"180px"}
        overflowY={"scroll"}
      >
        {items.map((item, i) => (
          <Flex
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            key={i}
            fontSize={"0.7em"}
          >
            <Text>
              {item.quantity}x{item.menuItem.name.toUpperCase()}
            </Text>
            <Text>₹{item.quantity * item.menuItem.price}</Text>
          </Flex>
        ))}
        <Flex
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          fontSize={"0.7em"}
        >
          <Flex columnGap={1} alignItems={"center"}>
            <Icon as={BiShoppingBag}></Icon>
            <Text>Item Total</Text>
          </Flex>
          <Text>₹{bill.itemToatal}</Text>
        </Flex>

        <Flex
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          fontSize={"0.7em"}
        >
          <Flex columnGap={1} alignItems={"center"}>
            <Icon as={CiBank}></Icon>
            <Text>Gst</Text>
          </Flex>
          <Text>₹{bill.gst}</Text>
        </Flex>

        <Flex
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          fontSize={"0.7em"}
        >
          <Flex columnGap={1} alignItems={"center"}>
            <Icon as={GiScooter}></Icon>
            <Text>Delivery Fee</Text>
          </Flex>
          <Text>₹{bill.delivery}</Text>
        </Flex>

        <Flex
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          fontSize={"0.7em"}
        >
          <Flex columnGap={1} alignItems={"center"}>
            <Icon as={BiBook}></Icon>
            <Text>Platform Fee</Text>
          </Flex>
          <Text>₹{bill.platfrom}</Text>
        </Flex>

        <Flex
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          pt={1}
          borderTop={"dotted"}
          borderWidth={"1px"}
          fontSize={"0.7em"}
        >
          <Text>Grand Total</Text>
          <Text>₹{bill.grandTotal}</Text>
        </Flex>

        <Flex
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          fontSize={"0.7em"}
        >
          <Text>Cash Round Off</Text>
          <Text>- ₹{bill.roundOff}</Text>
        </Flex>
      </Flex>

      <Flex
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        fontSize={"0.7em"}
        fontWeight={700}
        paddingTop={1}
        border={"dotted"}
        borderColor={"brand.200"}
        borderWidth={"1px 0px 0px 0px"}
        color={"brand.900"}
      >
        <Text>TOTAL BILL</Text>
        <Text>₹{bill.toPay}</Text>
      </Flex>
    </Flex>
  );
};

export default FullBillCard;
