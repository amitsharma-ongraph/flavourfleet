import { Box, Flex, Grid } from "@chakra-ui/react";
import React, { FC } from "react";

const RestroPlaceHolder: FC = () => {
  return (
    <Grid
      flex={1}
      minWidth={"300px"}
      maxWidth={"33%"}
      h={"250px"}
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
};

function RestroPlaceholderList() {
  return (
    <Flex
      flexWrap={"wrap"}
      flexDirection={"row"}
      columnGap={5}
      p={8}
      rowGap={8}
    >
      <RestroPlaceHolder />
      <RestroPlaceHolder />
      <RestroPlaceHolder />
      <RestroPlaceHolder />
      <RestroPlaceHolder />
      <RestroPlaceHolder />
    </Flex>
  );
}

export default RestroPlaceholderList;
