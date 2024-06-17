import React, { FC } from "react";
import { IOfferCard } from "../../../packages/types/card/IOfferCard";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { ICoupon } from "../../../packages/types/entity/ICoupon.";
import { DiscountType } from "../../../packages/enums/DiscountType";
import { BiGift } from "react-icons/bi";
import { CiDiscount1 } from "react-icons/ci";
import { DiscountCondition } from "../../../packages/enums/DiscountCondition";

const OfferCard: FC<{ coupon: ICoupon }> = ({ coupon }) => {
  const { type, code, condition, billAmount, discount, upto } = coupon;
  return (
    <Flex
      h={"60px"}
      bg={"white"}
      borderRadius={"10px"}
      flexShrink={0}
      flexDirection={"column"}
      justifyContent={"space-evenly"}
      alignItems={"center"}
      boxShadow={"md"}
      border={"solid"}
      borderColor={"brand.100"}
      borderWidth={"1px"}
      pt={3}
      px={2}
      position={"relative"}
    >
      <Flex
        position={"absolute"}
        left={"50%"}
        transform={"translate(-50%,0%)"}
        justifyContent={"center"}
        alignItems={"center"}
        top={0}
      >
        <Icon
          as={type === DiscountType.GIFT_ITEM ? BiGift : CiDiscount1}
          color={"brand.900"}
        />
      </Flex>
      {type === DiscountType.FLAT && (
        <Text fontSize={"1em"} color={"brand.900"}>
          Flat {discount} Off
        </Text>
      )}
      {type === DiscountType.GIFT_ITEM && (
        <Text fontSize={"1em"} color={"brand.900"}>
          Free Item
        </Text>
      )}
      {type === DiscountType.PERCENTAGE && (
        <Text fontSize={"1em"} color={"brand.900"}>
          {discount}% Off Upto {upto}
        </Text>
      )}
      <Text fontSize={"0.7em"} color={"brand.900"}>
        {code}{" "}
        {condition === DiscountCondition.AMOUNT ? ` | Above ${billAmount}` : ""}
      </Text>
    </Flex>
  );
};

export default OfferCard;
