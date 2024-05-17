import { Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

function CartButton() {
  const router = useRouter();
  const id = router.query.id as string;
  console.log("cart button id-->", id);
  return (
    <Box
      position={"sticky"}
      top={0}
      left={10}
      h={"60px"}
      w={"60px"}
      bg={"red"}
      zIndex={1000}
    >
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        h={"full"}
        w={"full"}
        borderRadius={"30px"}
        bg={"brand.900"}
      ></Flex>
    </Box>
  );
}

export default CartButton;
