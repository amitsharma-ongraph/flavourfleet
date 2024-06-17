import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { MenuItem } from "../../../../packages/types/entity/MenuItem";
import { Box, Button, Flex } from "@chakra-ui/react";
import MenuItemCard from "@/components/RestaurantPanel/menuItems/MenuItemCard";
import { useModal } from "@/hooks/useModal";

interface Props {
  combination: MenuItem[];
  setCombination: Dispatch<SetStateAction<MenuItem[]>>;
  options: MenuItem[];
}
const AddCombinationModal: FC<Props> = ({
  combination,
  setCombination,
  options,
}) => {
  const [selected, setSelected] = useState<MenuItem[]>(combination);
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
              bg={selected.some((c) => c._id === option._id) ? "brand.200" : ""}
              cursor={"pointer"}
              onClick={() => {
                setSelected((prev) => {
                  return prev.some((item) => item._id == option._id)
                    ? prev.filter((item) => item._id != option._id)
                    : [...prev, option];
                });
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
              setCombination(selected);
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

export default AddCombinationModal;
