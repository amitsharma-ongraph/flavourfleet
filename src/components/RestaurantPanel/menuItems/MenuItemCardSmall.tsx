import React, { FC } from "react";
import { MenuItem } from "../../../../packages/types/entity/MenuItem";
import { Box, Flex, Grid, Image, Text } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";

const MenuItemCardSmall: FC<{ item: MenuItem }> = ({ item }) => {
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
      gridTemplateColumns={"40px auto"}
      columnGap={1}
      h={"40px"}
      minW={"150px"}
      flex={{ base: "1", md: "0" }}
      bg={"#eeeeee44"}
    >
      <Box h={"full"} w={"full"} borderRadius={"10px"} overflow={"hidden"}>
        <Image src={imageUrl} h={"40px"} w={"40px"}></Image>
      </Box>
      <Flex flexDirection={"column"} rowGap={2}>
        <Text fontSize={"0.8em"}>{name}</Text>
      </Flex>
    </Grid>
  );
};

export default MenuItemCardSmall;
