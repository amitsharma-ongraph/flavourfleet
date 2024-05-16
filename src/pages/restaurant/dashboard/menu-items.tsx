import { useAddMenuGroupModal } from "@/components/Modals/AddMenuGroupModal";
import { useAddMenuItemModal } from "@/components/Modals/AddMenuItemModal";
import { RestroDashboardLayout } from "@/components/layouts/RestroDashboardLayout";
import MenuItemsList from "@/components/RestaurantPanel/menuItems/MenuItemsList";
import { useModal } from "@/hooks/useModal";
import { useRestaurant } from "@/hooks/useRestaurant";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import React, { ReactElement, useEffect, useState } from "react";
import { BiPlusCircle } from "react-icons/bi";

function RestroMenuItemsPage() {
  const { getAllGroupNames, getMenuItemsByGroup } = useRestaurant();
  const { setModal } = useModal();
  const { AddMenuGroupModal } = useAddMenuGroupModal();

  const [activeGroup, setActiveGroup] = useState<string>("");

  const { AddMenuItemModal } = useAddMenuItemModal(activeGroup);

  const menuItems = getMenuItemsByGroup(activeGroup);

  const [groupNames, setGroupNames] = useState<string[]>(getAllGroupNames());

  useEffect(() => {
    setGroupNames(getAllGroupNames());
  }, [getAllGroupNames()]);

  useEffect(() => {
    if (groupNames.length > 0) {
      setActiveGroup(groupNames[0]);
    }
  }, [groupNames]);
  return (
    <Box height={"100%"} width={"100%"}>
      <Flex direction={"column"} rowGap={4} h={"full"} w={"full"}>
        <Flex direction={"column"} rowGap={4} p={4}>
          <Flex
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text>Groups</Text>
            <Flex
              direction={"row"}
              columnGap={4}
              px={2}
              py={2}
              alignItems={"center"}
              bg={"brand.100"}
              cursor={"pointer"}
              borderRadius={"5px"}
              w={"128px"}
              onClick={() => {
                setModal(AddMenuGroupModal);
              }}
            >
              <Icon as={BiPlusCircle} />
              <Text>Add Group</Text>
            </Flex>
          </Flex>
          {groupNames.length === 0 && (
            <Text>No groups availabe , start by adding a group</Text>
          )}
          <Flex direction={"row"} columnGap={4} wrap={"wrap"} rowGap={"4"}>
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
        </Flex>

        {activeGroup && (
          <Flex direction={"column"} rowGap={4} p={4}>
            <Flex
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Text>Menu Items</Text>
              <Flex
                direction={"row"}
                columnGap={4}
                px={2}
                py={2}
                alignItems={"center"}
                bg={"brand.100"}
                cursor={"pointer"}
                borderRadius={"5px"}
                width={"128px"}
                onClick={() => {
                  setModal(AddMenuItemModal);
                }}
              >
                <Icon as={BiPlusCircle} />
                <Text>Add Item</Text>
              </Flex>
            </Flex>
            {menuItems.length === 0 && (
              <Text>No Items available , start by adding an Item</Text>
            )}
            {menuItems.length > 0 && <MenuItemsList itemList={menuItems} />}
          </Flex>
        )}
      </Flex>
    </Box>
  );
}
RestroMenuItemsPage.getLayout = (page: ReactElement) => (
  <RestroDashboardLayout>{page}</RestroDashboardLayout>
);

export default RestroMenuItemsPage;
