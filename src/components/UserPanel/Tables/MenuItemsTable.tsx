import MenuItemPlaceholderCard from "@/components/placeholders/MenuItemPlaceholderCard";
import { Box, Flex } from "@chakra-ui/react";
import React, { FC, useState } from "react";
import UserPanelMenuCard from "../Cards/UserPanelMenuCard";

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

interface Props {
  menuItemlist: IMenuItem[];
  groupNames: string[];
  restaurantId: string;
}

const MenuItemsTable: FC<Props> = ({
  menuItemlist,
  groupNames,
  restaurantId,
}) => {
  const [activeGroup, setActiveGroup] = useState<string>("all");

  const getMenuItemsByGroup = () => {
    if (activeGroup === "all") {
      return menuItemlist;
    }
    return menuItemlist.filter(
      (menuItem) =>
        menuItem.groupName.toLowerCase() === activeGroup.toLowerCase()
    );
  };
  return (
    <>
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
          p={2}
          borderRadius={"5px"}
          bg={`${activeGroup === "all" ? "brand.200" : "brand.50"}`}
          cursor={"pointer"}
          onClick={() => {
            setActiveGroup("all");
          }}
          key={"all"}
        >
          {"All"}
        </Box>
        {groupNames.map((group) => (
          <Box
            p={2}
            borderRadius={"5px"}
            bg={`${activeGroup === group ? "brand.200" : "brand.50"}`}
            cursor={"pointer"}
            onClick={() => {
              setActiveGroup(group);
            }}
            key={group}
          >
            {group}
          </Box>
        ))}
      </Flex>

      <Flex
        flexWrap={"wrap"}
        flexDirection={"row"}
        columnGap={5}
        p={5}
        rowGap={5}
      >
        {getMenuItemsByGroup().map((menuItem) => (
          <UserPanelMenuCard
            menuItem={menuItem}
            restaurantId={restaurantId}
            key={menuItem.id}
          />
        ))}
      </Flex>
    </>
  );
};

export default MenuItemsTable;
