import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { MenuItem } from "../../../../packages/types/entity/MenuItem";
import { useModal } from "@/hooks/useModal";
import { Box, Button, Flex } from "@chakra-ui/react";
import MenuItemCard from "@/components/RestaurantPanel/menuItems/MenuItemCard";

interface Props {
  item: MenuItem | null;
  setItem: Dispatch<SetStateAction<MenuItem | null>>;
  options: MenuItem[];
}
const AddFreeItemModal: FC<Props> = ({ item, setItem, options }) => {
  const [selected, setSelected] = useState<MenuItem | null>(item);
  const { setModal } = useModal();
  return (
    <Flex flexDirection={"column"} alignItems={"center"} w={"full"}>
      <Box h={"380px"} position={"relative"}>
        <Flex
          flexDirection={"column"}
          rowGap={4}
          h={"full"}
          overflowY={"scroll"}
        >
          {options.map((option) => (
            <Box
              key={option._id}
              bg={selected?._id === option._id ? "brand.200" : ""}
              cursor={"pointer"}
              onClick={() => {
                setSelected(option);
              }}
            >
              <MenuItemCard item={option} />
            </Box>
          ))}
        </Flex>
        <Flex
          position={"absolute"}
          left={0}
          bottom={"-40px"}
          w={"full"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Button
            bg={"brand.900"}
            color={"white"}
            size={"sm"}
            sx={{
              ":hover": {
                bgColor: "brand.600",
              },
            }}
            onClick={() => {
              setItem(selected);
              setModal(null);
            }}
          >
            Done
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default AddFreeItemModal;
