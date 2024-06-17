import React, { FC } from "react";
import { ICoupon } from "../../../../packages/types/entity/ICoupon.";
import { Flex, Text } from "@chakra-ui/react";
import { DiscountCondition } from "../../../../packages/enums/DiscountCondition";
import { DiscountType } from "../../../../packages/enums/DiscountType";
import { Restaurant } from "../../../../packages/types/entity/Restaurant";
import { useRestroStore } from "@/hooks/useRestroStore";
import MenuItemCardSmall from "@/components/RestaurantPanel/menuItems/MenuItemCardSmall";

const CouponDetailsModal: FC<{ coupon: ICoupon }> = ({ coupon }) => {
  const {
    state: { restaurant },
  } = useRestroStore();

  const { menuItems } = restaurant as Restaurant;
  const {
    activated,
    code,
    type,
    isPublic,
    condition,
    billAmount,
    discount,
    upto,
    limited,
    redemptions,
    availed,
    combination,
    giftItemId,
  } = coupon;

  const getCombinationItems = () => {
    const items = menuItems.filter((item) => combination?.includes(item._id));
    return items;
  };
  const getGiftItem = () => {
    const giftItem = menuItems.filter((item) => item._id == giftItemId)[0];
    return giftItem;
  };
  return (
    <Flex
      flexDirection={"column"}
      rowGap={1}
      px={3}
      fontWeight={800}
      color={"brand.900"}
      h={"300px"}
      overflowY={"scroll"}
    >
      <Text>Visibilty:{isPublic ? "public" : "private"}</Text>
      <Text>Limit:{limited ? redemptions : "No limit"}</Text>
      <Text>Total Redemptions:{availed}</Text>
      <Text>
        Condition:
        {condition === DiscountCondition.AMOUNT ? "Amount" : "Combination"}
      </Text>
      {condition === DiscountCondition.AMOUNT && (
        <Text>Min Cart Amount:{billAmount}</Text>
      )}
      {condition === DiscountCondition.COMBINATION && (
        <>
          <Text>Combination:</Text>
          <Flex flexWrap={"wrap"}>
            {getCombinationItems().map((item) => (
              <MenuItemCardSmall item={item} key={item._id} />
            ))}
          </Flex>
        </>
      )}
      <Text>
        Discount Type:
        {type === DiscountType.FLAT
          ? "Flat Discount"
          : type === DiscountType.PERCENTAGE
          ? "Percentage"
          : "Gift Item"}
      </Text>
      {type === DiscountType.FLAT && <Text>Discount Value:{discount}</Text>}
      {type === DiscountType.PERCENTAGE && (
        <>
          <Text>Discount Value:{discount + "%"}</Text>
          <Text>Upto:{upto}</Text>
        </>
      )}
      {type == DiscountType.GIFT_ITEM && (
        <>
          <Text>Gift Item:</Text>
          <MenuItemCardSmall item={getGiftItem()} />
        </>
      )}
    </Flex>
  );
};

export default CouponDetailsModal;
