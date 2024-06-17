import React from "react";
import { ICoupon } from "../../../../packages/types/entity/ICoupon.";
import { Box, Flex, Grid, Icon, Switch, Text } from "@chakra-ui/react";
import { RiDeleteBin2Line } from "react-icons/ri";
import { DiscountType } from "../../../../packages/enums/DiscountType";
import { CiDiscount1, CiGift } from "react-icons/ci";
import { DiscountCondition } from "../../../../packages/enums/DiscountCondition";
import { useRestroStore } from "@/hooks/useRestroStore";
import { Restaurant } from "../../../../packages/types/entity/Restaurant";
import { Modal } from "../../../../packages/types/common/modal";
import CouponDetailsModal from "@/components/Modals/CouponModals/CouponDetailsModal";
import { useModal } from "@/hooks/useModal";

function CouponCard({
  coupon,
  handleDelete,
  handleToogle,
}: {
  coupon: ICoupon;
  handleDelete: (couponId: string) => Promise<void>;
  handleToogle: (couponId: string) => Promise<void>;
}) {
  const {
    state: { restaurant },
  } = useRestroStore();

  const { menuItems } = restaurant as Restaurant;
  const { setModal } = useModal();
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
  } = coupon;

  const DetailsModal: Modal = {
    title: code,
    ModalBody: () => <CouponDetailsModal coupon={coupon} />,
  };

  return (
    <Flex
      h={"220px"}
      maxW={{ base: "100%", md: "33%", lg: "25%" }}
      minWidth={"210px"}
      flex={1}
      border={"solid"}
      borderWidth={"1px"}
      borderColor={"brand.100"}
      flexDirection={"column"}
      rowGap={2}
      p={"5px"}
      borderRadius={"5px"}
      boxShadow={"lg"}
    >
      <Grid gridTemplateColumns="auto 40px" h={"40px"} columnGap={3}>
        <Flex
          boxShadow={"md"}
          borderRadius={"5px"}
          justifyContent={"center"}
          alignItems={"center"}
          color={"brand.900"}
          fontWeight={600}
        >
          {code}
        </Flex>
        <Flex
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          boxShadow={"md"}
          color={activated ? "green" : "gray"}
        >
          <Switch
            isChecked={activated}
            onChange={async () => {
              await handleToogle(coupon._id || "");
            }}
          />
          <Text fontSize={"0.7em"}>{activated ? "Active" : "InActive"}</Text>
        </Flex>
      </Grid>
      <Box position={"relative"} w={"full"} h={"full"}>
        <Icon
          position={"absolute"}
          h={"full"}
          w={"full"}
          as={type == DiscountType.GIFT_ITEM ? CiGift : CiDiscount1}
          top={0}
          left={0}
          color={"brand.200"}
        ></Icon>
        <Grid
          h={"full"}
          w={"full"}
          backdropFilter={"blur(5px)"}
          gridTemplateColumns={"auto 40px"}
          columnGap={3}
        >
          <Flex
            flexDirection={"column"}
            rowGap={1}
            px={3}
            fontWeight={800}
            color={"brand.900"}
            fontSize={"0.7em"}
            cursor={"pointer"}
            onClick={() => {
              setModal(DetailsModal);
            }}
          >
            <Text>Visibilty:{isPublic ? "public" : "private"}</Text>
            <Text>Limit:{limited ? redemptions : "No limit"}</Text>
            <Text>Total Redemptions:{availed}</Text>
            <Text>
              Condition:
              {condition === DiscountCondition.AMOUNT
                ? "Amount"
                : "Combination"}
            </Text>
            {condition === DiscountCondition.AMOUNT && (
              <Text>Min Cart Amount:{billAmount}</Text>
            )}
            <Text>
              Discount Type:
              {type === DiscountType.FLAT
                ? "Flat Discount"
                : type === DiscountType.PERCENTAGE
                ? "Percentage"
                : "Gift Item"}
            </Text>
            {type === DiscountType.FLAT && (
              <Text>Discount Value:{discount}</Text>
            )}
            {type === DiscountType.PERCENTAGE && (
              <>
                <Text>Discount Value:{discount + "%"}</Text>
                <Text>Upto:{upto}</Text>
              </>
            )}
          </Flex>
          <Flex flexDirection={"column"}>
            <Flex
              direction={"column"}
              alignItems={"center"}
              justifyContent={"center"}
              boxShadow={"md"}
              color={"red"}
              cursor={"pointer"}
              transition={"all"}
              transitionDuration={"0.5s"}
              _hover={{ color: "white", backgroundColor: "red" }}
              borderRadius={"5px"}
              onClick={async () => {
                await handleDelete(coupon._id || "");
              }}
            >
              <Icon as={RiDeleteBin2Line}></Icon>
              <Text fontSize={"0.7em"}>delete</Text>
            </Flex>
          </Flex>
        </Grid>
      </Box>
    </Flex>
  );
}

export default CouponCard;
