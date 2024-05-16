import { Box, Flex, Grid, baseTheme } from "@chakra-ui/react";
import React from "react";

function MenuItemPlaceholderCard() {
  return (
    <Grid
      flex={1}
      minWidth={"200px"}
      maxWidth={{ base: "full", md: "33%", lg: "25%" }}
      h={"200px"}
      boxShadow={"lg"}
      border={"solid"}
      borderColor={"brand.100"}
      borderWidth={"1px"}
      borderRadius={"20px"}
      gridTemplateRows={"170px 80px"}
      overflow={"hidden"}
    >
      <Flex
        bg={"brand.50"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        p={4}
        alignItems={"flex-end"}
      >
        <Box h={"20px"} borderRadius={"10px"} w={"100px"} bg={"white"}></Box>
        <Box
          h={"20px"}
          borderRadius={"10px"}
          w={"150px"}
          bg={"white"}
        ></Box>{" "}
      </Flex>
      <Flex
        flexDirection={"row"}
        justifyContent={"space-between"}
        p={4}
        alignItems={"center"}
      >
        <Box h={"20px"} borderRadius={"10px"} w={"200px"} bg={"brand.50"}></Box>
        <Box
          h={"20px"}
          borderRadius={"10px"}
          w={"50px"}
          bg={"brand.50"}
        ></Box>{" "}
      </Flex>
    </Grid>
  );
}

export default MenuItemPlaceholderCard;
