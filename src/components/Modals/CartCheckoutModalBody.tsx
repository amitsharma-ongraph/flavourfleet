import { Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useStore } from "@/hooks/useStore";
import UserPanelMenuCard from "../UserPanel/Cards/UserPanelMenuCard";
import NoCartItems from "../UserPanel/NoCartItems";

function CartCheckoutModalBody() {
  const {
    state: { cart },
  } = useStore();
  const router = useRouter();
  const id = router.query.id as string;
  const cartItems = cart[id] || [];
  const menuItemList = cartItems.map((item) => item.menuItem);
  return (
    <>
      {cartItems.length == 0 && <NoCartItems />}
      {cartItems.length > 0 && (
        <Box>
          <Flex
            flexWrap={"wrap"}
            flexDirection={"row"}
            columnGap={2}
            rowGap={2}
          >
            {menuItemList.map((menuItem) => (
              <UserPanelMenuCard
                menuItem={menuItem}
                restaurantId={id}
                key={menuItem.id}
                isCartItem={true}
              />
            ))}
          </Flex>
        </Box>
      )}
    </>
  );
}

export default CartCheckoutModalBody;
