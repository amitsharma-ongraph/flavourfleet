import { Box, Flex, Grid } from "@chakra-ui/react";
import React from "react";
import MenuItemPlaceholderCard from "./MenuItemPlaceholderCard";

function MenuPagePlaceholder() {
  return (
    <>
      <Flex
        w={"full"}
        flexDirection={{ base: "column", md: "row" }}
        rowGap={4}
        columnGap={4}
        p={4}
        alignItems={"center"}
      >
        <Flex
          h={"150px"}
          w={"full"}
          alignItems={{ base: "center", md: "flex-start" }}
          justifyContent={"space-evenly"}
          bg={"brand.50"}
          flexDirection={"column"}
          borderRadius={"20px"}
          px={{ base: 0, md: 4 }}
        >
          <Box
            h={"35px"}
            w={"130px"}
            bg={"white"}
            borderRadius={"17.5px"}
          ></Box>
          <Box h={"15px"} w={"100px"} bg={"white"} borderRadius={"7.5px"}></Box>
          <Flex flexDirection={"row"} columnGap={1}>
            <Box h={"20px"} w={"25px"} bg={"white"} borderRadius={"5px"}></Box>
            <Box
              h={"20px"}
              w={"100px"}
              bg={"white"}
              borderRadius={"10px"}
            ></Box>
          </Flex>
          <Flex flexDirection={"row"} columnGap={4}>
            <Box
              h={"25px"}
              w={"100px"}
              bg={"white"}
              borderRadius={"12.5px"}
            ></Box>
            <Box
              h={"25px"}
              w={"100px"}
              bg={"white"}
              borderRadius={"12.5px"}
            ></Box>
          </Flex>
        </Flex>
        <Box
          h={{ base: "120px", md: "150px" }}
          w={"full"}
          alignItems={"center"}
          justifyContent={"center"}
          bg={"brand.50"}
          overflow={"hidden"}
          borderRadius={"20px"}
        >
          <Flex
            h={"full"}
            w={"full"}
            flexDirection={"column"}
            justifyContent={"space-evenly"}
            alignItems={"center"}
          >
            <Flex
              h={"60px"}
              w={"full"}
              flexDirection={"row"}
              overflowX={"scroll"}
              columnGap={4}
              px={2}
              justifyContent={{ base: "flex-start", md: "center" }}
            >
              <Box
                h={"60px"}
                w={"150px"}
                bg={"white"}
                borderRadius={"10px"}
                flexShrink={0}
              ></Box>
              <Box
                h={"60px"}
                w={"150px"}
                bg={"white"}
                borderRadius={"10px"}
                flexShrink={0}
              ></Box>
              <Box
                h={"60px"}
                w={"150px"}
                bg={"white"}
                borderRadius={"10px"}
                flexShrink={0}
              ></Box>
            </Flex>
            <Flex
              h={"30px"}
              w={"full"}
              flexDirection={"row"}
              overflowX={"scroll"}
              columnGap={4}
              px={2}
              justifyContent={{ base: "flex-start", md: "center" }}
            >
              <Box
                h={"30px"}
                w={"100px"}
                bg={"white"}
                borderRadius={"10px"}
                flexShrink={0}
              ></Box>
              <Box
                h={"30px"}
                w={"100px"}
                bg={"white"}
                borderRadius={"10px"}
                flexShrink={0}
              ></Box>
              <Box
                h={"30px"}
                w={"100px"}
                bg={"white"}
                borderRadius={"10px"}
                flexShrink={0}
              ></Box>
              <Box
                h={"30px"}
                w={"100px"}
                bg={"white"}
                borderRadius={"10px"}
                flexShrink={0}
              ></Box>
              <Box
                h={"30px"}
                w={"100px"}
                bg={"white"}
                borderRadius={"10px"}
                flexShrink={0}
              ></Box>
            </Flex>
          </Flex>
        </Box>
      </Flex>

      <Flex
        h={"40px"}
        w={"full"}
        flexDirection={"row"}
        overflowX={"scroll"}
        columnGap={4}
        px={2}
        justifyContent={"flex-start"}
      >
        <Box
          h={"40px"}
          w={"100px"}
          bg={"brand.50"}
          borderRadius={"10px"}
          flexShrink={0}
        ></Box>
        <Box
          h={"40px"}
          w={"100px"}
          bg={"brand.50"}
          borderRadius={"10px"}
          flexShrink={0}
        ></Box>
        <Box
          h={"40px"}
          w={"100px"}
          bg={"brand.50"}
          borderRadius={"10px"}
          flexShrink={0}
        ></Box>
        <Box
          h={"40px"}
          w={"100px"}
          bg={"brand.50"}
          borderRadius={"10px"}
          flexShrink={0}
        ></Box>
        <Box
          h={"40px"}
          w={"100px"}
          bg={"brand.50"}
          borderRadius={"10px"}
          flexShrink={0}
        ></Box>
        <Box
          h={"40px"}
          w={"100px"}
          bg={"brand.50"}
          borderRadius={"10px"}
          flexShrink={0}
        ></Box>
      </Flex>

      <Flex
        flexWrap={"wrap"}
        flexDirection={"row"}
        columnGap={5}
        p={5}
        rowGap={5}
      >
        <MenuItemPlaceholderCard />
        <MenuItemPlaceholderCard />
        <MenuItemPlaceholderCard />
        <MenuItemPlaceholderCard />
      </Flex>
    </>
  );
}

export default MenuPagePlaceholder;
