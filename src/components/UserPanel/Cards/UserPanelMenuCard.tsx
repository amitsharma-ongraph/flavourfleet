import { useCart } from "@/hooks/useCart";
import { useStore } from "@/hooks/useStore";
import { Box, Flex, Grid, Icon, Image, Spinner, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { IUserPMenuItem } from "../../../../packages/types/entity/IUserPMenuItem";

const UserPanelMenuCard: FC<{
  menuItem: IUserPMenuItem;
  restaurantId: string;
  isCartItem?: boolean;
  isGiftItem?: boolean;
}> = ({ menuItem, restaurantId, isCartItem, isGiftItem }) => {
  const {
    dispatch,
    state: {
      cart,
      loadingStates: { formLoading },
    },
  } = useStore();

  const { addToCart, removeFromCart } = useCart();

  const getItemCount = () => {
    const cartItems = cart[restaurantId] || [];
    const cartItem = cartItems.find((item) => item.menuItem.id === menuItem.id);
    if (cartItem) {
      return cartItem.quantity;
    }
    return 0;
  };

  const rating = parseFloat(menuItem.ratings);

  const itemCount = getItemCount();

  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars.push(<FaStar key={i} color="gold" />);
    } else {
      stars.push(<CiStar key={i} color="black" />);
    }
  }

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(menuItem.price);
  return (
    <Grid
      flex={1}
      minWidth={isCartItem ? "320px" : "250px"}
      maxWidth={{ base: "full", md: "33%", lg: "24%" }}
      h={"160px"}
      boxShadow={"lg"}
      border={"solid"}
      borderColor={"brand.100"}
      borderWidth={"1px"}
      borderRadius={"20px"}
      gridTemplateColumns={"auto 120px"}
      overflow={"hidden"}
      id="menuitemcard"
    >
      <Flex
        flexDirection={"column"}
        overflow={"hidden"}
        justifyContent={"flex-start"}
        px={1}
        py={2}
        rowGap={1.5}
      >
        <Text fontSize={"0.9em"} fontWeight={600}>
          {menuItem.name}
        </Text>
        <Flex flexDirection={"row"} alignItems="center" columnGap={2}>
          <Flex flexDirection={"row"} alignItems="center">
            {stars}
          </Flex>
          <Text fontSize={"0.6em"}>{menuItem.totalReview} votes</Text>
        </Flex>
        <Flex columnGap={2}>
          <Text
            fontSize={"0.8em"}
            textDecoration={isGiftItem ? "line-through" : "none"}
          >
            {formattedPrice}
          </Text>
          {isGiftItem && <Text>₹0</Text>}
        </Flex>
        <Text fontSize={"0.6em"}>{menuItem.description}</Text>
      </Flex>
      <Flex justifyContent={"center"} alignItems={"center"}>
        <Box
          h={"100px"}
          w={"100px"}
          borderRadius={"10px"}
          position={"relative"}
        >
          <Box h={"full"} w={"full"} borderRadius={"10px"} overflow={"hidden"}>
            <Image src={menuItem.imageUrl} h={"full"} w={"full"} />
          </Box>
          {!isGiftItem && (
            <Flex
              position={"absolute"}
              height={"30px"}
              w={"60px"}
              borderRadius={"10px"}
              left={"50%"}
              bottom={"-10px"}
              bg={"brand.50"}
              transform={"translate(-50%,0%)"}
              justifyContent={"center"}
              alignItems={"center"}
              border={"solid"}
              borderColor={"brand.900"}
              borderWidth={"1px"}
              columnGap={1}
              fontSize={"0.9em"}
              color={"brand.900"}
              fontWeight={700}
            >
              {itemCount === 0 && (
                <Flex
                  cursor={"pointer"}
                  onClick={() => {
                    addToCart(restaurantId, menuItem);
                  }}
                  h={"full"}
                  w={"full"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Text>ADD</Text>
                </Flex>
              )}
              {itemCount > 0 && (
                <>
                  <Icon
                    as={BiMinus}
                    h={"full"}
                    cursor={"pointer"}
                    onClick={() => {
                      removeFromCart(restaurantId, menuItem.id);
                    }}
                  ></Icon>
                  <Text fontSize={"1.1em"}>{itemCount}</Text>
                  <Icon
                    as={BiPlus}
                    h={"full"}
                    cursor={"pointer"}
                    onClick={() => {
                      addToCart(restaurantId, menuItem);
                    }}
                  ></Icon>
                </>
              )}
            </Flex>
          )}
        </Box>
      </Flex>
    </Grid>
  );
};

export default UserPanelMenuCard;
