import React, { FC } from "react";
import { MenuItem } from "../../../../packages/types/entity/MenuItem";
import AnimatedLogo from "../../AnimatedLogo";
import { Flex } from "@chakra-ui/react";
import MenuItemCard from "./MenuItemCard";

const MenuItemsList: FC<{ itemList: MenuItem[] }> = ({ itemList }) => {
  return (
    <>
      {!itemList && <AnimatedLogo />}
      <Flex flexDirection={"row"} columnGap={4} rowGap={4} p={4} wrap={"wrap"}>
        {itemList.map((item) => (
          <MenuItemCard item={item} key={item._id} />
        ))}
      </Flex>
    </>
  );
};

export default MenuItemsList;
