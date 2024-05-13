import React, { FC } from "react";
import { MenuItem } from "../../../packages/types/entity/MenuItem";
import { Box, Flex, Grid, Image, Text } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";

const MenuItemCard: FC<{ item: MenuItem }> = ({ item }) => {
  const {
    name,
    price,
    groupName,
    ratings,
    totalReview,
    imageUrl,
    description,
    totalOrders,
  } = item;

  const rating = parseFloat(ratings);

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
  }).format(price);

  return (
    <Grid
      gridTemplateColumns={"130px auto"}
      columnGap={2.5}
      h={"130px"}
      minW={"300px"}
      flex={{ base: "1", md: "0" }}
      bg={"#eeeeee44"}
    >
      <Box h={"full"} w={"full"} borderRadius={"10px"} overflow={"hidden"}>
        <Image src={imageUrl} h={"full"} w={"full"}></Image>
      </Box>
      <Flex flexDirection={"column"} rowGap={2}>
        <Text>{name}</Text>
        <Flex flexDirection={"row"} alignItems="center" columnGap={2}>
          <Flex flexDirection={"row"} alignItems="center">
            {stars}
          </Flex>
          <Text fontSize={"0.6em"}>{totalReview} votes</Text>
        </Flex>
        <Text fontSize={"0.6em"}>{formattedPrice}</Text>
        <Text fontSize={"0.6em"}>{totalOrders} orders</Text>
        <Text fontSize={"0.6em"}>{description}</Text>
      </Flex>
    </Grid>
  );
};

export default MenuItemCard;
