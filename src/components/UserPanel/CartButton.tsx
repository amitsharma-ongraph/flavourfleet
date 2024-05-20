import { useCart } from "@/hooks/useCart";
import { useStore } from "@/hooks/useStore";
import { Box, Flex, Icon, Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { BiArrowToRight, BiSolidCart } from "react-icons/bi";

function CartButton() {
  const router = useRouter();
  const id = router.query.id as string;
  const {
    state: {
      cart,
      loadingStates: { formLoading },
    },
  } = useStore();
  const { showCart } = useCart();
  const totalItems = cart[id]?.length || 0;
  return (
    <>
      {totalItems > 0 && (
        <Flex
          position={"absolute"}
          top={0}
          left={0}
          w={"100vw"}
          h={"100%"}
          pointerEvents={"none"}
          justifyContent={"center"}
          alignItems={"flex-end"}
          paddingBottom={10}
        >
          <Flex
            h={"60px"}
            w={"400px"}
            zIndex={1000}
            bg={"brand.900"}
            borderRadius={"20px"}
            maxWidth={"90%"}
            flexDirection={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            color={"white"}
            fontSize={"1.4em"}
            columnGap={3}
            cursor={"pointer"}
            onClick={() => {
              showCart(id);
            }}
            pointerEvents={"all"}
          >
            {formLoading && <Spinner />}
            {!formLoading && (
              <>
                <Icon as={BiSolidCart}></Icon>
                <Text fontSize={"1em"} fontWeight={600}>
                  {totalItems} Item{totalItems > 1 ? "s" : ""} Added
                </Text>
                <Icon as={BiArrowToRight}></Icon>
              </>
            )}
          </Flex>
        </Flex>
      )}
    </>
  );
}

export default CartButton;
