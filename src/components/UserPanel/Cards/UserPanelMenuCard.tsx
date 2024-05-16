import { Box, Flex, Grid, Image, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

interface IMenuItem {
  name: string;
  price: number;
  ratings: string;
  imageUrl: string;
  totalReview: number;
  description: string;
  groupName: string;
  id: string;
}

const UserPanelMenuCard: FC<{ menuItem: IMenuItem }> = ({ menuItem }) => {
  const rating = parseFloat(menuItem.ratings);

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
      minWidth={"250px"}
      maxWidth={{ base: "full", md: "33%", lg: "24%" }}
      h={"160px"}
      boxShadow={"lg"}
      border={"solid"}
      borderColor={"brand.100"}
      borderWidth={"1px"}
      borderRadius={"20px"}
      gridTemplateColumns={"auto 120px"}
      overflow={"hidden"}
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
        <Text fontSize={"0.8em"}>{formattedPrice}</Text>
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
          >
            <Text fontSize={"0.9em"} color={"brand.900"} fontWeight={700}>
              ADD
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Grid>
  );
};

export default UserPanelMenuCard;
