import React, { FC, useState } from "react";
import { IBill } from "../../../../packages/types/entity/IBill";
import { Flex, Icon, Text } from "@chakra-ui/react";
import { RiBillFill } from "react-icons/ri";
import { BiArrowFromLeft, BiBook, BiShoppingBag } from "react-icons/bi";
import { FaArrowDown, FaArrowRight } from "react-icons/fa";
import { GiChipsBag, GiScooter } from "react-icons/gi";
import { CiBank } from "react-icons/ci";
import { IoMdApps } from "react-icons/io";
import { Logo } from "@/components/Logo";

const BillCard: FC<{ bill: IBill }> = ({ bill }) => {
  const [showFull, setShowFull] = useState<Boolean>(false);
  return (
    <Flex direction={"column"} rowGap={1}>
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Flex
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          columnGap={2}
        >
          <Icon as={RiBillFill}></Icon>
          Total Bill: ₹ {bill.toPay}
        </Flex>
        <Icon
          as={!showFull ? FaArrowRight : FaArrowDown}
          cursor={"pointer"}
          onClick={() => {
            setShowFull(!showFull);
          }}
        ></Icon>
      </Flex>
      {showFull && (
        <Flex minH={"40px"} justifyContent={"flex-end"}>
          <Flex
            w={"70%"}
            flexDirection={"column"}
            rowGap={1}
            fontSize={"0.8em"}
          >
            <Flex
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
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
            >
              <Flex columnGap={1} alignItems={"center"}>
                <Icon as={CiBank}></Icon>
                <Text>Gst & Restaurant Charges</Text>
              </Flex>
              <Text>₹{bill.gst}</Text>
            </Flex>

            <Flex
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
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
            >
              <Text>Grand Total</Text>
              <Text>₹{bill.grandTotal}</Text>
            </Flex>

            <Flex
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Text>Cash Round Off</Text>
              <Text>- ₹{bill.roundOff}</Text>
            </Flex>

            <Flex
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Text>To Pay</Text>
              <Text>₹{bill.toPay}</Text>
            </Flex>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export default BillCard;
